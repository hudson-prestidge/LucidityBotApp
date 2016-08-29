

import React from 'react'

export default class Command extends React.Component {
  render () {
    return (
      <tr>
        <td className='command'>
          {this.props.body.name}
        </td>
        <td>
          {this.props.body.response}
        </td>
        <td>
          <Link to={this.props.body.linkString}> Edit Command </Link>
        </td>
        <td>
          <button onClick={this.clickHandler} item={this.props.body}>delete</button>
        </td>
      </tr>
    )
  }
}
