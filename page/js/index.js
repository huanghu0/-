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

    }
})

var article_list = new Vue({
    el:"#article_list",
    data:{
        articleList:[{
            title:'与服务器斗争的第四天',
            content:'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwddddddddddddddddddssssssssssssss',
            date:'2020-03-01',
            views:'0',
            tags:'centOS linux',
            id:'1',
            link:''
        },{
            title:'与服务器斗争的第四天',
            content:'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwddddddddddddddddddssssssssssssss',
            date:'2020-03-01',
            views:'0',
            tags:'centOS linux',
            id:'1',
            link:''
        },{
            title:'与服务器斗争的第四天',
            content:'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwddddddddddddddddddssssssssssssss',
            date:'2020-03-01',
            views:'0',
            tags:'centOS linux',
            id:'1',
            link:''
        }]
    }
})