'use strict';

const axios = require('axios');
const _ = require('lodash');

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library

const googleAssistantRequest = 'google'; // Constant to identify Google Assistant requests

const FIREBASE_ROOT_URL = 'https://newagent-cb752.firebaseio.com';
const FIREBASE_SERVICES_URL = `${FIREBASE_ROOT_URL}/resources/services.json`;
const FIREBASE_KNOWLEDGE_URL = `${FIREBASE_ROOT_URL}/resources/knowledge.json`;
const FIREBASE_PRODUCTS_URL = `${FIREBASE_ROOT_URL}/resources/products.json`;
const FIREBASE_USER_URL = `${FIREBASE_ROOT_URL}/users.json`;

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // An action is a string used to identify what needs to be done in fulfillment
  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters

  // Parameters are any entites that Dialogflow has extracted from the request.
  const parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters

  // Contexts are objects used to track and store conversation state
  const inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts

  // Get the request source (Google Assistant, Slack, API, etc) and initialize DialogflowApp
  const requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
  const app = new DialogflowApp({request: request, response: response});

  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'input.welcome': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      if (requestSource === googleAssistantRequest) {
        sendGoogleResponse('aHello, Welcome to my Dialogflow agent!'); // Send simple response to user
      } else {
        sendResponse('aHello, Welcome to my Dialogflow agent!'); // Send simple response to user
      }
    },
    // The default fallback intent has been matched, try to recover (https://dialogflow.com/docs/intents#fallback_intents)
    'input.unknown': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      if (requestSource === googleAssistantRequest) {
        sendGoogleResponse('I\'m having trouble, can you try that again?'); // Send simple response to user
      } else {
        sendResponse('I\'m having trouble, can you try that again?'); // Send simple response to user
      }
    },
    'find-service': () => {
      if (requestSource === googleAssistantRequest) {
        axios.get(FIREBASE_SERVICES_URL)
          .then((resp) => handleFindService(resp.data, parameters))
          .catch((err) => sendResponse('Sorry, I could not find a service. 😟'));
      } else {
        sendResponse('You are not using google assistant.'); 
      }
    },
    'find-knowledge': () => {
      if (requestSource === googleAssistantRequest) {
        axios.get(FIREBASE_KNOWLEDGE_URL)
          .then((resp) => handleFindKnowledge(resp.data, parameters))
          .catch((err) => sendResponse('Sorry, I could not find that knowledge. 😟'));
      } else {
        sendResponse('You are not using google assistant.'); 
      }
    },
    'find-products': () => {
      if (requestSource === googleAssistantRequest) {
        axios.get(FIREBASE_PRODUCTS_URL)
          .then((resp) => handleFindProducts(resp.data, parameters, request.body))
          .catch((err) => sendResponse('Sorry, I could not find a product. 😟'));
      } else {
        sendResponse('You are not using google assistant.'); 
      }
    },
    'recent-products': () => {
      if (requestSource === googleAssistantRequest) {
        axios.get(FIREBASE_PRODUCTS_URL)
          .then((resp) => handleFindRecentProduct(resp.data, parameters, request.body))
          .catch((err) => sendResponse('recent products failed'));
      } else {
        sendResponse('You are not using google assistant.'); 
      }
    },
    'community': () => {
      if (requestSource === googleAssistantRequest) {
        axios.get(FIREBASE_USER_URL)
          .then((resp) => handleFindUser(resp.data, parameters, request.body))
          .catch((err) => sendResponse('user url failed'));
      } else {
        sendResponse('You are not using google assistant.'); 
      }
    },
    // Default handler for unknown or undefined actions
    'default': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      if (requestSource === googleAssistantRequest) {
        let responseToUser = {
          googleRichResponse: googleRichResponse, // Optional, uncomment to enable
          //googleOutputContexts: ['weather', 2, { ['city']: 'rome' }], // Optional, uncomment to enable
          speech: 'aThis message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
          displayText: 'aThis is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
        };
        sendGoogleResponse(responseToUser);
      } else {
        let responseToUser = {
          //richResponses: richResponses, // Optional, uncomment to enable
          //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
          speech: 'aThis message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
          displayText: 'aThis is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
        };
        sendResponse(responseToUser);
      }
    }
  };

  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }

  console.log("try to find action hanlder");
  // Run the proper handler function to handle the request from Dialogflow
  actionHandlers[action]();

  // Function to send correctly formatted Google Assistant responses to Dialogflow which are then sent to the user
  function sendGoogleResponse (responseToUser, withCarousel=false) {
    if (typeof responseToUser === 'string') {
      app.ask(responseToUser); // Google Assistant response
    } else {
      // If speech or displayText is defined use it to respond
      let googleResponse = app.buildRichResponse().addSimpleResponse({
        speech: responseToUser.speech || responseToUser.displayText,
        displayText: responseToUser.displayText || responseToUser.speech
      });

      // Optional: Overwrite previous response with rich response
      if (responseToUser.googleRichResponse) {
        googleResponse = responseToUser.googleRichResponse;
      }

      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      if (responseToUser.googleOutputContexts) {
        app.setContext(...responseToUser.googleOutputContexts);
      }

      app.ask(googleResponse); // Send response to Dialogflow and Google Assistant
    }
  }

  // Function to send correctly formatted responses to Dialogflow which are then sent to the user
  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; // spoken response
      responseJson.displayText = responseToUser; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      // If the response to the user includes rich responses or contexts send them to Dialogflow
      let responseJson = {};

      // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
      responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;

      // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
      responseJson.data = responseToUser.richResponses;

      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      responseJson.contextOut = responseToUser.outputContexts;

      response.json(responseJson); // Send response to Dialogflow
    }
  }

  function handleFindService(data, parameters) {
    // find the first data object with that category
    const resource = _.find(data, (service) => _.includes(service.category, parameters['service-category']) );

    // build rich response
    let serviceResponse = app.buildRichResponse()
      .addSimpleResponse(`${resource.name} has been recommended by Ari users.`)
      .addSuggestions(
        ['Suggestion Chip', 'Another Suggestion Chip'])
      .addBasicCard(app.buildBasicCard(`${resource.description}.  \n 5 Ari users have recommended this person. Read their reviews!`) 
        .setTitle(resource.name)
        .addButton('Visit', resource.url)
        .setImage(resource.imgUrl, 'Photo of physio'));

    let responseToUser = { 
      googleRichResponse: serviceResponse,
      speech: "(FallBack) Here is a reccommendation ",
      displayText: "(FallBack) Here is a reccommendation "
  
    }
    sendGoogleResponse(responseToUser);
  }

  function handleFindKnowledge(data, parameters) {
    // find the first data object with that category
    const resource = _.find(data, (knowledge) => _.includes(knowledge.category, parameters['knowledge-category']) );

    // build rich response
    let knowledgeResponse = app.buildRichResponse()
      .addSimpleResponse(`Ari users have found this ${resource.type} helpful, it is called ${resource.name}`)
      .addBasicCard(app.buildBasicCard(`${resource.description}.  \n This ${resource.type} has been recommended 2 times by Ari users. See their Reviews!`) 
        .setTitle(resource.name)
        .addButton('Visit', resource.url)
        .setImage(resource.imgUrl, 'Check it out!'));

    let responseToUser = { 
      googleRichResponse: knowledgeResponse,
      speech: "(FallBack) Here is a reccommendation ",
      displayText: "(FallBack) Here is a reccommendation "
  
    }
    sendGoogleResponse(responseToUser);
  }

  function handleFindProducts(data, parameters, requestBody) {
    console.log(requestBody);

    // find the first data object with that category
    const resource = _.find(data, (product) => _.includes(product.category, parameters['product-category']) );

    console.log(resource);
    // build rich response
    let productResponse = app.buildRichResponse()
      .addSimpleResponse(`This product has received good recommendations. It is called ${resource.name}`)
      .addBasicCard(app.buildBasicCard(`${resource.description}.  \n This product has been recommended by 3 user in the Ari Network. See their reviews!`) 
        .setTitle(resource.name)
        .addButton('Visit', resource.url)
        .setImage(resource.imgUrl, 'Check it out!'));

    let responseToUser = { 
      googleRichResponse: productResponse,
      speech: "(FallBack) Here is a reccommendation ",
      displayText: "(FallBack) Here is a reccommendation "
  
    }
    sendGoogleResponse(responseToUser);
  }

  function handleFindRecentProduct(data, parameters, requestBody) {
    console.log(requestBody);

    // find the first data object with that category
    data = Object.keys(data).map(key => data[key]);
    console.log('data', data);
    const resource = data[data.length-1];

    // build rich response
    let productResponse = app.buildRichResponse()
      .addSimpleResponse(`${resource.name} was recently recomended by an Ari user.`)
      .addBasicCard(app.buildBasicCard(resource.description) 
        .setTitle(resource.name)
        .addButton('Visit', resource.url)
        .setImage(resource.imgUrl, 'Check it out!'));

    let responseToUser = { 
      googleRichResponse: productResponse,
      speech: "(FallBack) Here is a reccommendation ",
      displayText: "(FallBack) Here is a reccommendation "

    }
    sendGoogleResponse(responseToUser);
  }

  function handleFindUser(data, parameters, requestBody) {
    console.log(requestBody);
    console.log('handle user');
    // find the first data object with that category
    const resource = data[data.length-1];

    console.log('hi');
    console.log(resource);
    // build rich response
    let productResponse = app.buildRichResponse()
      .addSimpleResponse(`${resource.name} might be able to share their experiences`)
      .addBasicCard(app.buildBasicCard(resource.description) 
        .setTitle(resource.name)
        .addButton('Contact', resource.contact.url)
        .setImage(resource.imgUrl, 'Check it out!'));

    let responseToUser = { 
      googleRichResponse: productResponse,
      speech: "(FallBack) Here is a reccommendation ",
      displayText: "(FallBack) Here is a reccommendation "

    }
    sendGoogleResponse(responseToUser);
  }
});

