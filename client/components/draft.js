import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postEmail, getEmails} from '../store/email'

class Draft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      saveDisabled: true,
      dataStatus: 'unasked',
      to: '',
      bccTo: '',
      ccTo: '',
      subject: '',
      body: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleExistingDraftSubmit = this.handleExistingDraftSubmit.bind(this)
    this.handleNewDraftSubmit = this.handleNewDraftSubmit.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.closeDraft = this.closeDraft.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      saveDisabled: false,
      user: this.props.user
    })
  }

  closeDraft() {
    this.props.tearDown('draft')
  }

  async handleExistingDraftSubmit(event) {
    event.preventDefault()
    try {
      const draftData = {
        to: [this.state.to],
        bccTo: [this.state.bccTo],
        ccTo: [this.state.ccTo],
        subject: this.state.subject,
        body: this.state.body,
        userId: this.state.user.id
      }
      await this.props.postEmail('sent', draftData)
      await this.props.deleteDispatch('draft', null, this.state.draftId)
      draftData.from = this.props.user.email
      draftData.userId = null
      await this.props.postEmail('inbox', draftData)
      this.props.tearDown('draft')
    } catch (err) {
        console.log(err)
    }
  }

  async handleNewDraftSubmit(event) {
    event.preventDefault()
    try {
      const draftData = {
        to: [this.state.to],
        bccTo: [this.state.bccTo],
        ccTo: [this.state.ccTo],
        subject: this.state.subject,
        body: this.state.body,
        userId: this.state.user.id
      }
      await this.props.postEmail('sent', draftData)
      draftData.from = this.props.user.email
      draftData.userId = null
      await this.props.postEmail('inbox', draftData)
      this.closeDraft()
    } catch (err) {
        console.log(err)
    }
  }

  async handleSave(event) {
    event.preventDefault()
    try {
      const draftData = {
        to: this.state.to,
        bccTo: this.state.bccTo,
        ccTo: this.state.ccTo,
        subject: this.state.subject,
        body: this.state.body,
        userId: this.state.user.id
      }
      await this.props.postEmail('draft', draftData, null)
    } catch (err) {
        console.log(err)
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.draft !== prevProps.draft) {
      const toStr = this.props.draft.to.join(', ')
      const ccToStr = this.props.draft.ccTo.join(', ')
      const bccToStr = this.props.draft.bccTo.join(', ')
      this.setState({
        dataStatus: 'loaded',
        draft: this.props.draft,
        from: this.props.user.email,
        to: toStr,
        ccTo: ccToStr,
        bccTo: bccToStr,
        subject: this.props.draft.subject,
        body: this.props.draft.body,
        user: this.props.user,
        draftId: this.props.draft.id,
      })
    }
  }

  componentWillUnmount() {
    this.props.getEmails('draft', this.props.user.id, this.props.config.pageNum)
  }


  render() {
    if(this.state.draft && this.state.dataStatus === 'loaded') {
      return (
        <div className="draft-container">
          <p id="draft-banner">New Message<span id="draft-close" onClick={this.closeDraft}>x</span></p>
          <form className="compose-form" >
              <input className="draft-text" type="text" placeholder="To" name="to" value={this.state.to} onChange={this.handleChange}/>
              <div className="to-spacer">
                <i className="material-icons spaced-icons draft-avatar">
                perm_identity</i>
                <label className="draft-from">From: {this.state.user.firstName} {this.state.user.lastName}
                <span>  ({this.state.from})</span></label>
              </div>
              <input className="draft-text" type="text" placeholder="cc" name="ccTo" value={this.state.ccTo} onChange={this.handleChange}/>
              <input className="draft-text"type="text" placeholder="bcc" name="bccTo" value={this.state.bccTo} onChange={this.handleChange}/>
              <input className="draft-text"type="text" placeholder="Subject" name="subject" value={this.state.subject} onChange={this.handleChange}/>
              <textarea className="draft-body" placeholder="Message" name="body" value={this.state.body} rows="3" cols="33"
              wrap="hard" onChange={this.handleChange} />
              <button className="send-button" type="button" onClick={this.handleExistingDraftSubmit}>
                <span>Send</span>
              </button>
              <button disabled={this.state.saveDisabled} className={this.state.saveDisabled ? "send-button save-disabled" : "send-button"} type="button" onClick={this.handleSave}>
                <span>Save</span>
              </button>
          </form>
        </div>
      )
    }
    else if(this.state.draft && this.state.dataStatus ==='unneeded') {
      return (
        <div>
          <p id="draft-banner">New Message</p>
          <form>
              <input type="text" placeholder="To" name="to" value={this.state.to} onChange={this.handleChange}/>
              <p>{this.state.from}</p>
              <input type="text" name="ccTo" value={this.state.ccTo} onChange={this.handleChange}/>
              <input type="text" name="bccTo" value={this.state.bccTo} onChange={this.handleChange}/>
              <input type="text" name="subject" value={this.state.subject} onChange={this.handleChange}/>
              <textarea name="body" value={this.state.body} rows="3" cols="33"
              wrap="hard" onChange={this.handleChange} />
              <input type="submit" value="Submit"/>
          </form>

        </div>
      )
    } else if (this.state.dataStatus === 'unasked') {
        return (
          <div className="draft-container">
            <p id="draft-banner">New Message<span id="draft-close" onClick={this.closeDraft}>x</span></p>
            <form className="compose-form">
                <input className="draft-text" type="text" placeholder="To" name="to" value={this.state.to} onChange={this.handleChange}/>
                <div className="to-spacer">
                  <i className="material-icons spaced-icons draft-avatar">
                  perm_identity</i>
                  <label className="draft-from">From: {this.props.user.firstName} {this.props.user.lastName}
                  <span>  ({this.props.user.email})</span></label>
                </div>
                <input className="draft-text" type="text" placeholder="cc" name="ccTo" value={this.state.ccTo} onChange={this.handleChange}/>
                <input className="draft-text"type="text" placeholder="bcc" name="bccTo" value={this.state.bccTo} onChange={this.handleChange}/>
                <input className="draft-text"type="text" placeholder="Subject" name="subject" value={this.state.subject} onChange={this.handleChange}/>
                <textarea className="draft-body" placeholder="Message" name="body" value={this.state.body} rows="3" cols="33"
                wrap="hard" onChange={this.handleChange} />
                <button disabled={this.state.saveDisabled} className={this.state.saveDisabled ? "send-button save-disabled" : "send-button"} type="button" onClick={this.handleNewDraftSubmit}>
                  <span>Send</span>
                </button>
                <button disabled={this.state.saveDisabled} className={this.state.saveDisabled ? "send-button save-disabled" : "send-button"} type="button" onClick={this.handleSave}>
                  <span>Save</span>
                </button>
            </form>

          </div>
        )
    }
  }
}

/**
 * CONTAINER
 */

const mapDispatch = (dispatch) => ({
  postEmail: (flag, emailData, draftId) => dispatch(postEmail(flag, emailData, draftId)),
  deleteDispatch: (flag, emailData, draftId) => dispatch(postEmail(flag, emailData, draftId)),
  getEmails: (flag, userId, pageNum) => dispatch(getEmails(flag, userId, pageNum))
})

export default connect(null, mapDispatch)(Draft)
