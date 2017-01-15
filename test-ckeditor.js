CKEDITOR.replace( 'editor1' );

$(document).ready(function() {// Get the editor data.
	
});

function ubmit() {
	var data = CKEDITOR.instances.editor1.getData();
	console.log(data);
	$('#stuff').append(data);
	return false;
}