// Construct rich response for Google Assistant
const app = new DialogflowApp();
const googleRichResponse = app.buildRichResponse()
  .addSimpleResponse('This is the first simple response for Google Assistant')
  .addSuggestions(
    ['Suggestion Chip', 'Another Suggestion Chip'])
    // Create a basic card and add it to the rich response
  .addBasicCard(app.buildBasicCard(`This is a basic card.  Text in a
 basic card can include "quotes" and most other unicode characters
 including emoji 📱.  Basic cards also support some markdown
 formatting like *emphasis* or _italics_, **strong** or __bold__,
 and ***bold itallic*** or ___strong emphasis___ as well as other things
 like line  \nbreaks`) // Note the two spaces before '\n' required for a
                        // line break to be rendered in the card
    .setSubtitle('This is a subtitle')
    .setTitle('Title: this is a title')
    .addButton('This is a button', 'https://assistant.google.com/')
    .setImage('https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
      'Image alternate text'))
  .addSimpleResponse({ speech: 'This is another simple response',
    displayText: 'This is the another simple response 💁' });

// Rich responses for both Slack and Facebook
const richResponses = {
  'slack': {
    'text': 'This is a text response for Slack.',
    'attachments': [
      {
        'title': 'Title: this is a title',
        'title_link': 'https://assistant.google.com/',
        'text': 'This is an attachment.  Text in attachments can include \'quotes\' and most other unicode characters including emoji 📱.  Attachments also upport line\nbreaks.',
        'image_url': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        'fallback': 'This is a fallback.'
      }
    ]
  },
  'facebook': {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [
          {
            'title': 'Title: this is a title',
            'image_url': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
            'subtitle': 'This is a subtitle',
            'default_action': {
              'type': 'web_url',
              'url': 'https://assistant.google.com/'
            },
            'buttons': [
              {
                'type': 'web_url',
                'url': 'https://assistant.google.com/',
                'title': 'This is a button'
              }
            ]
          }
        ]
      }
    }
  }
};
