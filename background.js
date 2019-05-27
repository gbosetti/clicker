class Clicker{

  removeLogs(){
    return new Promise((resolve, reject) => {
      browser.storage.local.remove("logs").then(evt => {
        resolve(true);
      }).catch(err => {
        resolve(false);
      });       
    });
  }

  exportLogs(){

    return new Promise((resolve, reject) => {
      this.getLogs().then(logs => {

        resolve(JSON.stringify(logs, null, 4));
      });
    });
  }

  getLogs(){
    return new Promise((resolve, reject) => {
      browser.storage.local.get("logs").then(response => {
        var logs = response["logs"] == undefined || response["logs"] == null ? [] : response["logs"];
        resolve(logs);
      }); 
    });
  }

  log(log){
    return new Promise((resolve, reject) => {
      this.getLogs().then(logs => {
        logs.push(log);
        browser.storage.local.set({"logs": logs});
        resolve();
      });
    });
  }

  changeLoggingStatus(loggingStatus){

    return new Promise((resolve, reject) => {

      browser.storage.local.set({"logging_status": loggingStatus}).then(evt => {
        this.refreshIcon();
        this.changeListenersStatus(loggingStatus);
        resolve(loggingStatus);
      });      
    });
  }

  changeListenersStatus(enabled){

    this.getCurrentTab().then(tab => {
      browser.tabs.sendMessage(tab.id, { call: "changeListenersStatus", args: enabled }).catch(err => {
        console.log(err);
      });
    });
  }

  refreshIcon(){

    this.getLoggingStatus().then(status => {
      if(status)
        browser.browserAction.setIcon({ path: "resources/img/enabled-48.png" });
      else browser.browserAction.setIcon({ path: "resources/img/disabled-48.png" });
    });
  }

  getLoggingStatus(){

    return new Promise((resolve, reject) => {

      browser.storage.local.get("logging_status").then(response => {

        var loggingStatus = response["logging_status"]!=undefined && response["logging_status"]!=null ? response["logging_status"] : false;
        resolve(loggingStatus);
      }); 
    });
  }

  alert(message){
    this.getCurrentTab().then(tab => {
      browser.tabs.sendMessage(tab.id, { call: "alert", args: message })
      .catch(err => {
        browser.notifications.create({
          "type": "basic",
          "iconUrl": browser.extension.getURL("../../resources/img/enabled-48.png"),
          "title": "Clicker",
          "message": message
        });
      });
    });
  }

  getCurrentTab() {

    return new Promise((resolve, reject) => {
      try{
        browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
          //console.log(tabs[0]);
          resolve(tabs[0]);
        });
      }catch(err){
        reject(err);
      }
    });
  }
}

var clicker = new Clicker();
    clicker.refreshIcon();

browser.runtime.onMessage.addListener(function(message, sender, sendResponse){ 

    //console.log("message: ", message, " (at main.js)");
    if(clicker[message.call]) {
      return clicker[message.call](message.args); //in case you need to return a promise
    }
});
