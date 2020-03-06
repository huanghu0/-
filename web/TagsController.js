let blogDao = require("../dao/BlogDao");
let tagsDao = require("../dao/TagsDao");
let tagBlogMappingDao = require("../dao/TagBlogMappingDao");
let timeUtil = require("../util/TimeUtil");
let respUtil = require("../util/RespUtil");
let url = require("url");

let path = new Map();

function queryRandomTags(request, response) {//随机查询标签的后端接口函数
    tagsDao.queyrAllTag(function (result) {
        result.sort(function () {
           return Math.random() > 0.5 ? true : false;
        });
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryRandomTags", queryRandomTags);

function queryByTag(request, response) {
    let params = url.parse(request.url, true).query;
    tagsDao.queyrTag(params.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        } else {
            tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {

                let blogList = [];
                for (let i = 0 ; i < result.length ; i ++) {
                    blogDao.queryBlogById(result[i].blog_id, function (result) {
                        blogList.push(result[0]);
                    });
                }
                getResult(blogList, result.length, response);
            });
        }
    });
}
path.set("/queryByTag", queryByTag);

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response);
        }, 10);
    } else {
        for (let i = 0 ; i < blogList.length ; i ++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", blogList));
        response.end();
    }
}

function queryByTagCount(request, response) {
    let params = url.parse(request.url, true).query;
    console.log(params.tag);
    tagsDao.queyrTag(params.tag, function (result) {
        console.log(result);
        tagBlogMappingDao.queryByTagCount(result[0].id, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        });
    });
}
path.set("/queryByTagCount", queryByTagCount);

module.exports.path = path;
