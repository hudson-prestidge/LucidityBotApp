import React from 'react'
import $ from 'jquery'


export default class Commands extends React.Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount(){
    var self = this
    $.ajax({
      method: 'get',
      url: '/api/v1/commands',
      success: function(data){
        var commands = data.map(function(d){
          return {name: d.name, response: d.response}
        })
        self.setState({commands: commands })
      }
    })
  }

  render () {
    return (
      <div className="container command-container">
        <h1> List of bot Commands </h1>
        <table>
        <tr>
          <th> Command </th>
          <th> Response </th>
        </tr>
        {this.state.commands ? this.state.commands.map((command, i) => <tr key={i}> <td className='command'>{command.name}</td><td>{command.response}</td></tr>) : null}
        </table>
      </div>
    )
  }
}
