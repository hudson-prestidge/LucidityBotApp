import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import Command from './command'
import CommandNavbar from './CommandNavbar'

export default class RegularCommands extends React.Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  clickHandler(id) {
    var self = this
    $.ajax({
      method: 'DELETE',
      url: '/api/v1/commands/' + id,
      success: (data) => self.forceUpdate()
    })
  }

  componentDidMount(){
    var self = this
    $.ajax({
      method: 'get',
      url: '/api/v1/commands/regularCommands',
      success: function(data){
        var commands = data.map(function(d){
          return{
          name: d.name,
          response: d.response,
          id: d.id,
          linkString: '/commands/' + d.id
          }
        })
        self.setState({commands: commands })
      }
    })
  }

  componentDidMount(){
    var self = this
    $.ajax({
      method: 'get',
      url: '/api/v1/commands/regularCommands',
      success: function(data){
        var commands = data.map(function(d){
          return{
          name: d.name,
          response: d.response,
          id: d.id,
          linkString: '/commands/' + d.id
          }
        })
        self.setState({commands: commands })
      }
    })
  }

  render () {
    return (
      <div>
          <h1> List of Bot Commands </h1>
          <Link className='col-md-2 col-md-offset-5 addbutton' to='/commands/new' > Add New Command </Link>
          <table>
            <thead>
              <tr>
                <th> Command </th>
                <th> Response </th>
              </tr>
            </thead>
            <tbody>
              {this.state.commands ?
                 this.state.commands.map((command, i) =>
                  <tr key={i}>
                    <td className='command'>{command.name}</td>
                    <td>{command.response}</td>
                    <td><Link to={command.linkString}> Edit Command </Link></td>
                    <td><button onClick={() => this.clickHandler(command.id)}> Delete Command </button></td>
                  </tr>)
                : null}
            </tbody>
          </table>
        <Link className='col-md-2 col-md-offset-5 addbutton' to='/commands/new' > Add New Command </Link>
      </div>
    )
  }
}
