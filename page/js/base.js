var randomTags = new Vue({// 首页右侧随机标签云部分
    el:"#random_tags",
    data:{
        tags:["sss","www","rrr","ttt","uuu","ddd","mmm","ccc","aaa","xxx"]
    },
    computed:{
        randomColor:function(){
            return function(){
                var red = Math.random()*255;
                var green = Math.random()*255;
                var blue = Math.random()*255;
                return "rgb("+ red +", "+ green +","+ blue +")";
            }
        },
        randomSize:function(){
            return function(){
                var size = (Math.random()*20 + 12) + "px";
                return size;
            }
        }
    },
    created:function(){

    }
})

var newHot = new Vue({//首页右侧最新热门
    el:"#new_hot",
    data:{
        titleList:[
            {link:"/",title:"centOS服务器"},
            {link:"/",title:"centOS服务器"},
            {link:"/",title:"centOS服务器"},
            {link:"/",title:"centOS服务器"},
            {link:"/",title:"centOS服务器"},
            {link:"/",title:"centOS服务器"},
        ]
    },
    created:function(){

    }
})

var newComments = new Vue({//右侧最新评论
    el:"#new_comments",
    data:{
        commentList:[
            {name:'用户名',date:'时间',comment:'访客评论'},
            {name:'用户名',date:'时间',comment:'访客评论'},
            {name:'用户名',date:'时间',comment:'访客评论'},
            {name:'用户名',date:'时间',comment:'访客评论'},
            {name:'用户名',date:'时间',comment:'访客评论'},
            {name:'用户名',date:'时间',comment:'访客评论'}
        ]
    },
    created:function(){

    }
})
