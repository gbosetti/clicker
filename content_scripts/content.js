class ClicksCounter{

	constructor(){
		var self = this;
		this.xpathGenerator = new IdTreeXPathEngine();
		this.clickListener = function(evt){

			evt.stopImmediatePropagation();
			var log = {
				"timestamp": Date.now(),
				"type": evt.type,
				"dom_element": evt.target.outerHTML,
				//"xpath": self.xpathGenerator.getPath(evt.target, document),
				"url": window.location.href
			};
			browser.runtime.sendMessage({ 
				"call": "log",
				"args": log
			});
		};
	};
	changeListenersStatus(enable){
		if(enable)
			document.body.addEventListener("mouseup", this.clickListener);
		else document.body.removeEventListener("mouseup", this.clickListener);
	};
	alert(message){
		alert(message);
	};
}

var pageComponent= new ClicksCounter();
browser.runtime.sendMessage({ "call": "getLoggingStatus" }).then(enabled => {

	pageComponent.changeListenersStatus(enabled);
});
browser.runtime.onMessage.addListener(function (request, sender) {

	if(pageComponent[request.call]){
		//console.log(request.call + " from the pageComponent");
		return pageComponent[request.call](request.args);
	}
});