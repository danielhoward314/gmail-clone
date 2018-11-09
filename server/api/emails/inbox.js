const router = require('express').Router()
const {Inbox} = require('../../db/models')
const {User} = require('../../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const userMatch = await User.findOne({where: {
      email: req.body.to[0]
    }})
    if (!userMatch) res.status(204)
    else {
      req.body.userId = userMatch.id
      const email = await Inbox.create(req.body)
      res.json(email)
    }
  } catch (err) {
      console.log(err)
  }
})

router.get('/user/:id/p/:pageNum', async (req, res, next) => {
  try {
    if (req.params.pageNum > 1) {
      const offsetMultiplier = +req.params.pageNum - 1
      const offset = offsetMultiplier * 50
      const inboxEmails = await Inbox.findAll({ limit: 50, offset: offset,
        where: {userId: req.params.id}
      })
      res.json(inboxEmails)
    } else {
        const inboxEmails = await Inbox.findAll({ limit: 50, where: {userId: req.params.id}})
        res.json(inboxEmails)
      }
  } catch (err) {
    console.log(`inbox get route error handler fired`)
    next(err)
  }
})

router.get('/id/:id', async (req, res, next) => {
  try {
    const singleEmail = await Inbox.findById(req.params.id);
    res.json(singleEmail);
  } catch (err) {
    next(err);
  }
})
