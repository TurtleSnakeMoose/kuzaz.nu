var kzzn = kzzn || {};
kzzn.participants = kzzn.participants || {};

// triggered on the "+" icon when adding participant.
kzzn.participants.addParticipant = function(button) {
    let input_name = $(button).siblings('#input_name'),
        input_count = $(button).siblings('#input_count'),
        hardcoded_groups = kzzn.data._hardCodedData.map(a => a.name),
        name = $.trim(input_name.val()),
        count = input_count.val() || 1,
        tbody = $('#participant_list tbody'),
        table = tbody.closest('table'),
        isValid = kzzn.util.participantList_validateRow(tbody, name, count); // validate inputs 

    // load hardcoded participant list by input name.
    if(hardcoded_groups.includes(name)) {
        kzzn.data.loadHardCodedDataByName(tbody, name);
        kzzn.util.participantList_summarize(table);
        input_name.val('').focus();

        // enable/disable the "SUMMARY"|"CALCULATE" btns if no expenses were specified.
        kzzn.util.setStatus_ActionButtons();
        return;
    }

    if(isValid){
        kzzn.data.add_participant({Name: name, Count: count});
        kzzn.util.participantList_addRow(tbody, name, count); // add row if valid
        input_name.val('').focus();
        kzzn.util.participantList_summarize(table);

        // enable/disable the "SUMMARY"|"CALCULATE" btns if no expenses were specified.
        kzzn.util.setStatus_ActionButtons();
    }
    else{
        console.log('participant invalid');
    }
}

// triggered on trash icon click per participant row.
kzzn.participants.removeParticipant = function(button){
    let removedRow = button.closest('tr'),
        participantName = $(removedRow).find('td[col-for]').text(),
        table = removedRow.closest('table');

    kzzn.util.participantList_removeRow(removedRow, table);
    kzzn.data.remove_participant(participantName)
    kzzn.util.participantList_summarize(table);

    // enable/disable the "SUMMARY"|"CALCULATE" btns if no expenses were specified.
    kzzn.util.setStatus_ActionButtons();
}

// triggered on "+"\"-" icon click on participant count.
kzzn.participants.alterParticipantCount = function(button, action){
    let row = $(button).closest('tr'),
        table = row.closest('table'),
        participantName = row.find('td[col-for]').text(),
        span_count = row.find('.p_count span'),
        currentCount = parseInt(span_count.text()),
        newCount = action === 'add' ? ++currentCount : --currentCount;
    
    if(newCount < 1 || newCount > 29)
        return;

    span_count.text(newCount.toString());
    kzzn.data.update_participant_repCount({name: participantName, count: newCount}); //update data array.
    kzzn.util.participantList_summarize(table);
}



