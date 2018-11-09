const router = require('express').Router()
const {Sent} = require('../../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const email = await Sent.create(req.body)
    res.json(email)
  } catch (err) {
      console.log(err)
  }
})

router.get('/user/:id/p/:pageNum', async (req, res, next) => {
  try {
    if (req.params.pageNum > 1) {
      const offsetMultiplier = +req.params.pageNum - 1
      const offset = offsetMultiplier * 50
      const sentEmails = await Sent.findAll({ limit: 50, offset: offset,
        where: {userId: req.params.id}
      })
      res.json(sentEmails)
    } else {
        const sentEmails = await Sent.findAll({ limit: 50, where: {userId: req.params.id}})
        res.json(sentEmails)
      }
  } catch (err) {
    next(err)
  }
})

router.get('/id/:id', async (req, res, next) => {
  try {
    const singleEmail = await Sent.findById(req.params.id);
    res.json(singleEmail);
  } catch (err) {
    next(err);
  }
})
