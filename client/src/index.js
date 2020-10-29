import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Add from './add/index.jsx'
import His from './sreachHistory/index'
import reportWebVitals from './reportWebVitals';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

import { Router, Route, BrowserRouter, Link, Switch } from 'react-router-dom';

import { createHashHistory } from 'history'

i18n.use(locale);

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curindex: 1
    }
  }
  getswitch(num) {
    this.setState({
      curindex: num
    })
    console.log(num)
  }
  render() {
    const index = this.state.curindex;
    let content = null;
    if (index === 1) {
      content = <App />
    }
    if (index === 2) {
      content = <Add />
    }
    if (index === 3) {
      content = <His />
    }
    return (<div>
      <span style={{ cursor: "pointer", marginLeft: '24px', color: "blue" }} onClick={this.getswitch.bind(this, 1)}>list</span>
      <span style={{ cursor: "pointer", marginLeft: '24px', color: "blue" }} onClick={this.getswitch.bind(this, 2)}>add</span>
      <span style={{ cursor: "pointer", marginLeft: '24px', color: "blue" }} onClick={this.getswitch.bind(this, 3)}>search hostory</span>
      {
        content
      }
    </div>)
  }
}


ReactDOM.render(
  <Menu />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
