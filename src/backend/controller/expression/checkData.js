const configs = require('./expressionConfig')

module.exports.check = async (question) => {
    let result = []
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