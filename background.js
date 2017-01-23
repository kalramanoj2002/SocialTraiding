// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]socialtrade.biz[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?socialtrade\.biz/;

var current_tab;
var _selectedTimings;

// A function to use as callback
function responseFromContentWindow(pendingElementsCount) {
	console.log('Pending Elements:' + pendingElementsCount);
	chrome.storage.sync.get({
		'selectedTimings': 35000,
	  }, function(items) {
		_selectedTimings = items.selectedTimings;
	  });
	console.log('selectedTimings:'+ _selectedTimings);
	if(_selectedTimings == undefined)
	{
		_selectedTimings = 35000;
	}
	if(pendingElementsCount > 0){
		setTimeout(clickLink, _selectedTimings);
	}
}

function clickLink()
{
	if (urlRegex.test(current_tab.url)) {
	chrome.tabs.sendMessage(current_tab.id, {text: 'report_back'}, responseFromContentWindow);
	}
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
		current_tab = tab;
		clickLink();
    }
});