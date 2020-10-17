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

    export_container.val(kzzn.data.Json_getAll());
};

// triggers when importExport modal begins to close.
kzzn.importExport.modal_importExport_onClose = function (e){
    let modal = $(e.target),
        btn_import = modal.find('#btn_import'),
        txt_import = modal.find('#import_container');

    txt_import.val('');
    btn_import.attr('disabled', true);
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

    // enable/disable buttons.
    kzzn.util.setStatus_ActionButtons();

    // close modal after copying.
    modal.modal('hide');
}

// copy json string.
kzzn.importExport.copy_jsonString = function(btn){
    let modal = $('#modal_importExport'),
        exported_jsonContent = modal.find('#export_container').val(),
        clipboard_container = $('#importExport_clipboard_container');

    kzzn.util.copy_to_clipboard(exported_jsonContent, clipboard_container);
    $('#div_toast_importExport').toast('show');
}

kzzn.importExport.onInput_txtImport = function (e){
    let txt_import = $(e.target),
        btn_import = txt_import.siblings('button');

        if (kzzn.util.isJsonString(txt_import.val()))
            btn_import.removeAttr('disabled');
        else
            btn_import.attr('disabled', true);
}