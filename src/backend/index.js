const quotaRoute = require('./routes/module2/quotaRoute')
const expressionRoute = require('./routes/module2/expressionRoute')
const interviewerRoute = require('./routes/module2/interviewerRoute')
const rawDataCheckRoute = require('./routes/module4/rawDataCheckRoute')

const bodyParser = require('body-parser')
const expressionRoute = require('./routes/expression')

module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use('/quota', quotaRoute)
    app.use('/expression', expressionRoute)
    app.use('/rawDataCheck', rawDataCheckRoute)
    app.use('/interviewer', interviewerRoute)

    const PORT = process.env.PORT || 3000
}