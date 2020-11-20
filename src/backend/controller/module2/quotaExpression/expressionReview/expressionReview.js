const dbConnection = require('../../../../database/mysql/mysql_connect')
const sqlQuery = require('../../../../database/mysql/mysql_query')
const checkData = require('./checkData')

module.exports.getCodeExpression = async (req, res, next) => {
    try {
        let connection = await dbConnection()
        //Query survey mới nhất theo ProjectID
        let query = 'SELECT * FROM sys.json_data WHERE projectID="' + req.query.projectId + '" ORDER BY stt DESC LIMIT 1'
        let getResult = await sqlQuery(connection, query)
        //Parse kết quả Query thành json
        var parse = JSON.parse(getResult[0].surveyjson.slice(1, getResult[0].surveyjson.length - 1))
        //vòng for đầu tiên để duyệt dừng trang trong survey
        for (var page of parse.pages) {
            //nếu trang có element đồng nghĩa trang đó sẽ có question
            if (page.elements) {
                //Mỗi element sẽ chứa 1 question và Element là 1 array question.
                for (let i = 0; i < page.elements.length; i++) {
                    //Duyệt qua từng Question để tìm ra Question có Code map với Code truyền vào trong Request
                    for (var question of page.elements) {
                        if (question.name == req.query.code) {
                            //Check loại câu hỏi và dùng hàm check trong CheckData để lọc theo từng loại câu hỏi
                            var child = await checkData.check(question)
                            var result = {
                                code: question.name,
                                description: question.title,
                                child: child
                            }
                            connection.end()
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