const dbConnection = require('../../database/mysql/mysqlConnect')
const sqlQuery = require('../../database/mysql/mysqlQuery')

module.exports.getTracking = async (req, res, next) => {
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
        console.log(response)

        //----------------------------------------------------------------------------------
        let query = "SELECT * FROM `sys`.`quota_data` WHERE projectID=?"
        let result = await sqlQuery(connection, query, [projectId])
        connection.end()
        console.log(result)
        let quotaSplits = []
        //lấy dữ liệu quotaname sau đó chia dữ liệu thanh row thành col qua dấu " . "
        for (let takeQuota of result) {
            let splited = takeQuota.quotaname.split(".")
            //Đối chiếu với dữ liệu text trong quota editing để chuyển thành uniqueID vì data chứa uniqueID, ko phải text 
            for (let i = 0; i < response.rowList.length; i++) {
                if (response.rowList[i].text == splited[0]) {
                    splited[0] = response.rowList[i].uniqueID
                }
            }
            for (let i = 0; i < response.colList.length; i++) {
                if (response.colList[i].text == splited[1]) {
                    splited[1] = response.colList[i].uniqueID
                }
            }
            quotaSplits.push(splited)
        }
        //Khởi tạo dữ liệu current trước khi đếm survey và phân loại
        for (let dataRow of response.data) {
            dataRow.current = 0
        }
        console.log(quotaSplits)
        //đối chiếu với với uniqueID trong response data để phân loại các dữ liệu
        for (let quotaSplit of quotaSplits) {
            //nếu cả 2 uniqueID ở row và column đều matching, current cộng thêm 1 đơn vị
            for (let dataRow of response.data) {
                if (quotaSplit[0] == dataRow.row && quotaSplit[1] == dataRow.column) {
                    dataRow.current++
                }
            }
        }
        return res.send(response)
    }
    catch (error) {
        console.log(error)
        res.json({
            error: error
        })
    }
}

