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
            response.write(respUtil.writeResult("success", "添加成功", null));
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



module.exports.path = path;