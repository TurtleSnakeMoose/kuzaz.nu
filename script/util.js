var kzzn = kzzn || {};
kzzn.util = kzzn.util || {};

// load html contant from paymentsModal.html into modal <div> and init onShow + onHide events.
kzzn.util.load_modalPayments = function() {
    $('#modal_payments').load("paymentsModal.html");
    
    $('#modal_payments').on('shown.bs.modal', function (e) { kzzn.payments.modal_loadParticipantData(e); })
    
    $('#modal_payments').on('hide.bs.modal', function (e) { kzzn.payments.modal_updateParticipantData(e); })
}

/***************************************************************************************************************************************{ PARTICIPANTS }******/
// initialize various components.
kzzn.util.initComponents = function () {
    //bootstrap popover
	$('[data-toggle="popover"]').popover();
}

// attach keypress events to various elements.
kzzn.util.attachKeyEvents = function () {
    
    // add key events to participant inputs
    var participant_inputs = $('#participant_inputs').find('#input_name, #input_count'),
    btn_addParticiapant = $('#participant_inputs').find('.btn_add');
    participant_inputs.on('keyup', function(event) { if (event.keyCode === 13) { btn_addParticiapant.click(); } });
}

// validate participant input before adding to table.
kzzn.util.participantList_validateRow = function (tbody, name, count){
    let participantRows = tbody.find('tr'),
    parsedCount = parseInt(count || 0),
    names = participantRows.find('td[col-for="name"]'),
    isValid = true;
    
        if(name.length <= 0 || parsedCount < 0 || parsedCount > 30)
            isValid = false;
        
        $.each(names, function(index, item){
            if(item.textContent === name)
                isValid = false;
        });

    return isValid;
}

// add table row for particiapnt.
kzzn.util.participantList_addRow = function (tbody, name, count){
    let currentRowCount = tbody.find('tr').length;

    tbody.closest('table').removeClass('hidden');

    tbody.append(`<tr>
                        <td>${currentRowCount+1}</td>
                        <td col-for='name'>${name}</td>
                        <td class='p_count'>
                            <span>${count || 1}</span>
                            &nbsp;
                            <i class="fa fa-plus-circle" onclick="kzzn.participants.alterParticipantCount(this, 'add')"></i>
                            &nbsp;
                            <i class="fa fa-minus-circle" onclick="kzzn.participants.alterParticipantCount(this, 'remove')"></i>
                        </td>
                        <td>
                            <i class="fa fa-comments-dollar" onclick="kzzn.payments.editParticipantPayments(this)" title='Edit payments'></i>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-trash" onclick="kzzn.participants.removeParticipant(this)" title='Remove participant'></i>
                        </td>
                    </tr>`);
}

// remove participant table row.
kzzn.util.participantList_removeRow = function (row, table){
    
    row.remove(); //remove row

    let remainingRows = $(table).find('tbody tr');

    if(remainingRows.length === 0)
        $(table).addClass('hidden');

    $.each(remainingRows, function(index, item){
        $(item).children()[0].textContent = index+1
    });

}

// count payers \ participant and show the result at the bottom.
kzzn.util.participantList_summarize = function (table){
    var lbl_participantSummary = $('#participant_summary label'),
        payersRows = $(table).find('tbody tr'),
        payerCount = 0,
        participantCount = 0;
    
        $.each(payersRows, function(index, item){
            payerCount++;
            participantCount += parseInt($(this).find('.p_count').text());
        });

    lbl_participantSummary.text(payerCount>0 ? `${payerCount} payers for ${participantCount} participants.` : '');
}

// remove participant table row.
kzzn.util.participantList_removeRow = function (row, table){
    
    row.remove(); //remove row

    let remainingRows = $(table).find('tbody tr');

    if(remainingRows.length === 0)
        $(table).addClass('hidden');

    $.each(remainingRows, function(index, item){
        $(item).children()[0].textContent = index+1
    });

}

/*********************************************************************************************************************************************{ PAYMENTS }******/






/************************************************************************************************************************************************{ RESULT }******/