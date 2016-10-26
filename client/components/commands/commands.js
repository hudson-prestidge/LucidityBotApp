import React from 'react'
import { Link } from 'react-router'
import Command from './command'
import CommandNavbar from './CommandNavbar'

export default class Commands extends React.Component {

  constructor(props) {
    super(props)
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
