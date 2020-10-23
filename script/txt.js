var kzzn = kzzn || {};
kzzn.txt = kzzn.txt || {};

// inject text content into page by sections
kzzn.txt.injectContentIntoHelpPopups = function () {
    var info_points = $('.additional_info');

    $.each(info_points, function (index, item){
        let info_point = $(this),
            infoFor = info_point.data('for'),
            current_lang = $('body').data('language'),
            translations = current_lang === 'english' ? kzzn.translate.english : current_lang === 'hebrew' ? kzzn.translate.hebrew : {};

        switch(infoFor){
            case 'section_participants':
                info_point.attr('data-content', translations.participant_help);
            break;

            case 'modal_payments':
                info_point.attr('data-content', translations.payments_help);
            break;

            case 'modal_summary':
                info_point.attr('data-content', translations.summary_help);
            break;

            case 'modal_result':
                info_point.attr('data-content', translations.result_help);
            break;

            case 'modal_importExport':
                info_point.attr('data-content', translations.import_export_help);
            break;
        }
    });
}

kzzn.txt.translateSiteToCurrentLanguage = function() {
    let body = $('body'),
        selected_lang = kzzn.util.getCurrentLanguage(),
        translatables = body.find('[data-translate]'),
        translations = selected_lang === 'english' ? kzzn.translate.english : selected_lang === 'hebrew' ? kzzn.translate.hebrew : {};
    
    translate(translatables, translations);
}

kzzn.txt.switchLanguage = function (sender) {
    let selected_lang = $(sender).data('language'),
        selected_direction = $(sender).data('direction'),
        body = $('body'),
        translatables = body.find('[data-translate]'),
        translations = selected_lang === 'english' ? kzzn.translate.english : selected_lang === 'hebrew' ? kzzn.translate.hebrew : {};

    body.attr('class', selected_direction);
    body.data('language', selected_lang);

    translate(translatables, translations);

    kzzn.txt.injectContentIntoHelpPopups();
}

function translate(translatables, translations){

    $.each(translatables, function (i, translatable) { 
        let translate_what = $(translatable).data('translate'),
            translated = translations[translate_what],
            element_name = translatable.nodeName.toLowerCase();

        switch (element_name) {
            case 'input':
                $(this).attr('placeholder', translated);
                break;
                
            case 'label':
            case 'td':
            case 'span':
            case 'button':
            case 'h5':
            case 'h4':
            case 'div':
                $(this).text(translated)
                break;
        
            default:
                break;
        }     
    });
}