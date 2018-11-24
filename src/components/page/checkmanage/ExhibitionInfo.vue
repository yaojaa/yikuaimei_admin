<template>
    <div class="panel">
        <div class="panel-heading"></div>
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
                    type:7,
                    label:'展会名称',
                    title:'北京2018年春季婚博会'
                },
                {
                    type:7,
                    label:'展会时间',
                    title:'2018-05-22 至 2018-06-01'
                },
                {
                    type:7,
                    label:'报名时间',
                    title:'2018-05-22 至 2018-06-01'
                },
                {
                    type:7,
                    label:'展会城市',
                    title:'北京'
                },
                {
                    type:7,
                    label:'详细地址',
                    title:'北京国际会议中心'
                },
                {
                    type:7,
                    label:'展会地图',
                    imgurl:'/static/img/2.png'
                },
                {
                    type:7,
                    label:'展会广告图',
                    imgurl:'/static/img/2.png'
                },
                {
                    type:7,
                    label:'展会描述',
                    title:'北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心'
                }
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
</style>