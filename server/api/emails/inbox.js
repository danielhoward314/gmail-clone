const router = require('express').Router()
const {Inbox} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const inboxEmails = await Inbox.findAll({ limit: 50 })
    res.json(inboxEmails)
  } catch (err) {
    next(err)
  }
})
