import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
    this.props.getEmails(config.selectedEmailType, config.pageNum)
  }

  componentDidUpdate(prevProps) {
    const config = this.props.config
    if (config.selectedEmailType !== prevProps.config.selectedEmailType) {
      return this.props.getEmails(config.selectedEmailType, 1)
    }
  }

  render() {
    return (
      <div>
        <div className="spacer" />
        <Navbar user={this.props.user} config={this.props.config}  />
        <div id="wrapper">
          <Sidebar user={this.props.user} config={this.props.config} />
          <Main />
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
    config: state.config,
    // inbox: state.email.inbox,
    // sent: state.email.sent,
    // draft: state.email.draft,
    // oneInbox: state.email.oneInbox,
    // oneSent: state.email.oneSent,
    // oneDraft: state.email.oneDraft
  }
}

const mapDispatch = (dispatch) => ({
  getEmails: (flag, pageNum) => dispatch(getEmails(flag, pageNum)),
  getEmail: (flag, id) => dispatch(getEmail(flag, id))
})

export default connect(mapState, mapDispatch)(UserHome)
