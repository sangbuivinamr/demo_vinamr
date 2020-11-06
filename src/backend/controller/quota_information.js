const express = require('express')
const dbConnection = require('../database/mysql/mysql_connect')
const sqlQuery = require('../database/mysql/mysql_query')

module.exports.getAllQuota = async (req, res, next) => {
    console.log(req)
    console.log(req.query.projectId)
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