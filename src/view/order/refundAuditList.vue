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
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag) in item" :key="tag.value" :to="{ path: '/order/refundAuditList', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table ref="table" :table-json="tableJson" :url="'/api/admin/refund/index'">
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
    name: 'RefundAuditList',
    components: {
        NomalTable,
        TableSearch
    },
    data() {
        return {

            status_filter: '',

            tagsListGroup: {
                '订单类型:' : [{
                        title: '商品订单',
                        key: 'order_type ',
                        value: 2
                    },
                    {
                        title: '服务订单',
                        key: 'order_type',
                        value: 1
                    },
                ],
                '退款方式:': [{
                        title: '全部',
                        key: 'pay_type',
                        value: 0
                    },
                    {
                        title: '全额退款',
                        key: 'pay_type',
                        value: 1
                    },
                    {
                        title: '部分退款',
                        key: 'pay_type',
                        value: 2
                    },
                    {
                        title: '支付宝',
                        key: 'pay_type',
                        value: 3
                    },
                    {
                        title: '微信',
                        key: 'pay_type',
                        value: 4
                    },
                    {
                        title: '银联',
                        key: 'pay_type',
                        value: 5
                    },
                ],
                '退款类型:': [{
                        title: '全部',
                        key: 'order_refund_type',
                        value: 0
                    },
                    {
                        title: '退款',
                        key: 'order_refund_type',
                        value: 1
                    },
                    {
                        title: '退货',
                        key: 'order_refund_type',
                        value: 2
                    },
                    {
                        title: '换货',
                        key: 'order_refund_type',
                        value: 3
                    },
                ],
                '退款状态:': [{
                        title: '全部',
                        key: 'status',
                        value: 0
                    },
                    {
                        title: '待审核',
                        key: 'status',
                        value: 1
                    },
                    {
                        title: '初级审核失败 ',
                        key: 'status',
                        value: 2
                    },
                    {
                        title: '等待收货',
                        key: 'status',
                        value: 3
                    },
                    {
                        title: '收货失败',
                        key: 'status',
                        value: 4
                    },
                    {
                        title: '审核通过',
                        key: 'status',
                        value: 5
                    },
                ],

            },

            searchs: {
                "list": [
                    {
                        "type": "input-text", //输入文本
                        "label": "退款编号",
                        "name": "order_refund_id",
                        "value": "",
                        "placeholder": "",
                    },
                    {
                        "type": "input-text", //选择器
                        "label": "订单编号",
                        "name": "order_code",
                        "value": ""

                    },
                    {
                        "type": "input-text", //选择器
                        "label": "下单用户名",
                        "name": "order_user_name",
                        "value": ""

                    },
                    {
                        "type": "input-text", //选择器
                        "label": "下单用户手机",
                        "name": "order_user_phone",
                        "value": ""

                    },
                    {
                        "type": "input-singal-date", //输入日期
                        "label": "开始时间",
                        "name": "start_time",
                        "value": "",
                    },
                    {
                        "type": "input-singal-date", //输入日期
                        "label": "结束时间",
                        "name": "end_time",
                        "value": "",
                    },
                ]
            },
            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "退款编号",
                        "prop": "order_refund_id",
                        "width": "120px",
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "订单编号",
                        "prop": "order_code",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "申请时间",
                        "prop": "order_refund_ctime",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "用户/手机号",
                        "width": "",
                        formatter(row) {
                            let str = "<div>";
                            str += "<p>" + row.order_user_name + "</p>";
                            str += "<p>" + row.order_user_phone + "</p>";
                            str += "</div>";
                            return str;
                        }

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "退款类型",
                        "prop": "purchase_price",
                        "width": "",
                        formatter(row) {
                            let str = "<div>";
                            str += "<p>" + Config.refundType[row.order_refund_type] + "</p>";
                            str += "</div>";
                            return str;
                        }

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "支付方式",
                        "prop": "shop_user_name",
                        "width": "",
                        formatter(row) {
                            let str = "<div>";
                            str += "<p>" + Config.payType[row.pay_plat] || '--' + "</p>";
                            str += "</div>";
                            return str;
                        }
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "退款/实付",
                        "prop": "purchase_status_name",
                        "width": "",
                        formatter(row) {
                            let str = "<div>";
                            str += "<p>¥" + (row.refund_price / 100).toFixed(2) + "</p>";
                            str += "<p>¥" + (row.pay_price / 100).toFixed(2) + "</p>";
                            str += "</div>";
                            return str;
                        }
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "退款时间",
                        "prop": "order_refund_pay_time",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "退款状态",
                        "prop": "refund_status_name",
                        "width": "",

                    },
                    // {
                    //     "type": "text",
                    //     "align": "center",
                    //     "label": "退款状态",
                    //     "prop": "purchase_price",
                    //     "width": "",
                    //     formatter(row) {
                    //         let str = "<div>";
                    //         str += "<p>" + Config.refundStatus[row.order_refund_status] + "</p>";
                    //         str += "</div>";
                    //         return str;
                    //     }

                    // },
                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width":"120px",
                        "list": [{
                            "label": "详情",
                            "url": "/order/refundDetail",
                            "query": "order_refund_id"
                        }]
                    },
                ],
            }



        }
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
                [k]: v
            })
        },
        formatPrice(price) {
            return (price / 100).toFixed(2);
        }


    }
}
</script>
<style scoped>
</style>