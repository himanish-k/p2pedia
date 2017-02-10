// up2p publish(), view(), copy(), delete()

var dataHandler = {
	publish : function(newDocument) {

		if(!newDocument.title.trim() || !newDocument.author.trim() || !newDocument.content.trim() )
			return false;
		// Add uninitialized properties to new object and assign default values
		newDocument.views = 0;
		newDocument.upvotes = 0;
		newDocument.downvotes = 0;
		newDocument.date_created = getDate();

		// Fetch locally stored data, calculate new id, push changes and save.
		var documents = [];
		documents = JSON.parse(localStorage['documents']);
		if(documents.length < 1)
			newDocument.id = 1;
		else	
			newDocument.id = Math.max.apply(Math,documents.map(function(doc){return doc.id;}))+1;

		documents.push(newDocument);
		localStorage['documents'] = JSON.stringify(documents);

		return true;
	},
	save : function(editedDocument) {

		// Fetch locally stored data.
		var documents = JSON.parse(localStorage['documents']);
		// Calculate array index of document based on id.
		var index = documents.map(function(e) { return e.id; }).indexOf(documentEdit.document.id);
		documents[index] = documentEdit.document;
		localStorage['documents'] = JSON.stringify(documents);
	},
	view : function(document_id) {
		return JSON.parse(localStorage['documents']).filter(function(o) { return o.id == document_id })[0];
	},
	copy : function() {

	},
	delete : function() {

	},
	backupData : function() {
		localStorage['documents-backup'] = localStorage['documents'];
	},
	eraseData : function() {
		localStorage['documents'] = JSON.stringify([]);
	},
	resetDataToBackup : function() {
		localStorage['documents'] = localStorage['documents-backup'];
	},
	fetchData : function() {
		var documents = [];
		if(localStorage['documents']) {
			documents = JSON.parse(localStorage['documents']);
			return documents;
		}
		return false;
	},
	injectMockData : function() {
		var lorem = new Lorem;
		lorem.type = Lorem.TYPE.PARAGRAPH;
		lorem.query = '2p';
		var doc = {
			title: "",
			author: "",
			content: ""
		};
		for(var i=0; i < 4; i++) {
			doc.title = lorem.createText(3, Lorem.TYPE.WORD);
			doc.author = lorem.createText(2, Lorem.TYPE.WORD);
			doc.content = lorem.createText(randomInt(1,4), Lorem.TYPE.PARAGRAPH);
			dataHandler.publish(doc);
			documentList.insert(doc);
		}
	}
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

function randomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
};