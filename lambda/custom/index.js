/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(START_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ParrotIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'ParrotIntent';
  },
  handle(handlerInput) {
    const querySlot = handlerInput.requestEnvelope.request.intent.slots.Phrase;
    return handlerInput.responseBuilder
      .speak(`${querySlot.value}、と聞こえました。次の音文を待ちします。`)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const RouteIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'RouteIntent';
  },
  handle(handlerInput) {
    const yesSlot = handlerInput.requestEnvelope.request.intent.slots.Yes;
    const noSlot = handlerInput.requestEnvelope.request.intent.slots.No;
    if (yesSlot.value) {
      return handlerInput.responseBuilder
        .speak(HELP_MESSAGE)
        .reprompt(HELP_REPROMPT)
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak(STOP_MESSAGE)
        .getResponse();
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('申し訳ございません、エラーが発生しています')
      .reprompt('もう一度教えてください')
      .getResponse();
  },
};

const START_MESSAGE = 'パロゲームへようこそ！あなたの発音をチェックしましょう！';
const STOP_MESSAGE = 'さようなら！また呼んでください';
const HELP_MESSAGE = 'パロゲームではあなたの発音をチェックすることができます。例えば、私わベトナム人ですをチェックしてください、と言ったら、私があなたの発音を聞いて、リピートします。あなたの日本語発音チェックしましょう';
const HELP_REPROMPT = 'あなたの発音を練習しましょうか';
const ERROR_MESSAGE　= '申し訳ございません、エラーが発生しています';
const ERROR_REPROMPT　= 'もう一度教えてください';

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    ParrotIntentHandler,
    RouteIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
