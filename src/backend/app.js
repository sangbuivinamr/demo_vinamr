const quotaRoute = require('./routes/quota')
const bodyParser = require('body-parser')

module.exports = function (app) {
    
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use('/quota', quotaRoute)

    const PORT = process.env.PORT || 3000
}