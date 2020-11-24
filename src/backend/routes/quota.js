const express = require('express')
const router = express.Router()
const quotaInfomation = require('../controller/quota/quota_information')
const quotaEditing = require('../controller/quota/quota_editing')
const quotaExceeded = require('../controller/quota/quota_exceeded')

router.get('/getQuotaInformation/', quotaInfomation.getAllQuota)

router.post('/quotaInformation/', quotaInfomation.postQuota)

router.post('/quotaTable', quotaEditing.postTable)

router.get('/quotaTable', quotaEditing.getTable)

router.post('/quotaExceeded', quotaExceeded.postQuotaExceeded)

router.get('/quotaExceeded', quotaExceeded.getQuotaExceeded)

module.exports = router