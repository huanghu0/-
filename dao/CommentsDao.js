let dbutil = require("./DBUtil");

function insertComment(blogId, parent, userName, comments, email, ctime, utime, parentName,success) {//插入评论到数据库,添加评论,发表评论
    let insertSql = "insert into comments (`blog_id`, `parent`, `user_name`,`comments`,`email`, `ctime`, `utime`,`parent_name`) values (?, ?, ?, ?, ?, ?, ?,?)";
    let params = [blogId, parent, userName, comments,email,ctime, utime, parentName];

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

function queryCommentsByBlogId(blogId, success) {//通过博客的id查询对应的评论
    let querySql = "select * from comments where blog_id = ?;";
    let params = [blogId];
    let connection = dbutil.createConnection();
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

function queryCommentCountByBlogId(blogId, success) {//通过博客的id查询对应的评论数量
    let querySql = "select count(1) as count from comments where blog_id = ?;";
    let params = [blogId];
    let connection = dbutil.createConnection();
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

function queryNewComments(size, success) {//查询最新评论
    let querySql = "select * from comments order by id desc limit ?;";
    let params = [size];
    let connection = dbutil.createConnection();
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

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentCountByBlogId = queryCommentCountByBlogId;
module.exports.queryNewComments = queryNewComments;
