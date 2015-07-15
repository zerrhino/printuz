'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
     switch(request.action)
     {
       case "GetTicketJson":
          var uzTicket = $('.blank.electronic');
          
          var ticketJson = {            
            
            number : uzTicket.find("table.part1 tr:first td:nth-child(3)").text(),            
            
            passengerName : uzTicket.find("table.part2 tr:first td:nth-child(2)").text(),
            
            departure : uzTicket.find("table.part2 tr:nth-child(4) td:nth-child(2)").text(),
            arrival : uzTicket.find("table.part2 tr:nth-child(5) td:nth-child(3)").text(),
            
            origin : uzTicket.find("table.part2 tr:nth-child(2) td:nth-child(3)").text(),
            destination: uzTicket.find("table.part2 tr:nth-child(3) td:nth-child(3)").text(),
            
            train : uzTicket.find("table.part2 tr:first td:nth-child(4)").text(),  
            //trainDesc: uzTicket.find().text(),          
            coach : uzTicket.find("table.part2 tr:nth-child(2) td:nth-child(5)").text(),
            seat : uzTicket.find("table.part2 tr:nth-child(3) td:nth-child(5)").text(),
            
            price : uzTicket.find("table.part2 tr:nth-child(6) td b:first").text(),
            
            qrCode : uzTicket.find('img[alt=QR]').attr("src")
          };
           sendResponse({
             ticket : ticketJson,
             isSuccess: true
            });
          break;
       case "ToggleTicket":
          
          var oldTicket = $('.blank.electronic');
          var newTicket = $("#newTicket");
          if (newTicket.size() == 0)
          {
            console.log(request);
            newTicket = $(request.ticket);
            oldTicket.parent().append(newTicket);
          }
          
          var mode = oldTicket.is(":visible") ?'old': 'new';
      
          var iconPath = 'icon.png';
           if (mode == 'old') { 
	             oldTicket.hide();
               newTicket.show();
               iconPath = 'newIcon.png';
            } else { 
               newTicket.hide();
               oldTicket.show();
            }
            sendResponse({ isSuccess: true, iconPath : iconPath });
        break;   
          
       default:
          sendResponse({ isSuccess: false});
          break;
     }
  });
  