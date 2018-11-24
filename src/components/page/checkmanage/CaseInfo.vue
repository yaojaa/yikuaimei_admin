<template>
    <div class="container">
        <ShowDetail :showdata='showdata1'></ShowDetail>
        <div class="btnbox">
            <el-button type="primary">通过</el-button>
            <el-button type="primary">不通过</el-button>
        </div>
    </div>

</template>
<script>
import ShowDetail from '@/components/common/showdetail'
export default {
    data(){
        return{
            showdata1:[
                {
                    type:4,
                    url:'/static/img/2.png'
                },
                {
                    type:7,
                    label:'拍摄风格',
                    title:'纪实  时尚 个性创意 欧式'
                },
                {
                    type:7,
                    label:'拍摄景点',
                    title:'城市花园'
                },
                {
                    type:7,
                    label:'服装造型',
                    title:'3服3造'
                },
                {
                    type:7,
                    label:'案例参考价',
                    title:'￥9980'
                },
                {
                    type:1,
                    text:'我向上天祈求两次好运气；一次遇见你，一次走到底'
                },
                {
                    type:4,
                    url:'/static/img/2.png'
                },
                {
                    type:4,
                    url:'/static/img/2.png'
                },
            ],
        }
    },
    beforeCreate(){

    },
    mounted(){
        
    },
    components:{
        ShowDetail
    }
}
</script>
<style lang="less" scoped>
.btnbox{
    display: flex;
    justify-content: center;
    margin: 30px;
}
.container /deep/ img{
    max-width: 950px!important;
}
.container /deep/  .pbox{
    flex: 1!important;
}
.container /deep/ .singlep{
    text-align: center;
    color: #999
}
</style>