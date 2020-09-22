var kzzn = kzzn || {};
kzzn.txt = kzzn.txt || {};

// quality of life, gather all page text content here instead of looking for it at the page.
var content = {
    participants:{
        title:'Add participants',
        additional_info: `Name all the participants that should be included in the calculation. <br />
                            <strong>Incases where a participant is paying for several participants:</strong> 
                            <br /> Specify the count (including himself) and don't add these people to the list.
                            <br /> e.g.: <i>If the husband is paying for himself AND his wife, You should only add the husband to the list and put in '2' as the amount.</i>`
    },

    payments:{
        title:'Add Expenses',
        additional_info: `  Expenses are split into 2 catagories: "General pot" and "Side pot".
                            <br /><strong>General pot:</strong> 
                            <br /> There's only one General pot and it should only include expenses that are shared equally between ALL participants.
                            <br /> e.g.: <i>vanue rent fee, food, snacks, soft drinks, shared service such as catering or strippers, etc...</i>
                            <br />
                            <strong>Side pot:</strong> 
                            <br /> Create as many side pots as you need.
                            <br /> These should only include expenses that are shared equally between SOME of the participants, In these cases
                            check the "Side pot" checkbox and select the participants that should split the sidepot cost.
                            <br /> e.g.: <i>Mike bought the weed, But only Mike,Vova and Slava are weed smokers.
                            In this case, mark this expense as a side pot and select Mike,Vova and Slava as the participants.</i>`
    },

    result:{
        title:'cyka',
        additional_info: 'blyat'
    }
}

// inject text content into page by sections
kzzn.txt.injectText = function () {
    var sections = $('.section');

    $.each(sections, function (index, item){
        let section = $(this),
            sectionFor = section.data('sectionFor'),
            title = section.find('.title'),
            additional_info = section.find('.additional_info');

        switch(sectionFor){
            case 'participants':
                title.text(content.participants.title);
                additional_info.attr('data-content', content.participants.additional_info);
            break;

            case 'payments':
                title.text(content.payments.title);
                additional_info.attr('data-content', content.payments.additional_info);
            break;
        }
    });
}