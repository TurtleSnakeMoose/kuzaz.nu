var kzzn = kzzn || {};
kzzn.calc = kzzn.calc || {};

kzzn.calc.MainPotParticipantBalance = function (obj) {
    this.name = obj.Name || '';
    this.count = obj.Count || 0;
    this.balance = obj.Balance || 0;
}

kzzn.calc.Transaction = function (obj) {
    this.from = obj.From || '';
    this.to = obj.To || '';
    this.total = obj.Total || 0;
    this.skip = obj.Skip || false;
}

kzzn.calc.calculate = function(data){
    // LOG - display raw data in console
    kzzn.util.log('RAW DATA', data);
    let mainpot_transactions = calculateMainPotTransactions(data), // first calculate the transactions regarding the mainpot expenses.
        sidepot_transactions = calculateSidePotTransactions(data); // second, calculate the transactions regarding the sidepot expenses.
       // merged_transactions = mergeTransactions(mainpot_transactions, sidepot_transactions), // third, merge the mainpot transaction list with the sidepot transaction list.
       // optimized_transactions = optimizeTransactions(merged_transactions); // finally, optimize the transactions by merging transactions that share the same "payer" and "payee".

    // return optimized_transactions;
    return sidepot_transactions;
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
    kzzn.util.log('MAINPOT UNDERPAYERS', underpayers);
    overpayers.sort(function(a,b) { return b.balance - a.balance; }); //sort overpayers descending
    kzzn.util.log('MAINPOT OVERPAYERS', overpayers);

    $(overpayers).each(function (i, op){
        $(underpayers).each(function (i, up){
            let transaction_item = {};
            // return if either overpayer or underpayer is no longer in debt\credit.
            if(up.balance === 0 || op.balance === 0)
                return;
            
            // if current underpayer's debt is larger than the current overpayer's balance.
            if(op.balance - up.balance < 0 ){
                // transaction: from current underpayer to current overpayer, the remainder of the current overpayer balance.
                transaction_item = new kzzn.calc.Transaction({From: up.name, To: op.name, Total: Math.round(op.balance)});
                transactions.push(transaction_item);

                // subtract the current overpayer's balance from the current overpayer balance.
                up.balance -= op.balance;
                // nullify the overpayer balance.
                op.balance = 0;
            }

            // if current underpayer's debt completely covers the overpayer's remaining balance. 
            else {
                // transaction: from current underpayer to current overpayer, the current underpayer balance.
                transaction_item = new kzzn.calc.Transaction({From: up.name, To: op.name, Total: Math.round(up.balance)})
                transactions.push(transaction_item);

                // subtract the current overpayer's balance from the current overpayer balance.
                op.balance -= up.balance;
                // nullify the overpayer balance.
                up.balance = 0;
            }
        });
    });

    kzzn.util.log('MAINPOT TRANSACTIONS', transactions);
    return transactions;
}

// second, calculate and optimize the transactions regarding the sidepot expenses
function calculateSidePotTransactions(data) {
    let sidepot_payers = data.filter(x => x.sidepots.length > 0);
        transactions = [],
        transactions_optimized = [];

    $.each(sidepot_payers, function (i, participant) { 
         $.each(participant.sidepots , function (i, sidepot) { 
            let participant_name = participant.name,
                sidepot_amount = sidepot.amount,
                sidepot_participants = sidepot.participants,
                sidepot_share = Math.round(sidepot_amount / sidepot_participants.length),
                transaction_item = {};

                $.each(sidepot_participants, function (i, sidepot_participant) { 

                    // ignore cases where sidepot payer is also the sidepot participant.
                    if (sidepot_participant === participant_name) 
                        return;

                    transaction_item = new kzzn.calc.Transaction({From: sidepot_participant, To: participant_name ,Total: sidepot_share});
                    transactions.push(transaction_item);
                });
         });
    });

    transactions_optimized = optimizeTransactions(transactions);
    kzzn.util.log('SIDEPOT UNOPTIMIZED', transactions);
    kzzn.util.log('SIDEPOT OPTIMIZED', transactions_optimized);
    return transactions_optimized;
}

// third, merge the mainpot transaction list with the sidepot transaction list.
function mergeTransactions(mainpot_transactions, sidepot_transactions) {
    
}

// optimize the transactions by merging transactions that share the same "payer" and "payee"
function optimizeTransactions(transactions_unoptimized) {
    let non_optimizable = [],
        optimizable = [],
        transactions_optimized = [];

    $.each(transactions_unoptimized, function (i, unoptimized_t) { 

        if (unoptimized_t.skip)
            return;
        unoptimized_t.skip = true;

        

    });


    return transactions_optimized;
}