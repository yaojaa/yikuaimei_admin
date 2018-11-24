<template>
    <div class="page">
        <div class="page-header">
             <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            <!-- <nomal-table :url="url" :page-json="pageJson"></nomal-table> -->
            
        </div>  
        <div class="page-content">
            <el-menu :default-active="onRoutes" mode="horizontal" router  class="primary-menu">
                <el-menu-item @click="name='基本信息'" index="/userinfo/">基本信息</el-menu-item>
                <el-menu-item @click="name='订单信息'" index="/userinfo/orderInfo">订单信息</el-menu-item>
                <el-menu-item @click="name='婚基金'" index="/userinfo/coupon">婚基金</el-menu-item>
                <el-menu-item @click="name='展会信息'" index="/userinfo/exhibition">展会信息</el-menu-item>
                <el-menu-item @click="name='优惠券'" index="/userinfo/discount">优惠券</el-menu-item>
                <el-menu-item @click="name='收藏/关注/对比'" index="/userinfo/collect">收藏/关注/对比</el-menu-item>
            </el-menu>
            <router-view/>
        </div>
    </div>
</template>
<script>
// import NomalTable from '@/components/common/NomalTable'
import BreadCrumb from '@/components/common/BreadCrumb'
export default {
    data(){
        return{
            name:'基本信息'
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path
        },
        breadcrumb() {
            return[  //面包屑
                {
                    "name" :"用户", 
                    "class":"iconfont icon-guanli"
                },
                {
                    "name" :"用户管理", 
                },
                {
                    "name" :this.name, 
                }
            ]
        }
    },
    components:{
        // NomalTable,
        BreadCrumb
    }
}
</script>
<style scoped>
</style>