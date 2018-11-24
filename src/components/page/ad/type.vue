<template>
<div class="page">
    <div class="page-header">
        <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
    </div>    
    <div class="page-content">
        <nomal-table :table-json="tableJson" :url="url">
            <!-- <add-button :add-btn="addButton"></add-button>   -->
            
            <div class="sub-heading">
                <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">数据列表</span></h3>
                <div class="sub-actions">
                    <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/ad/add' })">添加广告位</el-button>
                </div>
            </div>
        </nomal-table>
    </div>
</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import BreadCrumb from '@/components/common/BreadCrumb'
    import AddButton from '@/components/common/AddButton'

    export default {
        name: 'tabletest',
        data() {
            return {
                typeId:this.$route.params.id,
                type:["banner广告位","上新预售广告位","秒抢预售广告位","找大牌广告位","一站整箱大包广告位","特殊广告位","搜索广告位","展会广告位"],
                url:"",
                breadcrumb:[  //面包屑
                    {
                        "name" :"广告管理", //名字
                    },
                    {
                        "name" :"", //名字
                    }
                ],

                addButton:{
                    title:"数据列表",
                    name: "添加广告位",
                    url:"/ad/add",
                },
                tableJson:{
                    "column": [ //行
                        {
                            "type": "text",
                            "label": "编号",
                            "prop": "date",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "所在页面",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "广告类型",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "尺寸",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "价格(天)",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "switch",
                            "label":"状态",
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
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "",
                            "list": [
                                {
                                    "label":"查看排期",
                                    "type":"edit",
                                    "url":"/ad/schedule", //优先执行url

                                },
                                {
                                    "label":"编辑",
                                    "type":"edit",
                                    "url":"/ad/add", //优先执行url

                                },
                                {
                                    "label":"删除",
                                    "type":"delete",

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
            AddButton
        },
        created() {
            this.breadcrumb[this.breadcrumb.length - 1].name = this.type[this.typeId];

            
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
    /*margin-bottom: 25px;*/
}
.add-ad{
    height: 50px;
    line-height: 50px;
    display: flex;
    padding: 0 20px 0 10px;
}
.add-ad .left{
    flex-grow: 1;
    font-size: 18px;
}
.add-ad .right{
    text-align: right;
}
.add-ad .right a{
    color: #fff;
    display: inline-block;
    height: 26px;
    line-height: 26px;
    padding: 0 10px;
    border-radius: 5px;
    background-color: #7224D8;
    font-size: 14px;
}
</style>
