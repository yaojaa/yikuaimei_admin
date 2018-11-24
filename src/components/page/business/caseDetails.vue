<template>

<div class="page">
    <div class="page-header">
        <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
    </div>
    <div class="page-content">
        <div class="panel">
            <ShowDetail :showdata='showdata1'></ShowDetail>
        </div>
    </div>
</div>

</template>
<script>
import ShowDetail from '@/components/common/showdetail'
import BreadCrumb from '@/components/common/BreadCrumb'
export default {
    data(){
        return{
            breadcrumb:[  //面包屑
                {
                    "name" :"商家", 
                    "url" : "/business"
                    // "class":"iconfont icon-guanli"
                },
                {
                    "name" :"商家管理",
                    "url" : "/business" 
                },
                {
                    "name" :"案例信息",
                    "url" : "/businessManage/CaseInfo"
                },
                {
                    "name" :"案例详情"
                }
            ],
            showdata1:[
                {
                    type:4,
                    url:'/static/img/case1.png'
                },
                {
                    type:7,
                    label:'拍摄风格',
                    title:'时尚 森系 个性创意'
                },
                {
                    type:7,
                    label:'拍摄地点',
                    title:'巴厘岛'
                },
                {
                    type:7,
                    label:'服装造型',
                    title:'八服八造'
                },
                {
                    type:7,
                    label:'案例参考价格',
                    title:'¥16800.00'
                },
                {
                    type:1,
                    text:'高端私人订制婚纱摄影品牌，量身定做属于每一位客户的幸福情感回忆。'
                },
                {
                    type:4,
                    url:'/static/img/case2.png'
                },
                {
                    type:4,
                    url:'/static/img/case3.png'
                }
            ],
        }
    },
    beforeCreate(){

    },
    mounted(){
        
    },
    components:{
        ShowDetail,
        BreadCrumb
    }
}
</script>
<style lang="less" scoped>
.buttonbox{
    display: flex;
    justify-content: center;
    button{
        width: 150px;
        height: 60px;
        margin: 30px;
        background-color: #eee;
    }
}
</style>