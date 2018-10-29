import autobahn from 'autobahn';
import config from '../config.json';
import { initiateWAMP_Connection } from './../actions';
import { successfulWAMP_Connection } from './../actions';

class WAMPClient {
  constructor() {
    if (wampClient === this) {
      // If already initialized, return
      return;
    }

    // Wyrzuca blad poniewaz nie mozna zwracany jest tylko obiekt ktory nie jest dispatchowany
    // Ogolnie podejscie do implementacji klienta WAMP w redux jest w tym przypadku zle i musze go zmienic
    // Calosc obslugi klienta powinna byc zrobiona z wykorzystaniem akcji redux, tzn
    // przykladowo otwarcie sesji powinno byc asynchroniczna akcja redux openWampSession
    // ktora to w trakcie wykonywania rozsylalaby (po przez dispatch) akcje statyczne
    // np. connectionInitiated, connectionCompleted itp; dzieki temu calosc pracy WAMP mozna by
    // kontrolowac w reducerach
    // dodatkowo globalna zmienna z sessja wamp moze byc trzymana we store
    initiateWAMP_Connection();

    this.WAMPConnection = null;
    this.WAMPSession = { isOpen: null };
    this.sessionReady = false;

    this.topicSubscriptions = {};

    this.connect();

    return wampClient;
  }

  connect() {
    const URL = `ws://${config.crossbar.host}:${config.crossbar.port}/ws`;

    this.WAMPConnection = new autobahn.Connection({
      url: URL,
      realm: config.crossbar.realm
      //   authmethods: ['wampcra'],
      //   authid: config.analytics.auth.username,
      //   onchallenge: this.onChallenge
    });

    this.WAMPConnection.onopen = session => {
      this.WAMPSession = session;
      this.sessionReady = true;
      successfulWAMP_Connection();
    };

    this.WAMPConnection.open();
  }

  callRPC(endpoint, args) {
    return this.WAMPSession.call(endpoint, args);
  }

  subscribe(topic, handler, match = 'exact') {
    // need to be converted into promise if using dispatchAsync
    this.WAMPSession.subscribe(topic, handler, { match: match }).then(
      subscription => {
        this.topicSubscriptions[topic] = subscription;
      },
      error => {
        console.error('Topic subscription error: ' + error);
      }
    );
  }

  unsubscribe(topic) {
    // need to be converted into promise if using dispatchAsync
    this.WAMPSession.unsubscribe(this.topicSubscriptions[topic]).then(
      gone => {
        delete this.topicSubscriptions[topic];
      },
      error => {
        console.error('Topic unsubscription error: ' + error);
      }
    );
  }

  publish(topic, args, kwargs) {
    // need to be converted into promise if using dispatchAsync
    this.WAMPSession.publish(topic, args, kwargs, { acknowledge: true }).then(
      publication => {
        console.debug('Publish Acknowledged: ' + publication);
      },
      error => {
        console.error('Publish error: ' + error);
      }
    );
  }

  onChallenge(session, method, extra) {
    if (method === 'wampcra') {
      return autobahn.auth_cra.sign(
        config.analytics.auth.password,
        extra.challenge
      );
    }
  }
}

let wampClient = new WAMPClient();

let BackendAPI = {
  fetchNews(query, startDate, endDate) {
    return wampClient.callRPC('GET_GOOGLE_NEWS', [
      query,
      startDate,
      endDate,
      10 // # of news to fetch
    ]);
  },

  backendReady() {
    return wampClient.sessionReady;
  }
};

export default BackendAPI;
