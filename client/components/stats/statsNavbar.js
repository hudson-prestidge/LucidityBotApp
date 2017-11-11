import React from 'react'
import { Link } from 'react-router'


export default class StatsNavbar extends React.Component {
  render () {
    return (
      <div className='row navbar'>
        <Link className='col-md-offset-2 col-md-2 navbutton' to='/stats/activeusers' > Most Active Users </Link>
        <Link className='col-md-2 navbutton' to='/stats/obnoxioususers' > Most Obnoxious Users </Link>
        <Link className='col-md-2 navbutton' to='/stats/mostusedwords' > Most Used Words </Link>
        <Link className='col-md-2 navbutton' to='/stats/userStats/1' > Individual User Stats </Link>
      </div>
    )
  }
}
