const dbConnection = require('../../../database/mysql/mysqlConnect')
const sqlQuery = require('../../../database/mysql/mysqlQuery')
const surveySplit = require('../quotaTracking/surveySplit')
const mappingData = require('./mappingData')

module.exports = async (req, res, next) => {
    try {
        let projectId = req.query.projectId
        let connection = await dbConnection()


        // --------------------- QUERY EDITING DATA ----------------------------------------

        let response = {}
        let getEditingquery = "SELECT * FROM `sys`.`quota_editing` WHERE projectID=?"
        let getEditingResult = await sqlQuery(connection, getEditingquery, [projectId])
        response.id = getEditingResult[0].id
        response.rowList = JSON.parse(getEditingResult[0].rows)
        response.colList = JSON.parse(getEditingResult[0].columns)
        response.data = JSON.parse(getEditingResult[0].data)

        //----------------------------------------------------------------------------------

        //Query Data các survey theo projectID
        let query = "SELECT * FROM `sys`.`quota_data` WHERE projectID=?"
        let result = await sqlQuery(connection, query, [projectId])
        connection.end()
        //Dung hàm surveySplit để phân loại các survey theo từng cột và hàng ứng với uniqueID trong response.data
        response = surveySplit(result, response)
        //maping dữ liệu sang text ứng với uniqueID sau đó join lại để được quotaName chô tên cột
        let finalResponse = mappingData(response)
        console.log(finalResponse)
        return res.send(finalResponse)
    }
    catch (error) {
        console.log(error)
        res.json({
            error: error
        })
    }
}