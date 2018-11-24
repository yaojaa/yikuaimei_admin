<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>监控中心</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            </el-breadcrumb>
            </div>
        </div>
        <div class="page-content">
            <nomal-table :table-json="tableJson" :url="url">
                
                <table-search :searchs="searchs"></table-search>
                <div class="sub-heading">
                    <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">数据列表</span></h3>
                </div>
            
            </nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'
export default {
    data() {
        return {
            url: "./static/vuetable.json",
            searchs: {
                "list": [{
                        "type": "input-text", //输入文本
                        "label": "订单编号",
                        "name": "user",
                        "value": "",
                        "placeholder": "订单编号",
                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "收货人",
                        "name": "phone",
                        "value": "",
                        "placeholder": "收货人姓名/手机号",
                    },
                    {
                        "type": "input-date", //输入日期
                        "label": "提交时间",
                        "name": "date",
                        "value": "",
                    },
                    {
                        "type": "input-select", //选择器
                        "label": "用户来源",
                        "name": "option",
                        "value": "all",
                        "options": [{
                                "name": "全部",
                                "value": "all",
                            },
                            {
                                "name": "option2",
                                "value": "option2",
                            },
                            {
                                "name": "option3",
                                "value": "option3",
                            },
                        ],
                    }
                ]
            },
            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "订单编号",
                        "prop": "date",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交时间",
                        "prop": "date",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "用户账号",
                        "prop": "name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "订单金额",
                        "prop": "name",
                        "width": "",
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "支付方式",
                        "prop": "name",
                        "width": "",
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "订单来源",
                        "prop": "name",
                        "width": "",
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "订单状态",
                        "prop": "name",
                        "width": "",
                    },
                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width": "",
                        "list": [{
                            "label": "查看详情",
                            "type": "detail",
                            "url": "/", //优先执行url

                        }]
                    }
                ]
            }
        }
    },
    components: {
        NomalTable,
        TableSearch
    },
    created() {

    },
    computed: {

    },
    methods: {


    }
}
</script>
<style lang='less' scoped>
</style>