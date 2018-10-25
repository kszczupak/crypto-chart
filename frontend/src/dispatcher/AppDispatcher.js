import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
  /**
   * Dispatches three actions for an async operation represented by promise.
   */
  dispatchAsync(promise, types, payload) {
    const { request, success, failure } = types;
    console.log('Dispatching promise in AsyncDispatch');

    this.dispatch({ type: request, payload: Object.assign({}, payload) });
    promise.then(
      response => {
        this.dispatch({
          type: success,
          payload: Object.assign({}, payload, { response })
        });
      },
      error =>
        this.dispatch({
          type: failure,
          payload: Object.assign({}, payload, { error })
        })
    );

    console.log('After dispatching..');
  }
}

export default new AppDispatcher();
