let dbutil = require("./DBUtil");

//插入博客后需要插入对应的标签到数据库
function insertTag(tag, ctime, utime, success) {
    let insertSql = "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)";
    let params = [tag, ctime, utime];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queyrTag(tag, success) {
    let insertSql = "select * from tags where tag = ?;";
    let params = [tag];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertTag = insertTag;
module.exports.queyrTag = queyrTag;