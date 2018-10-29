const router = require('express').Router()
const {Draft} = require('../../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/p/:pageNum', async (req, res, next) => {
  try {
    if (req.params.pageNum > 1) {
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
    } else {
        const draftEmails = await Draft.findAll({ limit: 50, where: {
          id: {
            [Op.between]: [1, 50]
          }
        } })
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
