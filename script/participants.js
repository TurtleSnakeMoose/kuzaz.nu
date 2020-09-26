var kzzn = kzzn || {};
kzzn.participants = kzzn.participants || {};

kzzn.participants._hardCodedData = [
    {
        Name: 'Jinji',
        Count: 1
    },
    {
        Name: 'Mini',
        Count: 1
    },
    {
        Name: 'Igor',
        Count: 1
    },
    {
        Name: 'Bomj',
        Count: 1
    },
    {
        Name: 'Yan',
        Count: 1
    },
    {
        Name: 'Roi',
        Count: 1
    },
    {
        Name: 'Slava',
        Count: 1
    },
    {
        Name: 'Fishkin',
        Count: 1
    },
    {
        Name: 'Vova',
        Count: 1
    },
    {
        Name: 'Blecher',
        Count: 1
    },
    {
        Name: 'Yafim',
        Count: 2
    },
    {
        Name: 'Eli',
        Count: 2
    }
];

// triggered on the "+" icon when adding participant.
kzzn.participants.addParticipant = function(button) {
    let input_name = $(button).siblings('#input_name'),
        input_count = $(button).siblings('#input_count'),
        name = $.trim(input_name.val()),
        count = input_count.val(),
        tbody = $('#participant_list tbody'),
        table = tbody.closest('table'),
        isValid = kzzn.util.participantList_validateRow(tbody, name, count); // validate inputs 

    //HARDCODED DATA - TOREMOVE
    if(name === "a") {
        $.each(kzzn.participants._hardCodedData, function (index, item){
            kzzn.util.participantList_addRow(tbody, item.Name, item.Count);
        })
        input_name.val('').focus();
        kzzn.util.participantList_summarize(table);
        return;
    }

    if(isValid){
        kzzn.util.participantList_addRow(tbody, name, count); // add row if valid
        input_name.val('').focus();
        kzzn.util.participantList_summarize(table);
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


// triggered on "+"\"-" icon click on participant count.
kzzn.participants.alterParticipantCount = function(button, action){
    let row = $(button).closest('tr'),
        table = row.closest('table'),
        span_count = row.find('.p_count span'),
        currentCount = parseInt(span_count.text()),
        newCount = action === 'add' ? ++currentCount : --currentCount;
    
    if(newCount < 1 || newCount > 29)
        return;

    span_count.text(newCount.toString());

    kzzn.util.participantList_summarize(table);
}


