let express = require('express');//引入express模块
let globalconfig = require("./config");//引入端口路径配置文件
let loader = require("./loader");//引入各个接口的后端路由对应的函数模块

let app = new express();//创建expresss实例app

app.use(express.static('./page/'));//指定静态目录,express默认会去找该目录下的index.html

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog", loader.get("/editBlog"));

app.listen(globalconfig.port,()=>{
    console.log("服务已启动");
})

