let dbutil = require("./DBUtil");
//编辑博客添加进入数据库
function insertBlog(content,title, tags, views, ctime, utime, success) {
    let insertSql = "insert into blog (`content`,`title`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    let params = [content,title,tags, views, ctime, ctime];

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

function queryBlogByPage(page,pageSize,success){
    let querySql = "select * from blog order by id desc limit ?, ? ;";
    let params = [page*pageSize,pageSize];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;