const router = require('express').Router()
const {Draft} = require('../../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const email = await Draft.create(req.body)
    res.json(email)
  } catch (err) {
      console.log(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Draft.destroy({where: {id: req.params.id}})
    res.sendStatus(204).end()
  } catch (err) {
      console.log(err)
  }
})

router.get('/user/:id/p/:pageNum', async (req, res, next) => {
  try {
    if (req.params.pageNum > 1) {
      const offsetMultiplier = +req.params.pageNum - 1
      const offset = offsetMultiplier * 50
      const draftEmails = await Draft.findAll({ limit: 50, offset: offset,
        where: {userId: req.params.id}
      })
      res.json(draftEmails)
    } else {
        const draftEmails = await Draft.findAll({ limit: 50, where: {userId: req.params.id}})
        res.json(draftEmails)
      }
  } catch (err) {
    next(err)
  }
})

router.get('/id/:id', async (req, res, next) => {
  try {
    const singleEmail = await Draft.findById(req.params.id);
    res.json(singleEmail);
  } catch (err) {
    next(err);
  }
})
