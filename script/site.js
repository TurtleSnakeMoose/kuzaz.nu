var kzzn = kzzn || {};
kzzn.site = kzzn.site || {};

$(function (){

	// load html contant from paymentsModal.html into modal <div> and init onShow + onHide events.
	kzzn.util.load_modalPayments();

	// attach key-press events to various elements
	kzzn.util.attachKeyEvents();
	
	// set minor delay to allow content to be loaded from file.
	setTimeout(function(){
		// initialize js components
		kzzn.util.initComponents();
		// inject all text content into page.
		kzzn.txt.injectText();
	}, 200);

	// hide all sections and show destination section.
	kzzn.site.navigateToSection = function(button, destination){
		let page_container = $(button).closest('#page_container'),
			sections = page_container.find('.section'),
			destination_section = page_container.find(`div[data-section-for=${destination}]`);

		sections.attr('class','section hidden');
		destination_section.removeClass('hidden');
	}
})
