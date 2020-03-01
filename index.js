let express = require('express');//引入express模块

let app = new express();//创建expresss实例app

app.use(express.static('./page/'));//指定静态目录,express默认会去找该目录下的index.html

app.listen(12306,()=>{
    console.log("服务已启动");
})