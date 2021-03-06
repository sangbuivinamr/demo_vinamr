const dbConnection = require('../../../database/mysql/mysqlConnect')
const sqlQuery = require('../../../database/mysql/mysqlQuery')

module.exports.getAllQuota = async (req, res, next) => {
    let projectId = req.query.projectId
    try {
        if (projectId === undefined) {
            return res.json({
                error: "unknown projectId"
            })
        }
        //tạo connection mới
        let connection = await dbConnection()
        //query version mới nhất theo projectId thể làm điều kiên query cho kêt quả cuối cùng theo yêu cầu.
        let getVersionQuery = 'SELECT version FROM `quota-expression` WHERE projectId="' + projectId + '" ORDER BY version DESC LIMIT 1'
        let getVersion = await sqlQuery(connection, getVersionQuery)
<<<<<<< HEAD
        console.log(getVersion[0].version)
=======
        if (getVersion.length == 0) {
            return res.json({
                message: "nothing in database"
            })
        }
>>>>>>> editing-model
        //query tất cả các cột theo projectId truyền vào với version mới nhất
        let query = 'SELECT * FROM `quota-expression` WHERE (projectID="' + projectId + '" AND version=' + getVersion[0].version + ')'
        let result = await sqlQuery(connection, query)
        connection.end()
        return res.status(200).send(result)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'error',
            error: error
        })
    }
}

module.exports.postQuota = async (req, res, next) => {
    let projectId = req.query.projectId
    try {
        //tạo connection mới
        let connection = await dbConnection()
        let getVersionQuery = 'SELECT version FROM `quota-expression` WHERE projectId="' + projectId + '" ORDER BY version DESC LIMIT 1'
        let getVersion = await sqlQuery(connection, getVersionQuery)
        console.log(getVersion)
        //trường hợp table mới được tạo hoặc mới truncate nếu chưa có dong nào, query sẽ có giá trị rỗng, nên gán 1 để tạo version đầu tiên
<<<<<<< HEAD
        if (getVersion[0] == null) {
=======
        if (getVersion.length == 0) {
>>>>>>> editing-model
            getVersion[0] = 1
        } else {
            //nếu table đã có dữ liệu trước, query sẽ trả về giá trị mới nhất của version dưới dạng [{version: value}] 
            //nên ta plus 1 để tạo version tiếp theo
            getVersion[0].version += 1
        }
        //giá trị truyền vào là một array of object nên dùng for để duyệt qua từng object rồi thực hiện query
        for (let quota of req.body) {
            let postQuery = 'INSERT INTO `quota-expression` (projectID, name, expression, version) VALUES ("' + projectId + '","' + quota.name + '", "' + quota.expression + '", ' + getVersion[0].version + ' )'
            let postResult = await sqlQuery(connection, postQuery)
        }
        // let getQuota = 'SELECT * FROM `quota-expression` WHERE projectID="' + projectId + '"'
        // let result = await sqlQuery(connection, getQuota)
        connection.end()
        return res.status(200).json({
            message: "successful"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'error',
            error: err
        })
    }
}


