import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import App from './app';
import store from './state';
import ApiContext from './api/context';
import { connect } from './api/action-cable';

const apiPerform = connect(store);

ReactDOM.render(
  <React.StrictMode>
    <ApiContext.Provider value={apiPerform}>
      <Provider store={store}>
        <ToastContainer position='top-right' autoClose={false} closeOnClick={false} draggable={false} />
        <App />
      </Provider>
    </ApiContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
