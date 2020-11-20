const express = require('express')
const app = express()
const quotaRoute = require('./routes/module2/quotaRoute')
const expressionRoute = require('./routes/module2/expressionRoute')
const interviewerRoute = require('./routes/module2/interviewerRoute')

const rawDataCheckRoute = require('./routes/module4/rawDataCheckRoute')

const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.use('/quota', quotaRoute)
app.use('/expression',expressionRoute)
app.use('/rawDataCheck', rawDataCheckRoute)
app.use('/interviewer', interviewerRoute)


app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`)
})