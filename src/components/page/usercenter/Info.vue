<template>
<div class="page-container">
    <div class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/userlist' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: $route.path }">用户信息</el-breadcrumb-item>
            <el-breadcrumb-item>{{path}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div class="page-content">
        <table-tabs :page-tabs="menus"></table-tabs>
        <router-view/>
    </div>
</div>
</template>
<script>
import TableTabs from '@/components/common/TableTabs'
export default {
    data() {
        return {

        }
    },
    methods:{

    },
    components: {
        TableTabs
    },
    computed:{
        path(){
            return this.$route.meta.title
        },
        menus() {
            return{
                "type": "menu",
                "list": [{
                        "label": "基本信息",
                        "index": `/userinfo/sinfo/${this.$route.params.id}`
                    },
                    {
                        "label": "订单信息",
                        "index": `/userinfo/orderlist/${this.$route.params.id}`
                    },
                    {
                        "label": "婚基金",
                        "index": `/userinfo/coupon/${this.$route.params.id}`
                    },
                    {
                        "label": "展会信息",
                        "index": `/userinfo/exhibition/${this.$route.params.id}`
                    },
                    {
                        "label": "优惠券",
                        "index": `/userinfo/discount/${this.$route.params.id}`
                    },
                    {
                        "label": "收藏/关注/对比",
                        "index": `/userinfo/collect/${this.$route.params.id}`
                    }
                ],
                "activeIndex": this.$route.path //初始值
            }
        }
    }
}
</script>
<style lang="less" scoped>

</style>