const dbConnection = require('../../database/mysql/mysql_connect')
const sqlQuery = require('../../database/mysql/mysql_query')

//chưa check
module.exports.getTable = async (req, res, next) => {
    let projectId = req.query.projectId
    try {
        let connection = dbConnection()
        let query = 'SELECT * FROM sys.quota_editing WHERE projectID="' + projectId + '"'
        let result = sqlQuery(connection, query)
        res.json
    }
    catch (error) {
        console.log(error)
    }
}

module.exports.postTable = async (req, res) => {
    let projectId = req.query.projectId
    try {
        let rowInput = {}
        let colInput = {}
        let dataInput = {}
        let rowList = req.body.rowList
        let colList = req.body.colList
        let data = req.body.data
        await rowList.forEach(a => rowInput[a] = a)
        await colList.forEach(b => colInput[b] = b)
        await data.forEach(c => dataInput[data.indexOf(c)] = c)
        //chuyển qua string nhưng vẫn ko dc
        x = JSON.stringify(rowInput)
        y = JSON.stringify(colInput)
        z = JSON.stringify(data)
        console.log(rowInput, colInput, dataInput)
        let connection = await dbConnection()
        let query = 'INSERT INTO sys.quota_editing (projectID, rows, columns, data) VALUES ('+ projectId +', '+ rowInput +', '+ colInput +', '+ dataInput +')'
        let result = await sqlQuery(connection, query)
        connection.end()
        res.json({
            message: "successfull"
        })
    }
    catch (error) {
    console.log(error)
    res.status(500).json({
        error: error
    })
}
}