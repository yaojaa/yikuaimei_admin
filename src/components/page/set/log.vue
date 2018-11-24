<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content set-log">
            <nomal-table :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
                <table-tabs :page-tabs="pageTapsCard" @tabs-click="pageTapsClick"></table-tabs>
            </nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import BreadCrumb from '@/components/common/BreadCrumb'
import TableSearch from '@/components/common/TableSearch'
import TableTabs from '@/components/common/TableTabs'

export default {
    name: 'setLog',
    data() {
        return {
            url: "./static/vuetable.json",
            breadcrumb: [ //面包屑
                {
                    "name": "设置", //名字
                },
                {
                    "name": "日志管理", //名字
                }
            ],

            searchs: {
                "list": [{
                        "type": "input-text", //输入文本
                        "label": "用户手机号",
                        "name": "phone",
                        "value": "",
                        "placeholder": "请输入手机号",
                    },
                    {
                        "type": "input-date", //输入日期
                        "label": "时间",
                        "name": "date",
                        "value": "",

                    },
                ]
            },

            pageTapsCard: {
                "type": "card",
                "list": [{
                        "label": "登录日志",
                        "name": "0",
                    },
                    {
                        "label": "操作日志",
                        "name": "1",
                    },
                ],
                "activeVal": "0" //初始值
            },

            tableJson: {},
            tableJson0: {
                "column": [ //行
                    {
                        "type": "text",
                        "label": "部门",
                        "prop": "name",
                        "align": "center",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "label": "成员姓名",
                        "prop": "name",
                        "align": "center",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "label": "角色名称",
                        "prop": "name",
                        "align": "center",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "label": "最后登录",
                        "prop": "date",
                        "align": "center",
                        "width": "",

                    }
                ],
            },
            tableJson1: {
                "column": [ //行
                    {
                        "type": "text",
                        "label": "部门",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "成员姓名",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "角色名称",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "最后登录",
                        "prop": "date",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width": "200",
                        "list": [{
                                "label": "用户管理",
                                "type": "edit",
                                "url": "", //优先执行url
                            },
                            {
                                "label": "用户列表",
                                "type": "detail",
                                "url": "/", //优先执行url

                            },
                            {
                                "label": "添加",
                                "url": "",
                            }
                        ]
                    },
                    {
                        "type": "hover",
                        "label": "查看炒作链接",
                        "align": "center",
                        "prop": "address",
                        "width": "200",
                        "hover": {
                            "label": "查看",
                            "placement": "bottom-end",
                            "popperClass":"setlog",
                        }

                    }
                ],
            },

        }
    },
    components: {
        NomalTable,
        BreadCrumb,
        TableSearch,
        TableTabs
    },
    created() {
        this.tableJson = this.tableJson0;
    },
    computed: {

    },
    methods: {
        pageTapsClick(index, tabs) { //index 是tabs的下标 tabs ==> 组件实例
            this.tableJson = this['tableJson' + index]
        }
    }
}
</script>
<style>
.setlog{
    background-color: #D0D2FF;
}
.setlog[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: #D0D2FF;
}

.setlog[x-placement^=top] .popper__arrow::after{
    border-top-color:#D0D2FF;
}

</style>