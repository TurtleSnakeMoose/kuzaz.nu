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
    
    let result_transactions = kzzn.calc.calculate(data);
    debugger;
    result_tbody.append(kzzn.util.buildTable_result(result_transactions));
};

// triggers when result modal begins to close.
kzzn.result.modal_result_onClose = function (e){
};

