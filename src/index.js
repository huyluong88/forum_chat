import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, hashHistory } from 'react-router'
import Forum from './Forum'


ReactDOM.render(
  <Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/:forum" component={Forum}/>
  </Route>
</Router>,
document.getElementById('root')
);
