import React from 'react'
import { Link } from 'react-router'


export default class Navbar extends React.Component {
  render () {
    return (
      <div className='row navbar'>
        <Link className='col-md-2 col-md-offset-3 navbutton' to='/home' > Home </Link>
        <Link className='col-md-2 navbutton' to='/commands' > Commands </Link>
        <Link className='col-md-2 navbutton' to='/stats' > Stats </Link>
      </div>
    )
  }
}
