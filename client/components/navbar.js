import React from 'react'
import { Link } from 'react-router'
import request from 'superagent'

export default class Navbar extends React.Component {

  logout () {
    request.post('/logout')
      .end((err, res) => {})
  }

  render () {
    return (
      <div className='row navbar'>
        <div className='col-md-3 logo'>Lucidity Bot</div>
        <Link className='col-md-2 navbutton' to='/home' > Home </Link>
        <Link className='col-md-2 navbutton' to='/commands' > Commands </Link>
        <Link className='col-md-2 navbutton' to='/stats' > Stats </Link>
        <button className='logout-btn' onClick={this.logout} href='/login'> Logout </button>
      </div>
    )
  }
}
