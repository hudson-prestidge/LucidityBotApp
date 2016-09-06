import React from 'react'
import $ from 'jquery'
import rcjs from 'react-chartjs'
import { Link } from 'react-router'
import StatsNavbar from './stats/statsNavbar'

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
        <StatsNavbar />
        {this.props.children}

      </div>
    )
  }
}
