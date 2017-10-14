chrome.runtime.onInstalled.addListener(function(details) {
  chrome.storage.sync.set({'test_url': true});
});

// listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(id, info, tab){
  tab_url = tab.url.toLowerCase();
  // if (('amazon.com' in tab_url) || ('amazon.ca' in tab_url)) {
  chrome.pageAction.show(tab.id);
  chrome.tabs.executeScript(null, {"file": "extension.js"});
  // }
});