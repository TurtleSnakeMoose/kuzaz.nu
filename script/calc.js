var kzzn = kzzn || {};
kzzn.calc = kzzn.calc || {};

kzzn.calc.MainPotParticipantBalance = function (obj) {
    this.name = obj.Name || '';
    this.balance = obj.Balance || 0;
}

kzzn.calc.calculate = function(data){
    let mainpot_transactions = calculateMainPotTransactions(data); // first calculate the transactions regarding the mainpot expenses.
       // sidepot_transactions = calculateSidePotTransactions(data), // second, calculate the transactions regarding the sidepot expenses.
       // merged_transactions = mergeTransactions(mainpot_transactions, sidepot_transactions), // third, merge the mainpot transaction list with the sidepot transaction list.
       // optimized_transactions = optimizeTransactions(merged_transactions); // finally, optimize the transactions by merging transactions that share the same "payer" and "payee".

    // return optimized_transactions;
    return mainpot_transactions;
}

// first, calculate the transactions regarding the mainpot expenses
function calculateMainPotTransactions(data) {
    let mainpot_sum = data.reduce((total, current) => total + current.mainpot, 0),
        participant_count = data.reduce((total, current) => total + current.count, 0),
        participantShare = Math.round(mainpot_sum / participant_count);
        transactions = [];

    let overpayers = [],
        underpayers = [];
    $.each(data, function (i, participant) { 
        let participantBalance = new kzzn.calc.MainPotParticipantBalance({Name: participant.name, Balance: Math.abs(participant.mainpot - participantShare)});
         if (participant.mainpot > participantShare) 
            overpayers.push(participantBalance);
         if (participant.mainpot < participantShare) 
            underpayers.push(participantBalance);
    });

    underpayers.sort(function(a,b) { return a.balance - b.balance; }); //sort underpayers ascending
    overpayers.sort(function(a,b) { return b.balance - a.balance; }); //sort overpayers descending

    $(overpayers).each(function (i, op){
        $(underpayers).each(function (i, up){
            if(up.balance == 0 || op.balance == 0)
                return;

            if(op.balance - up.balance < 0 ){
                transactions.push({From: up.name, To: op.name, Total: Math.round(op.balance), Skip: false});
                up.balance -= op.balance;
                op.balance = 0;
            }
            else {
                transactions.push({From: up.name, To: op.name, Total: Math.round(up.balance), Skip: false});
                op.balance -= up.balance;
                up.balance = 0;
            }
        });
    });

    return transactions;
}

// second, calculate the transactions regarding the sidepot expenses
function calculateSidePotTransactions(data) {
    
}

// third, merge the mainpot transaction list with the sidepot transaction list.
function mergeTransactions(mainpot_transactions, sidepot_transactions) {
    
}

// finally, optimize the transactions by merging transactions that share the same "payer" and "payee"
function optimizeTransactions(merged_transactions) {
    
}