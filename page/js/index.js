var everyDay = new Vue({// 首页里每日一句部分
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

var article_list = new Vue({//首页里文章列表(博客)部分
    el:"#article_list",
    data:{
        page:1,
        pageSize:5,
        count: 100,
        pageNumList: [],
        articleList:[{
            title:'与服务器斗争的第四天',
            content:'是真的心烦加心累啊',
            date:'2020-03-01',
            views:'0',
            tags:'centOS linux',
            id:'1',
            link:''
        }]
    },
    computed:{
        jumpTo: function() {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        },
        getPage:function(page,pageSize){
            return function(page,pageSize){
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
                    if (searcheUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searcheUrlParams[i].split("=")[1];
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }
                if (tag == "") {//不是查询情况
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function(resp) {
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
                            temp.link = "/detail_blog.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        article_list.articleList = list;
                        article_list.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then(function(resp) {
                        article_list.count = resp.data.data[0].count;
                        article_list.generatePageTool;
                    });
                } else {
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function(resp) {
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
                            temp.link = "/detail_blog.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        article_list.articleList = list;
                        article_list.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });

                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag=" + tag
                    }).then(function(resp) {
                        article_list.count = resp.data.data[0].count;
                        article_list.generatePageTool;
                    });
                }

            }
        },
        generatePageTool: function () {//分页插件
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<", page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page:nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page:nowPage - 1});
            }
            result.push({text: nowPage, page:nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 2, page: nowPage + 2});
            }
            result.push({text:">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
            return result;
        }
    },
    created:function(){
        //请求数据,给content赋值
        this.getPage(this.page,this.pageSize);//首页加载进入的时候获取像后端发送请求获取博客数据
    }
})

var search = new Vue({
    el: "#search_bar",
    data: {
        search: ""
    },
    methods: {
        sendSearch: function () {
            axios({
                method:'get',
                url: "/searchBlog?search=" + this.search
            }).then(function (resp) {
                article_list.count = resp.data.count;
                article_list.page = 1;
                article_list.articleList = resp.data.list;
                // window.location.reload();               
            });
        }
    },
    computed: {

    }
});