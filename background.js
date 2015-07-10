// JavaScript source code
/* When the browser-action button is clicked... */


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (~tab.url.indexOf('booking.uz.gov.ua/result/eblank')) {
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function(tab){
  chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        /* ...and send a request for the DOM info... */
        chrome.tabs.sendMessage(
                tabs[0].id,
                {action: 'GetBody'},
				{},
                /* ...also specifying a callback to be called 
                 *    from the receiving end (content script) */
                function(el){
	chrome.pageAction.setIcon({path: el.iconPath, tabId: tabs[0].id});
	    
                    
                 });
    });
  });
