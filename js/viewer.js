
function edit(id) {
	if(!CKEDITOR.instances.ckeditor)	
		CKEDITOR.replace('ckeditor');
	var documents = JSON.parse(localStorage['documents']);
	if(id)
		for(x in documents)
			if(documents[x].id == id)
				$('#ckeditor').val(documents[x].content);
}

function view(id) {
	var documents = JSON.parse(localStorage['documents']);
	if(id)
		for(x in documents)
			if(documents[x].id == id) {
				$('#document-content').append(documents[x].content);
				$('#edit-document-button').click(function() {
					editDocument(id);
				});
			}
}

function urlParam(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	
	if(results != null)
		return results[1];

	return 0;
}