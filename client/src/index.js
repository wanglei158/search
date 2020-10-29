import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Add from './add/index.jsx'
import His from './sreachHistory/index'
import reportWebVitals from './reportWebVitals';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

import { Router, Route } from 'react-router';

import { createBrowserHistory } from 'history'

i18n.use(locale);

function Menu() {
  return (<div style={{ 'textAlign': 'center', display: "flex", justifyContent: 'space-around' }}>
    <a href="/list">list</a>

    <a href="/add">add</a>

    <a href="/his">search history</a>
  </div>)
}


ReactDOM.render((
  <div>
    <Router history={createBrowserHistory()}>
      <Menu />
      <Route path="/list" component={App}></Route>
      <Route path="/add" component={Add}></Route>
      <Route path="/his" component={His}></Route>

    </Router>
  </div>
),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
