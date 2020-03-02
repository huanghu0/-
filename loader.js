let fs = require("fs");//引入文件系统

let globalConfig = require("./config");//引入配置js文件

let controllerSet = [];

let pathMap = new Map();//创建接口映射,将对应后端的接口函数放入其中

let files = fs.readdirSync(globalConfig["web_path"]);//读取web目录下所有的文件，并返回文件名

for(let i = 0 ; i < files.length; i ++){
    let temp = require("./" + globalConfig["web_path"] + "/" + files[i]);//引入web文件下对应的文件,到处的对象里只有path
    if (temp.path) {
        for (let [key, value] of temp.path) {
            if (pathMap.get(key) == null) {//同意的接口只有一个后端函数功能
                pathMap.set(key, value);
            } else {
                throw new Error("url path异常, url:" + key);
            }
        }
        controllerSet.push(temp);
    }
}

module.exports = pathMap;