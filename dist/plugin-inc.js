(function($) {
	
	function focusField(f) {
		$("#" + f).focus().select(); // focusfield is a name of hidden field
	}

	$.showRequest = function (formData, jqForm, options) {
		
	} 	
	
	$.showResponse = function (responseText, statusText, xhr, $form) {
		// for DEBUG ajax form plugin (when use upload file) change option dataType = html
		//alert("status: " + statusText + "\n\nresponseText: \n" + responseText); return false;
		$.each(responseText, function(key, value) { // json format
			if (key == "SUCCESS") {
				$.prompt(value, { buttons: { }, top: "30%", zIndex: "9999" });
				$("form").resetForm();
				setTimeout(function(){
					$.prompt.close(true);
				},2000);
			} else if (key == "UNSUCCESS") {
				$.prompt(decodeURIComponent(value), { buttons: { OK: true }, top: "30%", zIndex: "99999" });
			} else if (key == "REDIRECT") {
				setTimeout(function(){
					$("form").resetForm();
					if(value){
						location.href = decodeURIComponent(value);
					} else {
						window.location.reload(true);
					}
				},1000);
			} else {
				$.prompt(value, { buttons: { OK: true }, top: "30%", zIndex: "9999" });
				focusField(key);
			}
		});
	}

	// $("form").submit(function() { 
		
	// 	var form_action = $(this).attr("action");
	// 	var action_type = $(this).attr("type"); 

	// 	var options = {
	// 		dataType: "json",
	// 		beforeSubmit: $.showRequest,
	// 		success: $.showResponse,
	// 		data: { actionType : action_type },
	// 		error: function(response, status, err){
	// 			if (response.status == 0 || response.status >= 400) {
	// 				$.showResponse({"UNSUCCESS":"Sorry, there was a problem."}, '');
	// 			}
	// 		}
	// 	}

	// 	// submit the form 
	// 	$(this).ajaxSubmit(options); 
		
	// 	// return false to prevent normal browser submit and page navigation 
	// 	return false;
	// });
})(jQuery);