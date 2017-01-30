function retreiveDocumentList() {
	var docList = null;
	if(localStorage['documents'])
	 	docList = JSON.parse(localStorage['documents']) 
	if(docList == null)
		return false;

	return docList;
}

function refreshDocumentList() {
	var documentList = retreiveDocumentList();
	var updatedListHtml = "<tbody>";
	for(x in documentList) 
		updatedListHtml += '<tr onclick="viewDocument(' + documentList[x].id + ')">'
						+ "<td>" + documentList[x].id + "</td>"
						+ "<td>" + documentList[x].title + "</td>"
						+ "<td>" + documentList[x].author + "</td>"
						+ "<td>" + documentList[x].date_created + "</td>"
						+ "<td>" + documentList[x].views + "</td>"
						+ "<td>" + documentList[x].upvotes + "</td>"
						+ "<td>" + documentList[x].downvotes + "</td>"
						+ "</tr>" ;

	updatedListHtml += "</tbody>";
	var updatedList = $(updatedListHtml).hide();

	$("#documentList").append(updatedList);
	updatedList.fadeIn(1000);
	
}

function refreshPeerList() {
	var updatedListHtml = "";
	for(x in peerList)
		updatedListHtml += "<tr>" 
						+ "<td>" + peerList[x].name + "</td>"
						+ "<td>" + peerList[x].id + "</td>"
						+ "</tr>" ;

	var updatedList = $(updatedListHtml).hide();

	$("#peerList").append(updatedList);
	updatedList.fadeIn(1000);
}

function redirectToEditor(id) {
	if(id)	
		window.location.href = "editor.html?id=" + id;
	else
		window.location.href = "editor.html";
}

function redirectToViewer(id) {
	window.location.href = "viewer.html?id=" + id;
}