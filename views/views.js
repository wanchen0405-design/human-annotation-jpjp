// informed consent page
var informed_consent = {
    name: "研究参加同意書",
    title: "研究参加同意書",
    consent_text:
        "<p>研究者名：カリフォルニア大学ロサンゼルス校（UCLA）のエリサ・クライス教授（Dr. Elisa Kreiss）</p>" +
        "<p>資金提供：シェルマンフェローズ・プログラム（The Society of Hellman Fellows Program）</p>" +
        "<p>対象者：18 歳以上の方</p>" +
        "<br>"+
        "<p><strong>この研究について知っておくべきこと</strong></p>" +
        "<p>研究内容は説明されます</p>" +
        "<p>参加は任意です</p>" +
        "<p>同意後でも途中でやめることができます</p>" +
        "<p>参加・不参加の決定によって不利益を受けることはありません</p>" +
        "<p>質問があれば、事前に何でも聞いてください</p>" +
        "<p>答えたくない質問には答えなくても、研究への参加は継続できます</p>" +
        "<br>"+
        "<p><strong>研究の目的</strong></p>" +
        "<p>この研究は、人々が視覚的なシーンをどのように捉え、評価するのかを理解することを目的としています。画像の見方や感じ方を調べることで、人間のコミュニケーションの仕組みや視覚情報の処理について、より深い理解が得られると考えられます。</p>" +
        "<br>"+
        "<p><strong>研究の所要時間と手順</strong></p>" +
        "<p>参加には合計で約5分かかります</p>" +
        "<p>いくつかの画像を見て、指示に従って画像説明文の一部を選択していただきます</p>" +
        "<p>その後、簡単な事後アンケートの質問にいくつか回答していただきます</p>" +
        "<br>"+
        "<p><strong>参加によるリスク</strong></p>" +
        "<p>参加により、予期されるリスクや不快感はありません</p>" +
        "<br>"+
        "<p><strong>参加による利益</strong></p>" +
        "<p> 直接的な利益はありませんが、あなたの参加は今後の研究に役立つ可能性があります</p>" +
        "<br>"+
        "<p><strong>プライバシー保護個人情報の取り扱い</strong></p>" +
        "<p>個人を特定できる情報は収集しません</p>" +
        "<p>収集されたデータは安全な場所に保管されます</p>" +
        "<p>匿名化されたデータは、研究の再現や追跡研究のために共有される可能性があります</p>" +
        "<p>研究チーム、UCLAの認可を受けた職員、研究スポンサーがデータにアクセスする可能性があります</p>" +
        "<p>公表される研究成果にあなたの名前が記載されることはありません</p>"+
        "<p>大学職員が処理の過程で情報にアクセスする場合がありますが、厳格な守秘義務があります</p>" +
        "<p>匿名化されたデータは無期限に保管されます</p>" +
        "<br>"+
        "<p><strong>連絡先</strong></p>" +
        "<p><strong>研究に関するお問い合わせ：</strong> 研究に関して質問や意見・不安がある場合は、研究チームまでご連絡ください: エリサ・クライス教授（Dr. Elisa Kreiss）へは、メール（ekreiss@ucla.edu）または電話（310-825-1703）でご連絡いただけます。</p>" +
        "<p><strong> 研究参加者としての権利に関するお問い合わせ：</strong> カリフォルニア大学ロサンゼルス校人間研究保護プログラム（UCLA OHRPP）電話：(310) 206-2040、メール：participants@research.ucla.edu、郵送：Box 951406, Los Angeles, CA 90095-1406</p>",
    render: function() {
        var viewTemplate = $("#informed-consent-view").html();
        
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title,
                consent_text: this.consent_text
            })
        );

        var consentYes = $("#consent-yes");
        var consentNo = $("#consent-no");
        var nextButton = $("#next");

        // Function to enable/disable next button based on selection
        var updateNextButton = function() {
            if (consentYes.is(":checked") || consentNo.is(":checked")) {
                nextButton.prop("disabled", false);
            } else {
                nextButton.prop("disabled", true);
            }
        };

        // Event listeners for checkboxes
        consentYes.on("change", function() {
            if ($(this).is(":checked")) {
                consentNo.prop("checked", false);
            }
            updateNextButton();
        });

        consentNo.on("change", function() {
            if ($(this).is(":checked")) {
                consentYes.prop("checked", false);
            }
            updateNextButton();
        });

        // Next button click handler
        nextButton.on("click", function() {
            if (consentYes.is(":checked")) {
                // User consented, go to instructions
                exp.findNextView();
            } else if (consentNo.is(":checked")) {
                // User declined, go to thanks page
                exp.currentViewCounter = exp.views_seq.length - 1; // Go to last view (thanks)
                exp.currentTrialInViewCounter = 0;
                exp.findNextView();
            }
        });

        // Initially disable the next button
        nextButton.prop("disabled", true);
    },
    trials: 1
};

