<template>
    <!-- 面包屑 -->
    <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <template v-for="(item, index) in breadCrumb">
                <el-breadcrumb-item v-if="item.url" :to="{ path: item.url || ' ' }"><i :class="item.class"></i>{{ item.name }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="!item.url"><i :class="item.class"></i>{{ item.name }}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props:{
            breadCrumb: Array
        },
        methods: {
        },
        computed: {
        },
        watch:{
        },
        created(){
        }
    }

</script>


<style scoped>
  
</style>
