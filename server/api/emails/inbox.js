const router = require('express').Router()
const {Inbox} = require('../../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/:pageNum', async (req, res, next) => {
  try {
    const offsetMultiplier = +req.params.pageNum - 1
    const offset = offsetMultiplier * 50
    const idStartRange = offset + 1
    const idEndRange = offset + 50
    const inboxEmails = await Inbox.findAll({ limit: 50, where: {
      id: {
        [Op.between]: [idStartRange, idEndRange]
      }
    } })
    res.json(inboxEmails)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const inboxEmails = await Inbox.findAll({ limit: 50, where: {
      id: {
        [Op.between]: [1, 50]
      }
    } })
    res.json(inboxEmails)
  } catch (err) {
    next(err)
  }
})
