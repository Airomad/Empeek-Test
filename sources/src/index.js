import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from 'reducers';
import AppContainer from 'containers/AppContainer';

const enhancer = compose(
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
  persistState(),
);

const store = createStore(
  reducer,
  enhancer,
);

ReactDOM.render(
  <Provider store={store} style={{ borderColor: 'green' }}>
    <AppContainer />
  </Provider>,
  document.getElementById('app'),
);
