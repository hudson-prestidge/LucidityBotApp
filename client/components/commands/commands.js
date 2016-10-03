import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import Command from './command'
import CommandNavbar from './CommandNavbar'

export default class Commands extends React.Component {

  render () {
    return (
      <div>
        <div className="container command-container">
          <CommandNavbar />
          {this.props.children}
        </div>
      </div>
    )
  }
}

//{this.state.commands ? this.state.commands.map((command, i) => {<Command body={command} key={i} />}) : null}
