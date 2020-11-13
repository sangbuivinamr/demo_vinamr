const quotaRoute = require('../routes/quota')
const bodyParser = require('body-parser')
const expressionRoute = require('../routes/expression')

module.exports = function (app) {
    
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use('/quota', quotaRoute)
    app.use('/expression',expressionRoute)

    const PORT = process.env.PORT || 3000
}