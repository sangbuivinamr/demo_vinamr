const express = require('express')
const router = express.Router()
const tracking = require('../controller/quota/tracking')
const quotaEditing = require('../controller/quota/quota_editing')

router.get('/getTracking', tracking.getTracking)
router.post('/quotaTable', quotaEditing.postTable)

module.exports = router