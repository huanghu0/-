let blogDao = require("../dao/BlogDao");
let tagsDao = require("../dao/TagsDao");
let tagBlogMappingDao = require("../dao/TagBlogMappingDao");
let timeUtil = require("../util/TimeUtil");
let respUtil = require("../util/RespUtil");
let url = require("url");

let path = new Map();
//编辑博客接口对应的后端函数
function editBlog(request, response) {
    let params = url.parse(request.url, true).query;//title和tags是由路由路径参数得到
    let tags = params.tags.replace(/ /g, "").replace("，", ",");//标签在输入时有时候会用空格和中文逗号隔开这里将它们事先替换掉
    request.on("data", function (data) {
        blogDao.insertBlog(data.toString(),params.title, tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));//返回给前端一个对象用来提示前端
            response.end();
            let blogId = result.insertId;
            let tagList = tags.split(",");
            for (let i = 0 ; i < tagList.length ; i ++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId);//查询标签是否已经存在,该函数在下面也会做插入标签以及标签与博客的映射插入操作
            }
        });
    });
}
function queryTag(tag, blogId) {
    tagsDao.queyrTag(tag, function (result) {
        console.log()
       if (result == null || result.length == 0) {
            insertTag(tag, blogId);
       } else {
           tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {});
       }
    });
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId);
    });
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {});
}
path.set("/editBlog", editBlog);
//首页进入时加载博客显示在界面上，对应的后端接口函数
function queryBlogByPage(request,response){
    let params = url.parse(request.url,true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){
        // console.log(result);
        for (let i = 0 ; i < result.length ; i ++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");//将图片过滤掉
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            // result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);//写响应头
        response.write(respUtil.writeResult("success", "查询成功", result));//写数据体
        response.end();//结束
    })
}
path.set("/queryBlogByPage",queryBlogByPage);

function queryBlogCount(request, response) {//返回所有的博客的数量，对应的后端接口函数
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryBlogCount", queryBlogCount);

function queryBlogById(request,response){
    let params = url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryBlogById",queryBlogById);

module.exports.path = path;

