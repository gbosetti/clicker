document.addEventListener("DOMContentLoaded", function() {

	$('[data-toggle="popover"]').popover({
        placement : 'top',
        html: true,
        title: browser.i18n.getMessage("are_you_sure"),
        template: '	<div class="popover"> \
        				<div class="arrow"></div> \
        				<h3 class="popover-title"></h3> \
        				<div class="popover-footer text-center"> \
        					<a href="#" class="btn btn-sm clear_logs_yes">' + browser.i18n.getMessage("yes") + '</a> \
        					<a href="#" class="btn btn-sm clear_logs_no">' + browser.i18n.getMessage("no") + '</a> \
        				</div> \
        			</div>'
    });

    $(document).on("click", ".popover-footer .clear_logs_yes" , function(){

		browser.runtime.sendMessage({ 
			"call": "removeLogs"
		}).then(status => {
			if(status){
				notify(browser.i18n.getMessage("logs_sucessfully_cleared"))
			}
			else { 
				notify(browser.i18n.getMessage("logs_cleaning_failed")) 
			}

			$(this).parents(".popover").popover('hide');
		});
        
    });

	// Loading locale messages
	document.querySelector("#status_label").innerHTML = browser.i18n.getMessage("status_tool");
	document.querySelector("#export_logs").textContent = browser.i18n.getMessage("export_logs");
	document.querySelector("#clear_logs").textContent = browser.i18n.getMessage("clear_logs");

	//Event listener for the Logging Status option
	browser.runtime.sendMessage({ 
		"call": "getLoggingStatus"
	}).then(status => {

		$("#logging_status").prop('checked', status).change();

		document.querySelector("#logging_status").onchange = function(){
			browser.runtime.sendMessage({ 
				"call": "changeLoggingStatus",
				"args": $("#logging_status").prop('checked')
			});
		}
	});

	//Remaining event listeners
	document.querySelector("#export_logs").onclick = function(){

		browser.runtime.sendMessage({ 
			"call": "exportLogs"
		}).then(logs => {

			downloadFile(logs, "logs.json", "text/json");
		});
	}

	// Extras
	function downloadFile(content, filename, contentType)
	{
		    var a = document.createElement('a');
		    var blob = new Blob([content], {'type':contentType});
		    a.href = window.URL.createObjectURL(blob);
		    a.download = filename;
		    a.click();
	}
	function notify(content, title){

		browser.runtime.sendMessage({ 
			"call": "alert",
			"args": content
		});
	}

	$('#logging_status').bootstrapToggle({
      on: browser.i18n.getMessage("enabled"),
      off: browser.i18n.getMessage("disabled"),
      width: $('#export_logs').innerWidth()
    });
});