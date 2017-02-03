
var SECTION = {
		DASHBOARD : 'dashboard',
		LIST 			: 'document-list',
		VIEW 			: 'document-view',
		NEW 			: 'document-new',
		EDIT 	 		: 'document-edit',
		PEER_LIST	: 'peer-list',
		SETTINGS	: 'settings'
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
	var d = JSON.parse(localStorage['documents']).filter(function(o) { return o.id == id})[0];
	$.observable(documentView).setProperty('document', d);
	// Navigate to the document-view section.
	navigate(SECTION.VIEW);

}

function publishNewDocument() { 

	var documents = JSON.parse(localStorage['documents']);
	
	var newDoc = { };
	newDoc.title = documentNew.title;
	newDoc.author = documentNew.author;
	newDoc.date_created = getDate();
	newDoc.views = 0;
	newDoc.upvotes = 0;
	newDoc.downvotes = 0;
	newDoc.content = CKEDITOR.instances['editor-document-new'].getData();
	newDoc.id = Math.max.apply(Math,documents.map(function(doc){return doc.id;}))+1;

	documents.push(newDoc);
	$.observable(documentList.documents).insert(documents[documents.length-1]);
	localStorage['documents'] = JSON.stringify(documents);
	$.observable(documentNew).setProperty({ title: '', author: '', content: ''});
	exitEditor();

}

function publishEditedDocument() { 

	var documents = JSON.parse(localStorage['documents']);
	var index = documents.map(function(e) { return e.id; }).indexOf(documentEdit.document.id);
	documentEdit.document.content = CKEDITOR.instances['editor-document-edit'].getData();
	documents[index] = documentEdit.document;
	// $.observable(documentList.documents).insert(index, documents[index]);
	localStorage['documents'] = JSON.stringify(documents);
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
var documentNew = { };
documentNew = { title: "", author: "", content: "" };
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

$('input#document-new-publish').click(publishNewDocument);
$('input#document-edit').click(function() {
	var id = $.view(this).data.document.id;
	var d = JSON.parse(localStorage['documents']).filter(function(o) { return o.id == id})[0];
	constructEditor('editor-document-edit', d.content);
	$.observable(documentEdit).setProperty('document', d);
	$.observable(navigation).setProperty('enabled', false);
	navigate(SECTION.EDIT);
});
$('input#document-edit-publish').click(publishEditedDocument);

$.observe(documentList.documents, function(ev, evArgs) {
	$('tr.nav-to-document-view').eq(evArgs.index).click(viewDocument);
});