// introduction page
var intro = {
    name: "intro",
    // introduction title
    title: "説明", 
    // introduction text
    text:
    "<p>こんにちは。本研究へようこそ！</p><br>" +
    "<p>次のセクションでは、<strong>5枚の写真</strong>が表示され、それぞれに他の人が書いた説明文が付いています。各ステップに表示される指示に基づいて、<strong>説明文の一部をハイライト</strong>していただきます。指示をよく読み、指示に従ってテキストをハイライトしてください。</p><br>" +
    "<p>その後、お住まいの地域と言語に関する簡単な質問に2つ回答していただきます。</p><br>" +
    "<p>準備ができましたら、下にProlific IDを入力し、ボタンをクリックして調査を開始してください。</p>",
    buttonText: "実験を開始する",
    // render function renders the view
    render: function() {
        var viewTemplate = $("#intro-view").html();

        $("#main").html(
            Mustache.render(viewTemplate, {
                //picture: "stimuli/stanford-nlp-logo.jpg",
                title: this.title,
                text: this.text,
                legal_info: this.legal_info,
                button: this.buttonText
            })
        );

        var prolificId = $("#prolific-id");
        var IDform = $("#prolific-id-form");
        var next = $("#next");

        var showNextBtn = function() {
            if (prolificId.val().trim() !== "") {
                next.removeClass("nodisplay");
            } else {
                next.addClass("nodisplay");
            }
        };

        if (config_deploy.deployMethod !== "Prolific") {
            IDform.addClass("nodisplay");
            next.removeClass("nodisplay");
        }

        prolificId.on("keyup", function() {
            showNextBtn();
        });

        prolificId.on("focus", function() {
            showNextBtn();
        });

        // moves to the next view
        next.on("click", function() {
            if (config_deploy.deployMethod === "Prolific") {
                exp.global_data.prolific_id = prolificId.val().trim();
            }

            exp.findNextView();
        });
    },
    // for how many trials should this view be repeated?
    trials: 1
};

