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
    import TableSearch from '@/components/common/TableSearch'
    import BreadCrumb from '@/components/common/BreadCrumb'


    export default {
        name: 'userlist',
        data() {
            return {
                url:"",
                breadcrumb:[  //面包屑
                    {
                        "name" :"用户管理", //名字
                        "url" : "/userlist"
                    },
                    {
                        "name" :"用户收入", //名字
                    }
                ],
                searchs:{
                    "list": [
                        {
                            "type": "input-text",  //输入文本
                            "label": "手机号码",
                            "name": "phone",
                            "value": "",
                            "placeholder": "手机号",
                        },
                        {
                            "type": "input-text",  //输入文本
                            "label": "城市",
                            "name": "city",
                            "value": "",
                            "placeholder": "城市",
                        },
                        {
                            "type": "input-select",  //选择器
                            "label": "收益来源",
                            "name": "option",
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
                            "type": "input-date",  //输入日期
                            "label":"收益时间",
                            "name": "date",
                            "value":"",

                        },
                    ]
                },
                tableJson:{
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "用户ID",
                            "prop": "date",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "手机号码",
                            "prop": "name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "金额",
                            "prop": "address",
                            "width": "150",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "时间",
                            "prop": "date",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "收益来源",
                            "prop": "date",
                            "width": "",
                            
                        },
                    ],
                }


            }
        },
        components: {
            NomalTable,
            TableSearch,
            BreadCrumb
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
