<template>
    <div class="page-container">
        <div class="page">
            <div class="page-header">
                <el-breadcrumb class="mianbao" separator-class="el-icon-arrow-right" v-if="$route.path!=='/exhibitionmanage/info'">
                    <el-breadcrumb-item :to="{ path: '/checkmanage' }">审核管理层级有问题还需要改版，改版以后再编写</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>                
            </div>
            <div class="page-content">
                <router-view/>                  
            </div>
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
        
    },
    components:{
        
    }
}
</script>
<style lang="less" scoped>


</style>