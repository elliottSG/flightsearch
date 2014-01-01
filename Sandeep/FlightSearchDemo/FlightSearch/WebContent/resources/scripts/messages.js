/**
 * This is JS Object class for displaying validation and server side messages
 * on the page.
 * */

function Message() { }

function setMessage(type,message) 
{
	if(type=="success"){
		$('#msgWid').hide();
	}else if(type=="error"){
		$('#msgWid').show();
		$("#msg").empty();
		$("#msg").append(message);
	}/*else if(type=="warn"){
		$("#messageDiv").empty();
		$("#messageDiv").append("<div class='ui-widget'><div class='ui-state-highlight ui-corner-all' style='font-size: 14px; padding: 0.5em;'>"+
				"<p><span class='ui-icon ui-icon-notice' style='float: left; margin-right: .3em;'></span>"+message+
				"</p></div></div>").fadeIn(600, function(){
				$(this).delay(5000).fadeOut("slow");;
		});
	}*/else{
		$('#msgWid').show();
		$("#msg").empty();
		$("#msg").append("Fatal error occured!!");
	}
}

Message.set = function(type,message){
	setMessage(type,message);
};