var kzzn = kzzn || {};
kzzn.calc = kzzn.calc || {};

kzzn.calc.MainPotParticipantBalance = function (obj) {
    this.name = obj.Name || '';
    this.count = obj.Count || 0;
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
        let mainpotBalance = new kzzn.calc.MainPotParticipantBalance({Name: participant.name, Balance: Math.abs(participant.mainpot - (participantShare * participant.count))});
        
         if (participant.mainpot > participantShare) 
            overpayers.push(mainpotBalance);

         if (participant.mainpot < participantShare) 
            underpayers.push(mainpotBalance);
    });

    underpayers.sort(function(a,b) { return a.balance - b.balance; }); //sort underpayers ascending
    overpayers.sort(function(a,b) { return b.balance - a.balance; }); //sort overpayers descending

    $(overpayers).each(function (i, op){
        $(underpayers).each(function (i, up){

            // return if either overpayer or underpayer is no longer in debt\credit.
            if(up.balance === 0 || op.balance === 0)
                return;
            
            // if current underpayer's debt is larger than the current overpayer's balance.
            if(op.balance - up.balance < 0 ){
                // transaction: from current underpayer to current overpayer, the remainder of the current overpayer balance.
                transactions.push({From: up.name, To: op.name, Total: Math.round(op.balance), Skip: false});

                // subtract the current overpayer's balance from the current overpayer balance.
                up.balance -= op.balance;
                // nullify the overpayer balance.
                op.balance = 0;
            }

            // if current underpayer's debt completely covers the overpayer's remaining balance. 
            else {
                // transaction: from current underpayer to current overpayer, the current underpayer balance.
                transactions.push({From: up.name, To: op.name, Total: Math.round(up.balance), Skip: false});

                // subtract the current overpayer's balance from the current overpayer balance.
                op.balance -= up.balance;
                // nullify the overpayer balance.
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