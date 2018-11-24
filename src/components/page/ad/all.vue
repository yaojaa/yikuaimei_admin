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
                <div class="sub-heading">
                    <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">数据列表</span></h3>
                    <div class="sub-actions">
                        <!-- <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/ad/template' })">添加模板</el-button> -->
                    </div>
                </div>
                
            </nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'
import BreadCrumb from '@/components/common/BreadCrumb'
import AddButton from '@/components/common/AddButton'

export default {
    name: 'tabletest',
    data() {
        return {
            url: "",
            breadcrumb: [ //面包屑
                {
                    "name": "广告", //名字
                },
                {
                    "name": "一站搞定", //名字
                }
            ],

            searchs: {
                "list": [{
                    "type": "input-date", //输入文本
                    "label": "添加时间",
                    "name": "addtime",
                    "value": "",
                }]
            },
            addButton: {
                title: "数据列表",
                name: "添加模版",
                url: "/ad/template",
            },
            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "label": "编号",
                        "prop": "id",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "类别",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "价格",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "时间",
                        "prop": "date",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "switch",
                        "label": "审核",
                        "align": "center",
                        "width": "150",
                        "prop": "switch",
                        "config": {
                            "activeColor": "green",
                            "inactiveColor": "gray",
                            "value": ["0", "1"],
                        }
                    },

                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width": "",
                        "list": [{
                                "label": "查看排期",
                                "type": "edit",
                                "url": "/ad/schedule", //优先执行url

                            },
                            {
                                "label": "编辑",
                                "type": "edit",
                                "url": "/ad/template", //优先执行url

                            },
                            {
                                "label": "删除",
                                "type": "delete"

                            },
                        ]
                    }
                ],
            }


        }
    },
    components: {
        NomalTable,
        TableSearch,
        BreadCrumb,
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
.search {
    background-color: #fff;
    padding: 20px 20px 4px 10px;
}
</style>