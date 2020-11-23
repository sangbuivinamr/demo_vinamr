const express = require('express')
const router = express.Router()
const rawDataCheck = require('../../controller/module4/rawDataCheck/rawDataCheck')
const uploadFile = require('../../controller/module4/rawDataCheck/uploadFile')
const media = require('./mediaRoute/mediaRoute')

router.get('/getRawData', rawDataCheck.getData)

router.post('/changeStatus', rawDataCheck.changeStatus)

router.get('/uploads', uploadFile)

router.use('/media', media)

module.exports = router