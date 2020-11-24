const express = require('express')
const router = express.Router()
const expression = require('../../controller/module2/quotaExpression/expressionReview/expressionReview')

router.get('/expressionReview/', expression.getCodeExpression)

module.exports = router