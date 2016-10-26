// import React from 'react'
// import $ from 'jquery'
// import { Link } from 'react-router'
// import Command from './command'
// import CommandNavbar from './CommandNavbar'
//
// export default class RegularCommands extends React.Component {
//
//   constructor(props){
//     super(props)
//     this.state = {
//
//     }
//   }
//
//   clickHandler(id) {
//     var self = this
//     $.ajax({
//       method: 'DELETE',
//       url: '/api/v1/commands/' + id,
//       success: (data) => self.forceUpdate()
//     })
//   }
//
//   componentDidMount(){
//     var self = this
//     $.ajax({
//       method: 'get',
//       url: '/api/v1/commands/regularCommands',
//       success: function(data){
//         var commands = data.map(function(d){
//           return{
//           name: d.name,
//           response: d.response,
//           id: d.id,
//           linkString: '/commands/' + d.id
//           }
//         })
//         self.setState({commands: commands })
//       }
//     })
//   }
//
//   componentDidMount(){
//     var self = this
//     $.ajax({
//       method: 'get',
//       url: '/api/v1/commands/regularCommands',
//       success: function(data){
//         var commands = data.map(function(d){
//           return{
//           name: d.name,
//           response: d.response,
//           id: d.id,
//           linkString: '/commands/' + d.id
//           }
//         })
//         self.setState({commands: commands })
//       }
//     })
//   }
//
//   render () {
//     return (
//       <div>
//           <h1> List of Bot Commands </h1>
//           <Link className='col-md-2 col-md-offset-5 addbutton' to='/commands/new' > Add New Command </Link>
//           <table>
//             <thead>
//               <tr>
//                 <th> Command </th>
//                 <th> Response </th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.commands ?
//                  this.state.commands.map((command, i) =>
//                   <tr key={i}>
//                     <td className='command'>{command.name}</td>
//                     <td>{command.response}</td>
//                     <td><Link to={command.linkString}> Edit Command </Link></td>
//                     <td><button onClick={() => this.clickHandler(command.id)}> Delete Command </button></td>
//                   </tr>)
//                 : null}
//             </tbody>
//           </table>
//         <Link className='col-md-2 col-md-offset-5 addbutton' to='/commands/new' > Add New Command </Link>
//       </div>
//     )
//   }
// }

import React from 'react'
import request from 'superagent'
import { Link } from 'react-router'

import Command from './command'
import CommandNavbar from './CommandNavbar'

export default class RegularCommands extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      display: 'list'
    }
  }

  deleteCommand(id) {
    request.del('/api/v1/commands/' + id)
      .end((err, res) => this.getCommands() )
  }

  showEditForm(id) {
    this.setState({display: 'edit',
                   currentCommand: this.state.commands.find((command) => command.id==id) })
  }

  showAddForm() {
    this.setState({display: 'add'})
  }

  getCommands(){
    request('/api/v1/commands/')
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
    this.getCommands()
  }

  render () {
    var self = this
    return (
      <div>
        { this.state.display=='add' ?
        <div>
          <h1> Set up a new command </h1>
          <div className='container command-container'>
            <form className='col-md-4 col-md-offset-4' action="/api/v1/commands/" method="POST">
              <label htmlFor="command_name">Command Name</label>
              <input placeholder="name" type="text" name="name" id="command_name"/>

              <label htmlFor="response_text">Command Response</label>
              <textarea placeholder="response" name="response" id="response_text"></textarea>

              <input type="submit" name="commit" value="Create Command"/>
            </form>
          </div>
          <Link className='col-md-2 col-md-offset-5 navbutton' to='/commands/regularCommands'> Back </Link>
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
          <Link className='col-md-2 col-md-offset-5 navbutton' to='/commands/regularCommands' > Back </Link>
        </div>
        : null
      }

      { this.state.display=='list' ?
        <div>
            <h1> List of Bot Commands </h1>
            <button onClick={() => this.showAddForm()}> Create New Command </button>
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
                      <td><button onClick={() => this.showEditForm(command.id)}> Edit Command </button></td>
                      <td><button onClick={() => this.deleteCommand(command.id)}>Delete Command</button></td>
                    </tr>)
                  : null}
              </tbody>
            </table>
            <button onClick={() => this.showAddForm()}> Create New Command </button>
        </div>
        : null
      }
      </div>



    )
  }
}
