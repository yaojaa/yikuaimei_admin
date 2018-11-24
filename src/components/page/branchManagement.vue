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
                        <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/addBranch' })">添加分公司</el-button>
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
                    "name": "分公司管理", //名字
                }
            ],

            searchs: {
                "list": [{
                    "type": "input-text", //输入文本
                    "label": "分公司名称",
                    "name": "couponName",
                    "value": "",
                    "placeholder": "分公司名称",
                }]
            },
            addButton: {
                title: "数据列表",
                name: "添加分公司",
                url: "addBranch",
            },
            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "label": "分公司名称",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "地址",
                        "prop": "address",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "联系人",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "联系电话",
                        "prop": "name",
                        "width": "",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "添加时间",
                        "prop": "date",
                        "align": "center",
                        "width": "",

                    },
                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width": "300",
                        "list": [{
                                "label": "查看商家",
                                "type": "edit",
                                "url": "", //优先执行url
                                onClick(tablePage, self) {
                                    console.log(self.vue)
                                    console.log(tablePage.isShow)
                                    self.nomal = !self.nomal;
                                    tablePage.isShow = !tablePage.isShow
                                }

                            },
                            {
                                "label": "代为操作",
                                "type": "edit",
                                "url": "", //优先执行url
                                onClick(tablePage, self) {
                                    console.log(self.vue)
                                    console.log(tablePage.isShow)
                                    self.nomal = !self.nomal;
                                    tablePage.isShow = !tablePage.isShow
                                }

                            },
                            {
                                "label": "编辑",
                                "type": "edit",
                                "url": "", //优先执行url
                                onClick(tablePage, self) {
                                    console.log(self.vue)
                                    console.log(tablePage.isShow)
                                    self.nomal = !self.nomal;
                                    tablePage.isShow = !tablePage.isShow
                                }

                            },
                            {
                                "label": "删除",
                                "type": "delete"

                            }
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