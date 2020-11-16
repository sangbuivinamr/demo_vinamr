const express = require('express')
const router = express.Router()
const expression = require('../controller/expression/expression_review')

router.get('/expressionReview/', expression.getCodeExpression)

module.exports = router