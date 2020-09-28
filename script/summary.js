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
    let data = kzzn.data.getAll(),
        participant_count = 0,
        payer_count = 0,
        mainpot_contributors = [],
        mainpot_sum = 0,
        sidepot_contributors = [];

    $.each(data, function(index, payer){
        payer_count++;
        participant_count += payer.count;

        if(payer.mainpot > 0){
            mainpot_sum += payer.mainpot;
            mainpot_contributors.push(payer);
        }

        if(payer.sidepots.length > 0)
            sidepot_contributors.push(payer);
    });

    display_mainpot_info(e.target, participant_count, mainpot_contributors, mainpot_sum);
    display_sidepots_info(e.target, sidepot_contributors);
}

// triggers on modal close for summary modal
kzzn.summary.modal_summary_onClose = function (e) {
    //
}

function display_mainpot_info(modal, participant_count, mainpot_contributors, mainpot_sum){
    let div_mainpot_summary = $(modal).find('#summary_mainpot'),
        ul_mainpot_contrib = div_mainpot_summary.find('#ul_mainpot_contrib'),
        span_mainpot_calc_summary = div_mainpot_summary.find('#mainpot_calc_summary'),
        span_multipayer_explain = div_mainpot_summary.find('#mainpot_multipayer_explain'),
        ul_mainpot_multipayer = div_mainpot_summary.find('#ul_mainpot_multipayer');

    let amount_per_participant = mainpot_sum / participant_count,
        multipayer = [];

    $.each(mainpot_contributors, function(i, contributor){
        ul_mainpot_contrib.append(`<li>${contributor.name} has contributed ${contributor.mainpot} to the main pot.</li>`);
        if(contributor.count > 1){
            multipayer.push({name: contributor.name, amount: contributor.count * amount_per_participant});
            span_multipayer_explain.text(`${multipayer.length} participants that are paying for multiple participants.`)
        }
    });

    span_mainpot_calc_summary.text(`${mainpot_contributors.length} participants have contributed a total of ${mainpot_sum}. \n Split evenly between ${participant_count} participants is ${amount_per_participant}.`);
    
    $.each(multipayer, function(i, payer){
        ul_mainpot_multipayer.append(`<li>${payer.name}: ${payer.amount}.</li>`);
    });

    debugger;
}

function display_sidepots_info(modal, sidepot_contributors){
    //
}
