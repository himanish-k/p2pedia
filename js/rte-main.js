//Usage: initRTE(imagesPath, includesPath, cssFile, genXHTML, encHTML)
initRTE("js/rte-master/cbrte/images/", "js/rte-master/cbrte/", "", true);

//build new richTextEditor
var rte1 = new richTextEditor('rte1');
rte1.html = 'here&#39;s the "\<em\>preloaded\<\/em\>&nbsp;\<b\>content\<\/b\>"';
//enable all commands for demo
rte1.cmdFormatBlock = true;
rte1.cmdFontName = true;
rte1.cmdFontSize = true;
rte1.cmdIncreaseFontSize = true;
rte1.cmdDecreaseFontSize = true;
rte1.cmdBold = true;
rte1.cmdItalic = true;
rte1.cmdUnderline = true;
rte1.cmdStrikethrough = true;
rte1.cmdSuperscript = true;
rte1.cmdSubscript = true;
rte1.cmdJustifyLeft = true;
rte1.cmdJustifyCenter = true;
rte1.cmdJustifyRight = true;
rte1.cmdJustifyFull = true;
rte1.cmdInsertHorizontalRule = true;
rte1.cmdInsertOrderedList = true;
rte1.cmdInsertUnorderedList = true;
rte1.cmdOutdent = true;
rte1.cmdIndent = true;
rte1.cmdForeColor = true;
rte1.cmdHiliteColor = true;
rte1.cmdInsertLink = true;
rte1.cmdInsertImage = true;
rte1.cmdInsertSpecialChars = true;
rte1.cmdInsertTable = true;
rte1.cmdSpellcheck = true;
rte1.cmdCut = true;
rte1.cmdCopy = true;
rte1.cmdPaste = true;
rte1.cmdUndo = true;
rte1.cmdRedo = true;
rte1.cmdRemoveFormat = true;
rte1.cmdUnlink = true;
//rte1.toggleSrc = false;
rte1.build();
//-->

console.log(rte1);

function submitForm() { 
	//make sure hidden and iframe values are in sync for all rtes before submitting form
	//updateRTEs();
	
	//change the following line to true to submit form
	alert("rte1 = " + getHtmlSrc('rte1'));
	return true;
}