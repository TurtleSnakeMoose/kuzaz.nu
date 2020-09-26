var kzzn = kzzn || {};
kzzn.payments = kzzn.payments || {};

// kzzn.payments.dataByParticipant = [];
kzzn.payments.dataByParticipant = [
    {
        Name: 'Misha',
        PaidMainPot: 300,
        SidePots:[
            {
                Paid:200,
                Participants: ['cyka','blyat']
            }
        ]
    }
];

// show participant payments modal window.
kzzn.payments.editParticipantPayments = function(button) {
    let row = $(button).closest('tr'),
        modal = $('#modal_payments'),
        participantName = row.find('[col-for="name"]').text();

    modal.attr('data-modal-for', participantName);
        
    $('#modal_payments').modal({
        keyboard: true,
        focus: true,
        backdrop: 'static'
    })
}

kzzn.payments.modal_loadParticipantData = function(event) {
    let modal = $(event.currentTarget),
        modal_title = modal.find('#modal_title'),
        target_participant = $(event.target).attr('data-modal-for'),
        target_data = kzzn.payments.dataByParticipant.filter(p => p.Name === target_participant);
    
    modal_title.text(`Expenses paid by ${target_participant}`);

    if(target_data.length > 0){
        debugger;
    }
}

kzzn.payments.modal_updateParticipantData = function(event) {
    //
}


