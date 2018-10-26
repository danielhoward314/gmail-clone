import React, {Component} from 'react'
import {connect} from 'react-redux'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="main-container">
        <p>test</p>
      </div >
    )
  }
}

/**
 * CONTAINER
 */

export default connect(null, null)(Main)
