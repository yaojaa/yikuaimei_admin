<template>
    <div class="container">
        <div class="imgbox" v-for="(v,i) in mockdata" :key="i">
            <img :src="v.imgurl" alt="">
            <p class="f12 text-default text-hide">{{v.title}}</p>
            <span class="text-info text-hide">{{v.label}}</span>
            <i class="f16 text-default">{{'¥'+' '+Number(v.price).toFixed(2)}}</i>
        </div>
    </div>
</template>
<script>
// table切换切换computed传入数据切换
    export default{
        data(){
            return {
                mockdata:[
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱我的发我来回复还我还佛为if奇偶微积分欧文发我饿发',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
                        title:'设计师款主纱',
                        label:'卡特琳娜旗舰店',
                        price:'9999'
                    },
                    {
                        imgurl:'',
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
        border: 1px solid #F1F1F1;
        box-shadow: 1px 1px 1px #F1F1F1;
        border-radius: 5px;
        margin-right: 10px;
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
