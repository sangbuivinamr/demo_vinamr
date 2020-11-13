const express = require('express')
const router = express.Router()
const rawDataCheck = require('../mysql/controller/raw_data_check/getData')
const uploadFile = require('../mysql/controller/raw_data_check/uploadFile')

router.get('/getRawDataCheck', rawDataCheck.getData)
router.get('/uploads', uploadFile)

module.exports = router