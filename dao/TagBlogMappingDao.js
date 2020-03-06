let dbutil = require("./DBUtil");
function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {//插入博客是需要把对应的标签和博客映射起来插入表中
    let insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?)";
    let params = [tagId, blogId, ctime, utime];

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

function queryByTag(tagId, page, pageSize, success) {
    let insertSql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
    let params = [tagId, page * pageSize, pageSize];

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

function queryByTagCount(tagId, success) {
    let insertSql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    let params = [tagId];

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

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;