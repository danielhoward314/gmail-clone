import React, {Component} from 'react'
import {connect} from 'react-redux'
import {emitConfig} from '../store/config'
import {getEmail, emitDraft} from '../store/email'
import Draft from './draft'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'preview',
      closeDraft: 'unasked'
    }
    this.emailMap = this.emailMap.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.tearDown = this.tearDown.bind(this)
    this.newTearDown = this.newTearDown.bind(this)
  }

  async handleClick(config, flag, view, id) {
    try {
      await this.props.emitConfig(config, flag, view)
      await this.props.getEmail(config, id)
    } catch (err) {
        console.log(err)
    }
  }

  async tearDown(emailType) {
    await this.props.emitConfig(emailType, 'emailType', 'preview')
  }

  async newTearDown() {
    await this.props.emitConfig({closeDraft: 'needed', view: 'preview'}, 'closeDraft', 'preview')
  }

  emailMap(flag, emailArr) {
    return emailArr.map((email) => {
      return (
        <div key={email.id} className="email-preview"
        onClick={() => this.handleClick(this.props.config.selectedEmailType, 'emailType', 'detail', email.id)}>
          <i className="material-icons">check_box_outline_blank</i>
          <span>{flag === 'inbox' ? email.from : email.to}</span>
          <span>—</span>
          <span>{email.subject.slice(0, 100)}</span>
        </div>
      )
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.config.closeDraft === 'unasked' && this.props.config.closeDraft === 'needed') {
      this.setState({closeDraft: this.props.config.closeDraft})
    }
    if(this.props.config.view !== prevProps.config.view) {
      this.setState({view: this.props.config.view})
    }
  }


  render() {
    if(this.state.view === 'detail' && this.props.config.selectedEmailType !== 'draft') {
      const firstLetter = this.props.config.selectedEmailType[0].toUpperCase()
      const letters = this.props.config.selectedEmailType.slice(1)
      const dataAttr = `detail${firstLetter + letters}`
      const data = this.props[dataAttr]
      const from = this.props.config.selectedEmailType !== 'inbox' ? this.props.user.email : data.from
      return (
        <div id="main-outer-container">
          <div id="main-spacer" />
          {/* the div on line above can become another navbar */}
          <div className="main-container">
            <div className="email-detail">
              <p className="detail-from">{from}</p>
              <p className="detail-subject">{data.subject}</p>
              <p className="detail-body">{data.body}</p>
            </div>
          </div>
          <footer id="main-footer"/>
        </div >
      )
    } else if (this.state.view === 'detail' && this.props.config.selectedEmailType === 'draft') {
        const data = this.props.previewDraft
        return (
          <div id="main-outer-container">
            <div id="main-spacer" />
            {/* the div on line above can become another navbar */}
            <div className="main-container">
            {this.emailMap(this.props.config.selectedEmailType, data)}
            </div>
            <footer id="main-footer"/>
            <div className="compose-box">
              {this.state.closeDraft === 'needed' ? null : <Draft newTearDown={this.newTearDown} tearDown={this.tearDown} config={this.props.config}
              user={this.props.user} draft={this.props.detailDraft} />}
            </div>
          </div >
        )
    } else if (this.state.view === 'preview') {
        const firstLetter = this.props.config.selectedEmailType[0].toUpperCase()
        const letters = this.props.config.selectedEmailType.slice(1)
        const dataAttr = `preview${firstLetter + letters}`
        const data = this.props[dataAttr]
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
    user: state.user,
    config: state.config,
    previewInbox: state.email.previewInbox,
    previewSent: state.email.previewSent,
    previewDraft: state.email.previewDraft,
    detailInbox: state.email.detailInbox,
    detailSent: state.email.detailSent,
    detailDraft: state.email.detailDraft,
    draftData: state.email.draftData
  }
}

const mapDispatch = (dispatch) => ({
  emitConfig: (configTarget, configFlag, configView) => dispatch(emitConfig(configTarget, configFlag, configView)),
  getEmail: (flag, id) => dispatch(getEmail(flag, id)),
  emitDraft: (draftData) => dispatch(emitDraft(draftData))
})

export default connect(mapState, mapDispatch)(Main)

