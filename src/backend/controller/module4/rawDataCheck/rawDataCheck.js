const dbConnection = require('../../../database/mysql/mysqlConnect')
const sqlQuery = require('../../../database/mysql/mysqlQuery')
const sortData = require('./sortData')

module.exports.getData = async (req, res, next) => {
    try {
        let connection = await dbConnection()
        //Query dữ liệu theo projectID
        let query = "SELECT * FROM `sys`.`temp` WHERE projectID=?"
        let result = await sqlQuery(connection, query, [req.query.projectId])
        console.log(result)
        //sort result lấy các interview với stt mới nhất
        let response = sortData(result)
        connection.end()
        return res.send(response)
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
}

module.exports.changeStatus = async (req, res, next) => {
    try {
        let connection = await dbConnection()
        //Lấy interview theo projectid và interviewid mới nhất
        let query = "SELECT * FROM `sys`.`temp` WHERE projectid=? AND interviewid=? ORDER BY stt DESC LIMIT 1"
        let result = await sqlQuery(connection, query, [req.query.projectId, req.query.interviewId])
        console.log(result)
        //result trả một Array nên lấy phần tử đầu tiên
        let changeRow = result[0]
        //thêm mới nên stt +1
        changeRow.stt += 1
        console.log(changeRow)
        //lấy từng giá trị trong result để đẩy vào làm queryVariables.
        let queryVariables = []
        for (let prop in changeRow) {
            queryVariables.push(changeRow[prop])
        }
        let insertQuery = "INSERT INTO `sys`.`temp` VALUES(?)"
        let insertResult = await sqlQuery(connection, insertQuery, [queryVariables])
        return res.send(insertResult)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}