// main page
var main = {
    name: "main",
    render: function(CT) {
        var viewTemplate = $("#main-view").html();
        var trial = exp.trial_info.main_trials[CT];
        var filePath = trial.filepath || trial.filePath || "";
        var condition = trial.condition || "";
        var trialDescription = trial.description || "";
        $("#main").html(
            Mustache.render(viewTemplate, {
                image_path: filePath,
                trial_number: CT + 1,
                total_trials: this.trials,
                phase_title: "ステップ1/3",
                instruction: "ステップ1：画像を見てから、説明文の中で、画像の<strong>主要な被写体／対象物</strong>だと思う部分をハイライトしてください。"
            })
        );

        window.scrollTo(0, 0);

        var phaseIndex = 1;
        var response = {
            selected_main_object_spans: [],
            selected_focal_sentences: [],
            selected_background_sentences: [],
            additional_focal_sentences: [],
            additional_background_sentences: [],
            main_object_description_na: false,
            focal_description_na: false,
            background_description_na: false,
            review_complete_checked: false
        };
        var highlightRanges = {
            step1: [],
            focal: [],
            background: [],
            reviewFocal: [],
            reviewBackground: []
        };
        var phaseStartTime = Date.now();
        var phaseTiming = {
            step_1_seconds: 0,
            step_2_seconds: 0,
            step_3_seconds: 0,
            step_4_seconds: 0
        };

        var setPhaseUI = function(step) {
            phaseIndex = step;
            $("#error").text("Please complete this step before continuing.").hide();
            $("#phase-1-panel").toggle(step === 1);
            $("#phase-2-panel").toggle(step === 2);
            $("#phase-3-panel").toggle(step === 3);
            $("#phase-4-panel").toggle(step === 4);

            var phaseTitle = step === 1 ? "ステップ1/3" : step === 2 ? "ステップ2/3" : step === 3 ? "ステップ3/3" : "最終確認";
            var instruction = "";
            if (step === 1) {
                instruction = "ステップ1：画像を見てから、説明文の中で、画像の<strong>主要な被写体／対象物</strong>だと思う部分をハイライトしてください。";
            } else if (step === 2) {
                instruction = "ステップ2：説明文の中で、<strong>主要な被写体／対象物</strong>に言及し、かつ何らかの形で説明している部分を<strong>すべて</strong>ハイライトしてください。";
            } else if (step === 3) {
                instruction = "説明文の中で、画像の<strong>背景</strong>（つまり、<strong>主要な被写体／対象物ではない</strong>視覚的な詳細）に言及している、または何らかの形で説明している部分を<strong>すべて</strong>ハイライトしてください。";
            } else {
                instruction = "確認：黒色のテキストは、まだハイライトされていない部分です。<strong>主要な被写体／対象物</strong>および<strong>背景</strong>に言及している、またはそれらを説明しているテキストを<strong>すべて</strong>ハイライトしてください。";
            }

            $(".view .question").first().text("試行 " + (CT + 1) + " / " + main.trials + "：" + phaseTitle);
            $(".question-box .question").html(instruction);

            if (step === 4) {
                renderReviewText();
            }
        };

        var escapeHtml = function(text) {
            return String(text)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        var getSelectionRangeWithin = function(containerEl) {
            var selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) {
                return null;
            }
            var range = selection.getRangeAt(0);
            if (!containerEl.contains(range.commonAncestorContainer)) {
                return null;
            }
            var selectedText = selection.toString().trim();
            if (!selectedText) {
                return null;
            }
            var preRange = range.cloneRange();
            preRange.selectNodeContents(containerEl);
            preRange.setEnd(range.startContainer, range.startOffset);
            var start = preRange.toString().length;
            var end = start + range.toString().length;
            if (end <= start) {
                return null;
            }
            return {
                start: start,
                end: end,
                text: range.toString()
            };
        };

        var mergeRanges = function(ranges) {
            if (!ranges || ranges.length === 0) {
                return [];
            }
            var sorted = ranges.slice().sort(function(a, b) {
                return a.start - b.start;
            });
            var merged = [];
            sorted.forEach(function(r) {
                if (merged.length === 0) {
                    merged.push({ start: r.start, end: r.end });
                    return;
                }
                var prev = merged[merged.length - 1];
                if (r.start <= prev.end) {
                    prev.end = Math.max(prev.end, r.end);
                } else {
                    merged.push({ start: r.start, end: r.end });
                }
            });
            return merged;
        };

        var renderHighlightedText = function(containerSelector, descriptionText, ranges) {
            var container = $(containerSelector);
            var baseText = descriptionText || "(No description provided)";
            var merged = mergeRanges(ranges || []);
            if (merged.length === 0) {
                container.text(baseText);
                return;
            }
            var html = "";
            var cursor = 0;
            merged.forEach(function(r) {
                var safeStart = Math.max(0, Math.min(baseText.length, r.start));
                var safeEnd = Math.max(0, Math.min(baseText.length, r.end));
                if (safeStart > cursor) {
                    html += escapeHtml(baseText.slice(cursor, safeStart));
                }
                if (safeEnd > safeStart) {
                    html += "<mark class='description-highlight'>" + escapeHtml(baseText.slice(safeStart, safeEnd)) + "</mark>";
                }
                cursor = Math.max(cursor, safeEnd);
            });
            if (cursor < baseText.length) {
                html += escapeHtml(baseText.slice(cursor));
            }
            container.html(html);
        };

        var renderReviewText = function() {
            var container = $("#description-block-review");
            var baseText = trialDescription || "(No description provided)";
            var previousRanges = mergeRanges(
                highlightRanges.step1
                    .concat(highlightRanges.focal)
                    .concat(highlightRanges.background)
            );
            var reviewRanges = mergeRanges(
                highlightRanges.reviewFocal.concat(highlightRanges.reviewBackground)
            );

            // Render contiguous segments (not per-character) to preserve normal word spacing/kerning.
            var breakpoints = [0, baseText.length];
            previousRanges.forEach(function(r) {
                breakpoints.push(r.start, r.end);
            });
            reviewRanges.forEach(function(r) {
                breakpoints.push(r.start, r.end);
            });
            breakpoints = Array.from(new Set(breakpoints))
                .filter(function(n) {
                    return n >= 0 && n <= baseText.length;
                })
                .sort(function(a, b) {
                    return a - b;
                });

            var html = "";
            for (var i = 0; i < breakpoints.length - 1; i++) {
                var start = breakpoints[i];
                var end = breakpoints[i + 1];
                if (end <= start) {
                    continue;
                }
                var segment = escapeHtml(baseText.slice(start, end));
                var inReview = reviewRanges.some(function(r) {
                    return start >= r.start && start < r.end;
                });
                var inPrevious = previousRanges.some(function(r) {
                    return start >= r.start && start < r.end;
                });

                if (inReview) {
                    html += "<mark class='description-highlight'>" + segment + "</mark>";
                } else if (inPrevious) {
                    html += "<span class='review-previous-highlight'>" + segment + "</span>";
                } else {
                    html += "<span class='review-unhighlighted-text'>" + segment + "</span>";
                }
            }
            container.html(html || escapeHtml(baseText));
        };

        var renderSelections = function(listSelector, selections, ranges, blockSelector) {
            var list = $(listSelector);
            list.empty();

            selections.forEach(function(sel, index) {
                var li = $("<li></li>");
                li.text(sel + " ");
                var removeBtn = $("<button type='button'>削除</button>");
                removeBtn.on("click", function() {
                    selections.splice(index, 1);
                    if (ranges) {
                        ranges.splice(index, 1);
                    }
                    renderSelections(listSelector, selections, ranges, blockSelector);
                    if (blockSelector) {
                        renderHighlightedText(blockSelector, trialDescription, ranges || []);
                    } else if (listSelector === "#selection-list-review-focal" || listSelector === "#selection-list-review-background") {
                        renderReviewText();
                    }
                });
                li.append(removeBtn);
                list.append(li);
            });
        };

        var hasUnhighlightedTextAfterFirstThreeSteps = function() {
            var baseText = trialDescription || "";
            if (!baseText) {
                return false;
            }
            var previousRanges = mergeRanges(
                highlightRanges.step1
                    .concat(highlightRanges.focal)
                    .concat(highlightRanges.background)
            );
            for (var i = 0; i < baseText.length; i++) {
                // Ignore whitespace and punctuation; count any Unicode letter/number
                // so this works for Japanese and other non-Latin scripts as well.
                if (!/[\p{L}\p{N}]/u.test(baseText.charAt(i))) {
                    continue;
                }
                var alreadyHighlighted = previousRanges.some(function(r) {
                    return i >= r.start && i < r.end;
                });
                if (!alreadyHighlighted) {
                    return true;
                }
            }
            return false;
        };

        var hasAnyHighlightsInFirstThreeSteps = function() {
            return (
                highlightRanges.step1.length > 0 ||
                highlightRanges.focal.length > 0 ||
                highlightRanges.background.length > 0
            );
        };

        var finalizeTrial = function(step4Skipped) {
            exp.trial_data.push({
                trial_number: CT + 1,
                condition: condition,
                filepath: filePath,
                focal_label: trial.focal || "",
                background_label: trial.background || "",
                image_description: trialDescription,
                main_object_description_na: response.main_object_description_na,
                selected_main_object_spans: response.main_object_description_na ? [] : response.selected_main_object_spans.slice(),
                focal_description_na: response.focal_description_na,
                background_description_na: response.background_description_na,
                selected_focal_sentences: response.focal_description_na ? [] : response.selected_focal_sentences.slice(),
                selected_background_sentences: response.background_description_na ? [] : response.selected_background_sentences.slice(),
                additional_focal_sentences: response.additional_focal_sentences.slice(),
                additional_background_sentences: response.additional_background_sentences.slice(),
                review_complete_checked: response.review_complete_checked,
                step_1_seconds: phaseTiming.step_1_seconds,
                step_2_seconds: phaseTiming.step_2_seconds,
                step_3_seconds: phaseTiming.step_3_seconds,
                step_4_seconds: phaseTiming.step_4_seconds,
                step_4_skipped: step4Skipped
            });

            exp.findNextView();
        };

        renderHighlightedText("#description-block-step1", trialDescription, highlightRanges.step1);
        renderHighlightedText("#description-block-focal", trialDescription, highlightRanges.focal);
        renderHighlightedText("#description-block-background", trialDescription, highlightRanges.background);
        renderReviewText();

        $("#na-focal").on("change", function() {
            if ($(this).is(":checked")) {
                response.selected_focal_sentences.length = 0;
                highlightRanges.focal.length = 0;
                renderSelections("#selection-list-focal", response.selected_focal_sentences, highlightRanges.focal, "#description-block-focal");
                renderHighlightedText("#description-block-focal", trialDescription, highlightRanges.focal);
            }
        });

        $("#na-step1").on("change", function() {
            if ($(this).is(":checked")) {
                response.selected_main_object_spans.length = 0;
                highlightRanges.step1.length = 0;
                renderSelections("#selection-list-step1", response.selected_main_object_spans, highlightRanges.step1, "#description-block-step1");
                renderHighlightedText("#description-block-step1", trialDescription, highlightRanges.step1);
            }
        });

        $("#na-background").on("change", function() {
            if ($(this).is(":checked")) {
                response.selected_background_sentences.length = 0;
                highlightRanges.background.length = 0;
                renderSelections("#selection-list-background", response.selected_background_sentences, highlightRanges.background, "#description-block-background");
                renderHighlightedText("#description-block-background", trialDescription, highlightRanges.background);
            }
        });

        $("#add-selection-step1").on("click", function() {
            if ($("#na-step1").is(":checked")) {
                alert("Uncheck N/A if you want to add highlighted text.");
                return;
            }
            var containerEl = $("#description-block-step1")[0];
            var selectionRange = getSelectionRangeWithin(containerEl);
            if (!selectionRange) {
                alert("まず、説明文内のテキストをハイライトしてください。");
                return;
            }
            if (response.selected_main_object_spans.includes(selectionRange.text)) {
                alert("That text is already in your step 1 selections.");
                return;
            }
            $("#na-step1").prop("checked", false);
            response.selected_main_object_spans.push(selectionRange.text);
            highlightRanges.step1.push({
                start: selectionRange.start,
                end: selectionRange.end
            });
            renderSelections("#selection-list-step1", response.selected_main_object_spans, highlightRanges.step1, "#description-block-step1");
            renderHighlightedText("#description-block-step1", trialDescription, highlightRanges.step1);
            window.getSelection().removeAllRanges();
        });

        $("#add-selection-focal").on("click", function() {
            if ($("#na-focal").is(":checked")) {
                alert("Uncheck N/A if you want to add highlighted text.");
                return;
            }
            var containerEl = $("#description-block-focal")[0];
            var selectionRange = getSelectionRangeWithin(containerEl);
            if (!selectionRange) {
                alert("まず、説明文内のテキストをハイライトしてください。");
                return;
            }
            var selectedText = selectionRange.text;
            if (response.selected_focal_sentences.includes(selectedText)) {
                alert("That text is already in your focal selections.");
                return;
            }
            $("#na-focal").prop("checked", false);
            response.selected_focal_sentences.push(selectedText);
            highlightRanges.focal.push({
                start: selectionRange.start,
                end: selectionRange.end
            });
            renderSelections("#selection-list-focal", response.selected_focal_sentences, highlightRanges.focal, "#description-block-focal");
            renderHighlightedText("#description-block-focal", trialDescription, highlightRanges.focal);
            window.getSelection().removeAllRanges();
        });

        $("#add-selection-background").on("click", function() {
            if ($("#na-background").is(":checked")) {
                alert("Uncheck N/A if you want to add highlighted text.");
                return;
            }
            var containerEl = $("#description-block-background")[0];
            var selectionRange = getSelectionRangeWithin(containerEl);
            if (!selectionRange) {
                alert("まず、説明文内のテキストをハイライトしてください。");
                return;
            }
            var selectedText = selectionRange.text;
            if (response.selected_background_sentences.includes(selectedText)) {
                alert("That text is already in your background selections.");
                return;
            }
            $("#na-background").prop("checked", false);
            response.selected_background_sentences.push(selectedText);
            highlightRanges.background.push({
                start: selectionRange.start,
                end: selectionRange.end
            });
            renderSelections("#selection-list-background", response.selected_background_sentences, highlightRanges.background, "#description-block-background");
            renderHighlightedText("#description-block-background", trialDescription, highlightRanges.background);
            window.getSelection().removeAllRanges();
        });

        $("#review-complete").on("change", function() {
            if ($(this).is(":checked")) {
                response.additional_focal_sentences.length = 0;
                response.additional_background_sentences.length = 0;
                highlightRanges.reviewFocal.length = 0;
                highlightRanges.reviewBackground.length = 0;
                renderSelections("#selection-list-review-focal", response.additional_focal_sentences, highlightRanges.reviewFocal, null);
                renderSelections("#selection-list-review-background", response.additional_background_sentences, highlightRanges.reviewBackground, null);
                renderReviewText();
            }
        });

        var addReviewSelection = function(type) {
            var selectionRange = getSelectionRangeWithin($("#description-block-review")[0]);
            if (!selectionRange) {
                alert("Please highlight text inside the review description first.");
                return;
            }
            var overlapExists = mergeRanges(
                highlightRanges.step1
                    .concat(highlightRanges.focal)
                    .concat(highlightRanges.background)
                    .concat(highlightRanges.reviewFocal)
                    .concat(highlightRanges.reviewBackground)
            ).some(function(r) {
                return selectionRange.start < r.end && selectionRange.end > r.start;
            });
            if (overlapExists) {
                alert("Please select only black text that has not been highlighted before.");
                return;
            }

            $("#review-complete").prop("checked", false);
            var selectedText = selectionRange.text;
            if (type === "focal") {
                if (response.additional_focal_sentences.includes(selectedText)) {
                    alert("That text is already in additional main object-related selections.");
                    return;
                }
                response.additional_focal_sentences.push(selectedText);
                highlightRanges.reviewFocal.push({ start: selectionRange.start, end: selectionRange.end });
                renderSelections("#selection-list-review-focal", response.additional_focal_sentences, highlightRanges.reviewFocal, null);
            } else {
                if (response.additional_background_sentences.includes(selectedText)) {
                    alert("That text is already in additional background-related selections.");
                    return;
                }
                response.additional_background_sentences.push(selectedText);
                highlightRanges.reviewBackground.push({ start: selectionRange.start, end: selectionRange.end });
                renderSelections("#selection-list-review-background", response.additional_background_sentences, highlightRanges.reviewBackground, null);
            }
            renderReviewText();
            window.getSelection().removeAllRanges();
        };

        $("#add-review-focal").on("click", function() {
            addReviewSelection("focal");
        });

        $("#add-review-background").on("click", function() {
            addReviewSelection("background");
        });

        setPhaseUI(1);

        $("#next").on("click", function() {
            var now = Date.now();

            if (phaseIndex === 1) {
                var step1Na = $("#na-step1").is(":checked");
                if (!step1Na && response.selected_main_object_spans.length === 0) {
                    $("#error").text("主要な被写体／対象物を示しているテキストをハイライトしてください。該当するものがない場合は、チェックボックスにチェックを入れてください。").show();
                    $("#error").show();
                    return;
                }
                response.main_object_description_na = step1Na;
                phaseTiming.step_1_seconds = (now - phaseStartTime) / 1000;
                phaseStartTime = Date.now();
                setPhaseUI(2);
                return;
            }

            if (phaseIndex === 2) {
                var focalNa = $("#na-focal").is(":checked");
                if (!focalNa && response.selected_focal_sentences.length === 0) {
                    $("#error").text("主要な被写体／対象物を説明しているテキストをハイライトするか、該当するものがない場合はチェックボックスにチェックを入れてください。").show();
                    return;
                }
                response.focal_description_na = focalNa;
                phaseTiming.step_2_seconds = (now - phaseStartTime) / 1000;
                phaseStartTime = Date.now();
                setPhaseUI(3);
                return;
            }

            if (phaseIndex === 3) {
                var backgroundNa = $("#na-background").is(":checked");
                if (!backgroundNa && response.selected_background_sentences.length === 0) {
                    $("#error").text("背景を説明しているテキストをハイライトしてください。該当するものがない場合は、チェックボックスにチェックを入れてください。").show();
                    return;
                }
                response.background_description_na = backgroundNa;
                phaseTiming.step_3_seconds = (now - phaseStartTime) / 1000;
                var shouldShowReviewStep =
                    !hasAnyHighlightsInFirstThreeSteps() ||
                    hasUnhighlightedTextAfterFirstThreeSteps();
                if (!shouldShowReviewStep) {
                    response.review_complete_checked = true;
                    phaseTiming.step_4_seconds = 0;
                    finalizeTrial(true);
                    return;
                }
                phaseStartTime = Date.now();
                setPhaseUI(4);
                return;
            }

            if (phaseIndex === 4) {
                var reviewComplete = $("#review-complete").is(":checked");
                var hasAdditionalSelections =
                    response.additional_focal_sentences.length > 0 ||
                    response.additional_background_sentences.length > 0;
                if (!reviewComplete && !hasAdditionalSelections) {
                    $("#error").text("まだ何も選択されていません。続行するには、テキストを選択するか、「残りのテキストは主要な対象物にも背景にも関連していない」にチェックを入れてください。").show();
                    return;
                }
                response.review_complete_checked = reviewComplete;
                phaseTiming.step_4_seconds = (now - phaseStartTime) / 1000;
                finalizeTrial(false);
            }
        });
    },
    trials: 10
};

