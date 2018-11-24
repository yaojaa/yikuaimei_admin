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
                        <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/addphysicalcoupon' })">添加模板</el-button>
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
                url:"",
                breadcrumb:[  //面包屑
                    {
                        "name" :"营销管理", //名字
                    },
                    {
                        "name" :"优惠券", //名字
                    }
                ],

                searchs:{
                    "list": [
                        {
                            "type": "input-text",  //输入文本
                            "label": "优惠券模版名称",
                            "name": "couponName",
                            "value": "",
                            "placeholder": "优惠券名称",
                        },
                        {
                            "type": "input-select",  //选择器
                            "label": "优惠券模版使用范围",
                            "name": "coupon",
                            "value": "all",
                            "options": [
                                {
                                    "name":"全部",
                                    "value":"all",
                                },
                                {
                                    "name":"option2",
                                    "value":"option2",
                                },
                                {
                                    "name":"option3",
                                    "value":"option3",
                                },
                            ],
                        },
                        {
                            "type": "input-select",  //选择器
                            "label": "商家名称",
                            "name": "company",
                            "value": "all",
                            "options": [
                                {
                                    "name":"全部",
                                    "value":"all",
                                },
                                {
                                    "name":"option2",
                                    "value":"option2",
                                },
                                {
                                    "name":"option3",
                                    "value":"option3",
                                },
                            ],
                        }
                    ]
                },
                addButton:{
                    title:"数据列表",
                    name: "添加模版",
                    url: "addphysicalcoupon",
                },
                tableJson:{
                    "column": [ //行
                        {
                            "type": "text",
                            "label": "模版ID",
                            "prop": "date",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "模版名称",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "有效期",
                            "prop": "date",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "领取地址",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "创建时间",
                            "prop": "date",
                            "align": "center",
                            "width": "",
                            
                        },
                        {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "",
                            "list": [
                                {
                                    "label":"查看排期",
                                    "type":"edit",
                                    "url":"", //优先执行url
                                    onClick(tablePage, self){
                                        console.log(self.vue)
                                        console.log(tablePage.isShow)
                                        self.nomal = !self.nomal;
                                        tablePage.isShow = !tablePage.isShow
                                    }

                                },
                                {
                                    "label":"编辑",
                                    "type":"edit",
                                    "url":"", //优先执行url
                                    onClick(tablePage, self){
                                        console.log(self.vue)
                                        console.log(tablePage.isShow)
                                        self.nomal = !self.nomal;
                                        tablePage.isShow = !tablePage.isShow
                                    }

                                },
                                {
                                    "label":"删除",
                                    "type":"delete"

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
.search{
    background-color: #fff;
    padding:20px 20px 4px 10px;
}
</style>
