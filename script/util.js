var kzzn = kzzn || {};
kzzn.util = kzzn.util || {};

// load html contant modals into modal <div> and init onShow + onHide events.
kzzn.util.load_modals = function() {
    let modal_payments = $('#modal_payments'),
        modal_summary = $('#modal_participant_summary'),
        modal_importExport = $('#modal_importExport'),
        modal_result = $('#modal_result');

    modal_payments.load("modal/modal_payments.html");
    modal_payments.on('shown.bs.modal', function (e) { kzzn.payments.modal_loadParticipantData(e); });
    modal_payments.on('hide.bs.modal', function (e) { kzzn.payments.modal_updateParticipantData(e); });

    modal_summary.load("modal/modal_summary.html");
    modal_summary.on('shown.bs.modal', function (e) { kzzn.summary.modal_summary_onshown(e); });
    modal_summary.on('hide.bs.modal', function (e) { kzzn.summary.modal_summary_onClose(e); });

    modal_result.load("modal/modal_result.html");
    modal_result.on('shown.bs.modal', function (e) { kzzn.result.modal_result_onshown(e); })
    modal_result.on('hide.bs.modal', function (e) { kzzn.result.modal_result_onClose(e); })

    modal_importExport.load("modal/modal_importExport.html");
    modal_importExport.on('shown.bs.modal', function (e) { kzzn.importExport.modal_importExport_onshown(e); })
    modal_importExport.on('hide.bs.modal', function (e) { kzzn.importExport.modal_importExport_onClose(e); })
}

// initialize various components.
kzzn.util.initComponents = function () {
    // bootstrap popover
    $('[data-toggle="popover"]').popover();
    
    // bsMultiSelect
    $("#multiselect_participant").bsMultiSelect({
        placeholder: 'Select participants'
    });
    $('.dashboardcode-bsmultiselect').addClass('col-md-10 col-10');

    //bootstrap toast.
    $('.toast').toast();
}

// attach keypress events to various elements.
kzzn.util.attachKeyEvents = function () {
    // add key events to participant inputs
    var participant_inputs = $('#participant_inputs').find('#input_name, #input_count'),
    btn_addParticiapant = $('#participant_inputs').find('.btn_add');
    participant_inputs.on('keyup', function(event) { if (event.keyCode === 13) { btn_addParticiapant.click(); } });
}

/***************************************************************************{ SHARED }******/

kzzn.util.copy_to_clipboard = function (content, clipboard_container) {
    clipboard_container.val(content);
    clipboard_container.select();
    document.execCommand("copy");
    clipboard_container.blur();
}

// enable/disable the "SUMMARY"|"CALCULATE" btns if no expenses were specified.
kzzn.util.setStatus_ActionButtons = function(){
    let btn_summary = $('#btn_summary'),
        btn_calculate = $('#btn_calculate');
    
    btn_summary.removeAttr('disabled');
    btn_calculate.removeAttr('disabled');

    let data = kzzn.data.participants_data,
        mainpot_payers = data.filter(p => p.mainpot > 0),
        sidepot_payers = data.filter(p => p.sidepots.length > 0),
        enable_btns = mainpot_payers.length > 0 || sidepot_payers.length > 0;

    if (!enable_btns) {
        btn_summary.attr('disabled', true);
        btn_calculate.attr('disabled', true);
    }
}

// clear the participant data object and clear the participant table list.
kzzn.util.clearData = function(){
    kzzn.data.participants_data = [];
    kzzn.util.participantList_clear();
}

// check if string is in a correct JSON format.
kzzn.util.isJsonString = function(json_str){
    try {
        JSON.parse(json_str);
    } catch (e) {
        return false;
    }
    return true;
}

kzzn.util.getCurrentLanguage = function() {
    return $('body').data('language');
}
/***************************************************************************{ PARTICIPANTS }******/


// validate participant input before adding to table.
kzzn.util.participantList_validateRow = function (tbody, name, count){
    let participantRows = tbody.find('tr'),
        parsedCount = parseInt(count || 0),
        names = participantRows.find('td[col-for="name"]'),
        isValid = true;
    
        if(name.length <= 0 || parsedCount < 0 || parsedCount > 30)
            isValid = false;
        
        $.each(names, function(index, item){
            if(item.textContent.toLowerCase() === name.toLowerCase())
                isValid = false;
        });

    return isValid;
}

