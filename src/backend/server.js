const express = require('express')
const app = express()
const quotaRoute = require('./routes/quota')
const expressionRoute = require('./routes/expression')
const rawDataCheckRoute = require('./routes/data_check')
const trackRoute = require('./routes/quotaRoute')

const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.use('/quota', quotaRoute)
app.use('/expression',expressionRoute)
app.use('/rawDataCheck', rawDataCheckRoute)
app.use('/quota', trackRoute)


app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`)
})