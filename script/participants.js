var kzzn = kzzn || {};
kzzn.participants = kzzn.participants || {};

// triggered on the "+" icon when adding participant.
kzzn.participants.addParticipant = function(button) {
    let input_name = $(button).siblings('#input_name'),
        input_count = $(button).siblings('#input_count'),
        name = $.trim(input_name.val()),
        count = input_count.val(),
        tbody = $('#participant_list tbody'),
        table = tbody.closest('table'),
        isValid = kzzn.util.participantList_validateRow(tbody, name, count); // validate inputs 

    if(isValid){
        kzzn.util.participantList_addRow(tbody, name, count); // add row if valid
        input_name.val('').focus();
        kzzn.util.participantList_summarize(table)
    }
    else{
        console.log('participant invalid');
    }
}

// triggered on trash icon click per participant row.
kzzn.participants.removeParticipant = function(button){
    let removedRow = button.closest('tr'),
        table = removedRow.closest('table');

    kzzn.util.participantList_removeRow(removedRow, table);
    kzzn.util.participantList_summarize(table);
}