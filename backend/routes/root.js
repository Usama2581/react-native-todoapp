const express = require('express')
const router = express.Router()

router.use('/todo', require('./todoRoutes'))

module.exports = router