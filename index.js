let express = require('express');//引入express模块
let globalconfig = require("./config");//引入端口路径配置文件
let loader = require("./loader");//引入各个接口的后端路由对应的函数模块

let app = new express();//创建expresss实例app

app.use(express.static('./page/'));//指定静态目录,express默认会去找该目录下的index.html

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"));

app.get("/queryBlogCount",loader.get("/queryBlogCount"));
app.get("/queryBlogById",loader.get("/queryBlogById"));
app.get("/addComments",loader.get("/addComments"));
app.get("/queryRandomCode",loader.get("/queryRandomCode"));

app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));
app.get("/queryCommentsCountByBlogId", loader.get("/queryCommentsCountByBlogId"));

app.get("/queryAllBlog", loader.get("/queryAllBlog"));

app.get("/queryRandomTags", loader.get("/queryRandomTags"));
app.get("/queryHotBlog", loader.get("/queryHotBlog"));
app.get("/queryNewComments", loader.get("/queryNewComments"));

app.get("/queryByTag", loader.get("/queryByTag"));
app.get("/queryByTagCount", loader.get("/queryByTagCount"));


app.listen(globalconfig.port,()=>{
    console.log("服务已启动");
})

