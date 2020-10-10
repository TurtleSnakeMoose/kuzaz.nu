var kzzn = kzzn || {};
kzzn.result = kzzn.result || {};

// triggers on "Result" button click - opens modal window
kzzn.result.openResultModal = function (e) {
    $('#modal_result').modal({
        keyboard: true,
        focus: true,
        backdrop: 'static'
    })
}

// triggers after result modal load.
kzzn.result.modal_result_onshown = function(e){
    let modal = $(e.target),
    result_tbody = modal.find('#transactions_list tbody'),
    data = kzzn.data.getAll(),
    btn_whatsapp = modal.find('.fa-whatsapp');
    
    let result_transactions = kzzn.calc.calculate(data); // calculate transactions into an array.

    result_tbody.append(kzzn.util.buildTable_result(result_transactions)); // display transactions as a table.

    // build transactions as formatted string, used for copying to clipboard and sending via whatsapp
    kzzn.data.transactions_plainText = kzzn.util.buildTransactionsAsText(result_transactions);

    // set the whatsapp api content.
    let whatsapp_content = kzzn.data.transactions_plainText.replaceAll('\r\n', '%0a');
    btn_whatsapp.attr('href',`https://wa.me/?text=${whatsapp_content}`);
};

// triggers when result modal begins to close.
kzzn.result.modal_result_onClose = function (e){
    let modal = $(e.target),
    result_tbody = modal.find('#transactions_list tbody');

    result_tbody.empty();
};

kzzn.result.copyAsText = function (e){
    let clipboard_container = $('#result_clipboard_container');
    kzzn.util.copy_to_clipboard(kzzn.data.transactions_plainText, clipboard_container);
    $('#div_toast_result').toast('show');
};