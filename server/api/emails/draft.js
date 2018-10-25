const router = require('express').Router()
const {Draft} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const drafts = await Draft.findAll()
    res.json(drafts)
  } catch (err) {
    next(err)
  }
})
