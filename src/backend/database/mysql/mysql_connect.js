const mysql = require('mysql')

var dbConfig = {
    host: '192.168.2.20',
    user: 'dev04',
    password: 'password',
    port: '3306',
    database: 'sys'
}

module.exports = async () => new Promise(
    (resolve, reject) => {
        const connection = mysql.createConnection(dbConfig);
     connection.connect(error => {
          if (error) {
          reject(error);
         return;
       }
       resolve(connection);
     })
    });

