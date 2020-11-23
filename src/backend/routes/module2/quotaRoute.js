const express = require('express')
const router = express.Router()
const quotaTracking = require('../../controller/module2/quotaTracking/quotaTracking')
const quotaInformation = require('../../controller/module2/quotaExpression/quotaInformation')
const quotaEditing = require('../../controller/module2/quotaEditing/quotaEditing')
const quotaExceeded = require('../../controller/module2/quotaWhenExceeded/quotaWhenExceeded')

router.get('/getQuotaInformation/', quotaInformation.getAllQuota)

router.post('/quotaInformation/', quotaInformation.postQuota)

router.get('/quotaTable', quotaEditing.getTable)

router.post('/quotaTable', quotaEditing.postTable)

router.get('/getTracking', quotaTracking.getTracking)

router.get('/quotaExceeded', quotaExceeded.getQuotaExceeded)

router.post('/quotaExceeded', quotaExceeded.postQuotaExceeded)

module.exports = router