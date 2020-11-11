const dbConnection = require('../../database/mysql/mysql_connect')
const sqlQuery = require('../../database/mysql/mysql_query')

module.exports.getData = async (req, res, next) => {
    try {
        let connection = await dbConnection()
        let query = 'SELECT * FROM sys.temp WHERE projectID="0558"'
        let result = await sqlQuery(connection, query)
        result = result.sort((a,b) => {return a.interviewid - b.interviewid})
        let myMap = new Map()
        for (let i = 0; i < result.length; i++) {
            if(!myMap.has(result[i].interviewid)) {
                myMap.set(result[i].interviewid, result[i])
            } else {
                let existedKey = myMap.get(result[i].interviewid)
                let comparedStt = existedKey.stt
                if (result[i].interviewid > comparedStt) {
                    myMap.delete(result[i].interviewid)
                    myMap.set(result[i].interviewid, result[i])
                } 
            }
        }
        let response = []
        for (let value of myMap.values()) {
            response.push(value)
        }
        return res.send(response) 
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
}