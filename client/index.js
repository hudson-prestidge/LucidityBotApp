import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './components/App'
import Commands from './components/commands'
import Stats from './components/stats'
import Home from './components/home'
import CommandForm from './components/commandform'

  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/commands" component={Commands}/>
        <Route path="/commands/new" component={CommandForm}/>
        <Route path="/stats" component={Stats}/>
      </Route>
    </Router>
    , document.getElementById('app')
  )
