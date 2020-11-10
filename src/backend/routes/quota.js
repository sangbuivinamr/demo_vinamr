const express = require('express')
const router = express.Router()
const quotaInfomation = require('../controller/quota/quota_information')

router.get('/getQuotaInformation/', quotaInfomation.getAllQuota)

router.post('/quotaInformation/', quotaInfomation.postQuota)

module.exports = router