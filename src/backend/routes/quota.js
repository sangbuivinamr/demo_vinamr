const express = require('express')
const router = express.Router()
const quotaInfomation = require('../controller/quota_information')

router.get('/quotaInformation', quotaInfomation.getAllQuota)

module.exports = router