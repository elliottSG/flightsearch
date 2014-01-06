/**
 * Author : SandeepK01
 * Description : This is JS Object class for displaying validation messages
 * on the page.
 * */

function Message() { }

function setMessage(type,message) 
{
	if(type=="success"){
		$().toastmessage('showSuccessToast', message);
	}else if(type=="error"){
		$().toastmessage('showErrorToast', message);
	}else if(type=="warn"){
		$().toastmessage('showWarningToast', message);
	}else if(type=="notice"){
		$().toastmessage('showNoticeToast', message);
	}else{
		$().toastmessage('showWarningToast', "Invalid Message Type.");
	}
}

Message.set = function(type,message){
	setMessage(type,message);
};