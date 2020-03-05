let dbutil = require("./DBUtil");

function insertComment(blogId, parent, userName, email, comments, ctime, utime, success) {//插入评论到数据库,添加评论
    let insertSql = "insert into comments (`blog_id`, `parent`, `user_name`,`comments`,`email`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?)";
    let params = [blogId, parent, userName, comments,email,ctime, utime];

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

module.exports.insertComment = insertComment;