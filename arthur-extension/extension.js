
function setButtonStatus(button, url) {
  console.log('extension.js - setButtonStatus()');
  chrome.storage.sync.get(url, (item) => {
    if (item[url] === "true") {
      button.innerHTML = 'Unrecommend to Arthur';
      button.setAttribute('style', 'width: 100%; margin: 10px 0; background-color: rgb(200, 50, 50); color: white');
      button.setAttribute('data-value', false);
    } else {
      button.innerHTML = 'Recommend to Arthur';
      button.setAttribute('style', 'width: 100%; margin: 10px 0; background-color: rgb(240, 193, 75)');
      button.setAttribute('data-value', true);
    }
  });
}

function recommend() {
  console.log('extension.js - Recommend()');
  var url = window.location.toString();
  var items = {};
  var button = document.getElementById('arthurRecommendBtn');
  items[url] = button.getAttribute('data-value');
  chrome.storage.sync.set(items);
  setButtonStatus(button, url);
}

function addButton(sibling) {
  var url = window.location.toString();
  var button = document.createElement("button");
  button.setAttribute('id','arthurRecommendBtn');
  button.setAttribute('style', 'width: 100%; margin: 10px 0; background-color: rgb(240, 193, 75)');
  setButtonStatus(button, url);
  sibling.parentNode.insertBefore(button, sibling.nextSibling);

  button.addEventListener('click', recommend);
}

var rightCol   = document.getElementById('rightCol');
var firstChild = rightCol.childNodes[1];

if (rightCol && firstChild) {
  addButton(firstChild);
}
