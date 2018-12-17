import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './app/layout/App';

import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';

const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(<App />, rootEl);
};
if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
