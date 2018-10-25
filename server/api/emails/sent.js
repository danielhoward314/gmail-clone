const router = require('express').Router()
const {Sent} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const sentEmails = await Sent.findAll()
    res.json(sentEmails)
  } catch (err) {
    next(err)
  }
})
