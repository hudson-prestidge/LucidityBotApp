import React from 'react'
import $ from 'jquery'
import rcjs from 'react-chartjs'
import { Link } from 'react-router'

var BarChart = rcjs.Bar

export default class MostObnoxiousUsers extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    this.getChartInfo()
    setInterval(() => this.getChartInfo() , 3000)
  }

  getChartInfo(){
    $.ajax({
      method: 'get',
      url: '/api/v1/users/obnoxious',
      success: data => this.setState({obnoxiousUserData: data})
    })
  }

  getObnoxiousUserChartData(){
    var newObj = {
      labels: this.state.obnoxiousUserData.map(r => r.name ),
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
        data: this.state.obnoxiousUserData.map(r => r.count )
      }]
    }
    return newObj
  }

  render () {
    return (
      <div id='mostObnoxiousUserChart' className='chart col-md-6 col-md-offset-3'>
        {this.state.obnoxiousUserData ? <BarChart data={this.getObnoxiousUserChartData()} width={600} height={600} /> : null}
        <div className='legend'>Most <abbr title="Users who mention the streamer by name the most"> Obnoxious</abbr> Users</div>
      </div>
    )
  }
}
