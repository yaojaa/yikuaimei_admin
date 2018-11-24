<template>
<div class="page">
    <div class="page-header">
        <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
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
        name: 'tabletest',
        data() {
            return {
                url:"/api/admin/shop/index",
                breadcrumb:[  //面包屑
                    {
                        "name" :"商家", //名字
                    },
                    {
                        "name" :"商家管理", //名字
                    }
                ],
                searchs:{
                    "list": [
                        {
                            "type": "input-text",  //输入文本
                            "label": "商家名称",
                            "name": "shop_name",
                            "value": "",
                            "placeholder": "请输入商家名称",
                        },
                        {
                            "type": "input-select",  //选择器
                            "label": "所属分公司",
                            "name": "company_name",
                            "value": "all",
                            "url":'/api/admin/shop/index',
                        }
                    ]
                },
                tableJson:{
                    "column": [ //行
                        {
                            "type": "text",
                            "label": "商家编号",
                            "prop": "shop_id",
                            "width": "80px",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "商家名称",
                            "prop": "shop_name",
                            "minWidth": "200px",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "所属分公司",
                            "prop": "company_name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "联系",
                            "prop": "shop_phone",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "switch",
                            "label":"显示/不显示",
                            "align": "center",
                            "width": "",
                            "prop": "switch",
                            "config": {
                                "activeColor":"green",
                                "inactiveColor":"gray",
                                "value":["0","1"],
                            }
                        },
                        {
                            "type": "text",
                            "label": "经营类别",
                            "prop": "shop_category_name",
                            "align": "center",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "label": "保证金",
                            "prop": "shop_deposit",
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
                                    "label":"代为操作",
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
                                    "label":"查看",
                                    "type":"detail",
                                    "url":"", //优先执行url
                                    onClick(tablePage, self, row){
                                        self.$router.push("/businessManage/BasicInfo/"+row.shop_id)
                                    }
                                },
                            ]
                        }
                    ],
                }

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
        methods: {

        }
    }

</script>

<style scoped>

</style>
