let CommentsDao = require("../dao/CommentsDao");
let timeUtil = require("../util/TimeUtil");
let respUtil = require("../util/RespUtil");
let url = require("url");

let path = new Map();

function addComments(request,response){//添加评论的后端接口函数
    let params = url.parse(request.url, true).query;

    CommentsDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.userName,  params.content,params.email, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    });
}

path.set("/addComments",addComments);

module.exports.path = path;