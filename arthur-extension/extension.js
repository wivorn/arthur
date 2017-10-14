
function recommend() {
  console.log('extension.js - Recommend()');
  function getCurrentTabUrl(callback) {
    console.log('extension.js - getCurrentTabUrl()');
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

  getCurrentTabUrl((url) => {
    var items = {};
    items[url] = true;
    chrome.storage.sync.set(items);
  });
}

function addButton(sibling) {
  var button = document.createElement("button");
  button.setAttribute('id','arthurRecommendBtn');
  button.setAttribute('style', 'width: 100%; margin: 10px 0; background-color: rgb(240, 193, 75)');
  button.innerHTML = 'Recommend to Arthur?';
  sibling.parentNode.insertBefore(button, sibling.nextSibling);

  // button.addEventListener('onclick', recommend());
}

var rightCol        = document.getElementById('rightCol');
var firstChild      = rightCol.childNodes[1];

if (rightCol && firstChild) {
  addButton(firstChild);
}
