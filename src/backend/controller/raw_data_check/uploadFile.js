const express = require('express')
const path = require('path')

module.exports = async (req, res, next) => {
    try {
        let file = req.query.fileName
    res.download(path.join('C:/amr/demo_vinamr/src/backend/', '/uploads/' + file))
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
}