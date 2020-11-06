const express = require('express')
const dbConnection = require('../database/mysql/mysql_connect')
const sqlQuery = require('../database/mysql/mysql_query')

module.exports.getAllQuota = async (req, res, next) => {
    let query = 'SELECT * FROM `quota-expression`'
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