<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            
            <nomal-table :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import BreadCrumb from '@/components/common/BreadCrumb'
import TableSearch from '@/components/common/TableSearch'

export default {
    data() {
        return {
            url: "./static/vuetable.json",
            breadcrumb: [ //面包屑
                {
                    "name": "消息", //名字
                },
                {
                    "name": "短信",
                }
            ],

            searchs: {
                "list": [{
                        "type": "input-date", //输入日期
                        "label": "发布时间",
                        "name": "date",
                        "value": "",

                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "接受对象",
                        "name": "user",
                        "value": "",
                        "placeholder": "手机号码",
                    },
                    {
                        "type": "input-select", //选择器
                        "label": "发送对象",
                        "name": "obj",
                        "value": "0",
                        "options": [{
                                "name": "个人",
                                "value": "0",
                            },
                            {
                                "name": "系统",
                                "value": "1",
                            }
                        ],
                    },
                ],
                "btn": {
                    "iconClass": "el-icon-search",
                    "label": "搜索"
                }
            },

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "label": "发送对象",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "内容",
                        "prop": "address",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "接受对象",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "发送时间",
                        "prop": "date",
                        "width": "",
                        "align": "center",

                    }
                ],
            },

        }
    },
    components: {
        NomalTable,
        BreadCrumb,
        TableSearch,
    },
    created() {

    },
    computed: {

    },
    methods: {}
}
</script>
<style scoped>
.sms-search {
    background-color: #fff;
    padding: 20px 10px 0;
    margin-bottom: 20px;
    overflow: hidden;
}
</style>