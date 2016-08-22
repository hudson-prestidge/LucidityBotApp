import React from 'react'
import { Link } from 'react-router'


export default class Navbar extends React.Component {
  render () {
    return (
      <div>
        <Link to='/home'> Home </Link>
        <Link to='/commands'> Commands </Link>
        <Link to='/stats'> Stats </Link>
      </div>
    )
  }
}
