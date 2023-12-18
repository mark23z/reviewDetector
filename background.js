var showPages = ["https://www.amazon.com/", "https://www.amazon.com/*", "http://www.amazon.com/*"]

chrome.runtime.onInstalled.addListener(function(){
chrome.contextMenus.create({
  title: "getReview",
  contexts:["selection"],
  id: "getReview",
  documentUrlPatterns: showPages
 
}, () => chrome.runtime.lastError);});

var real1NotifyOptions = {
  type: 'basic',
  iconUrl: 'icons/bild48.png',
  title: 'Real',
  message: '(Highly confident)'
};

var real2NotifyOptions = {
  type: 'basic',
  iconUrl: 'icons/bild48.png',
  title: 'Real',
  message: '(Confident)'
};

var real3NotifyOptions = {
  type: 'basic',
  iconUrl: 'icons/bild48.png',
  title: 'Real',
  message: '(Mildly confident)'
};

var fake1NotifyOptions = {
  type: 'basic',
  iconUrl: 'icons/bild48.png',
  title: 'Fake',
  message: '(Highly confident)'
};

var fake2NotifyOptions = {
  type: 'basic',
  iconUrl: 'icons/bild48.png',
  title: 'Fake',
  message: '(Confident)'
};

var fake3NotifyOptions = {
  type: 'basic',
  iconUrl: 'icons/bild48.png',
  title: 'Fake',
  message: '(Mildly confident)'
};

chrome.contextMenus.onClicked.addListener(function(){

  chrome.notifications.getAll((items) => {
    if ( items ) {
        for (let key in items) {
            chrome.notifications.clear(key);
        }
    }
  });


});

/* chrome.contextMenus.onClicked.addListener(function(clickData){
  if (typeof clickData.selectionText === 'string' || clickData.selectionText instanceof String){
  chrome.notifications.create('fakeNotification', fake1NotifyOptions);

  }
}); */



chrome.contextMenus.onClicked.addListener(function(clickData){
  chrome.storage.session.set({ key: clickData.selectionText }).then(() => {
    console.log("Value was set");
  });
});
/* chrome.storage.local.set({text : "halloi"}) */;

/* function sendText(clickData, tab){
  if (typeof clickData.selectionText === 'string' || clickData.selectionText instanceof String){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {
          console.log(response);
        });
      });


  }
}; */

/* function sendText(clickData){
  if (typeof clickData.selectionText === 'string' || clickData.selectionText instanceof String){
    chrome.runtime.sendMessage({"message" : "haallo"});
  };
} */

/* function returnMessage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"});
  });
}
chrome.contextMenus.onClicked.addListener(returnMessage); */


//chrome.contextMenus.onClicked.addListener(sendText);
 
/* chrome.contextMenus.onClicked.addListener(function(clickData){
  if (typeof clickData.selectionText === 'string' || clickData.selectionText instanceof String){
    chrome.runtime.sendMessage()
  
}
}); */


/* chrome.contextMenus.onClicked.addListener(function(clickData){
if(clickData.menuItemId == "spendMoney" && clickData.selectionText){
  if (typeof clickData.selectionText === 'string' || clickData.selectionText instanceof String){
    console.log(clickData.selectionText);
    
    var notifyOptions = {
      type: 'basic',
      iconUrl: 'icons/bild48.png',
      title: 'Fake',
      message: 'Ohhh yeah'
    };

    chrome.notifications.create('statusNotify', notifyOptions);

  }
}

}); */


