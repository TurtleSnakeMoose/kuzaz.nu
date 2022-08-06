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

kzzn.calc.FINAL_TRANSACTION_LIST = []

kzzn.calc.calculate = function(data){

    kzzn.util.log('RAW DATA', data);

    let mainpot_transactions = calculateMainPotTransactions(data), // first calculate the transactions regarding the mainpot expenses.
        sidepot_transactions = calculateSidePotTransactions(data), // second, calculate the transactions regarding the sidepot expenses.
        merged_transactions = mergeTransactions(mainpot_transactions, sidepot_transactions), // third, merge the mainpot transaction list with the sidepot transaction list.
        optimized_transactions = optimizeTransactions(merged_transactions); // optimize the transactions by merging transactions that share the same "payer" and "payee".
    
    fixCircularTransactions(optimized_transactions); // finally, check and fix redundant "cercular" transactions: (a => b, b =>c) = (a => c).
    return optimizeTransactions(kzzn.calc.FINAL_TRANSACTION_LIST);
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

    kzzn.util.log('SIDEPOT TRANSACTIONS', transactions);
    return transactions;
}

// third, merge the mainpot transaction array with the sidepot transaction array.
function mergeTransactions(array_a, array_b) {
    let arr_merged = array_a.concat(array_b)
    kzzn.util.log('MERGED TRANSACTIONS', arr_merged);
    return arr_merged;
}

// optimize the transactions by merging transactions that share the same "payer" and "payee"
function optimizeTransactions(transactions_unoptimized) {
    let optimizable = [], // array of intersecting/matching transactions.
        optimizable_groups = [], // array of optimizable transaction.
        transactions_optimized = []; // final array of optimized transactions.

    // ### FIRST STEP ####
    // find and push all transactions with matching\intesecting participants (a => b OR b => a) into an array (optimizable).
    // finally, push these arrays into another array (optimizable_groups) for merging (SECOND STEP).
    // transactions without a match will be pushed into optimizable_groups by themselves.
    $.each(transactions_unoptimized, function (i, t_A) { 

        // skip is a flag for transactions that were checked for already, prevents duplicates.
        if (t_A.skip)
            return;
        t_A.skip = true;

        optimizable.push(t_A);

        $.each(transactions_unoptimized.filter(t => !t.skip), function (i, t_B) { 
            if ((t_A.from === t_B.from || t_A.from === t_B.to) && (t_A.to === t_B.from || t_A.to === t_B.to)) {
                t_B.skip = true;
                optimizable.push(t_B);
            }     
        });
        
        optimizable_groups.push(optimizable);
        optimizable = [];
    });

    // ### SECOND STEP ####
    // run through each group of optimizable transactions,
    // if group contains 1 transaction, it is considered optimized and is pushed to transactions_optimized array.
    // if group contains multiple transactions, merge them into one calculated transaction and push it into transactions_optimized.
    $.each(optimizable_groups, function (i, group) { 

        // if optimizable group contains only one transaction - push it to optimized array.
        if (group.length === 1) 
            transactions_optimized.push(group[0]); // push the first(and only) transaction in the group to the optimized array

        // if optimizable group contains multiple transactins, merge them and push the result to the optimized array.
        else {
            var participant_a = { name: group[0].from, amount: 0},
                participant_b = { name: group[0].to, amount: 0};

            // accumulate the total of each participant in the group, to later compare the totals
            $.map(group, x => {
                x.from == participant_a.name ? participant_a.amount += x.total : participant_b.amount += x.total;
            })

            transactions_optimized.push(
                participant_a.amount >= participant_b.amount 
                ?
                    // if participant_a's 'amount' is larger, push a merged transaction (a => b => a.amount - b.amount)
                    new kzzn.calc.Transaction({
                        From:  participant_a.name,
                        To: participant_b.name,
                        Total: participant_a.amount - participant_b.amount
                    })
                :
                    // if participant_b's 'amount' is larger, push a merged transaction (b => a => b.amount - a.amount)
                    new kzzn.calc.Transaction({
                        From:  participant_b.name,
                        To: participant_a.name,
                        Total: participant_b.amount - participant_a.amount
                    })
            );
        }
    });

    // return optimized and sorted array of transactions.
    return transactions_optimized.sort((a, b) => a.from.localeCompare(b.from));
}

function fixCircularTransactions (transaction_list) {
    
    kzzn.calc.FINAL_TRANSACTION_LIST = transaction_list
    let new_trans_list = transaction_list
    let has_circular = false
    
    for (let i = 0; i < new_trans_list.length; i++) {

        const source_transaction = new_trans_list[i]
        const source_total = source_transaction.total
        new_trans_list[i].skip = false // set skip to false - used later when optimizing transactions

        for (let j = 0; j < new_trans_list.length; j++) {
            
            const dest_transaction = new_trans_list[j]
            const dest_total = dest_transaction.total

            // if cicular transaction (a => b) + (b => c)
            if(i !== j && source_transaction.to === dest_transaction.from) {
                // add a new transaction (a => c)
                new_trans_list.push(new kzzn.calc.Transaction({
                    From: source_transaction.from, 
                    To: dest_transaction.to, 
                    Total: source_total >= dest_total ? dest_total : source_total, 
                    Skip: false
                }));
                // adjust transaction amounts for both (a => b) and (b => c)
                new_trans_list[i].total = source_total >= dest_total ? source_total - dest_total : 0;
                new_trans_list[j].total = source_total >= dest_total ? 0 : dest_total - source_total;

                // set flag to true - to break out of the loop and re-run this func.
                has_circular = true
                kzzn.util.log('FOUND CIRCULAR TRANSACTION', `(${source_transaction.from} ==${source_total}=> ${source_transaction.to}) + (${dest_transaction.from} ==${dest_total}=> ${dest_transaction.to}) = (${source_transaction.from} ==${source_transaction.total}=> ${source_transaction.to}) + (${dest_transaction.from} ==${dest_transaction.total}=> ${dest_transaction.to}) + (${source_transaction.from} ==${source_total >= dest_total ? dest_total : source_total}=> ${dest_transaction.to})`)
                break;
            }
        }
        if (has_circular) break;
    }

    /**
     * if circular transaction found in this recursive iteration - run anouther iteration with "new" transaction list.
     * if not - break out of recursive function.
     */
    if (has_circular) {
        kzzn.calc.FINAL_TRANSACTION_LIST = new_trans_list.filter(x => x.total > 0)
        fixCircularTransactions(kzzn.calc.FINAL_TRANSACTION_LIST)
    } else {
        return
    }
}