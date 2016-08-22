import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './components/App'
import Commands from './components/commands'
import Stats from './components/stats'
import Home from './components/home'

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/home" component={Home}/>
      <Route path="/commands" component={Commands}/>
      <Route path="/stats" component={Stats}/>
    </Route>
  </Router>
  , document.getElementById('app'))
