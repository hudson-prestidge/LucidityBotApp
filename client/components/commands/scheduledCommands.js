import React from 'react'
import request from 'superagent'
import { Link } from 'react-router'

import Command from './command'
import CommandNavbar from './CommandNavbar'

export default class ScheduledCommands extends React.Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  clickHandler(id) {
    request.del('/api/v1/commands/scheduledCommands/' + id)
          .end((err, res) => this.getScheduledCommands())
  }

  componentDidMount(){
    this.getScheduledCommands();
  }

  getScheduledCommands() {
    request('/api/v1/commands/scheduledCommands', (err, res) => {
      var commands = JSON.parse(res.text).map(d => {
        return {
        name: d.name,
        response: d.response,
        id: d.id,
        frequency: d.frequency,
        linkString: '/api/v1/commands/scheduledCommands/' + d.id
        }
      })
    this.setState({commands: commands })
    })
  }

  render () {
    return (
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
              {this.state.commands ?
                 this.state.commands.map((command, i) =>
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
        <Link className='col-md-2 col-md-offset-5 addbutton' to='/commands/new' > Add New Scheduled Command </Link>
      </div>
    )
  }
}