// add table row for particiapnt.
kzzn.util.participantList_addRow = function (tbody, name, count){
    let currentRowCount = tbody.find('tr').length;

    tbody.closest('table').removeClass('hidden');

    tbody.append(`<tr>
                        <td>${currentRowCount+1}</td>
                        <td col-for='name'>${name}</td>
                        <td class='p_count'>
                            <span>${count || 1}</span>
                            &nbsp;
                            <i class="fas fa-plus-circle pointer" onclick="kzzn.participants.alterParticipantCount(this, 'add')"></i>
                            &nbsp;
                            <i class="fas fa-minus-circle pointer" onclick="kzzn.participants.alterParticipantCount(this, 'remove')"></i>
                        </td>
                        <td>
                            <i class="fas fa-shekel-sign pointer" onclick="kzzn.payments.editParticipantPayments(this)" title='Edit payments'></i>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <i class="fas fa-trash pointer" onclick="kzzn.participants.removeParticipant(this)" title='Remove participant'></i>
                        </td>
                    </tr>`);
}

// remove participant table row.
kzzn.util.participantList_removeRow = function (row, table){
    
    row.remove(); //remove row

    let remainingRows = $(table).find('tbody tr');

    if(remainingRows.length === 0)
        $(table).addClass('hidden');

    $.each(remainingRows, function(index, item){
        $(item).children()[0].textContent = index+1
    });

}

// count payers \ participant and show the result at the bottom.
kzzn.util.participantList_summarize = function (table){
    var lbl_participantSummary = $('#participant_summary label'),
        payersRows = $(table).find('tbody tr'),
        payerCount = 0,
        participantCount = 0,
        currentLanguage = kzzn.util.getCurrentLanguage();

        $.each(payersRows, function(index, item){
            payerCount++;
            participantCount += parseInt($(this).find('.p_count').text());
        });

    if (currentLanguage === 'hebrew') 
        lbl_participantSummary.text(payerCount>0 ? `${payerCount} משלמים עבור ${participantCount} משתתפים.` : '');
        
    else if (currentLanguage === 'english') 
        lbl_participantSummary.text(payerCount>0 ? `${payerCount} payers for ${participantCount} participants.` : '');
}

// remove participant table row.
kzzn.util.participantList_removeRow = function (row, table){
    
    row.remove(); //remove row

    let remainingRows = $(table).find('tbody tr');

    if(remainingRows.length === 0)
        $(table).addClass('hidden');

    $.each(remainingRows, function(index, item){
        $(item).children()[0].textContent = index+1;
    });

}

// clear the participant list and the list summary.
kzzn.util.participantList_clear = function (){
    let table = $('#participant_list table');

    table.find('tbody').empty();
    kzzn.util.participantList_summarize(table);
}
/*******************************************************************************{ PAYMENTS }******/

// validate sidepot inputs.
kzzn.util.sidepotList_validateRow = function (sidepot_inputs){
    return sidepot_inputs.amount <= 0 || sidepot_inputs.participants.length < 1 ? false : true;
}

// add table row for participant sidepot list.
kzzn.util.sidepotList_addRow = function (tbody, data){

    let currentRowCount = tbody.find('tr').length,
        str_participants = data.participants.join(' | ');

    tbody.append(`<tr>
                        <td>
                            <span data-rowCount='${currentRowCount+1}'>${currentRowCount+1}</span>.
                        </td>
                        <td>
                            <span class='sp_amount' data-amount='${data.amount}'>${data.amount}</span>
                        </td>
                        <td>
                            <span class='sp_participants' data-arr-participants="${data.participants}">${str_participants}</span>
                        </td>
                        <td>
                            <i class="fas fa-trash pointer" onclick="kzzn.payments.removeFromSidePotTable(this)" title='Remove sidepot'></i>
                        </td>
                    </tr>`);
}

// remove sidepot table row.
kzzn.util.sidePotList_removeRow = function (row, table){
    row.remove(); //remove row

    let remainingRows = $(table).find('tbody tr');

    $.each(remainingRows, function(index, item){
        $(item).find('span[data-rowCount]').text(index+1);
    });

}

/*********************************************************************************{ SUMMARY }******/

