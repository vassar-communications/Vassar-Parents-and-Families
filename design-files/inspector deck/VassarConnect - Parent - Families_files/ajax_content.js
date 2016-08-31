function LoadEMAjaxContent(control_id, sid, client_id)
{
	var ar = new AjaxRunner();
	ar.Url = '/controls/email_marketing/ajax/ajax_content.aspx';
	ar.Querystring = "control_id=" + control_id + "&sid=" + sid;
	ar.OnSuccess = function(sPrmResponseText, prmEventArgs)
	{
		var div = $get("emvcajax_" + control_id + "_" + client_id);
		div.innerHTML = sPrmResponseText;
	};
    ar.OnFailure = function(sPrmResponseText, prmEventArgs) {
	var div = $get("emvcajax_" + control_id + "_" + client_id);
		div.innerHTML = 'Failed to load content.';
	};
    ar.Execute();
}

if (window.IModController) IModController.scriptLoadedNotification("/features/emailmarketing/ajax_content.js");