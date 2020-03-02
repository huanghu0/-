//引入文件模块
let fs = require('fs');
//定义全局配置对象路径，端口
let globalConfig = {};
//引入服务配置文件
let conf = fs.readFileSync("./server.conf");
//将引入的字符串一行一行分隔开
let configArr = conf.toString().split("\n");

for(let i = 0; i < configArr.length; i ++){
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
}

// console.log(globalConfig);

module.exports = globalConfig;