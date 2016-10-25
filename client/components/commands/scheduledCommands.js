import React from 'react'
import request from 'superagent'
import { Link } from 'react-router'

import Command from './command'
import CommandNavbar from './commandNavbar'
import CommandsList from './commandsList'

export default class ScheduledCommands extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showList: false
    }
  }

  clickHandler(id) {
    request.del('/api/v1/commands/scheduledCommands/' + id)
          .end((err, res) => this.getScheduledCommands())
  }

  componentDidMount(){
    this.getScheduledCommands()
    this.getCommands()
  }

  getScheduledCommands() {
    request('/api/v1/commands/scheduledCommands', (err, res) => {
      var scheduledCommands = JSON.parse(res.text).map(d => {
        return {
        name: d.name,
        response: d.response,
        id: d.id,
        frequency: d.frequency,
        linkString: '/api/v1/commands/scheduledCommands/' + d.id
        }
      })
    this.setState({scheduledCommands: scheduledCommands })
    })
  }

  getCommands() {
    request('/api/v1/commands/', (err, res) => {
      var commands = JSON.parse(res.text).map(d => {
        return {
        name: d.name,
        response: d.response,
        id: d.id,
        linkString: '/api/v1/commands/' + d.id
        }
      })
      this.setState({commands: commands })
    })
  }

  render () {
    return (
      <div>
        { this.state.showList ?
          <div>
            <h1> Select the command you want to repeat! </h1>
            < CommandsList commands={this.state.commands} parent={this}/>
          </div> :
          <div>
            <h1> List of Scheduled Bot Commands </h1>
              <table>
                <thead>
                  <tr>
                    <th> Command </th>
                    <th> Response </th>
                    <th> <abbr title="How often the command runs, measured in seconds">Frequency</abbr></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.scheduledCommands ?
                  this.state.scheduledCommands.map((command, i) =>
                    <tr key={i}>
                      <td className='command'>{command.name}</td>
                      <td>{command.response}</td>
                      <td>
                        <form action={command.linkString} method='POST'>
                          <input type='text' name='frequency' id='frequency' defaultValue={command.frequency}/>
                          <input type='submit' name="commit" value='Set Frequency'/>
                        </form>
                      </td>
                      <td><button onClick={() => this.clickHandler(command.id)}> Stop Repeating </button></td>
                    </tr>)
                  : null}
              </tbody>
        </table>
      <button className='col-md-2 col-md-offset-5' onClick={() => this.setState({showList: true})}> Add New Scheduled Command </button>
      </div>
    }
      </div>
    )
  }
}
