let dbutil = require("./DBUtil");
//插入博客是需要把对应的标签和博客映射起来插入表中
function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
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

module.exports.insertTagBlogMapping = insertTagBlogMapping;