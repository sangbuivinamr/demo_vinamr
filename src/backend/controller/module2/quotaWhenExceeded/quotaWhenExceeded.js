const dbConnection = require('../../../database/mysql/mysqlConnect')
const sqlQuery = require('../../../database/mysql/mysqlQuery')

//APi để get dữ liệu trong databse để hiện thị ở trang quota editing
module.exports.getQuotaExceeded = async (req, res, next) => {
    let projectId = req.query.projectId
    try {
        let response = {}
        let connection = await dbConnection()
        let query = "SELECT * FROM `sys`.`quota_exceeded` WHERE projectID=? ORDER BY `id` DESC LIMIT 1"
        let result = await sqlQuery(connection, query, [projectId])
        
        //kiểm tra dữ liệu, nếu trong database chưa có dữ liệu (result.length == 0) trả về FE
        if (result.length == 0) {
            let compareColQuery = "SELECT * FROM `sys`.`quota_editing` WHERE projectID=? ORDER BY `id` DESC LIMIT 1"
            let compareColData = await sqlQuery(connection, compareColQuery, [projectId])
            connection.end()
            let subResponse = {}
            subResponse.rowList = JSON.parse(compareColData[0].rows)
            subResponse.colList = JSON.parse(compareColData[0].columns)
            subResponse.data = JSON.parse(compareColData[0].data)
            for (let i = 0; i < subResponse.data.length; i++) {
                subResponse.data[i].maxQuota = ''
            }
            console.log(subResponse)
            return res.send(subResponse)
        } else {
            //do dữ liệu được lưu trong db bằng string nên ta parse string sang Object bằng JSON.parse
            response.id = result[0].id
            response.rowList = JSON.parse(result[0].rows)
            response.colList = JSON.parse(result[0].columns)
            response.data = JSON.parse(result[0].data)
            connection.end()
            return res.send(response)
        }
    }
    catch (error) {
        console.log(error)
        return res.json({
            error: error
        })
    }
}

//Insert dữ liệu vào database
module.exports.postQuotaExceeded = async (req, res) => {
    let projectId = req.query.projectId
    try {
        //chuyển dữ liệu từ request sang kiểu string vì db định nghĩa các cột kiểu JSON
        let rowInput = JSON.stringify(req.body.rowList)
        let colInput = JSON.stringify(req.body.colList)
        let dataInput = JSON.stringify(req.body.data)
        //query 
        let connection = await dbConnection()
        let query = "INSERT INTO `sys`.`quota_exceeded` (`projectID`, `rows`, `columns`, `data`) VALUES (?, ?, ?, ?)"
        let result = await sqlQuery(connection, query, [projectId, rowInput, colInput, dataInput])
        connection.end()
        //Nếu thành công, gửi message thông báo
        return res.status(200).json({
            message: "insert successful"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
}