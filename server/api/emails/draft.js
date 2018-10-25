const router = require('express').Router()
const {Draft} = require('../../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/:pageNum', async (req, res, next) => {
  try {
    const offsetMultiplier = +req.params.pageNum - 1
    const offset = offsetMultiplier * 50
    const idStartRange = offset + 1
    const idEndRange = offset + 50
    const draftEmails = await Draft.findAll({ limit: 50, where: {
      id: {
        [Op.between]: [idStartRange, idEndRange]
      }
    } })
    res.json(draftEmails)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const draftEmails = await Draft.findAll({ limit: 50, where: {
      id: {
        [Op.between]: [1, 50]
      }
    } })
    res.json(draftEmails)
  } catch (err) {
    next(err)
  }
})
