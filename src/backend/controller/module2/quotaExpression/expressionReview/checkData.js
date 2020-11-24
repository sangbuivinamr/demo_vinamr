const configs = require('./expressionConfig')
//Hàm check được dùng để kiểm trả các kiểu câu hỏi trong survey form
module.exports.check = async (question) => {
    let result = []
    //duyệt qua config nếu có và check matching với question.type
    for (let config of configs) {
        if (question.type == config.name) {
            //một số loại đặt trưng được xác định trong config, những loại question còn lại,
            //lấy dữ liệu y như câu hỏi, không options.
            if (config.type) {
                //Dữ liệu option tương ứng với type của question, mỗi question có nhiều row đáp án
                //dùng for để duyệt qua từng option đáp án.
                for (let row of question[config.type]) {
                    let getData = {}
                    //map dữ liệu từ question sang dang phù hợp và push vào result
                    for (let i = 0; i < config.variables.length; i++) {
                        getData[config.variables[i]] = row[config.data[i]]
                    }
                    result.push(getData)
                }
            }
            else {
                let getData = {}
                //Nếu type ko được định dạng đặc biệt config, lấy hết dữ liệu ko cần mapping. 
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