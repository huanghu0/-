let mysql = require("mysql");

function createConnection(){//创建数据库连接
    let connection = mysql.createConnection({
        host:'116.62.54.125',
        port:'3306',
        user:'root',
        password:'19980601hhjY@',
        database:'myBlog'
    })
    return connection;
}

module.exports.createConnection =  createConnection;