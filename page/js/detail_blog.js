var blogDetail = new Vue({
    el:"#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed:{

    },
    created:function(){
        //页面加载进来的时候请求数据
        var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searcheUrlParams == "") {
            return;
        }
        var bid = -1;

        for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
            if (searcheUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searcheUrlParams[i].split("=")[1]);
                }catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method:"get",
            url:'/queryBlogById?bid='+bid,//通过编号查id
        }).then(function(resp){
            // console.log(resp);
            var result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
        })
    }
})

var sendComment = new Vue({
    el:"#send_comment",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed:{
        changeCode: function() {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    console.log(resp);
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                });
            }
        },
        sendComment: function() {
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code != sendComment.rightCode) {
                    alert("验证码有误");
                    return;
                }
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var bid = -10;

                for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
                    if (searcheUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searcheUrlParams[i].split("=")[1]);
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value;
                // var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                axios({
                    method: "get",
                    url: "/addComments?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content
                }).then(function (resp) {
                    alert(resp.data.msg);
                });
            }
        }
    },
    created:function(){//刚进入时加载一篇验证码
        this.changeCode();
    }
})