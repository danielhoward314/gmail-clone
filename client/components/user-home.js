import React, {Component} from 'react'
import {connect} from 'react-redux'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Main from './main'
import {getEmails, getEmail} from '../store/email'
/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    const config = this.props.config
    this.props.getEmails(config.selectedEmailType, this.props.user.id, config.pageNum)
  }

  componentDidUpdate(prevProps) {
    const config = this.props.config
    if (config.selectedEmailType !== prevProps.config.selectedEmailType) {
      return this.props.getEmails(config.selectedEmailType, this.props.user.id, config.pageNum)
    }
  }

  render() {
    return (
      <div>
        <div className="spacer" />
        <Navbar user={this.props.user} config={this.props.config}  />
        <div id="wrapper">
          <Sidebar user={this.props.user} config={this.props.config} />
          <Main user={this.props.user}/>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    config: state.config
  }
}

const mapDispatch = (dispatch) => ({
  getEmails: (flag, userId, pageNum) => dispatch(getEmails(flag, userId, pageNum)),
  getEmail: (flag, id) => dispatch(getEmail(flag, id))
})

export default connect(mapState, mapDispatch)(UserHome)
