import autobahn from 'autobahn';
import config from '../config.json';

class WAMPClient {
  constructor() {
    if (wampClient === this) {
      // If already initialized, return
      return;
    }

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
