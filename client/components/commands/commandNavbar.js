import React from 'react'
import { Link } from 'react-router'


export default class CommandNavbar extends React.Component {
  render () {
    return (
      <div className='row navbar'>
        <Link className='col-md-offset-3 col-md-2 navbutton' to='/commands/regularCommands' > Regular Commands </Link>
        <Link className='col-md-2 navbutton' to='/commands/triggerPhrases' > Trigger Phrases </Link>
        <Link className='col-md-2 navbutton' to='/commands/scheduledCommands' > Scheduled Commands </Link>
      </div>
    )
  }
}
