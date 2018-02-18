import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';
import App from './components/app';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import rootEpic from './epics';

import './index.css';

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(reducers, applyMiddleware(epicMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
