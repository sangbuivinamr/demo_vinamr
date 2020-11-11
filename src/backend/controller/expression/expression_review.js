const dbConnection = require('../../database/mysql/mysql_connect')
const sqlQuery = require('../../database/mysql/mysql_query')
const checkData = require('./checkData')

// module.exports.checkForm = async (req, res, next) => {
//     try {
//         let connection = await dbConnection()
//         let query = 'SELECT * FROM sys.json_data WHERE projectID="' + req.query.projectId + '" ORDER BY stt DESC LIMIT 1'
//         let getResult = await sqlQuery(connection, query)
//         var parse = JSON.parse(getResult[0].surveyjson.slice(1, getResult[0].surveyjson.length - 1))
//         for (var page of parse.pages) {
//             if (page.elements) {
//                 for (let i = 0; i < page.elements.length; i++) {
//                     for (var question of page.elements) {
//                         console.log(question) 
//                     }
//                 }
//             }
//         }
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

module.exports.getCodeExpression = async (req, res, next) => {
    try {
        let connection = await dbConnection()
        let query = 'SELECT * FROM sys.json_data WHERE projectID="' + req.query.projectId + '" ORDER BY stt DESC LIMIT 1'
        let getResult = await sqlQuery(connection, query)
        var parse = JSON.parse(getResult[0].surveyjson.slice(1, getResult[0].surveyjson.length - 1))
        for (var page of parse.pages) {
            if (page.elements) {
                for (let i = 0; i < page.elements.length; i++) {
                    for (var question of page.elements) {
                        if (question.name == req.query.code) {
                            var child = await checkData.check(question)
                            var result = {
                                code: question.name,
                                description: question.title,
                                child: child
                            }
                            console.log(result)
                            return res.send(result)
                        }
                    }
                }
            }
        }
        return res.json({
            massage: "no matching result"
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