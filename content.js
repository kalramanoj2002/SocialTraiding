// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {			
		var pendingElementsCount = $(".pending").length;
		sendResponse(pendingElementsCount);		
		if(pendingElementsCount > 0)
		{
			$(".handIcon").each(function (index, element) {
				var linkid = $(this).attr('id');
				if(linkid.indexOf('refresh') == -1)
				{
					$(this).click();
					sendResponse(pendingElementsCount);
				}
			});
			sendResponse(-1);
		}
		else{
			sendResponse(0);
		}		
    }
});