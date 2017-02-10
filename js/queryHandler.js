// up2p query() and queryLocal()

var queryHandler = {
	query : function() {

	},
	queryLocal : function(title, author) {
		var documents = [];
		if(localStorage['documents'])
			documents = JSON.parse(localStorage['documents']);

		var titleMatch = false;
		var authorMatch = false;
		var result = $.grep(documents, function(doc, i) {
			titleMatch = false;
			if(title.trim())	
				titleMatch = doc.title.toLowerCase().includes(title.toLowerCase());
			authorMatch = false;
			if(author.trim())
				authorMatch = doc.author.toLowerCase().includes(author.toLowerCase());
			return titleMatch || authorMatch;
		});

		return result;
	}
}