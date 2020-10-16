var kzzn = kzzn || {};
kzzn.txt = kzzn.txt || {};

// quality of life, gather all page text content here instead of looking for it at the page.
var content = {
    participants:{
        additional_info: `  Name all the participants that should be included in the calculation. <br />
                            Duplicate names will not be added.
                            <br />
                            <br />
                            <strong>Incases where a participant is paying for several participants:</strong> <br />
                            Specify the count (including himself) and don't add these people to the list. <br /> 
                            e.g.: <i>If the husband is paying for himself AND his wife, You should only add the husband to the list and put in '2' as the amount.</i><br />
                            <br />
                            <strong> Alter the participant's "Count" or remove him completely if needed,</strong></br>
                            Do so, using the <i class="fas fa-plus-circle"></i>, <i class="fas fa-minus-circle"></i> and <i class="fas fa-trash"></i> icons.</br>
                            <br />
                            <strong> Don't forget to specify each participant's payments - mainpot and/or sidepots.</strong></br>
                            Setup the parcipants's contributions by clicking the <i class="fas fa-shekel-sign"></i> icon.<br />
                            <br />
                            Click on "<strong>SUMMARY</strong>" to show... well... The summary...<br/>
                            <br />
                            Click on "<strong>CALCULATE</strong>", The reason you're here. Calculate the money distribution between participants so everyone breaks even. <br/>`
    },
    payments:{
        additional_info: `  Expenses are split into 2 catagories: "Main pot" and "Side pot".<br />
                            <strong>Main pot:</strong><br />
                            There's only one main pot and it should only include expenses that are shared equally between <strong>ALL</strong> participants.<br />
                            e.g.: <i>vanue rent fee, food, snacks, soft drinks, shared service such as catering or strippers, etc...</i><br/>
                            Leave empty or '0' if there's no contribution to the main pot.<br/>
                            <br />
                            <strong>Side pot:</strong> <br />
                            Create as many side pots as you need.<br />
                            These should only include expenses that are shared equally between <strong>SOME</strong> of the participants.<br/>
                            Specify the sidepot amount and participants, finally push the 'Add to sidepots'.<br/>
                            e.g.: <i>Mike bought the weed, But only Mike,Vova and Slava are weed smokers.
                            In this case, mark this expense as a side pot and select Mike,Vova and Slava as the participants.</i><br/>
                            Remove a side pot by pressing the <i class="fas fa-trash"></i> icon.`
    },
    summary:{
        additional_info: `  <strong>Contributions Summary</strong><br/>
                            Mainpot and sidepot contributions, simplified breakdown.</br>
                            <br/>
                            Pushing <i class="fas fa-copy"></i> will copy this info to clipboard as plain text.<br/>
                            <br/>
                            Pushing <i class="fab fa-whatsapp"></i> will share this info as text straight to <i>whatsApp</i>.`
    },
    result:{
        additional_info: `  <strong>Final results</strong><br/>
                            Transactions were calculated in a way where it does'nt matter who gets paid by who,<br/>
                            As long as everyone breaks even.<br/>
                            <br/>
                            Pushing <i class="fas fa-copy"></i> will copy this table to clipboard as plain text.<br/>
                            <br/>
                            Pushing <i class="fab fa-whatsapp"></i> will share this table as text straight to <i>whatsApp</i>.`
    },
    importExport:{
        additional_info: `  <strong>Import/Export</strong><br/>
                            <br/>
                            <strong>Export</strong><br/>
                            Refreshing kuzaz.nu will reset the data you've worked on,<br/>
                            To continue working on this later or to just review the data at a later time,<br/>
                            Copy the text under "Export" and save it where it's accessible.<br/>
                            <br/>
                            <strong>Imoport</strong><br/>
                            Paste the text you've exported into the textbox under "Import".<br/>
                            If the text is valid, the "IMPORT" button will be enabled.<br/>
                            Press the button and all the data you've started working on will magically reappear.<br/>`
    }
}

// inject text content into page by sections
kzzn.txt.injectText = function () {
    var info_points = $('.additional_info');

    $.each(info_points, function (index, item){
        let info_point = $(this),
            infoFor = info_point.data('for');

        switch(infoFor){
            case 'section_participants':
                info_point.attr('data-content', content.participants.additional_info);
            break;

            case 'modal_payments':
                info_point.attr('data-content', content.payments.additional_info);
            break;

            case 'modal_summary':
                info_point.attr('data-content', content.summary.additional_info);
            break;

            case 'modal_result':
                info_point.attr('data-content', content.result.additional_info);
            break;

            case 'modal_importExport':
                info_point.attr('data-content', content.importExport.additional_info);
            break;
        }
    });
}