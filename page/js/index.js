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