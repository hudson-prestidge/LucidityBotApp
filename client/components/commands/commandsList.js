import React from 'react'
import { Link } from 'react-router'
import request from 'superagent'


export default class commandsList extends React.Component {

  constructor(props){
    super(props)
  }

  clickHandler(id) {
    request.post('/api/v1/commands/scheduledCommands/new/' + id)
      .end((err, res) => {     })
  }

  render () {
    return (
      <table>
        <thead>
          <tr>
            <th> Command </th>
            <th> Response </th>
          </tr>
        </thead>
        <tbody>
         {this.props.commands.map((command, i) =>
          <tr key={i}>
            <td className='command'>{command.name}</td>
            <td>{command.response}</td>
            <td><button onClick={() => this.clickHandler(command.id)}> Repeat This Command</button></td>
          </tr>)}
          </tbody>
      </table>
    )
  }
}