// Post-test page

var postTest = {
    name: "postTest",
    title: "事後アンケート",
    buttonText: "続行",
    render: function() {
        var viewTemplate = $("#post-test-view").html();
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title,
                text: this.text,
                buttonText: this.buttonText
            })
        );

        $("#next").on("click", function(e) {
            // prevents the form from submitting
            e.preventDefault();

            var country = $('input[name=country]:checked').val();
            var nlangChecked = $('input[name=native_lang]:checked');
            var nlang = [];
            nlangChecked.each(function() {
                nlang.push($(this).val());
            });

            var countryOtherRequired = (country === 'other' && $('#country_other').val().trim() === '');
            var nlangOtherRequired = (nlang.includes('other') && $('#native_lang_other').val().trim() === '');

            if (!country || nlang.length === 0 || countryOtherRequired || nlangOtherRequired) {
                $('#error').css({"display": "block"});
                return;
            }

            $('#error').css({"display": "none"});

            exp.global_data.country = country;
            exp.global_data.country_other = (country === 'other' ? $('#country_other').val().trim() : "");
            exp.global_data.native_lang = nlang;
            exp.global_data.native_lang_other = (nlang.includes('other') ? $('#native_lang_other').val().trim() : "");

            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent =
                (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            exp.findNextView();
        });
    },
    trials: 1
};

