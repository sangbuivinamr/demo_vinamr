const express = require('express')
const router = express.Router()
const getMedia = require('../../../controller/module4/media/getMedia')

router.get('/getMedia', getMedia)

module.exports = router