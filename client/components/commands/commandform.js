import React from 'react'
import { Link } from 'react-router'

export default class CommandForm extends React.Component {
  render () {
    return (
      <div>
        <div className='container command-container'>
          <form className='col-md-4 col-md-offset-4' action="/api/v1/commands" method="POST">
            <label for="username">Command Name</label>
            <input placeholder="name" type="text" name="name" id="command_name"/>

            <label for="username">Command Response</label>
            <textarea placeholder="response" name="response" id="response_text"></textarea>

            <input type="submit" name="commit" value="Create Command"/>
          </form>
        </div>
        <Link className='col-md-2 col-md-offset-5 navbutton' to='/commands/' > Back </Link>
      </div>
    )
  }
}
