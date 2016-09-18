import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './components/App'
import Commands from './components/commands'
import Stats from './components/stats'
import Home from './components/home'
import CommandForm from './components/commandform'
import EditCommandForm from './components/editcommandform'
import MostActiveUsersGraph from './components/stats/mostActiveUsersGraph'
import MostObnoxiousUsersGraph from './components/stats/mostObnoxiousUsersGraph'
import MostUsedWordsGraph from './components/stats/mostUsedWordsGraph'

  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/commands" component={Commands}/>
        <Route path="/commands/new" component={CommandForm}/>
        <Route path="/commands/:id" component={EditCommandForm}/>
        <Route path="/stats" component = {Stats}>
          <Route path="/stats/activeusers" component={MostActiveUsersGraph}/>
          <Route path="/stats/obnoxioususers" component={MostObnoxiousUsersGraph}/>
          <Route path="/stats/mostusedwords" component={MostUsedWordsGraph}/>
        </Route>
      </Route>
    </Router>
    , document.getElementById('app')
  )
