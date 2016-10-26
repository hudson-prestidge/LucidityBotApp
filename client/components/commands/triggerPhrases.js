import React from 'react'
import request from 'superagent'
import { Link } from 'react-router'

import Command from './command'
import CommandNavbar from './CommandNavbar'

export default class TriggerPhrases extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      display: 'list'
    }
  }

  deleteTriggerPhrase(id) {
    request.del('/api/v1/commands/' + id)
      .end((err, res) => this.getTriggerPhrases() )
  }

  showEditForm(id) {
    this.setState({display: 'edit',
                   currentCommand: this.state.commands.find((command) => command.id==id) })
  }

  showAddForm() {
    this.setState({display: 'add'})
  }

  getTriggerPhrases(){
    request('/api/v1/commands/triggerPhrases')
      .end((err, res) => {
        var commands = JSON.parse(res.text).map(d => {
          return{
          name: d.name,
          response: d.response,
          id: d.id,
          linkString: '/commands/' + d.id
          }
        })
        this.setState({commands: commands })
      })
  }

  componentDidMount(){
    this.getTriggerPhrases()
  }

  render () {
    var self = this
    return (
      <div>
        { this.state.display=='add' ?
        <div>
          <h1> Set up a new <abbr title='the bot will respond whenever it sees this phrase anywhere in chat'>trigger</abbr> phrase </h1>
          <div className='container command-container'>
            <form className='col-md-4 col-md-offset-4' action="/api/v1/commands/triggerPhrases" method="POST">
              <label htmlFor="command_name">Command Name</label>
              <input placeholder="name" type="text" name="name" id="command_name"/>

              <label htmlFor="response_text">Command Response</label>
              <textarea placeholder="response" name="response" id="response_text"></textarea>

              <input type="submit" name="commit" value="Create Command"/>
            </form>
          </div>
          <Link className='col-md-2 col-md-offset-5 navbutton' to='/commands/triggerPhrases' > Back </Link>
        </div>
        : null
      }
      { this.state.display=='edit' ?
        <div>
          <div className='container command-container'>
            <form className='col-md-4 col-md-offset-4' action={"/api/v1/commands/" + this.state.currentCommand.id} acceptCharset="UTF-8" method="POST">
                <input placeholder="name" defaultValue={this.state.currentCommand.name} type="text" name="name" id="command_name"/>
                <textarea placeholder="response" defaultValue={this.state.currentCommand.response} name="response" id="response_text"></textarea>
                <input type="submit"  name="commit" value="Edit Command"/>
            </form>
          </div>
          <Link className='col-md-2 col-md-offset-5 navbutton' to='/commands/triggerPhrases' > Back </Link>
        </div>
        : null
      }

      { this.state.display=='list' ?
        <div>
            <h1> List of Bot Trigger Phrases </h1>
            <button onClick={() => this.showAddForm()}> Create New Trigger Phrase </button>
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
                      <td><button onClick={() => this.showEditForm(command.id)}> Edit Phrase </button></td>
                      <td><button onClick={() => this.deleteTriggerPhrase(command.id)}>Delete Phrase</button></td>
                    </tr>)
                  : null}
              </tbody>
            </table>
            <button onClick={() => this.showAddForm()}> Create New Trigger Phrase </button>
        </div>
        : null
      }
      </div>



    )
  }
}
