const router = require('express').Router()
module.exports = router

router.use('/inbox', require('./inbox'))
router.use('/sent', require('./sent'))
router.use('/draft', require('./draft'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
