import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/home'
import Commands from './components/commands/commands'
import CommandForm from './components/commands/commandform'
import EditCommandForm from './components/commands/editcommandform'
import RegularCommands from './components/commands/regularCommands'
import TriggerPhrases from './components/commands/triggerPhrases'
import ScheduledCommands from './components/commands/scheduledCommands'
import Stats from './components/stats/stats'
import MostActiveUsersGraph from './components/stats/mostActiveUsersGraph'
import MostObnoxiousUsersGraph from './components/stats/mostObnoxiousUsersGraph'
import MostUsedWordsGraph from './components/stats/mostUsedWordsGraph'

  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/commands" component={Commands}>
          <Route path="regularCommands" component={RegularCommands}/>
          <Route path="triggerPhrases" component={TriggerPhrases}/>
          <Route path="scheduledCommands" component={ScheduledCommands}/>
        </Route>

        <Route path="/stats" component = {Stats}>
          <Route path="/stats/activeusers" component={MostActiveUsersGraph}/>
          <Route path="/stats/obnoxioususers" component={MostObnoxiousUsersGraph}/>
          <Route path="/stats/mostusedwords" component={MostUsedWordsGraph}/>
        </Route>
      </Route>
    </Router>
    , document.getElementById('app')
  )
