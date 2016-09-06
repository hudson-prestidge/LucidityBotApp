import React from 'react'
import $ from 'jquery'
import rcjs from 'react-chartjs'
import { Link } from 'react-router'

var BarChart = rcjs.Bar

export default class Stats extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className="container">
        <Link className='col-md-2' to='/stats/activeusers' > Most Active Users </Link>
        <Link className='col-md-2' to='/stats/obnoxioususers' > Most Obnoxious Users </Link>
        <Link className='col-md-2' to='/stats/mostusedwords'>Most Used Words </Link>

        {this.props.children}

      </div>
    )
  }
}
