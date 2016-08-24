import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'


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
          return{
          name: d.name,
          response: d.response,
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
        <div className="container command-container">
          <h1> List of bot Commands </h1>
          <table>
            <thead>
              <tr>
                <th> Command </th>
                <th> Response </th>
              </tr>
            </thead>
            <tbody>
              {this.state.commands ? this.state.commands.map((command, i) => <tr key={i}> <td className='command'>{command.name}</td><td>{command.response}</td><td><Link to={command.linkString}> Edit Command </Link> </td></tr>) : null}
            </tbody>
          </table>
        </div>
        <Link className='col-md-2 col-md-offset-5 navbutton' to='/commands/new' > Add New Command </Link>
      </div>
    )
  }
}
