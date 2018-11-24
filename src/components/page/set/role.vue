<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <table-search :searchs="searchs"></table-search>
            <div class="sub-heading">
                <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">数据列表</span></h3>
                <div class="sub-actions">
                    <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/set/addrole' })">添加角色</el-button>
                </div>
            </div>
            <nomal-table :table-json="tableJson" :url="url"></nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import BreadCrumb from '@/components/common/BreadCrumb'
import TableSearch from '@/components/common/TableSearch'
import AddButton from '@/components/common/AddButton'

export default {
    data() {
        return {
            url: "./static/vuetable.json",
            breadcrumb: [ //面包屑
                {
                    "name": "设置",
                },
                {
                    "name": "角色管理",
                }
            ],
            searchs: {
                "list": [{
                    "type": "input-text", //输入文本
                    "label": "角色名称",
                    "name": "user",
                    "value": "",
                    "placeholder": "角色名称",
                }]
            },

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "label": "角色名称",
                        "prop": "name",
                        "width": "",
                        "align": "center",
                    },
                    {
                        "type": "text",
                        "label": "添加时间",
                        "prop": "date",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width": "",
                        "list": [{
                                "label": "查看权限",
                                "type": "detail",
                                "url": "/set/addrole", //优先执行url

                            },
                            {
                                "label": "编辑",
                                "type": "edit",
                                "url": "/set/addrole", //优先执行url

                            },
                            {
                                "label": "删除",
                                "type": "delete",
                            },
                        ]
                    }
                ],
            },

        }
    },
    components: {
        NomalTable,
        BreadCrumb,
        TableSearch,
        AddButton
    },
    created() {

    },
    computed: {

    },
    methods: {

    }
}
</script>
<style scoped>
.member-search {
    background-color: #fff;
    padding: 20px 10px 0;
    overflow: hidden;
}
</style>