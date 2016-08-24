import React from 'react'
import $ from 'jquery'
import rcjs from "react-chartjs"

var BarChart = rcjs.Bar

// var stupidData = [['lol', 40000]['Kappa', 12000]['xD', 7312]['meme', 5463]['memes', 4719]['butts', 1200]['some', 953]['sensible', 643]['discussion', 1]]

export default class Stats extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }



  componentDidMount(){
    var self = this
    $.ajax({
      method: 'get',
      url: '/api/v1/users',
      success: function(data){
        self.setState({activeUserData: data})
      }
    })
    $.ajax({
      method: 'get',
      url: '/api/v1/users/obnoxious',
      success: function(data){
        self.setState({obnoxiousUserData: data})
      }
    })
  }

// [{user_id:4, count:10 } ]

  getActiveUserChartData(){
    var newObj = {
      labels: this.state.activeUserData.map(function(r){
        return r.user_id
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
        data: this.state.activeUserData.map(function(r){
          return r.count
        })
      }]
    }
    return newObj
  }

  getObnoxiousUserChartData(){
    var newObj = {
      labels: this.state.obnoxiousUserData.map(function(r){
        return r.user_id
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

  render () {
    return (
      <div className="container">
        <div id='mostActiveUserChart'>
          {this.state.activeUserData ? <BarChart data={this.getActiveUserChartData()} width={400} height={400} /> : null}
          <div className='legend'>Most Active Users</div>
        </div>
        <div id='mostObnoxiousUserChart'>
          {this.state.obnoxiousUserData ? <BarChart data={this.getObnoxiousUserChartData()} width={400} height={400} /> : null}
          <div className='legend'>Most <abbr title="most messages that directly reference the streamer">Obnoxious</abbr> Users</div>
        </div>
      </div>
    )
  }
}
