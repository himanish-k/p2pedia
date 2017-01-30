
var SECTION = {
		DASHBOARD : 'dashboard',
		LIST 			: 'document-list',
		VIEW 			: 'document-view',
		EDIT 	 		: '#edit-document',
		PEERS			: '#peers',
		SETTINGS	: '#settings'
	}
var navigation = { };
navigation.current = SECTION.DASHBOARD;

$(document).ready(function() {	
	// cycle over all anchor elements in navigation sidebar to add click listener
	$('.nav.nav-sidebar').find('a').each(function() {
		// add click listener 
		$(this).click(function() {
			// "deactivate" currently "active" list element
			$('.nav.nav-sidebar').children('li.active').removeClass('active');
			// finally, "activate" required list element
			$(this).parent('li').addClass('active');
		});
	});

	// Bind navigation variable to body.
	$('body').link(true, navigation);

	var documentViewTemplate = $.templates("#document-view-template")
var documentView = {};	
documentView.document = JSON.parse(localStorage['documents'])[0];
documentViewTemplate.link('#document-view', documentView);

	// Bind click event handlers for each item in navigation menu
	$('a#nav-to-dashboard').click({ section : SECTION.DASHBOARD }, navigate);	
	$('a#nav-to-document-list').click({ section : SECTION.LIST }, navigate);
	
	$('tr.nav-to-document-view').click(function(e) {
		var id = $.view(this).data.id;
		console.log('called' + id);
		navigate({ data: { section : SECTION.VIEW } });
		$.observable(documentView).setProperty('document', JSON.parse(localStorage['documents'])[id]);
		console.log(documentView.document.content);
	});

	// Changes current property of navigation object to the section to which
	// the application should navigate. AKA allows only one section to be 
	// visible at a time.
	function navigate(e) {
		$.observable(navigation).setProperty('current', e.data.section);
	}


});