var kzzn = kzzn || {};
kzzn.payments = kzzn.payments || {};


// show participant payments modal window.
kzzn.payments.editParticipantPayments = function(button) {
    let row = $(button).closest('tr'),
        modal = $('#modal_payments'),
        participant_array = kzzn.data.getAll(),
        participant_multiSelect = $('#modal_payments #multiselect_participant');
        participantName = row.find('[col-for="name"]').text();

    modal.attr('data-modal-for', participantName);

    // empty select list and repopulate it with uptodate values
    participant_multiSelect.empty();
    $.each(participant_array, function (index, participant){
        participant_multiSelect.append(`<option value='${participant.name}'>${participant.name}</option>`);
    });
    participant_multiSelect.bsMultiSelect("UpdateData");

    $('#modal_payments').modal({
        keyboard: false,
        focus: true,
        backdrop: 'static'
    })
}

// triggers after modal finishes loading.
kzzn.payments.modal_loadParticipantData = function(event) {
    let modal = $(event.currentTarget),
        modal_title = modal.find('#modal_title'),
        target_participant = $(event.target).attr('data-modal-for'),
        target_data = kzzn.data.getDataByName(target_participant);

    modal_title.text(`Expenses paid by ${target_participant}`);

    if(target_data.length > 0)
        fillModalData(modal, target_data[0]);
}

// triggers when modal begins to close.
kzzn.payments.modal_updateParticipantData = function(event) {
    let modal = $(event.currentTarget),
        targetName = modal.attr('data-modal-for'),
        sidepot_rows = modal.find('#sidepot_list tbody tr'),
        input_mainpot = modal.find('#payment_mainPot_amount'),
        amount_mainpot = parseInt(input_mainpot.val()),
        sidepots = [];
        
    $.each(sidepot_rows, function(index,sp){
        let sidepot = $(sp),
            amount_sidepot = sidepot.find('span.sp_amount').data('amount'),
            participants_sidepot = sidepot.find('span.sp_participants').data('arrParticipants');

        sidepots.push({amount: amount_sidepot, participants: participants_sidepot});
    });

    let dataToSave = {name:targetName, mainpot:amount_mainpot, sidepots: sidepots};
    
    kzzn.data.save_participantPaymentData(dataToSave);

    
    // clear input and table
    sidepot_rows.remove();
    input_mainpot.val('');
    
    // enable/disable the "SUMMARY"|"CALCULATE" btns if no expenses were specified.
    kzzn.util.setStatus_ActionButtons();
}

// add sidepot info by inputs at modal.
kzzn.payments.addToSidePotTable = function(button) {
    let modal = $(button).closest('#modal_payments'),
        tbody = modal.find('#sidepot_list tbody'),
        sidepot_input_div = modal.find('.div_sidepot'),
        sidepot_amount_input = sidepot_input_div.find('#payment_sidepot_amount'),
        sidepot_amount = parseInt(sidepot_amount_input.val() || 0),
        sidepot_participants_selected_ul = modal.find('.div_sidepot ul.form-control'),
        sidepot_participants_spans = sidepot_participants_selected_ul.find('.badge>span'),
        sidepot_participants_array= [],
        isValid = false;

    // extract participants from input into a string array.
    $.each(sidepot_participants_spans, function (i, span) { sidepot_participants_array.push(span.textContent) });
    
    dataObj = {amount: sidepot_amount, participants: sidepot_participants_array};

    isValid = kzzn.util.sidepotList_validateRow(dataObj);

    if(isValid){
        kzzn.util.sidepotList_addRow(tbody, dataObj);
        sidepot_amount_input.val(''); //clear amount input
        // bsMultiSelect doesnt allow simple multiselect clearing. might research later.
    }
    else{
        console.log('sidepot info is invalid.');
    }
}

// triggered on trash icon click per sidepot row.
kzzn.payments.removeFromSidePotTable = function(button){
    let removedRow = button.closest('tr'),
        table = removedRow.closest('table');

    kzzn.util.sidePotList_removeRow(removedRow, table);
}

// fill payment data (mainpot, sidepot table) by saved data.
function fillModalData(modal, targetData){
    let input_mainpot = modal.find('#payment_mainPot_amount'),
        tbody = modal.find('#sidepot_list tbody');

    input_mainpot.val(targetData.mainpot); // mainpot amount

    // fill sidepot table.
    $.each(targetData.sidepots, function(i, sp){ 
        kzzn.util.sidepotList_addRow(tbody, {amount: sp.amount,participants: sp.participants});
    })

}


