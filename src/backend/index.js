const quotaRoute = require('./routes/quota')
const bodyParser = require('body-parser')
const expressionRoute = require('./routes/expression')
const dataCheckRoute = require('./routes/data_check')

module.exports = function (app) {
    
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use('/quota', quotaRoute)
    app.use('/expression',expressionRoute)
    app.use('/dataCheck', dataCheckRoute)

    const PORT = process.env.PORT || 3000
}