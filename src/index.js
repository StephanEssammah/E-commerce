import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>

      <BrowserRouter>
        <App className="app"/>
      </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);