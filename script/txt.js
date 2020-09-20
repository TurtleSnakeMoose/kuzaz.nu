var kzzn = kzzn || {};
kzzn.txt = kzzn.txt || {};

// quality of life, gather all page text content here instead of looking for it at the page.
var content = {
    participants:{
        title:'Add participants',
        additional_info: "Incases where a participant is paying for several participants, <br /> Specify the amount (including himself) and add don't add these people to the list."
    },
    payments:{
        title:'cyka',
        additional_info: 'blyat'
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
        }
    });
}