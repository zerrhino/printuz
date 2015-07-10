chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "GetBody") {
      
	   var oldTicket = $(".tkOld");
     if (oldTicket.size() == 0) {
        oldTicket = $('.blank.electronic').addClass("tkOld");
      }
     
     var newTicket = $(".tkNew");
     if (newTicket.size() == 0) { 
       newTicket = $("<div></div>").addClass("tkNew");
       newTicket.append(oldTicket.find('img').clone());       
       oldTicket.parent().append(newTicket);
	    
     }
     
     
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
       
	  }
    else
      sendResponse({ isSuccess: false}); // snub them.
  });
  