'use strict';

var $ticketTemplate;

$.get(chrome.extension.getURL("ticketTemplate.html"), function(data) {
    var $template = $(data).addClass("tkNew");
    angular.bootstrap($template, []);
    $ticketTemplate = $template;
    console.log($ticketTemplate);
});


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
        chrome.tabs.sendMessage(
                tabs[0].id,
                {action: 'GetTicketJson'},
				{},
                /* ...also specifying a callback to be called 
                 *    from the receiving end (content script) */
                function(el){
	chrome.pageAction.setIcon({path: el.iconPath, tabId: tabs[0].id});
	    console.log(el.ticket);
                    
                 });
    });
  });
