var config_deploy = {

    // OBLIGATORY FIELDS

    // the experimentID is needed to recover data from the _babe server app
    // you receive the experimentID when you create the experiment using the _babe server app
    // "experimentID": "100",
    // // if you use the _babe server app, specify its URL here
    "experimentID": "en-description-last40.json",
    "serverAppURL": "https://description-en-default-rtdb.firebaseio.com/",

    // set deployment method; use one of:
    //'debug', 'localServer', 'MTurk', 
    // 'MTurkSandbox', 'Prolific', 'directLink'
    //"deployMethod": "debug",
    //"deployMethod": "directLink",
    "deployMethod": "Prolific",
    // "deployMethod": "MTurk",
    // "deployMethod": "MTurkSandbox",

    // who to contact in case of trouble
    "contact_email": "wanchen0405@g.ucla.edu",

    // OPTIONAL FIELDS

    // set the prolific completion URL if the deploy method is "Prolific"
    // the URL should look something like this - https://app.prolific.ac/submissions/complete?cc=ABCD1234
    "prolificURL": "https://app.prolific.com/submissions/complete?cc=C11UVM4K"
};