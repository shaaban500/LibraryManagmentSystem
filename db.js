const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sha3ban_El-Bay',
    database: 'library_db'
})


module.exports = mysqlPool