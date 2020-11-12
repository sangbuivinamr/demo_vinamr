const express = require('express')
const router = express.Router()
const quotaInfomation = require('../controller/quota/quota_information')
const quotaEditing = require('../controller/quota/quota_editing')

router.get('/getQuotaInformation/', quotaInfomation.getAllQuota)

router.post('/quotaInformation/', quotaInfomation.postQuota)

router.post('/quotaTable', quotaEditing.postTable)

module.exports = router