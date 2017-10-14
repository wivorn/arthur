
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}


function recommend() {
  console.log('popup.js - Recommend()');

  getCurrentTabUrl((url) => {
    var items = {};
    items[url] = true;
    chrome.storage.sync.set(items);
  });
}

function getRecommendStatus(url, callback) {
  chrome.storage.sync.get(url, (items) => {
    callback(chrome.runtime.lastError ? null : items[url]);
  });
}

function getRecommendedItems(callback) {
  console.log('popup.js - getRecommendedItems()');
  chrome.storage.sync.get(null, (items) => {
    callback(items);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('popup.js - DOMContentLoaded');
  // document.getElementById('arthurRecommendBtn').addEventListener('onclick', recommend());

  var container = document.getElementById('container');
  // Load the recommended pages
  getRecommendedItems(function(items) {
    console.log('popup.js - getRecommendedItems - callback');
    for (var key in items) {
      var itemP = document.createElement("p");
      itemP.innerHTML = `${key}\n`;
      container.appendChild(itemP);
    }
  });

  // getCurrentTabUrl((url) => {
  //   getRecommendStatus(url, function(item) {
  //     var itemDiv = document.createElement("p");
  //     itemDiv.innerHTML = `${item}\n`;
  //     container.appendChild(itemDiv);
  //   });
  // });
});
