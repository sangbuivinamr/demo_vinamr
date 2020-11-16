const dbConnection = require('../../database/mysql/mysql_connect')
const sqlQuery = require('../../database/mysql/mysql_query')

//APi để get dữ liệu trong databse để hiện thị ở trang quota editing
module.exports.getTable = async (req, res, next) => {
    let projectId = req.query.projectId
    try {
        let response = {}
        let connection = await dbConnection()
        let query = "SELECT * FROM `sys`.`quota_editing` WHERE projectID=?"
        let result = await sqlQuery(connection, query, [projectId])
        console.log(result)
        connection.end()
        //kiểm tra dữ liệu, nếu trong database chưa có dữ liệu (result.length == 0) trả về FE
        if (result.length == 0) {
            return res.json({
                message: "no projectID matching"
            })
        } else {
            //do dữ liệu được lưu trong db bằng string nên ta parse string sang Object bằng JSON.parse
            response.rowList = JSON.parse(result[0].rows)
            response.colList = JSON.parse(result[0].columns)
            response.data = JSON.parse(result[0].data)
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
module.exports.postTable = async (req, res) => {
    let projectId = req.query.projectId
    try {
        //chuyển dữ liệu từ request sang kiểu string vì db định nghĩa các cột kiểu JSON
        let rowInput = JSON.stringify(req.body.rowList)
        let colInput = JSON.stringify(req.body.colList)
        let dataInput = JSON.stringify(req.body.data)
        //query 
        let connection = await dbConnection()
        let query = "INSERT INTO `sys`.`quota_editing` (`projectID`, `rows`, `columns`, `data`) VALUES (?, ?, ?, ?)"
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