<template>
    <!-- 面包屑 -->
    <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item 
                    v-for="(item, index) in breadCrumb" 
                    :key="index"
                    :to="{ path: item.url }"  
                    >
                    <i :class="item.class" />
                    {{ item.name }}
                </el-breadcrumb-item>
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
