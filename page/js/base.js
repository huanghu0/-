var randomTags = new Vue({
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