'use strict';

var $ticketTemplate;

$.get(chrome.extension.getURL("ticketTemplate.html"), function(data) {
    var $template = $(data);
    angular.bootstrap($template, []);
    $ticketTemplate = $template;
    console.log($ticketTemplate);
});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (~tab.url.indexOf('booking.uz.gov.ua/result/eblank')) {
        
        chrome.tabs.sendMessage(
                tabId,
                {action: 'GetTicketJson'},
				{},
                function(el){
                   if (el.isSuccess) {
                   var scope = angular.element($ticketTemplate).scope();
                   scope.$apply(function(){
                        scope.ticket =  el.ticket;
                        }); 
                   }                 
                 });
        
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function(tab){
  chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        
        var tabId = tabs[0].id;chrome.tabs.sendMessage(
                tabId,
                {action: 'ToggleTicket', ticket : $ticketTemplate.html()},
				{},
                /* ...also specifying a callback to be called 
                 *    from the receiving end (content script) */
                function(el){
                    if (el.isSuccess) {
	                   chrome.pageAction.setIcon({path: el.iconPath, tabId: tabId});
                   }                 
                 });
        
    });
  });
