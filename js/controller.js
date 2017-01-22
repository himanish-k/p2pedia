var PAGE = {
	DASHBOARD : '#dashboard',
	LIST 			: '#list-documents',
	VIEW 			: '#view-document',
	EDIT 	 		: '#edit-document',
	PEERS			: '#peers',
	SETTINGS	: '#settings'
}

function dashboard() {
	show(PAGE.DASHBOARD);
}

function listDocuments() {
	show(PAGE.LIST);
	refreshDocumentList();
}

function viewDocument(id) {
	view(id);
	show(PAGE.VIEW);
}

function editDocument(id) {
	edit(id);
	show(PAGE.EDIT);
}

function peers() {
	show(PAGE.PEERS);
}

function settings() {
	show(PAGE.SETTINGS);
}

function show(page) {
	$(page).css('display', 'block');
	hideRest(page);
	return false;
}

function hideRest(page) {
	for (x in PAGE) {
		if(PAGE[x] != page)
			$(PAGE[x]).css('display', 'none');
	}
}


