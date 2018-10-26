import React, {Component} from 'react'
import {connect} from 'react-redux'

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
  }

  render() {
    return (
      <div className="sidebar-container">
        <div id="compose-container">
          <button className="compose-button" type="button">
            <span id="plus-symbol" className="compose-text">+</span>
            <span className="compose-text">Compose</span>
          </button>
        </div>
        <div id="emails-container">
          <div className="sidebar-content">
            <i className="material-icons">inbox</i>
            <span>Inbox</span>
          </div>
          <div className="sidebar-content">
            <i className="material-icons">send</i>
            <span>Sent</span>
          </div>
          <div className="sidebar-content">
            <i className="material-icons">insert_drive_file</i>
            <span>Drafts</span>
          </div>
        </div>
        <div id="sidebar-spacer" />
        <div id="contacts-container">
          {dummyContacts.map((contact, idx) => {
            return (
              <div className="sidebar-content" key={idx}>
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

/**
 * CONTAINER
 */

export default connect(null, null)(Sidebar)

