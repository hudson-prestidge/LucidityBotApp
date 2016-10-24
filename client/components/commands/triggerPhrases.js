import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import Command from './command'
import CommandNavbar from './CommandNavbar'

export default class triggerPhrases extends React.Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  clickHandler() {
    var self = this
    console.log(this.props.command);
    $.ajax({
      method: 'delete',
      url: '/api/v1/commands/',
      success: function(data){

      }
    })
  }

  componentDidMount(){
    var self = this
    $.ajax({
      method: 'get',
      url: '/api/v1/commands/triggerPhrases',
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
          <h1> List of Bot Trigger Phrases </h1>
          <table>
            <thead>
              <tr>
                <th> Phrase </th>
                <th> Response </th>
              </tr>
            </thead>
            <tbody>
              {this.state.commands ?
                this.state.commands.map((command, i) =>
                  <tr key={i}>
                    <td className='command'>{command.name}</td>
                    <td>{command.response}</td>
                    <td><Link to={command.linkString}> Edit Phrase </Link></td>
                    <td><a onClick={this.clickHandler}>Delete Phrase</a></td>
                  </tr>)
                : null}
            </tbody>
          </table>
        <Link className='col-md-2 col-md-offset-5 addbutton' to='/commands/new' > Add New Phrase </Link>
      </div>
    )
  }
}
