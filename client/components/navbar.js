import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

export default class Navbar extends React.Component {

  logout () {
    console.log('clicking the logout button');
    $.ajax({
      method: 'get',
      url: '/logout'
    })
  }

  render () {
    return (
      <div className='row navbar'>
        <div className='col-md-3 logo'>Lucidity Bot</div>
        <Link className='col-md-2 navbutton' to='/home' > Home </Link>
        <Link className='col-md-2 navbutton' to='/commands' > Commands </Link>
        <Link className='col-md-2 navbutton' to='/stats' > Stats </Link>
        <button className='logout-btn' onClick={this.logout}> Logout </button>
      </div>
    )
  }
}
