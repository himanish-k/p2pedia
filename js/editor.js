

initRTE("js/rte-master/cbrte/images/", "js/rte-master/cbrte/", "", true);

var MODES = { new : 1, edit : 2 }; 
var mode = MODES.new;
var rte = new richTextEditor('rte');
var id = urlParam('id');
var docs = JSON.parse(localStorage['documents']);

if(id)
	for(x in docs)
		if(docs[x].id == id) {
			docs[x].content == null ? rte.html = "" : rte.html = docs[x].content;
			$('#title').append(docs[x].title);
			$('#author').append(docs[x].author);
			mode = MODES.edit;
		}

rte.build();

if(id) { 
	$('#edit-doc-form').css('display', 'block');
} else	
	$('#new-doc-form').css('display', 'block');

function urlParam(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	
	if(results != null)
		return results[1];

	return 0;
}

function submitForm() { 

		var documents = JSON.parse(localStorage['documents']); 
		if(mode == MODES.new) {
			var newDoc = {};
			newDoc.title = $('input[name=title]').val();
			newDoc.author = $('input[name=author]').val();
			newDoc.date_created = getDate();
			newDoc.views = 0;
			newDoc.upvotes = 0;
			newDoc.downvotes = 0;
			newDoc.content = getHtmlSrc('rte');

			newDoc.id = Math.max.apply(Math,documents.map(function(doc){return doc.id;}))+1;

			documents.push(newDoc);
		} else {

			if(id)
				for(x in documents)
					if(docs[x].id == id)
						documents[x].content = getHtmlSrc('rte');
		}


		//for(x in documents) 
			//console.log(documents[x].content);
		//alert(documents);

		localStorage['documents'] = JSON.stringify(documents);
		window.location.href = "index.html"

		return false;
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