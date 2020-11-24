const dbConnection = require('../../../database/mysql/mysqlConnect')
const sqlQuery = require('../../../database/mysql/mysqlQuery')
const surveySplit = require('./surveySplit')

module.exports.getTracking = async (req, res, next) => {
    try {
        let projectId = req.query.projectId
        if (projectId === undefined) {
            return res.status(404).json({
                error: "unknown projectId"
            })
        }
        let connection = await dbConnection()


        // --------------------- QUERY EDITING DATA ----------------------------------------

        let response = {}
        let getEditingquery = "SELECT * FROM `sys`.`quota_editing` WHERE projectID=?"
        let getEditingResult = await sqlQuery(connection, getEditingquery, [projectId])
        response.id = getEditingResult[0].id
        response.rowList = JSON.parse(getEditingResult[0].rows)
        response.colList = JSON.parse(getEditingResult[0].columns)
        response.data = JSON.parse(getEditingResult[0].data)
        console.log(response)

        //----------------------------------------------------------------------------------
        let query = "SELECT * FROM `sys`.`quota_data` WHERE projectID=?"
        let result = await sqlQuery(connection, query, [projectId])
        connection.end()
        //Dung hàm surveySplit để phân loại các survey theo từng cột và hàng ứng với uniqueID trong response.data 
        response = surveySplit(result, response)
        return res.send(response)
    }
    catch (error) {
        console.log(error)
        res.json({
            error: error
        })
    }
}
