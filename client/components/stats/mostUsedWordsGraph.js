import React from 'react'
import request from 'superagent'
import rcjs from 'react-chartjs'
import { Link } from 'react-router'

var BarChart = rcjs.Bar

export default class MostUsedWords extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      interval: null
    }
  }

  componentDidMount(){
    this.getChartInfo()
    this.state.interval = setInterval(() => this.getChartInfo() , 3000)
  }

  getChartInfo() {
    request('/api/v1/words')
      .end( (err, res) => this.setState({wordUsageData: JSON.parse(res.text)}) )
  }

  getWordUsageChartData(){
    var newObj = {
      labels: this.state.wordUsageData.map(r => r[0] ),
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
        data: this.state.wordUsageData.map(r => r[1] )
      }]
    }
    return newObj
  }

  render() {
    return(
      <div id='mostUsedWordChart' className='chart col-md-6 col-md-offset-3'>
        {this.state.wordUsageData ? <BarChart data={this.getWordUsageChartData()} width={600} height={600} /> : null}
        <div className='legend'>Most Used Words</div>
      </div>
    )
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }
}
