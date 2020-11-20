const express = require('express')
const router = express.Router()
const interviewerReview = require('../../controller/module2/interviewerReview/interviewerReview')

router.get('/interviewerReview', interviewerReview)

module.exports = router