kzzn.util.buildSummaryAsText = function (data){
    let str_result = '',
        currentLanguage = kzzn.util.getCurrentLanguage(),
        mainpot_payers = data.filter(p => p.mainpot > 0),
        sidepot_payers = data.filter(p => p.sidepots.length > 0),
        payer_count = data.length,
        participant_count = data.reduce((total, current) => total + current.count, 0),
        mainpot_sum = data.reduce((total, current) => total + current.mainpot, 0);

    if (mainpot_payers.length > 0) {

        if (currentLanguage === 'english')
            str_result += `*----{ MAIN POT }----*\r\n\r\n`;
        else if (currentLanguage === 'hebrew')
            str_result += `*----{ קופה ראשית }----*\r\n\r\n`;

        $.each(mainpot_payers, function (i, payer) { 
            if (currentLanguage === 'english')
                str_result += `*${payer.name}* paid *${payer.mainpot}*\r\n`;
            else if (currentLanguage === 'hebrew')
                    str_result += `*${payer.name}* שילם *${payer.mainpot}*\r\n`;
        });

        if (currentLanguage === 'english')
            str_result += `\r\nOverall a sum of *${mainpot_sum}* was collected by *${payer_count} payers* for the mainpot.\r\nThis amount is to be split evenly between *${participant_count} participants*\r\n,Which comes to *${Math.round(mainpot_sum/participant_count)}* each.\r\n\r\n`;        
        else if (currentLanguage === 'hebrew')
            str_result += `\r\nסה"כ *${mainpot_sum}* שולם ע"י *${payer_count} משתתפים* לקופה הראשית.\r\nהסכום הזה מחולק בין *${participant_count} משתתפים*\r\n,מה שמביא אותנו ל *${Math.round(mainpot_sum/participant_count)}* כל אחד.\r\n\r\n`;        
    }

    if (sidepot_payers.length > 0) {

        if (currentLanguage === 'english')
            str_result += `*----{ SIDE POTS }----*\r\n\r\n`;
        else if (currentLanguage === 'hebrew')
            str_result += `*----{קופות צדדיות }----*\r\n\r\n`;

        $.each(sidepot_payers, function (i, payer) { 
            $.each(payer.sidepots, function (i, sidepot) { 
                if (currentLanguage === 'english')
                    str_result += `*${payer.name}* paid *${sidepot.amount}* for:\r\n*${sidepot.participants.join(', ')}*.\r\nWhich comes to *${Math.round(sidepot.amount/sidepot.participants.length)} each*.\r\n\r\n`;
                else if (currentLanguage === 'hebrew')
                    str_result += `*${payer.name}* שילמ/ה *${sidepot.amount}* עבור:\r\n*${sidepot.participants.join(', ')}*.\r\nמה שמביא אותם ל *${Math.round(sidepot.amount/sidepot.participants.length)} כל אחד*.\r\n\r\n`;
            });
        });    
    }

    return str_result;
}

/*********************************************************************************{ RESULT }******/

kzzn.util.log = function(title, data) {
    console.log(`~~~~~~~~~~~ {${title}} ~~~~~~~~~~~`);
    console.table(data);
}

kzzn.util.buildTable_result = function (arr_transaction) { 
    let tableRows = '';
    $.each(arr_transaction, function (i, transaction) { 
         tableRows += `<tr> 
                            <td class='ten-p'> ${i+1}. </td>
                            <td class='thirty-p'> <span class='bold'>${transaction.from} </span> <i class="fas fa-arrow-right"></i> </td>
                            <td class='thirty-p'> <span class='bold'>${transaction.to} </span> <i class="fas fa-hand-holding-usd"></i> </td>
                            <td class='thirty-p'> <span class='bold'>${transaction.total} </span> </td>
                       </tr>`;
    });
    return tableRows;
}

kzzn.util.buildTransactionsAsText = function (arr_transactions){
    let str_result = '';
        currentLanguage = kzzn.util.getCurrentLanguage(),
        arr_groupedByPayer = arr_transactions.reduce((r, a) => { // group transactions by payer.
            r[a.from] = [...r[a.from] || [], a];
            return r;
        }, {});

    if (currentLanguage === 'english')
        str_result += `*----{ RESULT TRANSACTIONS }----*\r\n\r\n`;
    else if (currentLanguage === 'hebrew')
        str_result += `*----{ טבלת התקזזות }----*\r\n\r\n`;

    $.each(arr_groupedByPayer, function (i, group) { 
        var payer = group[0].from;

        if (currentLanguage === 'english')
            str_result += `_*${payer}*_ should pay:\r\n`;
        else if (currentLanguage === 'hebrew')
            str_result += `_*${payer}*_ אמור לשלם ל:\r\n`;

        $.each(group, function (i, transaction) { 
            str_result += `         *${transaction.total}* --> *${transaction.to}*\r\n`;
        });
        str_result += `--------------\r\n`;
    });

    return str_result;
}

