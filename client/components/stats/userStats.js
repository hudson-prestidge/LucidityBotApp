import React from 'react'
import request from 'superagent'

export default class userStats extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      interval: null
    }
  }

  componentDidMount(){
    this.getUserInfo()
    this.state.interval = setInterval(() => this.getUserInfo() , 3000)
  }

  getUserInfo() {
    request('/api/v1/user/1')
      .end( (err, res) => this.setState({userMessageCount: JSON.parse(res.text)[0].count}) )
  }

  render () {
    return (
      <div>
          Total messages sent by this user: {this.state.userMessageCount}
      </div>
    )
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }
}
