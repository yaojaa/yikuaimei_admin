<template>
<div class="page">
    <div class="page-header">
        <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
    </div>
    <div class="page-content">
        <nomal-table :table-json="tableJson" :border="true" :url="url" :axios-type="'get'" :page-size="20">
            <table-tabs :page-tabs="menus"></table-tabs>
            <table-button :buttons="buttons" @btn-click="btnClick"></table-button>
            <table-search :searchs="searchs"></table-search>
            <add-button :add-btn="addButton"></add-button>
            <table-tabs :page-tabs="pageTapsCard" @tabs-click="pageTapsClick"></table-tabs>
        </nomal-table>
    </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <span>sdfdsfasdfasdf45dasf54asd5f</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import BreadCrumb from '@/components/common/BreadCrumb'
    import TableButton from '@/components/common/TableButton'
    import TableSearch from '@/components/common/TableSearch'
    import TableTabs from '@/components/common/TableTabs'
    import AddButton from '@/components/common/AddButton'

    export default {
        name: 'tabletest',
        data() {
            return {
                editVisible: false,
                url: "/api/admin/adposition/List",
                breadcrumb: [  //面包屑
                    {
                        "name" :"用户列表", //名字
                    },
                    {
                        "name" :"表格测试",
                        "url"  :"/"    //路径
                    },
                    {
                        "name" :"用户列表", //名字
                    },
                ],
                addButton:{
                    "title":"数据列表",
                    "name":"添加模版",
                    "url":"/",
                },

                menus: {
                    "type":"menu",
                    "list":[
                        {
                            "label":"观展用户处理",
                            "index": "/slot",
                        },
                        {
                            "label":"后续跟进列表",
                            "index": "index2",
                        },
                    ],
                    "activeIndex":"/slot" //初始值
                },

                pageTapsCard: {
                    "type":"card",
                    "list":[
                        {
                            "label":"观展用户处理",
                            "name": "first",
                            "url":"/",  //跳转路径（优先跳转路径）
                        },
                        {
                            "label":"后续跟进列表",
                            "name": "second",
                            onClick(tablePage, self){  //tablePage组件实例  self本页面实例
                                console.log(self.vue)
                                console.log(tablePage.isShow)
                                self.nomal = !self.nomal;
                                tablePage.isShow = !tablePage.isShow
                            }
                        },
                    ],
                    "activeVal":"second" //初始值
                },

                buttons: {
                    "list":[
                        {
                            "buttonName":"新增",
                            "iconClass":"el-icon-plus", //按钮icon
                            "size":"mini", //按钮大小    同element-ui
                            "url":"/",  //跳转路径（优先跳转路径）
                        },
                        {
                            "buttonName":"发送优惠券",
                            "iconClass":"", //按钮icon
                            "size":"mini", //按钮大小    同element-ui
                        }
                    ],
                },

                searchs: {
                    "list": [
                        {
                            "type": "input-text",  //输入文本
                            "label": "用户姓名",
                            "name": "user",
                            "value": "",
                            "placeholder": "请输入姓名",
                        },
                        {
                            "type": "input-select",  //选择器
                            "label": "处理情况",
                            "name": "option",
                            "value": "option2",
                            "url":"/api/admin/adposition/Publish",
                            "axiosType":"post",
                            formatter(data){
                                return data;
                            },
                            "options": [
                                {
                                    "name":"option1ption1option1option1",
                                    "value":"option1option1option1",
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
                            "type": "input-text",  //输入文本
                            "label": "用户手机号",
                            "name": "phone",
                            "value": "",
                            "placeholder": "请输入手机号",
                        },
                        {
                            "type": "input-select",  //选择器
                            "label": "处理情况",
                            "name": "option",
                            "value": "option2",
                            "url":"/api/admin/adposition/List",
                            "axiosType":"get",
                            formatter(data){
                                return data;
                            },
                            "options": [
                                {
                                    "name":"option1ption1option1option1",
                                    "value":"option1option1option1",
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
                            "label":"注册时间",
                            "name": "date",
                            "value":"",
                            "align":"left", //默认center

                        },
                        {
                            "type": "input-radio",  //输入日期
                            "label":"radio名称",
                            "name": "radio",
                            "value":"1",
                            "url":"/api/admin/adposition/List",
                            "axiosType":"get",
                            formatter(data){
                                return data;
                            },
                            "options":[
                                {
                                    "name":"总统",
                                    "value":"0",
                                },
                                {
                                    "name":"秘书",
                                    "value":"1",
                                },
                                {
                                    "name":"警卫",
                                    "value":"2",
                                },
                            ],

                        },
                    ],
                    "btn":{
                        "iconClass":"el-icon-search",
                        "label":"搜索"
                    }
                },

                tableJson: {
                    "excelButton":{ //表格功能按钮
                        "tableTabs": true,  //true 有表格tab   false 没有表格tab
                        "upload": {
                            "type":"upload" //导入
                        },
                        "export": {
                            "type":"export", //导出
                            "name":"用户表格"
                        },
                    },

                    "selectBox":{ //表格复选框
                        "width":"60",
                        "align":"left",//默认
                    },

                    spanMethod: function({row, column, rowIndex, columnIndex}){ //合并单元格

                        if (rowIndex % 2 === 0) {
                          if (columnIndex === 1) {
                            return [1, 7];
                          }else{
                            return [0, 0]
                          }
                        }
                    },
                    cellstyle: function({row, column, rowIndex, columnIndex}){ //设置个别单元格样式
                        if(columnIndex == 2){
                            return {"vertical-align":"top"}
                        }
                    },

                    formatter: function(data){  //表格数据处理
                        let _data = [];
                        data.forEach((e,i) => {
                            _data.push({date: e.name, id: e.id}, e)
                        });

                        return _data;
                    },

                    "idName":"id", //自定义 一行数据的id key

                    "column": [ //列
                        {
                            "type": "text",
                            "label": "日期",
                            "prop": "date",
                            "width": "",
                            "sortable": "custom",
                            formatter(row) { //格式数据
                                var str ="<div style='border:10px solid #ccc;'><div style='color:#f00; font-weight:700'>" + row.date + "</div>";
                                str+="<div><img height='20' width='20' src='static/img/img.jpg'></div></div>"
                                return str;
                            }
                            
                        },
                        {
                            "type": "text",
                            "label": "名字",
                            "prop": "name",
                            "width": "150",
                            
                        },
                        {
                            "type": "switch",
                            "label":"审核",
                            "align": "center",
                            "width": "150",
                            "prop": "show",
                            "config": {
                                "activeColor":"green",
                                "inactiveColor":"gray",
                                "value":["0","1"], //[未启用, 启用]
                            },
                            "axiosUrl":"",
                            "axiosType":"",
                            "idName":"",
                        },
                        {
                            "type": "text",
                            "label": "地址",
                            "prop": "address",
                            "width": "",
                            
                        },
                        {
                            "type": "hover",
                            "label":"查看炒作链接",
                            "align": "center",
                            "prop":"address",
                            "width": "200",
                            "hover":{
                                "label":"查看",
                            }

                        },
                        {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            "fixed":"right", //string, boolean
                            "list": [
                                {
                                    "label":"编辑",
                                    "type":"edit",
                                    "axiosUrl":"",
                                    "axiosType":"",
                                    "idName":"",
                                    onClick(tablePage, self, row){  //tablePage ==> nomaltable组件实例  //self ==> 当前页面实例   //row ==> 该行所有数据
                                        self.editVisible = true;
                                    }

                                },
                                {
                                    "label":"查看详情",
                                    "type":"detail",
                                    "url":"/", //优先执行url

                                },
                                {
                                    "label":"标记",
                                    callback(tablePage, self, row){
                                        console.log(self.vue)
                                        console.log(tablePage.isShow)
                                        self.nomal = !self.nomal;
                                        tablePage.isShow = !tablePage.isShow
                                    }

                                },
                                {
                                    "label":"删除",
                                    "type": "delete",
                                    "axiosUrl":"",
                                    "axiosType":"",
                                    "idName":""
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
            TableButton,
            TableSearch,
            TableTabs,
            AddButton
        },
        created() {
            
        },
        computed: {
           
        },
        methods: {
            pageTapsClick(index,tabs) { //index 是tabs的下标 tabs ==> 组件实例
                console.log(this.vue, index) 
            },
            btnClick(index) {
                console.log(this.vue, index)
            },
            //保存编辑
            saveEdit(){
                this.editVisible = false;
                this.$message({
                    type:"success",
                    message:"成功",
                })
            },

        }
    }

</script>

<style scoped>

</style>
