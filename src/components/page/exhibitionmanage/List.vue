<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.path!=='/exhibitionmanage/info'">
                    <el-breadcrumb-item>展会</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <nomal-table  :table-json="pageJson" :url="url">
                    <table-search :searchs="searchs"></table-search>
                </nomal-table>
            </div>
        </div>
    </div>

</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'
import BreadCrumb from '@/components/common/BreadCrumb'
export default {
    data(){
        return{
            form:{},
            url:'',
            breadcrumb:[  //面包屑
                {
                    "name" :"展会管理", 
                }
            ],
            pageJson:{
            "column": 
                [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "展会活动",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "展会时间",
                        "prop": "date",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "状态",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "参展商",
                        "prop": "name",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "索票数",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "创建时间",
                        "prop": "date",
                        "width": "200",
                        
                    },
                    {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            "list": [
                                {
                                    "label":"查看",
                                    "type":"detail",
                                    "url":"/exhibitioninfo", //优先执行url

                                }
                            ]
                        }
                ],
            },
            searchs:{
                "list": [
                    {
                        "type": "input-text",  //输入文本
                        "label": "展会名称",
                        "name": "name",
                        "value": "",
                        "placeholder": "展会名称",
                    },
                    {
                        "type": "input-select",  //选择器
                        "label": "展会城市",
                        "name": "city",
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
                        "type": "input-radio",  //选择器
                        "label": "状态：",
                        "name": "status",
                        "value": 'all',
                        "list": [
                            {
                                "name":"全部",
                                "value":"all",
                            },
                            {
                                "name":"未开始",
                                "value":"notbegun",
                            },
                            {
                                "name":"进行中",
                                "value":"on",
                            },
                            {
                                "name":"已结束",
                                "value":"end",
                            }
                        ],
                    }
                ]
            },
        }
    },
    beforeCreate(){

    },
    mounted(){
        
    },
    components:{
        NomalTable,
        BreadCrumb,
        TableSearch
    }
}
</script>
<style lang="less" scoped>

</style>