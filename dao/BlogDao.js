let dbutil = require("./DBUtil");
function insertBlog(content,title, tags, views, ctime, utime, success) {//编辑博客添加进入数据库
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

function queryBlogByPage(page,pageSize,success){//按照页数来获取对应的blog博客,页数在每个组件中传入,用于规定每一页放多少博客的是pageSize,在vue组件中固定规定
    let querySql = "select * from blog order by id desc limit ?, ? ;";//查询时按照规定的页数的位置的起始位置来获取博客的数据
    let params = [page*pageSize,pageSize];//第page页的博客是从前面page页*pageSize个博客+1个的位置开始搜索
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

function queryBlogCount(success) {//返回所有博客数,只在创建分页组件时用到
    let querySql = "select count(1) as count from blog;";
    let params = [];

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

function queryBlogById(bid,success){//通过bid来查找对应的博客
    let querySql = "select * from blog where id = ? ;";
    let params = [bid];

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

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;