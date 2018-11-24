<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.path!=='/exhibitionmanage/info'">
                    <el-breadcrumb-item>展会</el-breadcrumb-item>
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
    data() {
        return {

        }
    },
    beforeCreate() {

    },
    mounted() {

    },
    components: {

    }
}
</script>
<style lang="less" scoped>
.mianbao {
    margin-bottom: 30px;
}
</style>