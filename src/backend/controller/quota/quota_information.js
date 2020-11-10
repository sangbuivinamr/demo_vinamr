const dbConnection = require('../../database/mysql/mysql_connect')
const sqlQuery = require('../../database/mysql/mysql_query')

module.exports.getAllQuota = async (req, res, next) => {
    let projectId = req.query.projectId
    let query = 'SELECT * FROM `quota-expression` WHERE projectID="' + projectId + '"'
    console.log(query)
    try {
        let connection = await dbConnection()
        let result = await sqlQuery(connection, query)
        res.status(200).send(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'error',
            error: error
        })
    }
}

module.exports.postQuota = async (req, res, next) => {
    let projectId = req.query.projectId
    try {
        let connection = await dbConnection()
        for (let quota of req.body) {
            let postQuery = 'INSERT INTO `quota-expression` (projectID, name, expression) VALUES ("' + projectId + '","' + quota.name + '", "' + quota.expression + '")'
            let postResult = await sqlQuery(connection, postQuery)
        }
        let getQuota = 'SELECT * FROM `quota-expression` WHERE projectID="' + projectId + '"'
        let result = await sqlQuery(connection, getQuota)
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'error',
            error: err
        })
    }
}


