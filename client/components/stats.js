import React from 'react'
import $ from 'jquery'
import rcjs from 'react-chartjs'
import { Link } from 'react-router'
import MostActiveUsers from './MostActiveUsers'

var BarChart = rcjs.Bar

export default class Stats extends React.Component {

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

  getChartInfo() {
    var self = this
    $.ajax({
      method: 'get',
      url: '/api/v1/users/obnoxious',
      success: function(data){
        self.setState({obnoxiousUserData: data})
      }
    })
    $.ajax({
      method: 'get',
      url: '/api/v1/words',
      success: function(data){
        self.setState({wordUsageData: data})
      }
    })
  }

  getObnoxiousUserChartData(){
    var newObj = {
      labels: this.state.obnoxiousUserData.map(function(r){
        return r.name
      }),
      datasets:[{
        label: "My First dataset",
        fillColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ],
        strokeColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
        data: this.state.obnoxiousUserData.map(function(r){
          return r.count
        })
      }]
    }
    return newObj
  }

  getWordUsageChartData(){
    var newObj = {
      labels: this.state.wordUsageData.map(function(r){
        return r[0]
      }),
      datasets:[{
        label: "My First dataset",
        fillColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ],
        strokeColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
        data: this.state.wordUsageData.map(function(r){
          return r[1]
        })
      }]
    }
    return newObj
  }


    // <Link className='col-md-2' to='/stats/active_users' > Most Active Users </Link>
    // <Link className='col-md-2' to='/stats/obnoxious_users' > Most Obnoxious Users </Link>
    // <Link className='col-md-2' to='/stats/word_usage'>Most Used Words </Link>

  render () {
    return (
      <div className="container">
        <MostActiveUsers />
        <div id='mostObnoxiousUserChart' className='chart'>
          {this.state.obnoxiousUserData ? <BarChart data={this.getObnoxiousUserChartData()} width={400} height={400} /> : null}
          <div className='legend'>Most <abbr title="Sent the most messages that directly reference the streamer">Obnoxious</abbr> Users</div>
        </div>
        <div id='mostUsedWordChart' className='chart'>
          {this.state.wordUsageData ? <BarChart data={this.getWordUsageChartData()} width={400} height={400} /> : null}
          <div className='legend'>Most Used Words</div>
        </div>
      </div>
    )
  }
}
