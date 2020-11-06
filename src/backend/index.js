
const quotaRoute = require('./routes/quota')
module.exports = function (app) {

    app.use('/quota', quotaRoute)

    const PORT = process.env.PORT || 3000
}