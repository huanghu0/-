let dbutil = require("./DBUtil");

function insertEveryDay(content,ctime,success){
    let insertSql = "insert into every_day (`content`, `ctime`) values (?, ?)";//插入语句
    
    let params = [content,ctime];//需要插入属性

    let connection = dbutil.createConnection();//创建连接
    
    connection.connect();//连接

    connection.query(insertSql, params, function (error, result) {//插入操作
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });

    connection.end();//断开连接
}

function queryEveryDay(success) {
    var querySql = "select * from every_day order by id desc limit 1;";//查询返回倒叙最后一个
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;