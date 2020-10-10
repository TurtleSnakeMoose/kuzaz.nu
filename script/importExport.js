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
    let modal = $(e.target),
        export_container = modal.find('#export_container');
    debugger;
    export_container.val(kzzn.data.Json_getAll());
};

// triggers when importExport modal begins to close.
kzzn.importExport.modal_importExport_onClose = function (e){
    let modal = $(e.target);
};

// save the imported json string.
kzzn.importExport.import_jsonString = function(btn){
    let modal = $('#modal_importExport'),
        imported_json = modal.find('#import_container').val(),
        tbody = $('#participant_list tbody');

    let parsed_data = JSON.parse(imported_json);
    
    // first, clear the data and table.
    kzzn.util.clearData();

    // load the imported data.
    kzzn.data.loadParticipantData(tbody, parsed_data);


}