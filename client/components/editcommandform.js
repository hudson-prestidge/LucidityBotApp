import React from 'react'
import { Link } from 'react-router'

export default class EditCommandForm extends React.Component {

  constructor (props) {
    super(props)
    var urlString = "/api/v1/commands/" + this.props.params.id
    this.state = {
      url: urlString
    }
  }

  render () {
    return (
      <div>
        <div className='container command-container'>
          <form className='col-md-4 col-md-offset-4' action={this.state.url} accept-charset="UTF-8" method="post">
              <input placeholder="name" type="text" name="name" id="command_name"/>
              <textarea placeholder="response" name="response" id="response_text"></textarea>
              <input type="submit" name="commit" value="Edit Command"/>
          </form>
        </div>
        <Link className='col-md-2 col-md-offset-5 navbutton' to='/commands/' > Back </Link>
      </div>
    )
  }
}
