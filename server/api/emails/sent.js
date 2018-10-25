const router = require('express').Router()
const {Sent} = require('../../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/:pageNum', async (req, res, next) => {
  try {
    const offsetMultiplier = +req.params.pageNum - 1
    const offset = offsetMultiplier * 50
    const idStartRange = offset + 1
    const idEndRange = offset + 50
    const sentEmails = await Sent.findAll({ limit: 50, where: {
      id: {
        [Op.between]: [idStartRange, idEndRange]
      }
    } })
    res.json(sentEmails)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const sentEmails = await Sent.findAll({ limit: 50, where: {
      id: {
        [Op.between]: [1, 50]
      }
    } })
    res.json(sentEmails)
  } catch (err) {
    next(err)
  }
})
