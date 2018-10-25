const Sequelize = require('sequelize')
const db = require('../db')

const Inbox = db.define('inbox', {
  from: {
    type: Sequelize.STRING
  },
  to: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  ccTo: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  bccTo: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  subject: {
    type: Sequelize.TEXT
  },
  body: {
    type: Sequelize.TEXT
  }
})

module.exports = Inbox
