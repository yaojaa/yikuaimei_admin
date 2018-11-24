<template>
<div>
    <div>
        <table-tabs :page-tabs="pageTapsCard" @tabs-click="pageTapsClick"></table-tabs>
    </div>
    <div class="container" ref='container'>
        <div class="imgbox" :style="{'margin-right':mr+'px','margin-left':mr+'px'}" v-for="(v,i) in mockdata" :key="i">
            <img :src="v.imgurl" alt="">
            <p class="f12 text-default text-hide">{{v.title+index}}</p>
            <span class="text-info text-hide">{{v.label}}</span>
            <i class="f16 text-default">{{'¥'+' '+Number(v.price).toFixed(2)}}</i>
        </div>
    </div>    
</div>

</template>
<script>
import TableTabs from '@/components/common/TableTabs'
// table切换切换computed传入数据切换
    export default{
        created(){
            var _this=this;
            window.onresize=function(){
                _this.resize()
            }
        },
        mounted(){
            this.$nextTick(this.resize())
        },
        methods:{
            resize(){
                if(parseInt(this.$refs.container.clientWidth)<=1200){
                    // console.log(this.mr)
                    this.mr = (parseInt(this.$refs.container.clientWidth)-193*4-40)/8;
                }else if(parseInt(this.$refs.container.clientWidth)>1200){
                    // console.log(this.$refs.container.clientWidth)
                    this.mr = (parseInt(this.$refs.container.clientWidth)-193*5-40)/10;
                }
            },
            pageTapsClick(index, tabs) { //index 是tabs的下标
                // console.log(index,tabs)
                this.index = index
            },
        },
        components:{
            TableTabs
        },
        data(){
            return {
                index:0,
                mr:0,
                pageTapsCard:{
                    "type":"card",
                    "list":[
                        {
                            "label":"收藏",
                            "name": "0",
                        },
                        {
                            "label":"关注",
                            "name": "1",
                        },
                        {
                            "label":"对比",
                            "name": "2",
                        }
                    ],
                    "activeVal":"0" //初始值
                },
                mockdata:[
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱我的发我来回复还我还佛为if奇偶微积分欧文发我饿发',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'/static/img/user_collect.png',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    }
                ]
            }
        }
        // 接受外部数据data
        // props:[data],

    }
</script>
<style lang="less" scoped>
.f10{

}
.container{
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    .imgbox{
        cursor: pointer;
        border: 1px solid #F1F1F1;
        box-shadow: 1px 1px 1px #F1F1F1;
        border-radius: 5px;
        // margin-right: 10px;
        width: 190px;
        height: 308px;
        margin-bottom: 38px;
        img{
            width: 190px;
            height: 220px;
            display: block;
            background-color: #eee;
        }
        p{
            margin-top: 8px;
            padding-left: 6px;
        }
        span{
            display: block;
            width: 100%;
            margin-top: 4px;
            // padding-left: 6px;    
            margin-left: -4px;
            font-size: 12px;
            transform: scale(0.9,0.9);
        }
        i{
            display: block;
            text-align: center;
            margin-top: 14px;
            font-style: normal;
        }

    }
    .imgbox:hover{
        box-shadow: 3px 3px 3px #F1F1F1;
    }
}
</style>
