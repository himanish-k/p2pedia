var documentList = [
	{ name: "The great book of rats", author: "Guy Mopassante" },
	{ name: "Actuarial scinces", 			author: "Lithuan Janavic" }
];

var peerList = [
	{ name: "Himanish Kaushal", id: "1" },
	{ name: "Michael Fakhry",		id: "2" }
]

$(document).ready(function() {
	refreshDocumentList();
	refreshPeerList();
});

function refreshDocumentList() {
	var updatedListHtml = "";
	for(x in documentList)
		updatedListHtml += "<tr>" 
						+ "<td>" + documentList[x].name + "</td>"
						+ "<td>" + documentList[x].author + "</td>"
						+ "</tr>" ;

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
