# About the project #

Clicker is a logging system aimed at counting the number of clicks a user performs on the browser pages. Be careful, it is simply overriding the mouseup event and stopping the immediate propagation, so it can interfere with the expected behavior of those applications that have listeners subscribed to this event.

## System Requirements ##

The system was developed and tested using:

* Chrome 73.0.3683.103 (64 bits)
* NPM 10.15.3 LTS

## Building the extension ##

Clone this repo:
git clone https://gabybosetti@bitbucket.org/idenum/clicker.git

Download the dependencies:
npm install

## Installing the extension in Chrome ##

1. Open "chrome://extensions/" in Chrome or to "about:debugging" in Firefox
2. Click "Load not packaged extension" 
3. Select any file in your add-on's root directory (clicker)

## Debugging the extension in Chrome ##

You can debug and see logs from the Webconsole and the Browser's console. It depends on which kind of script you need to log/debug (content/backgroun scripts). 

## Using the tool ##

Dear user, 

Before starting, make sure you didn't use the extension before. It is recommended to clean the logs by clicking on the Clicker toolbar button and selecting the "Clear option".

To start logging the clicks by the user, please click on the toolbar button and enable the tracking. You can keep track of the click on all the tabs you open. In case you accidentally close the browser, the extension persists (remembers) the previous logs. If you uninstall the extension, the logs are cleared.

Once you finish your experience/experiment, you can stop the tracking by clicking on the toolbar button and disabling the extension. Then, you can export the logs by clicking on the toolbar button and then choosing "Export". A json file containing the session's logs will be downloaded. 

Bon tracking!
