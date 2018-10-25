const Sequelize = require('sequelize')
const db = require('../db')

const Email = db.define('email', {
  inboxType: {
    type: Sequelize.STRING
  },
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
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.TEXT
  }
})

module.exports = Email
