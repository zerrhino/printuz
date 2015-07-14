'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
     switch(request.action)
     {
       case "GetTicketJson":
       $('.blank.electronic')
          var uzTicket = $('.blank.electronic');
          var ticketJson = {
            PassengerName: uzTicket.find("table.part2 tr:first td:nth-child(2)").text(),
            QRcode : uzTicket.find('img[alt=QR]').attr("src")
          };
           sendResponse({
             ticket : ticketJson,
             isSuccess: true,
              iconPath: iconPath
            });
          
          
          break;
       default:
       
          sendResponse({ isSuccess: false}); // snub them.
          break;
          
     }
    
     
     // if (newTicket.parent().size() == 0) {
      //  var scope = angular.element(newTicket).scope();
      //  console.log(scope);
      //  scope.$apply(function(){scope.QR = oldTicket.find('img').clone().attr('src')});
      //  oldTicket.parent().append(newTicket);
     // }
     
     
     var mode = oldTicket.is(":visible") ?'old': 'new';
      
     var iconPath = 'icon.png';
     if (mode == 'old') { 
	     oldTicket.hide();
       newTicket.show();
       iconPath = 'newIcon.png';
      } 
      else 
      {
        newTicket.hide();
        oldTicket.show();
      }
       
       
       sendResponse({
         isSuccess: true,
         iconPath: iconPath
         });
       
  });
  