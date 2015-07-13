'use strict';


var newTicket = $("<div ng-controller='Ctrl'>ticket QR Code: <img ng-src='{{QR}}'/></div>").addClass("tkNew"); 
window.name = '';
angular.bootstrap(newTicket, ['app'])
             
       

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
     if (request.action == "GetBody") {
      
	   var oldTicket = $(".tkOld");
     if (oldTicket.size() == 0) {
        oldTicket = $('.blank.electronic').addClass("tkOld");
      }
     
     if (newTicket.parent().size() == 0) {
       var scope = angular.element(newTicket).scope();
       console.log(scope);
       scope.$apply(function(){scope.QR = oldTicket.find('img').clone().attr('src')});
       //newTicket.append(oldTicket.find('img').clone());       
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
  