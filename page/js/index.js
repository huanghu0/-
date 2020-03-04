// 首页里每日一句部分
var everyDay = new Vue({
    el:"#every_day",
    data:{
        content:"锄禾日当午，汗滴禾下土",
    },
    computed:{
        getContent:function(){
            return this.content;
        }
    },
    created:function(){
        //请求数据,给content赋值
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function(resp) {
            console.log(resp);
            everyDay.content = resp.data.data[0].content;
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
})

//首页里文章列表(博客)部分
var article_list = new Vue({
    el:"#article_list",
    data:{
        page:1,
        pageSize:5,
        articleList:[{
            title:'与服务器斗争的第四天',
            content:'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwddddddddddddddddddssssssssssssss',
            date:'2020-03-01',
            views:'0',
            tags:'centOS linux',
            id:'1',
            link:''
        }]
    },
    computed:{
        getPage:function(page,pageSize){
            return function(page,pageSize){
                axios({
                    method:'get',
                    url:"/queryBlogByPage?page=" + (page-1) + "&pageSize=" + pageSize, 
                }).then(function(resp){
                    console.log(resp);
                    var result = resp.data.data;
                    var list = [];
                    for (var i = 0 ; i < result.length ; i ++) {
                        var temp = {};
                        temp.title = result[i].title;
                        temp.content = result[i].content;
                        temp.date = result[i].ctime;
                        temp.views = result[i].views;
                        temp.tags = result[i].tags;
                        temp.id = result[i].id;
                        temp.link = "/" + result[i].id;
                        list.push(temp);
                    }
                    article_list.articleList = list;
                }).catch(function(resp){
                    console.log("请求错误");
                })
            }
        }
    },
    created:function(){
        //请求数据,给content赋值
        this.getPage(this.page,this.pageSize);//首页加载进入的时候获取像后端发送请求获取博客数据
    }
})