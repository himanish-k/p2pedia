
var SECTION = {
		DASHBOARD 			: 'dashboard',
		LIST 						: 'document-list',
		VIEW 						: 'document-view',
		NEW 						: 'document-new',
		EDIT 	 					: 'document-edit',
		SEARCH					: 'search',
		SEARCH_RESULT 	: 'search-result',
		PEER_LIST				: 'peer-list',
		SETTINGS				: 'settings'
};

var navigation = { 
	current : SECTION.DASHBOARD,
	enabled : true
};

// Tasks performed according to preferences when the application
// starts up.
function startup() {

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

// Constructs an instance of CK Editor to create new document.
function constructEditor(editor, content) {
	CKEDITOR.replace(editor);
	CKEDITOR.on('instanceReady', function(evt) {
    var editor = evt.editor;

    editor.on('focus', function(e) {
       $('input#document-new-publish').prop('disabled', true);
       $('input#document-edit-publish').prop('disabled', true);
    });
    editor.on('blur', function() {
    	$('input#document-new-publish').prop('disabled', false);
    	$('input#document-edit-publish').prop('disabled', false);

    });
	});
	if(content)
		CKEDITOR.instances[editor].setData(content);
}

// Destroys the instance of CK Editor. 
function destroyEditor() {
	for(editor in CKEDITOR.instances)
		CKEDITOR.instances[editor].destroy();
}

// Destroys all instances of CK Editor. Enables the menu for navigation
// purposes again. Then navigates to the document-list section.
function exitEditor() {
	destroyEditor();
	$.observable(documentNew).setProperty({ title: '', author: '', content: ''});
	$.observable(documentEdit).setProperty('document', '');
	$.observable(navigation).setProperty('enabled', true);
	$('.nav.nav-sidebar.menu').children('li.active').removeClass('active');
	// finally, "activate" required list element
	$('a#nav-to-document-list').parent('li').addClass('active');
	navigate(SECTION.LIST);
}

function viewDocument() {
	// Fetch ID of the document in this row.
	var id = $.view(this).data.id;
	// Retrieve and set document content with specfied ID.
	var d = dataHandler.view(id);
	$.observable(documentView).setProperty('document', d);
	// Navigate to the document-view section.
	navigate(SECTION.VIEW);

}

function publishNewDocument() { 

	var documents = [];
	if(localStorage['documents'])
		documents = JSON.parse(localStorage['documents']);
	
	var newDocument = { };
	newDocument.title = documentNew.title;
	newDocument.author = documentNew.author;
	newDocument.content = CKEDITOR.instances['editor-document-new'].getData();

	if(dataHandler.publish(newDocument))
		documentList.insert(newDocument);
	else
		alert("Invalid fields");
	$.observable(documentNew).setProperty({ title: '', author: '', content: ''});
	exitEditor();

}

function publishEditedDocument() { 

	documentEdit.document.content = CKEDITOR.instances['editor-document-edit'].getData();
	dataHandler.save(documentEdit.document);
	// documentList.remove(// should have index);
	documentList.insert(documentEdit.document, documentEdit.document.id);
	exitEditor();
}

function getDate() {
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();

	var output = d.getFullYear() + '-' +
	    (month<10 ? '0' : '') + month + '-' +
	    (day<10 ? '0' : '') + day;

  return output;
}

var documentNewTemplate = $.templates('#document-new-template');
documentNew = { 
	title : "", 
	author : "", 
	content : "",
	reset : function() {
		this.title = "";
		this.author = "";
		this.content = "";
	}
};
documentNewTemplate.link("#document-new", documentNew);

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
$('#nav-to-search').click({ section : SECTION.SEARCH }, navigate);
$('#nav-to-settings').click({ section : SECTION.SETTINGS }, navigate);

// Constructs an instance of CK Editor to create new document. Disables the
// menu so that the user cannot directly navigate to another part of the 
// application without choosing to save or discard changes. Then navigates
// to the document-new section.
$('a#nav-to-document-new').click(function() {
	constructEditor('editor-document-new');
	$.observable(navigation).setProperty('enabled', false);
	navigate(SECTION.NEW);
});
$('a#nav-to-peer-list').click({ section : SECTION.PEER_LIST }, navigate);
$('a#nav-to-settings').click({ section : SECTION.SETTINGS }, navigate);

// Destroys the instance of CK Editor. Enables the menu for navigation
// purposes again. Then navigates to the dashboard section.
$('a#close-editor').click(exitEditor);

// Click event handler for all tables rows in document-list section.
$('tr.nav-to-document-view').click(viewDocument);



// Input button click events.
$('input#document-view-back-btn').click({ section : SECTION.LIST }, navigate);
$('input#search-result-back-btn').click({ section : SECTION.SEARCH }, navigate);
$('input#document-new-publish').click(publishNewDocument);
$('input#document-new-draft').click(featureNotImplementedAlert);
function featureNotImplementedAlert() {
	alert('Cannot save to drafts - feature not implemented yet.');	
};

$('input#document-edit').click(function() {
	var id = $.view(this).data.document.id;
	var d = JSON.parse(localStorage['documents']).filter(function(o) { return o.id == id})[0];
	constructEditor('editor-document-edit', d.content);
	$.observable(documentEdit).setProperty('document', d);
	$.observable(navigation).setProperty('enabled', false);
	navigate(SECTION.EDIT);
});
$('input#document-edit-publish').click(publishEditedDocument);
$('input#document-edit-draft').click(featureNotImplementedAlert);

$('input#btn-search').click(function() {
	var query = $.view(this).data;
	var result = queryHandler.queryLocal(query.title, query.author);
	$.observable(searchResults).setProperty('documents', result);
	$('tr.nav-to-document-view').click(viewDocument);
	navigate(SECTION.SEARCH_RESULT);
});

$.observe(documentList.documents, function(ev, evArgs) {
	console.log("dasdas");
	$('tr.nav-to-document-view').eq(evArgs.index).click(viewDocument);
});
$.observe(searchResults.documents, function(ev, evArgs) {
	console.log("dasdassssssss");
	$('tr.nav-to-document-view').eq(evArgs.index).click(viewDocument);
});
$('input#settings-erase').click(dataHandler.eraseData);
$('input#settings-inject-mock').click(dataHandler.injectMockData);
$('input#editor-document-edit').focus(
	function() {
		$('textarea#document-edit-publish').prop('disabled', true);
	}
);

$(document).ready(function() {
	for(x in SECTION)		
		$('#' + SECTION[''+ x]).css('visibility', 'visible');

});

