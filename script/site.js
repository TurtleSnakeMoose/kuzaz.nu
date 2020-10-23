var kzzn = kzzn || {};
kzzn.site = kzzn.site || {};

$(function (){

	// load html contant from paymentsModal.html into modal <div> and init onShow + onHide events.
	kzzn.util.load_modals();

	// attach key-press events to various elements
	kzzn.util.attachKeyEvents();
	
	// set minor delay to allow content to be loaded from file.
	setTimeout(function(){
		// initialize js components
		kzzn.util.initComponents();
		// inject text content into all help popups.
		kzzn.txt.injectContentIntoHelpPopups();
		// translate the site to the current language.
		kzzn.txt.translateSiteToCurrentLanguage();
	}, 200);
})
