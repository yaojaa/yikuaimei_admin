<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag) in item" :key="tag.value" :to="{ path: '/order/purchaseOrderList', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table ref="table" :table-json="tableJson" :url="'/api/admin/purchase/index'">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'
import Config from "./config";

export default {
    data() {
        return {

            status_filter: '',

            tagsListGroup: {

                '采购状态：': [

                    { title: '全部', key: 'status', value: 0 },
                    { title: '待审核', key: 'status', value: 1 },
                    { title: '不同意', key: 'status', value: 2 },
                    { title: '同意', key: 'status', value: 3 },
                    { title: '已修改', key: 'status', value: 4 },

                ]
            },
            //状态 0全部 1待处理 2已付款/待发货 3已发货 4已发货/待评价 5已评价 8已取消

            searchs: {
                "list": [{
                        "type": "input-text", //输入文本
                        "label": "用户名",
                        "name": "user_name",
                        "value": "",
                        "placeholder": "用户名",
                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "手机号",
                        "name": "phone",
                        "value": "",
                        "placeholder": "",
                    },
                    {
                        "type": "input-text", //选择器
                        "label": "订单号",
                        "name": "order_number",
                        "value": ""

                    },
                    {
                        "type": "input-text", //选择器
                        "label": "商品名称",
                        "name": "goods_name",
                        "value": ""

                    },
                    {
                        "type": "input-date", //输入日期
                        "label": "日期",
                        "name": "date",
                        "value": "",

                    },
                ]
            },
            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "采购时间",
                        "prop": "purchase_ctime",
                        "width": "",
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "采购门店",
                        "prop": "shop_name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "采购人员",
                        "prop": "shop_user_phone",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "采购单号",
                        "prop": "purchase_id",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "采购金额",
                        "prop": "purchase_price",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提成归属",
                        "prop": "shop_user_name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "审核状态",
                        "prop": "purchase_status_name",
                        "width": "",

                    },
                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width": "200",
                        "list": [{
                            "label": "报货信息",
                            "url": "/order/order_purchase_detail",
                            "query": "purchase_id"
                        }]
                    }
                ],
            }



        }
    },
    components: {
        NomalTable,
        TableSearch
    },
    beforeRouteUpdate(to, from, next) {

        console.log(to.query)

        this.status_filter = Object.keys(to.query)[0] + Object.values(to.query)[0]

        console.log(this.status_filter)

        this.$refs.table.getData(to.query)
        next()
    },
    created() {

        console.log('created')

    },
    computed: {

    },
    methods: {
        //调用子组件的gatData方法
        //
        getData(k, v) {
            this.$refs.table.getData({
                [k]: v })
        }


    }
}
</script>
<style scoped>
</style>