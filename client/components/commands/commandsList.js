import React from 'react'
import { Link } from 'react-router'


export default class commandsList extends React.Component {

  constructor(props){
    super(props)
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
          </tr>)}
          </tbody>
      </table>
    )
  }
}
