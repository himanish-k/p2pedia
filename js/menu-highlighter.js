
var SECTION = {
		DASHBOARD : 'dashboard',
		LIST 			: 'document-list',
		VIEW 			: 'document-view',
		NEW 			: 'document-new',
		EDIT 	 		: '#edit-document',
		PEER_LIST	: 'peer-list',
		SETTINGS	: 'settings'
};

var navigation = { 
	current : SECTION.NEW,
	enabled : true
};

// Tasks performed according to preferences when the application
// starts up.
function startup() {
	constructEditor();
}

// Changes current property of navigation object to the section to which
// the application should navigate. AKA allows only one section to be 
// visible at a time.
function navigate(e) {
	var section = null;
	// If e.data exists, then it is a callback from a click event 
	// triggered by a menu item.
	if(e.data){
		section = e.data.section;
	}
	// Otherwise the parameter is itself the section name.
	else {
		section = e;
	}

	$.observable(navigation).setProperty('current', section);
}

// Constructs an instance of CK Editor to create new document. Disables the
// menu so that the user cannot directly navigate to another part of the 
// application without choosing to save or abandon changes. Then navigates
// to the document-new section.
function constructEditor() {
	CKEDITOR.replace('editor');
	$.observable(navigation).setProperty('enabled', false);
	navigate(SECTION.NEW);
}

// Destroys the instance of CK Editor. Enables the menu for navigation
// purposes again. Then navigates to the dashboard section.
function destroyEditor() {
	CKEDITOR.instances.ckeditor.destroy();
	$.observable(navigation).setProperty('enabled', true);
	navigate(SECTION.DASHBOARD);
}


$(document).ready(function() {	

	startup();

	// cycle over all anchor elements in navigation sidebar to add click listener
	$('.nav.nav-sidebar.menu').find('a').each(function() {
		// add click listener 
		$(this).click(function() {
			// "deactivate" currently "active" list element
			$('.nav.nav-sidebar.menu').children('li.active').removeClass('active');
			// finally, "activate" required list element
			$(this).parent('li').addClass('active');
		});
	});

	// Bind navigation variable to body.
	$('body').link(true, navigation);

	// Bind click event handlers for each item in navigation menu
	$('a#nav-to-dashboard').click({ section : SECTION.DASHBOARD }, navigate);	
	$('a#nav-to-document-list').click({ section : SECTION.LIST }, navigate);
	$('a#nav-to-document-new').click(constructEditor);
	$('a#nav-to-peer-list').click({ section : SECTION.PEER_LIST }, navigate);
	$('a#nav-to-settings').click({ section : SECTION.SETTINGS }, navigate);
	$('a#close-editor').click(destroyEditor);
	
	// Click event handler for all tables rows in document-list section.
	$('tr.nav-to-document-view').click(function(e) {
		// Fetch ID of the document in this row.
		var id = $.view(this).data.id;
		// Retrieve and set document content with specfied ID.
		$.observable(documentView).setProperty('document', JSON.parse(localStorage['documents'])[id]);
		// Navigate to the document-view section.
		navigate(SECTION.VIEW);

	});

});