// Demographics & comments
var demographics = {
    name: "demographics",
    title: "Demographic Questions",
    buttonText: "Continue",
    render: function() {
        var viewTemplate = $("#demographics-view").html();
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title
            })
        );

        $("#next").on("click", function(e) {
            e.preventDefault();

            // validation: check all required fields (except post_comments)
            var gender = $('input[name=gender]:checked').val();
            var age = $('#age').val();
            var yearsLived = $('#years_lived').val();
            var vision = $('input[name=vision]:checked').val();
            var country = $('input[name=country]:checked').val();
            var nlangChecked = $('input[name=native_lang]:checked');
            var nlang = [];
            nlangChecked.each(function() {
                nlang.push($(this).val());
            });
            
            // Check if "other" is selected, then the corresponding text field is required
            var visionOtherRequired = (vision === 'other' && $('#vision_other').val().trim() === '');
            var countryOtherRequired = (country === 'other' && $('#country_other').val().trim() === '');
            var nlangOtherRequired = (nlang.includes('other') && $('#native_lang_other').val().trim() === '');

            if (!gender || !age || !yearsLived || !vision || !country || nlang.length === 0 || 
                visionOtherRequired || countryOtherRequired || nlangOtherRequired) {
                $('#error').css({"display": "block"});
                return;
            }

            $('#error').css({"display": "none"});

            // demographics
            exp.global_data.gender = gender;
            exp.global_data.age = age;
            exp.global_data.years_lived = yearsLived;
            exp.global_data.vision = vision;
            exp.global_data.vision_other = (vision === 'other' ? $('#vision_other').val().trim() : "");

            exp.global_data.country = country;
            exp.global_data.country_other = (country === 'other' ? $('#country_other').val().trim() : "");

            exp.global_data.native_lang = nlang;
            exp.global_data.native_lang_other = (nlang.includes('other') ? $('#native_lang_other').val().trim() : "");

            // comments (optional)
            exp.global_data.post_comments = $('#post_comments').val().trim();

            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent =
                (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // next
            exp.findNextView();
        });
    },
    trials: 1
};

var thanks = {
    name: "thanks",
    message: "本実験にご参加いただき、ありがとうございました！",
    render: function() {
        var viewTemplate = $("#thanks-view").html();

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if (
            config_deploy.is_MTurk ||
            config_deploy.deployMethod === "directLink"
        ) {
            // updates the fields in the hidden form with info for the MTurk's server
            $("#main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message
                })
            );
        } else if (config_deploy.deployMethod === "Prolific") {
            $("main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message,
                    extraMessage:
                        "Prolificで実験を完了したことを確認するため、下のボタンを押してください。あなたの完了コードは C11UVM4K です。<br />" +
                        "<a href=" +
                        config_deploy.prolificURL +
                        ' class="prolific-url">確認</a>'
                })
            );
        } else if (config_deploy.deployMethod === "debug") {
            $("main").html(Mustache.render(viewTemplate, {}));
        } else {
            console.log("no such config_deploy.deployMethod");
        }

        exp.submit();
    },
    trials: 1
};
