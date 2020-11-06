const express = require('express')
const app = express()
const quotaRoute = require('./routes/quota')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.use('/quota', quotaRoute)


app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`)
})