import React, {Component} from 'react'
import {connect} from 'react-redux'
import {emitConfig} from '../store/config'
import {getEmail} from '../store/email'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'preview'
    }
    this.emailMap = this.emailMap.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick(config, flag, view, id) {
    try {
      await this.props.emitConfig(config, flag, view)
      await this.props.getEmail(config, id)
    } catch (err) {
        console.log(err)
    }
  }

  emailMap(flag, emailArr) {
    return emailArr.map((email) => {
      return (
        <div key={email.id} className="email-preview"
        onClick={() => this.handleClick(this.props.config.selectedEmailType, 'emailType', 'detail', email.id)}>
          <i className="material-icons">check_box_outline_blank</i>
          <span>{flag === 'inbox' ? email.from : email.to}</span>
          <span>{email.subject.slice(0, 100)}</span>
        </div>
      )
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.config.view !== prevProps.config.view) {
      this.setState({view: this.props.config.view})
    }
  }

  render() {
    console.log(this.props)
    if(this.state.view === 'detail') {
      const firstLetter = this.props.config.selectedEmailType[0].toUpperCase()
      const letters = this.props.config.selectedEmailType.slice(1)
      const dataAttr = `one${firstLetter + letters}`
      console.log(firstLetter)
      console.log(letters)
      console.log(dataAttr)
      const data = this.props[dataAttr]
      console.log(`data in the detail view case: `, data)
      return (
        <div id="main-outer-container">
          <div id="main-spacer" />
          {/* the div on line above can become another navbar */}
          <div className="main-container">
          <h1>{data.subject}</h1>
          <p>{data.body}</p>
          </div>
          <footer id="main-footer"/>
        </div >
      )
    } else {
        const data = this.props[this.props.config.selectedEmailType]
        return (
          <div id="main-outer-container">
            <div id="main-spacer" />
            {/* the div on line above can become another navbar */}
            <div className="main-container">
            {this.emailMap(this.props.config.selectedEmailType, data)}
            </div>
            <footer id="main-footer"/>
          </div >
        )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    config: state.config,
    inbox: state.email.inbox,
    sent: state.email.sent,
    draft: state.email.draft,
    oneInbox: state.email.oneInbox,
    oneSent: state.email.oneSent,
    oneDraft: state.email.oneDraft
  }
}

const mapDispatch = (dispatch) => ({
  emitConfig: (configTarget, configFlag, configView) => dispatch(emitConfig(configTarget, configFlag, configView)),
  getEmail: (flag, id) => dispatch(getEmail(flag, id))
})

export default connect(mapState, mapDispatch)(Main)
