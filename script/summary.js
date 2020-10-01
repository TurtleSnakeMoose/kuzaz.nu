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
    let modal = e.target,
        data = kzzn.data.getAll(),
        participant_count = 0,
        mainpot_sum = 0,
        mainpot_contributors = [],
        sidepot_contributors = [],
        summaryData = {};

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
    display_sidepots_info(modal, summaryData);
}

// triggers on modal close for summary modal
kzzn.summary.modal_summary_onClose = function (e) {
    let modal = e.target,
        div_summary = $(modal).find('#summary_mainpot'),
        ul_contribs = div_summary.find('#ul_mainpot_contrib'),
        span_calc_summary = div_summary.find('#mainpot_calc_summary'),
        span_multipayer_explain = div_summary.find('#mainpot_multipayer_explain'),
        ul_multipayers = div_summary.find('#ul_mainpot_multipayer');

    // clear texts and lists.
    ul_contribs.empty();
    ul_multipayers.empty();
    span_calc_summary.text(''),
    span_multipayer_explain.text('')
}

// fill the summary modal's mainpot section with all mainpot info
function display_mainpot_info(modal, mainpot_data){
    let div_summary = $(modal).find('#summary_mainpot'),
        ul_contribs = div_summary.find('#ul_mainpot_contrib'),
        span_calc_summary = div_summary.find('#mainpot_calc_summary'),
        span_multipayer_explain = div_summary.find('#mainpot_multipayer_explain'),
        ul_multipayers = div_summary.find('#ul_mainpot_multipayer');

    let amount_per_participant = Math.round(mainpot_data.mainpot_sum / mainpot_data.pCount),
        multipayers = [];

    $.each(mainpot_data.mainpot_contribs, function(i, contributor){

        ul_contribs.append(`<li>${contributor.name} has contributed ${contributor.mainpot} to the main pot.</li>`);

        if(contributor.count > 1)
            multipayers.push({name: contributor.name, amount: contributor.count * amount_per_participant});
    });
    debugger;
    span_multipayer_explain.text(`${multipayers.length} participants that are paying for multiple participants.`);
    
    span_calc_summary.text(`${mainpot_data.mainpot_contribs.length} participants have contributed a total of ${mainpot_data.mainpot_sum}.<br>Split evenly between ${mainpot_data.pCount} participants is ${amount_per_participant}.`);
    
    $.each(multipayers, function(i, multipayer){
        ul_multipayers.append(`<li>${multipayer.name}: ${multipayer.amount}.</li>`);
    });

}

// fill the summary modal's sidepot section with all sidepot info
function display_sidepots_info(modal, sidepot_contributors){
    //
}