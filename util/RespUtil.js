//前端请求后，给前端一个响应
function writeResult(status, msg, data) {
    return JSON.stringify({status: status, msg: msg, data: data});
}

module.exports.writeResult = writeResult;