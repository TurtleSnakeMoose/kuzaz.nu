var kzzn = kzzn || {};
kzzn.importExport = kzzn.importExport || {};

// triggers on "archive" icon click - opens modal window
kzzn.importExport.openImportExportModal = function (e) {
    $('#modal_importExport').modal({
        keyboard: true,
        focus: true,
        backdrop: 'static'
    })
}

// triggers after importExport modal load.
kzzn.importExport.modal_importExport_onshown = function(e){
    let modal = $(e.target);
};

// triggers when importExport modal begins to close.
kzzn.importExport.modal_importExport_onClose = function (e){
    let modal = $(e.target);
};