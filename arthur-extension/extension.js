var xhr = new XMLHttpRequest();

function scrapeItemData(url) {
  // return JSON.stringify({
  //   category: ['Poop_category'],
  //   description: 'Poop_description',
  //   imgUrl: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_large.png?v=1480481059',
  //   name: 'Poop_name',
  //   url: 'https://www.amazon.ca/BigMouth-Inc-Coffee-Makes-Brown/dp/B00LCFKO44/ref=sr_1_3?s=kitchen&ie=UTF8&qid=1508023263&sr=1-3&keywords=poop'
  // });


  // .innerHTML

  return JSON.stringify({
    // category: Array.from(document.getElementById('wayfinding-breadcrumbs_feature_div').children[0].children).map((breadcrumb) => {
    //   var bc = breadcrumb.children[0].children[0]
    //   if (bc) {
    //     return bc.innerHTML.trim();
    //   }
    // }).filter(function(n){ return n != undefined }),
    category: [document.getElementsByClassName('nav-search-dropdown')[0].options[document.getElementsByClassName('nav-search-dropdown')[0].selectedIndex].innerHTML.replace('&amp;','&')],
    description: Array.from(document.getElementById('feature-bullets').children[0].children).map((i) => {
      return i.firstChild.innerHTML.trim();
    }).join('\n'),
    imgUrl: document.getElementById('imgTagWrapperId').children[0].src,
    name: document.getElementById('productTitle').innerHTML.trim(),
    url: url
  });
}

function postRecommendation(recommend, url) {
  xhr.open("POST", 'https://newagent-cb752.firebaseio.com/resources/products.json');
  // xhr.open("POST", 'https://newagent-cb752.firebaseio.com/resources/test.json');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
        console.log('OK ' + xhr.responseText);
    }
    else if (xhr.status !== 200) {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send(scrapeItemData(url));
  // console.log(JSON.parse(scrapeItemData(url)));
}

function setButtonStatus(button, url) {
  console.log('extension.js - setButtonStatus()');
  chrome.storage.sync.get(url, (item) => {
    if (item[url] === "true") {
      button.innerHTML = 'Unrecommend to Arthur';
      button.setAttribute('style', 'width: 100%; margin: 10px 0; background-color: rgb(200, 50, 50); color: white');
      button.setAttribute('data-value', false);
      postRecommendation(true, url);
    } else {
      button.innerHTML = 'Recommend to Arthur';
      button.setAttribute('style', 'width: 100%; margin: 10px 0; background-color: rgb(240, 193, 75)');
      button.setAttribute('data-value', true);
      // postRecommendation(false, url);
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

// category (array)
// description
// imgUrl
// name
// url