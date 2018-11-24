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
                        <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/set/addmember' })">添加成员</el-button>
                    </div>
                </div>

            </nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import BreadCrumb from '@/components/common/BreadCrumb'
import TableSearch from '@/components/common/TableSearch'
import AddButton from '@/components/common/AddButton'

export default {
    name: 'member',
    data() {
        return {
            url: "/api/admin/adminuser/list",
            breadcrumb: [ //面包屑
                {
                    "name": "设置",
                },
                {
                    "name": "成员管理",
                }
            ],
            searchs: {
                "list": [{
                        "type": "input-text", //输入文本
                        "label": "角色名称",
                        "name": "role_name",
                        "value": "",
                        "placeholder": "角色名称",
                    },
                    {
                        "type": "input-text", //输入日期
                        "label": "成员姓名",
                        "name": "user_realname",
                        "value": "",
                        "placeholder": "成员姓名",

                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "手机号码",
                        "name": "user_name",
                        "value": "",
                        "placeholder": "手机号码",
                    },
                    {
                        "type": "input-radio",  //输入日期
                        "label": "是否启用",
                        "name": "is_start_using",
                        "value": 0,
                        "options": [
                            {
                                "name":"全部",
                                "value": 0,
                            },
                            {
                                "name":"启用",
                                "value": 1,
                            },
                            {
                                "name":"不启用",
                                "value": 2,
                            },
                        ],

                    },



                ]
            },

            tableJson: {
                "idName": "user_id",
                "column": [ //行
                    {
                        "type": "text",
                        "label": "手机号码",
                        "prop": "user_name",
                        "minWidth": "120",
                        "align": "center",
                    },
                    {
                        "type": "text",
                        "label": "成员姓名",
                        "prop": "user_realname",
                        "minWidth": "150",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "角色名称",
                        "prop": "role_name",
                        "minWidth": "100",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "添加时间",
                        "prop": "user_ctime",
                        "minWidth": "160",
                        "align": "center",

                    },
                    {
                        "type": "text",
                        "label": "最后登录",
                        "prop": "user_last_logintime",
                        "minWidth": "160",
                        "align": "center",

                    },
                    {
                        "type": "switch",
                        "label": "是否启用",
                        "align": "center",
                        "minWidth": "100",
                        "prop": "is_start_using",
                        "config": {
                            "activeColor": "green",
                            "inactiveColor": "gray",
                            "value": [2, 1],   //[未启用, 启用]
                        },
                        "axiosUrl": "/api/admin/adminuser/edit",
                        "axiosType": "post",
                    },
                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width": "200",
                        "list": [{
                                "label": "权限查看",
                                "type": "detail",
                                "url": "/", //优先执行url

                            },
                            {
                                "label": "编辑",
                                "type": "edit",
                                "url": "/set/addmember", //优先执行url

                            },
                            {
                                "label": "删除",
                                "type": "delete",
                                "axiosUrl": "/api/admin/adminuser/delete",
                                "axiosType": "post"
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