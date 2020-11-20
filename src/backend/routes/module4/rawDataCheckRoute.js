const express = require('express')
const router = express.Router()
const rawDataCheck = require('../../controller/module4/rawDataCheck/rawDataCheck')
const uploadFile = require('../../controller/module4/rawDataCheck/uploadFile')

router.get('/getRawDataCheck', rawDataCheck.getData)

router.post('/changeStatus', rawDataCheck.changeStatus)

router.get('/uploads', uploadFile)



module.exports = router