var kzzn = kzzn || {};
kzzn.site = kzzn.site || {};

$(function (){

	// initialize js components
	kzzn.util.initComponents();

	// attach key-press events to various elements
	kzzn.util.attachKeyEvents();

	// inject all text content into page.
	kzzn.txt.injectText();

	// hide all sections and show destination section.
	kzzn.site.navigateToSection = function(button, destination){
		let page_container = $(button).closest('#page_container'),
			sections = page_container.find('.section'),
			destination_section = page_container.find(`div[data-section-for=${destination}]`);

		sections.attr('class','section hidden');
		destination_section.removeClass('hidden');
	}
})
