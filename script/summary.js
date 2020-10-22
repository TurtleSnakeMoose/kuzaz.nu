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
        btn_whatsapp = modal.find('.fa-whatsapp');

    display_mainpot_info(modal, data);
    display_sidepots_info(modal, data);

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
    let clipboard_container = $('#summary_clipboard_container');
    kzzn.util.copy_to_clipboard(kzzn.data.paymentSummary_plainText, clipboard_container);
    $('#div_toast_summary').toast('show');
}

// fill the summary modal's mainpot section with all mainpot info
function display_mainpot_info(modal, data){
    let div_summary = $(modal).find('#summary_mainpot'),
        ul_contribs = div_summary.find('#ul_mainpot_contrib'),
        div_calc_summary = div_summary.find('#mainpot_calc_summary'),
        div_multipayer_explain = div_summary.find('#mainpot_multipayer_explain'),
        ul_multipayers = div_summary.find('#ul_mainpot_multipayer');

    let mainpot_sum = data.reduce((total, current) => total + current.mainpot, 0),
        mainpot_contribs = data.filter(x => x.mainpot > 0),
        pCount = data.reduce((total, current) => total + current.count, 0),
        amount_per_participant = Math.round(mainpot_sum / pCount),
        multipayers = [];

    $.each(data, function(i, participant){

        ul_contribs.append(participant.mainpot > 0 ? `<li><strong>${participant.name}</strong> has contributed <strong>${participant.mainpot}</strong> to the main pot.</li>` : '');

        if(participant.count > 1)
            multipayers.push({name: participant.name, amount: participant.count * amount_per_participant});
    });

    div_calc_summary.append(`<strong>${mainpot_contribs.length} participants</strong> have contributed a total of <strong>${mainpot_sum}</strong> to the mainpot.<br>
                              Split evenly between <strong>${pCount} participants</strong> is <strong>${amount_per_participant}</strong>.`);
    
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