browser.storage.sync.get().then(function (result) {
    if (result.masterArm == undefined) result.masterArm = true;
    if (result.usePrimaryLanguage == undefined) result.usePrimaryLanguage = false;

    if (result.masterArm) {
        const url = new URL(window.location.href);
        if (!url.searchParams.get("gl") || !url.searchParams.get("hl")) {
            url.searchParams.set("gl", "us");
            url.searchParams.set("hl", navigator.language.substring(0, 2));
            if (result.usePrimaryLanguage) {
                url.searchParams.set("lr", "lang_" + navigator.language.substring(0, 2));
            }
            location.href = url.href;
        } 
    }
});