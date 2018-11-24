<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>商家</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/business' }">商家管理</el-breadcrumb-item>
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
import BreadCrumb from '@/components/common/BreadCrumb'
import TableTabs from '@/components/common/TableTabs'
export default {
    data() {
        return {
            path: '',
            id:'',
            menus: {
                "type": "menu",
                "list": [{
                        "label": "基本信息",
                        "index": "/businessManage/BasicInfo/"+this.$route.params.id,
                    },
                    {
                        "label": "套餐信息",
                        "index": "/businessManage/PackageInfo/"+this.$route.params.id,
                    },
                    {
                        "label": "案例信息",
                        "index": "/businessManage/CaseInfo/"+this.$route.params.id,
                    },
                    {
                        "label": "优惠券",
                        "index": "/businessManage/coupon/"+this.$route.params.id,
                    },
                    {
                        "label": "公告",
                        "index": "/businessManage/notice/"+this.$route.params.id,
                    }
                ],
                "activeIndex": "" //初始值
            }


        }
    },
    computed: {},
    created() {
        this.activePath()
        this.menus.activeIndex = this.$route.path;
    },
    methods: {
        activePath() {
            this.path = this.$route.meta.title
        }
    },
    watch: {
        "$route": "activePath"
    },
    components: {
        BreadCrumb,
        TableTabs
    }
}
</script>
<style scoped>
</style>