var kzzn = kzzn || {};
kzzn.data = kzzn.data || {};

// object array of hardcoded data, dev QOL
kzzn.data._hardCodedData = [
    {
        name: 'a', // change later to some other name
        data: [{ Name: 'Jinji', Count: 1 },
                { Name: 'Mini', Count: 1 },
                { Name: 'Igor', Count: 1 },
                { Name: 'Bomj', Count: 1 },
                { Name: 'Eli', Count: 1 },
                { Name: 'Slava', Count: 1 },
                { Name: 'Blecher', Count: 1 },
                { Name: 'Roi', Count: 1 },
                { Name: 'Fishkin', Count: 1 },
                { Name: 'Yan', Count: 1 },
                { Name: 'Yafim', Count: 1 },
                { Name: 'Vova', Count: 1 }]
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
    this.mainpot = obj.MainPot || 0;
    this.sidepots = [];
}

kzzn.data.SidePot = function (obj) {
    this.amount = obj.amount || 0;
    this.participants = obj.participants.split(',') || [];
}

kzzn.data.participants_data = [];


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

// get a specific particpant's data from participants_data.
kzzn.data.getDataByName = function (name) {
    return kzzn.data.participants_data.filter(p => p.name === name);
}

// load data array and participant table with hardcoded data.
kzzn.data.loadHardCodedDataByName = function (tbody, groupName) {
    var hardcoded_list = kzzn.data._hardCodedData.filter(x => x.name === groupName);

    $.each(hardcoded_list[0].data, function (i, item){
        kzzn.util.participantList_addRow(tbody, item.Name, item.Count);
        kzzn.data.add_participant({Name: item.Name, Count: item.Count});
    });
}


