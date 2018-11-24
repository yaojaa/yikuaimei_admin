<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/createEvent' })">创建活动</el-button>
            </div>
        </div>
        <div class="page-content">
            <nomal-table :table-json="tableJson" :url="url"></nomal-table>
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
                        "name" :"总部活动", //名字
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
                    name: "创建活动",
                    url: "createEvent",
                },
                tableJson:{
                    "column": [ //行
                        {
                            "type": "text",
                            "label": "展会名称",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "索票时间",
                            "prop": "date",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "参展时间",
                            "prop": "date",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "索票记录",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "展会地点",
                            "prop": "address",
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
                                    "label":"查看",
                                    "type":"edit",
                                    "url":"", //优先执行url
                                    onClick(tablePage, self){
                                        console.log(self.vue)
                                        console.log(tablePage.isShow)
                                        self.nomal = !self.nomal;
                                        tablePage.isShow = !tablePage.isShow
                                    }

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
.search{
    background-color: #fff;
    padding:20px 20px 4px 10px;
}
</style>
