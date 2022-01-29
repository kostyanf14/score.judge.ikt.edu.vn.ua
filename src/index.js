import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './app';
import store from './state';
import ApiContext from './api/context';
import { connect } from './api/action-cable';

const task = parseInt(window.location.pathname.slice(1));
const apiPerform = connect(task, store);

if (task) {
  ReactDOM.render(
    <React.StrictMode>
      <ApiContext.Provider value={apiPerform}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApiContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
} else {
  alert('error: no task id');
}
