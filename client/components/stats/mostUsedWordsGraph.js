import React from 'react'
import $ from 'jquery'
import rcjs from 'react-chartjs'
import { Link } from 'react-router'

var BarChart = rcjs.Bar

export default class MostActiveUsers extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    var self = this
    self.getChartInfo()
    setInterval(function(){
      self.getChartInfo()
    }, 3000)
  }
