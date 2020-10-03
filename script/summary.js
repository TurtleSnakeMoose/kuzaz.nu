var kzzn = kzzn || {};
kzzn.summary = kzzn.summary || {};

// triggers on "summary" button click - opens modal window
kzzn.summary.openSummaryModal = function (e) {
    $('#modal_participant_summary').modal({
        keyboard: true,
        focus: true,
        backdrop: 'static'
    })
}

// triggers on modal show for summary modal
kzzn.summary.modal_summary_onshown = function (e) {
    let modal = $(e.target),
        data = kzzn.data.getAll(),
        participant_count = 0,
        mainpot_sum = 0,
        mainpot_contributors = [],
        sidepot_contributors = [],
        summaryData = {},
        btn_whatsapp = modal.find('.fa-whatsapp');

    $.each(data, function(index, payer){

        participant_count += payer.count;

        if(payer.mainpot > 0){
            mainpot_sum += payer.mainpot;
            mainpot_contributors.push(payer);
        }

        if(payer.sidepots.length > 0)
            sidepot_contributors.push(payer);
    });

    summaryData = {
        pCount: participant_count,
        mainpot_contribs: mainpot_contributors,
        mainpot_sum: mainpot_sum,
        sidepot_contribs: sidepot_contributors
    }

    display_mainpot_info(modal, summaryData);
    display_sidepots_info(modal, summaryData.sidepot_contribs);

    // build summary as formatted string, used for copying to clipboard and sending via whatsapp
    kzzn.data.paymentSummary_plainText = kzzn.util.buildSummaryAsText(data);

    // set the whatsapp api content.
    let whatsapp_content = kzzn.data.paymentSummary_plainText.replaceAll('\r\n', '%0a');
    btn_whatsapp.attr('href',`https://wa.me/?text=${whatsapp_content}`);
}

// triggers on modal close for summary modal
kzzn.summary.modal_summary_onClose = function (e) {

    let modal = e.target,
        div_mainpot = $(modal).find('#summary_mainpot'),
        div_sidepot = $(modal).find('#summary_sidepots');

    let ul_mainpot_contribs = div_mainpot.find('#ul_mainpot_contrib'),
        span_calc_summary = div_mainpot.find('#mainpot_calc_summary'),
        span_multipayer_explain = div_mainpot.find('#mainpot_multipayer_explain'),
        ul_multipayers = div_mainpot.find('#ul_mainpot_multipayer');
    
    let ul_sidepots_contribs = div_sidepot.find('#ul_sidepots_contrib');

    // clear mainpot section
    ul_mainpot_contribs.empty();
    ul_multipayers.empty();
    span_calc_summary.text('');
    span_multipayer_explain.text('');
    
    //clear sidepot section
    ul_sidepots_contribs.empty();
}

// copy the summary text into clipboard
kzzn.summary.copyAsText = function(btn){
    kzzn.util.copy_to_clipboard(kzzn.data.paymentSummary_plainText);
    $('#div_toast_summary').toast('show');
}

// fill the summary modal's mainpot section with all mainpot info
function display_mainpot_info(modal, mainpot_data){
    let div_summary = $(modal).find('#summary_mainpot'),
        ul_contribs = div_summary.find('#ul_mainpot_contrib'),
        div_calc_summary = div_summary.find('#mainpot_calc_summary'),
        div_multipayer_explain = div_summary.find('#mainpot_multipayer_explain'),
        ul_multipayers = div_summary.find('#ul_mainpot_multipayer');
    
    let amount_per_participant = Math.round(mainpot_data.mainpot_sum / mainpot_data.pCount),
        multipayers = [];

    $.each(mainpot_data.mainpot_contribs, function(i, contributor){

        ul_contribs.append(`<li><strong>${contributor.name}</strong> has contributed <strong>${contributor.mainpot}</strong> to the main pot.</li>`);

        if(contributor.count > 1)
            multipayers.push({name: contributor.name, amount: contributor.count * amount_per_participant});
    });

    div_calc_summary.append(`<strong>${mainpot_data.mainpot_contribs.length} participants</strong> have contributed a total of <strong>${mainpot_data.mainpot_sum}</strong> to the mainpot.<br>
                              Split evenly between <strong>${mainpot_data.pCount} participants</strong> is <strong>${amount_per_participant}</strong>.`);
    
    if (multipayers.length > 0) {
        div_multipayer_explain.append(`<strong>${multipayers.length} participants</strong> that are paying for multiple participants. their share is as follows:`);
        $.each(multipayers, function(i, multipayer){
            ul_multipayers.append(`<li><strong>${multipayer.name}</strong> should pay <strong>${multipayer.amount}</strong> to the mainpot.</li>`);
        });
    }
}

// fill the summary modal's sidepot section with all sidepot info
function display_sidepots_info(modal, sidepot_contributors){
    let div_summary = $(modal).find('#summary_sidepots'),
        ul_contribs = div_summary.find('#ul_sidepots_contrib');
    
    $.each(sidepot_contributors, function (i, contributor) { 
        $.each(contributor.sidepots, function (i, sidepot) {
            let amount_per_participant = Math.round(sidepot.amount / sidepot.participants.length);
            ul_contribs.append(`<li><strong>${contributor.name}</strong> has contributed <strong>${sidepot.amount}</strong> to a sidepot for:<br>
                                <strong>${sidepot.participants.join(' , ')}</strong>.<br>
                                which comes to <strong>${amount_per_participant} each</strong>.</li>`);
        });
    });
}