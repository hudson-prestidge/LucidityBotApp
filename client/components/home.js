import React from 'react'


export default class Home extends React.Component {
  render () {
    return (
      <div className="container">
        <p>Welcome to the Lucidity Bot Homepage and control panel!</p>
        <p>From this page you can manage Luciditybot. If you want to add her to your channel, add/remove commands or simply view the
        commands she has available for your channel, this is the place to do it.</p>
        <p>The other function this site serves is to showcase various statistics gathered from the messages logged while the bot
        was in your channel.  The statistics that are available to view are liable to change over time, and reasonable suggestions
        to add to that are welcomed.</p>
      </div>
    )
  }
}
