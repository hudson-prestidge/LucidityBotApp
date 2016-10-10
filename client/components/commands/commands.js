import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import Command from './command'
import CommandNavbar from './CommandNavbar'

export default class Commands extends React.Component {

  constructor(props) {
    super(props)
    this.state = {currentCommandId: null}
    console.log(this.state)
  }

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
