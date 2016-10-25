import React from 'react'
import $ from 'jquery'
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
    var self = this
    $.ajax({
      method: 'DELETE',
      url: '/api/v1/commands/scheduledCommands/' + id,
      success: function(data){
        self.forceUpdate()
      }
    })
  }

  componentDidMount(){
    var self = this
    $.ajax({
      method: 'get',
      url: '/api/v1/commands/scheduledCommands',
      success: function(data){
        var commands = data.map(function(d){
          return{
          name: d.name,
          response: d.response,
          id: d.id,
          frequency: d.frequency,
          linkString: 'api/v1/commands/scheduledCommands/' + d.id
          }
        })
        self.setState({commands: commands })
      }
    })
  }

componentWillUpdate(){
      var self = this
      $.ajax({
        method: 'get',
        url: '/api/v1/commands/scheduledCommands',
        success: function(data){
          var commands = data.map(function(d){
            return{
            name: d.name,
            response: d.response,
            id: d.id,
            frequency: d.frequency,
            linkString: 'api/v1/commands/scheduledCommands/' + d.id
            }
          })
          self.setState({commands: commands })
        }
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
                        <input type='text' name='frequency' defaultValue={command.frequency}/>
                        <input type='submit' value='Edit Frequency'/>
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
