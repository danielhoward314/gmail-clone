import React, {Component} from 'react'
import {connect} from 'react-redux'
import {emitConfig} from '../store/config'
const dummyContacts = [
  "acastagnier0@posterous.com", "pcosgrave1@sciencedaily.com",
  "abignold2@hp.com", "bdaldry3@shop-pro.jp",
  "acastagnier0@posterous.com", "pcosgrave1@sciencedaily.com",
  "abignold2@hp.com", "bdaldry3@shop-pro.jp",
  "acastagnier0@posterous.com", "pcosgrave1@sciencedaily.com",
  "abignold2@hp.com", "bdaldry3@shop-pro.jp",
  "acastagnier0@posterous.com", "pcosgrave1@sciencedaily.com",
  "abignold2@hp.com", "bdaldry3@shop-pro.jp",
  "acastagnier0@posterous.com", "pcosgrave1@sciencedaily.com",
  "abignold2@hp.com", "bdaldry3@shop-pro.jp",
  "acastagnier0@posterous.com", "pcosgrave1@sciencedaily.com",
  "abignold2@hp.com", "bdaldry3@shop-pro.jp",
  "acastagnier0@posterous.com", "pcosgrave1@sciencedaily.com",
  "abignold2@hp.com", "bdaldry3@shop-pro.jp",
  "acastagnier0@posterous.com", "pcosgrave1@sciencedaily.com",
  "abignold2@hp.com", "bdaldry3@shop-pro.jp"
]

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.newDraft = this.newDraft.bind(this)
  }

  handleClick(config, flag, view) {
    this.props.emitConfig(config, flag, view)
  }

  async newDraft() {
    try {
      await this.props.emitConfig('draft', 'emailType', 'detail')
    } catch (err) {
        console.log(err)
    }
  }

  render() {
    return (
      <div className="sidebar-container">
        <div id="compose-container">
          <button className="compose-button" type="button" onClick={this.newDraft}>
            <span id="plus-symbol" className="compose-text">+</span>
            <span className="compose-text">Compose</span>
          </button>
        </div>
        <div id="emails-container">
          <div className="sidebar-content" onClick={() => this.handleClick('inbox', 'emailType', 'preview')} >
            <i className="material-icons">inbox</i>
            <span>Inbox</span>
          </div>
          <div className="sidebar-content" onClick={() => this.handleClick('sent', 'emailType', 'preview')} >
            <i className="material-icons">send</i>
            <span>Sent</span>
          </div>
          <div className="sidebar-content" onClick={() => this.handleClick('draft', 'emailType', 'preview')} >
            <i className="material-icons">insert_drive_file</i>
            <span>Drafts</span>
          </div>
        </div>
        <div id="sidebar-spacer" />
        <div id="contacts-container">
          {dummyContacts.map((contact, idx) => {
            return (
              <div className="sidebar-content" key={idx} onClick={() => this.handleClick(contact, 'contact')} >
                <i className="material-icons spaced-icons contact-icons">perm_identity</i>
                <span className="contact-text">{contact}</span>
              </div>
            )
          })}
        </div>
        <footer id="sidebar-footer"/>
      </div >
    )
  }
}

const mapDispatch = (dispatch) => ({
  emitConfig: (configTarget, flag, view) => dispatch(emitConfig(configTarget, flag, view))
})

/**
 * CONTAINER
 */

export default connect(null, mapDispatch)(Sidebar)

