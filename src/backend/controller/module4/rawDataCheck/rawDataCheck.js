const dbConnection = require('../../../database/mysql/mysqlConnect')
const sqlQuery = require('../../../database/mysql/mysqlQuery')
const sortData = require('./sortData')

module.exports.getData = async (req, res, next) => {
    try {
        let connection = await dbConnection()
        //Query dữ liệu theo projectID
        let query = "SELECT * FROM `sys`.`temp` WHERE projectID=?"
        let result = await sqlQuery(connection, query, [req.query.projectId])
        //sort result lấy các interview với stt mới nhất
        let statusQuery = "SELECT `status`, `step`, `type`, `interviewStatus` FROM `sys`.`qctask` WHERE projectid=? AND interviewID=? ORDER BY stt DESC LIMIT 1"
        let response = sortData(result)
        for (let i = 0; i < 1; i++) {            
            let status = await sqlQuery(connection, statusQuery, [req.query.projectId, response[i].interviewid])
            status = status[0]
            for(let eachStatusProp in status) {
                response[i][eachStatusProp] = status[eachStatusProp] 
            }
            console.log(response[i])
        }

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
        let projectId = req.query.projectId
        let interviewId = req.query.interviewId
        let connection = await dbConnection()
        if (req.query.projectId === undefined) {
            return res.status(404).json({
                error: "unknown projectId"
            })
        }
        if (req.query.interviewId === undefined) {
            return res.status(404).json({
                error: "unknown interviewId"
            })
        }
        let dataQuery = "SELECT * FROM `sys`.`qctask` WHERE projectid=? AND interviewID=? ORDER BY stt DESC LIMIT 1"
        let data = await sqlQuery(connection, dataQuery, [projectId, interviewId])
        let sttQuery = "SELECT stt FROM `sys`.`qctask` ORDER BY stt DESC LIMIT 1"
        let newestStt = await sqlQuery(connection, sttQuery)
        newestStt = newestStt[0]
        console.log(newestStt)
        data = data[0]
        console.log(data)
        data.status = req.query.status
        data.step = req.query.step
        data.type = req.query.type
        data.interviewStatus = req.query.interviewStatus
        data.stt = newestStt.stt +1
        let queryVariables = []
        for (let prop in data) {
            if (data[prop] == undefined || data[prop] == null) {
                data[prop] = " "
            }
            queryVariables.push(data[prop])
        }
        console.log(queryVariables)
        console.log(queryVariables)
        let statusUpdateQuery = "INSERT INTO `sys`.`qctask` VALUES (?)"
        let updatedStatus = await sqlQuery(connection, statusUpdateQuery, [queryVariables])
        return res.status(200).json({
            message: "insert successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}