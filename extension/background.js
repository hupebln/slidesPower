chrome.runtime.onMessage.addListener(function requested(request) {
  if (request.method === 'resize') {
    if (request.screenheight === request.windowinnerheight) {
      chrome.power.requestKeepAwake("display");
      console.log('keep awake');
    }
    else {
      chrome.power.releaseKeepAwake();
      console.log('release awake');
    }
  }
});

function changeIcon(activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function (tab) {
		if (RegExp("^https://docs.google.com/presentation/.*$").test(tab.url)) {
			chrome.browserAction.setIcon({path: "images/slidesPower_32x32.png"});
		}
		else {
			chrome.browserAction.setIcon({path: "images/slidesPower_gray_32x32.png"});
		}
	});
};

chrome.tabs.onActivated.addListener(changeIcon);
chrome.tabs.onUpdated.addListener(function (tId, changeInfo, tab) {changeIcon({tabId: tId});});