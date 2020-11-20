const express = require('express')
const router = express.Router()
const quotaTracking = require('../../controller/module2/quotaTracking/quotaTracking')
const quotaInformation = require('../../controller/module2/quotaExpression/quotaInformation')
const quotaEditing = require('../../controller/module2/quotaEditing/quotaEditing')

router.get('/getQuotaInformation/', quotaInformation.getAllQuota)

router.post('/quotaInformation/', quotaInformation.postQuota)

router.get('/quotaTable', quotaEditing.getTable)

router.post('/quotaTable', quotaEditing.postTable)

router.get('/getTracking', quotaTracking.getTracking)

module.exports = router