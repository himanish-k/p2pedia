
var documents = JSON.parse(localStorage['documents']);
var id = urlParam('id');

$(document).ready(function() {
	if(id)
		for(x in documents)
			if(documents[x].id == id)
				$('#document-content').append(documents[x].content);
});

function urlParam(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	
	if(results != null)
		return results[1];

	return 0;
}