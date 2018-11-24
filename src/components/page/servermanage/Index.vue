<template>

    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>客服</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="page-content">
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    beforeCreate(){

    },
    mounted(){
        console.log(this.$route)
    },
    components:{
        
    }
}
</script>
<style lang="less" scoped>

</style>