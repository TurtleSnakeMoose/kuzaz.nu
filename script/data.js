var kzzn = kzzn || {};
kzzn.data = kzzn.data || {};

// object array of hardcoded data, dev QOL
kzzn.data._hardCodedData = [
    {
        name: 'a', // change later to some other name
        data: [{ name: 'Jinji', count: 2, mainpot: 1158, sidepots: [] },
                { name: 'Mini', count: 1, mainpot: 100, sidepots: [{amount: 400, participants: ['Jinji','Igor','Yan','Bomj','Mini','Slava']}, {amount: 200, participants: ['Blecher','Fishkin','Slava','Mini']}] },
                { name: 'Igor', count: 2, mainpot: 424, sidepots: [] },
                { name: 'Yan', count: 2, mainpot: 50, sidepots: [] },
                { name: 'Bomj', count: 2, mainpot: 0, sidepots: [] },
                { name: 'Slava', count: 2, mainpot: 200, sidepots: [{amount: 400, participants: ['Jinji','Mini','Slava','Blecher']}] },
                { name: 'Blecher', count: 1, mainpot: 0, sidepots: [] },
                { name: 'Roi', count: 2, mainpot: 0, sidepots: [] },
                { name: 'Fishkin', count: 2, mainpot: 0, sidepots: [] }
            ]
    },
    {
        name: 'base',
        data: [{}]
    },
    {
        name: 'ashkelon',
        data: [{}]
    }
];

kzzn.data.Participant = function (obj) {
    this.name = obj.Name || '';
    this.count = obj.Count || 1;
    this.mainpot = obj.MainPot || null;
    this.sidepots = obj.SidePots || [];
}

kzzn.data.SidePot = function (obj) {
    this.amount = obj.amount || 0;
    this.participants = obj.participants.split(',') || [];
}

kzzn.data.participants_data = [];

kzzn.data.paymentSummary_plainText = '';
kzzn.data.transactions_plainText = '';


// add a new participant to the participants_data array.
kzzn.data.add_participant = function (data) {
    kzzn.data.participants_data.push(new kzzn.data.Participant(data));
}

// remove a participant from the participants_data array.
kzzn.data.remove_participant = function (name) {
    kzzn.data.participants_data = kzzn.data.participants_data.filter(p => p.name !== name);
}

// update the "Count" property of an existing participant.
kzzn.data.update_participant_repCount = function (data) {
    let target = kzzn.data.participants_data.find(p => p.name === data.name);

    if (target)
        target.count = data.count; 
}

// when "save&close" button is pressed at the paymentModal, save the mainPot and all sidepots in the table.
kzzn.data.save_participantPaymentData = function (data) {
    let target = kzzn.data.participants_data.find(p => p.name === data.name);

    if(target){
        target.mainpot = data.mainpot;
        target.sidepots = kzzn.data.create_array_sidepots(data.sidepots);
    }
}

// create sidepots object array.
kzzn.data.create_array_sidepots = function (sidepots) {
    let result_array = [];
    $.each(sidepots, function (i, sp){
        result_array.push(new kzzn.data.SidePot(sp));
    });
    return result_array;
}

// get all data from participants_data.
kzzn.data.getAll = function () {
    return kzzn.data.participants_data;
}

// get data as a json string.
kzzn.data.Json_getAll = function () {
    return JSON.stringify(kzzn.data.participants_data);
}

// get a specific particpant's data from participants_data.
kzzn.data.getDataByName = function (name) {
    return kzzn.data.participants_data.filter(p => p.name === name);
}

// load data array and participant table with hardcoded data.
kzzn.data.loadHardCodedDataByName = function (tbody, groupName) {
    var hardcoded_list = kzzn.data._hardCodedData.filter(x => x.name === groupName);
    kzzn.data.loadParticipantData(tbody, hardcoded_list[0].data);
}

kzzn.data.loadParticipantData = function(tbody, data){
    $.each(data, function (i, item){

        if(!kzzn.util.participantList_validateRow(tbody, item.name, item.count)) // validate data before adding, skip duplicates.
            return;

        kzzn.util.participantList_addRow(tbody, item.name, item.count);
        kzzn.data.add_participant({Name: item.name, Count: item.count, MainPot: item.mainpot, SidePots: item.sidepots});
    });
}