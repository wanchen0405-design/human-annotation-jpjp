// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {
    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
    // specify view order
    this.views_seq = [
        informed_consent,
        intro,
        main,
        postTest,
        demographics,
        thanks
    ];
    const all_main_trials = imageListByGroup;

    // console.log("all_main_trials");
    // console.log(all_main_trials);

    const selected_trial_list = [];
    const seen_focals = [];
    const seen_backgr = [];
    const selection_failures = [];

    console.log("=== Image Selection Algorithm Starting ===");
    console.log("Total groups to process:", Object.keys(all_main_trials).length);
    console.log("Constraint: NO repeated focals or backgrounds allowed");

    for (const [key, value] of Object.entries(all_main_trials)) {
        const shuffled_values = _.shuffle(value.images);
        let picked = false;
        let selected_trial = null;
        let all_candidates_rejected = [];

        // Try to find an image with both unique focal AND background (NO REPEATS ALLOWED)
        for (let i=0; i<shuffled_values.length; i++){
            const candidate = shuffled_values[i];

            const focalUsed = seen_focals.includes(candidate.focal);
            const backUsed = seen_backgr.includes(candidate.background);

            if (focalUsed || backUsed) {
                // Track why this candidate was rejected
                const rejection_reason = [];
                if (focalUsed) rejection_reason.push("focal already used: " + candidate.focal);
                if (backUsed) rejection_reason.push("background already used: " + candidate.background);
                all_candidates_rejected.push({
                    image: candidate.focal + "_" + candidate.background,
                    filePath: candidate.filePath,
                    reason: rejection_reason.join(", ")
                });
                continue;
            }

            // Found an image with both unique focal and background
            selected_trial = candidate;
            seen_focals.push(selected_trial.focal);
            seen_backgr.push(selected_trial.background);
            selected_trial_list.push(selected_trial);
            picked = true;
            console.log("✓ Successfully selected image for group:", {
                groupKey: key,
                category: value.category,
                image: selected_trial.focal + "_" + selected_trial.background,
                filePath: selected_trial.filePath
            });
            break;
        };

        // If no image with unique focal AND background found, skip this group (NO REPEATS ALLOWED)
        if (!picked) {
            // Track this failure for summary
            selection_failures.push({
                groupKey: key,
                category: value.category,
                rejectedCandidates: all_candidates_rejected
            });
            
            console.warn("⚠️ SELECTION ALGORITHM FAILURE - No valid image found (skipping group to avoid repeats):", {
                groupKey: key,
                category: value.category,
                imageListByGroup: key,
                reason: "Could not find image with both unique focal and background - SKIPPING to prevent repeats",
                rejectedCandidates: all_candidates_rejected.length,
                details: all_candidates_rejected
            });
        }
    };
    
    // Validation: Verify NO repeated focals or backgrounds
    const final_focals = selected_trial_list.map(t => t.focal);
    const final_backgr = selected_trial_list.map(t => t.background);
    const duplicate_focals = final_focals.filter((focal, index) => final_focals.indexOf(focal) !== index);
    const duplicate_backgr = final_backgr.filter((back, index) => final_backgr.indexOf(back) !== index);
    
    if (duplicate_focals.length > 0 || duplicate_backgr.length > 0) {
        console.error("❌ VALIDATION FAILED - Found repeats in selection!");
        if (duplicate_focals.length > 0) {
            console.error("   Repeated focals:", duplicate_focals);
        }
        if (duplicate_backgr.length > 0) {
            console.error("   Repeated backgrounds:", duplicate_backgr);
        }
    } else {
        console.log("✓ Validation PASSED - No repeated focals or backgrounds");
    }
    
    const final_trial_list = _.shuffle(selected_trial_list).slice(0, 5);

    // Summary of selection results
    console.log("=== Image Selection Summary ===");
    console.log("Total images selected:", final_trial_list.length);
    console.log("Successful selections (unique focal + background):", final_trial_list.length);
    console.log("Selection failures (groups skipped):", selection_failures.length);
    if (selection_failures.length > 0) {
        console.warn("Groups that were skipped (no valid image without repeats):", selection_failures.map(f => ({
            groupKey: f.groupKey,
            category: f.category
        })));
    }
    console.log("Unique focals used:", final_focals);
    console.log("Unique backgrounds used:", final_backgr);

    // console.log("selected_trial_list");
    // console.log(selected_trial_list);
    // console.log(seen_focals);
    // console.log(seen_backgr);
  
  // Log to verify
    console.log("main_trials");
    console.log(final_trial_list);

    // main_trials = selected_main_trials.concat(attention_checks);
    main_trials = final_trial_list;
    this.trial_info.main_trials = main_trials;
    // ensure the main view runs exactly as many trials as we have images
    if (typeof main !== 'undefined' && Array.isArray(main_trials)) {
        main.trials = main_trials.length;
    }
    // console.log("main trials: ", this.trial_info.main_trials);

    // adds progress bars to the views listed
    // view's name is the same as object's name
    this.progress_bar_in = ["main"];
    // this.progress_bar_in = ['practice', 'main'];
    // styles: chunks, separate or default
    this.progress_bar_style = "default";
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};
