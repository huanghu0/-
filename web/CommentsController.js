let CommentsDao = require("../dao/CommentsDao");
let timeUtil = require("../util/TimeUtil");
let respUtil = require("../util/RespUtil");
let captcha = require("svg-captcha");//加载可以返回验证码的模块
let url = require("url");

let path = new Map();

function addComments(request,response){//添加评论的后端接口函数
    let params = url.parse(request.url, true).query;
    // console.log(params);
    CommentsDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.userName,  params.content,params.email, timeUtil.getNow(), timeUtil.getNow(), params.parentName, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    });
}
path.set("/addComments",addComments);

function queryRandomCode(request, response) {//向前台返回验证码,不需要数据库
    let img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request, response) {//通过博客id查对应评论的后端接口函数
    let params = url.parse(request.url, true).query;
    CommentsDao.queryCommentsByBlogId(parseInt(params.bid), function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

function queryCommentsCountByBlogId(request, response) {//通过博客id查评论数量的接口函数
    let params = url.parse(request.url, true).query;
    CommentsDao.queryCommentCountByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

function queryNewComments(request, response) {//查询最新评论的后端函数接口
    CommentsDao.queryNewComments(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
}
path.set("/queryNewComments", queryNewComments);


module.exports.path = path;