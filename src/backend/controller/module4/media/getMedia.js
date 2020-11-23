const fs = require('fs')

module.exports = async (req, res, next) => {
    try {
        //cwd trả về url file đang chạy
        let dirname = process.cwd()
        //srvyId là tên người thực hiện interview
        let srvyId = req.query.srvyId
        //file chứa bên trong là projectID_interviewID
        let projectInterviewId = req.query.projectId + '_' + req.query.interviewId
        //url cụ thể: cwd/surveyid/projectId_interviewId/files 
        let link = dirname + '\\' + srvyId + '\\' + projectInterviewId
        console.log(link)
        //tạo Regex để check điều kiên audio hay photo cũng như filter các file trong folder
        let reqRegex
        if (req.query.type == "photo") {
            reqRegex  = new RegExp(/\.(jpe?g)$/, "i")
        } else if (req.query.type == "audio") {
            reqRegex = new RegExp(/\.(mp3)$/, "i")
        }
        //filter file
        let files = fs.readdirSync(link).filter(file => 
            (reqRegex).test(file)
        )
        console.log(files)
        for (let i = 0; i < files.length; i++) {
            //gắn đường dẫn cụ thể cho các file
            files[i] = link + "\\" + files[i]
            //đọc và chuyển file thành base64
            files[i] = await fs.readFileSync(files[i], 'base64')
        }
        return res.send({
            file: files
        })
    }
    catch (error) {
        console.log(error)
        return res.json({
            error: error
        })
    }

}