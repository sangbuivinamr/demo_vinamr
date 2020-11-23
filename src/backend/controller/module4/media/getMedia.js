const fs = require('fs')

module.exports = async (req, res, next) => {
    try {
        let dirname = process.cwd()
        let srvyId = req.query.srvyId
        let projectInterviewId = req.query.projectId + '_' + req.query.interviewId 
        let link = dirname + '\\' + srvyId + '\\' + projectInterviewId
        console.log(link)
        let reqRegex
        if (req.query.type == "photo") {
            reqRegex  = new RegExp(/\.(jpe?g)$/, "i")
        } else if (req.query.type == "audio") {
            reqRegex = new RegExp(/\.(mp3)$/, "i")
        }
        
        let files = fs.readdirSync(link).filter(file => 
            (reqRegex).test(file)
        )
        console.log(files)
        for (let i = 0; i < files.length; i++) {
            files[i] = link + "\\" + files[i]
            files[i] = await fs.readFileSync(files[i], 'base64')
            // files[i] = Buffer.from(files).toString('base64')
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