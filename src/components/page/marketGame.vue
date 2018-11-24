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
                        <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/addGame' })">添加模板</el-button>
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
                        "name" :"游戏", //名字
                    }
                ],

                searchs:{
                    "list": [
                        {
                            "type": "input-text",  //输入文本
                            "label": "游戏模版名称",
                            "name": "couponName",
                            "value": "",
                            "placeholder": "模版名称",
                        }
                    ]
                },
                addButton:{
                    title:"数据列表",
                    name: "添加模版",
                    url:"/addGame",
                },
                tableJson:{
                    "column": [ //行
                        {
                            "type": "text",
                            "label": "游戏名称",
                            "prop": "address",
                            "width": "",
                            "align": "center",
                            formatter(row) {
                                let str = "<div style='display:flex; align-items:center; background-color#fff;'>";
                                str += "<div style='width:74px;height:74px;padding:8px; flex-shrink:0;'><img style='width:100%; height:100%;' src='static/img/img.jpg'></div>";
                                str += "<div style='flex-grow:1; text-align:left;'>" + row.address + "</div>"

                                str += "</div>";
                                return str;
                            }
                            
                        },
                        {
                            "type": "text",
                            "label": "链接地址",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "状态",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "开始时间",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "结束时间",
                            "prop": "id",
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
                                    "url":"/gameBusiness", //优先执行url
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
