const mysql = require('mysql')
const conn  = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'blog',
    // 开启执行多条sql语句
    multipleStatements:true
})

module.exports = conn