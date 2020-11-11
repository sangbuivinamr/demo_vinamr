const configs = require('./expressionConfig')
//Hàm check được dùng để kiểm trả các kiểu câu hỏi trong survey form
module.exports.check = async (question) => {
    let result = []
    //duyệt qua config nếu có và check matching với question.type
    for (let config of configs) {
        if (question.type == config.name) {
            console.log(question.type, config.name)
            if (config.type) {
                for (let row of question[config.type]) {
                    let getData = {}
                    for (let i = 0; i < config.variables.length; i++) {
                        getData[config.variables[i]] = row[config.data[i]]
                    }
                    result.push(getData)
                }
            }
            else {
                let getData = {}
                for (let i = 0; i < config.variables.length; i++) {
                    console.log(config.data[i])
                    getData[config.variables[i]] = question[config.data[i]]
                }
                result.push(getData)
            }
        } 
    }
    return result
}