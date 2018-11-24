<template>
<div class="container">
    
    <el-tabs class="box" v-model="activeName" type="card" @tab-click="handleClick">
        <el-button class="fixed" type="primary">主要按钮</el-button>
        <el-tab-pane label="商家信息" name="first">
            <nomal-table :table-json="pageJson1" :url="url1"></nomal-table>  
        </el-tab-pane>
        <el-tab-pane label="套餐信息" name="second">
            <nomal-table :table-json="pageJson2" :url="url2"></nomal-table>  
        </el-tab-pane>
        <el-tab-pane label="案例信息" name="third">
            <nomal-table :table-json="pageJson3" :url="url3"></nomal-table>   
        </el-tab-pane>
        <el-tab-pane label="展会信息" name="fourth">
            <nomal-table :table-json="pageJson4" :url="url4"></nomal-table>
        </el-tab-pane>
        <el-tab-pane  label="提现" name="five">
            <nomal-table :table-json="pageJson5" :url="url5"></nomal-table>  
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
export default {
    data(){
        return{
         
            activeName:'first',
            url1:'',
            url2:'',
            url3:'',
            url4:'',
            url5:'',
            url6:'',
            pageJson1:{
            "selectBox":true,
            "column": 
                [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "全选",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交人",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "商家名称",
                        "prop": "bussinessname",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "类型",
                        "prop": "type"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "内容",
                        "prop": "content",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交时间",
                        "prop": "time",
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
                                "url":"/checkmanage/BussinessInfo", //优先执行url
                            },
                            {
                                "label":"通过",
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
                                "label":"不通过",
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
            },
            pageJson2:{
            "selectBox":true,
            "column": 
                [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "全选",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交人",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "商家名称",
                        "prop": "bussinessname",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "类型",
                        "prop": "type"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "内容",
                        "prop": "content",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交时间",
                        "prop": "time",
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
                                "url":"/checkmanage/BussinessInfo", //优先执行url
                            },
                            {
                                "label":"通过",
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
                                "label":"不通过",
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
            },
            pageJson3:{
            "selectBox":true,
            "column": 
                [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "全选",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交人",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "商家名称",
                        "prop": "bussinessname",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "类型",
                        "prop": "type"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "内容",
                        "prop": "content",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交时间",
                        "prop": "time",
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
                                "url":"/checkmanage/BussinessInfo", //优先执行url
                            },
                            {
                                "label":"通过",
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
                                "label":"不通过",
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
            },
            pageJson4:{
            "selectBox":true,
            "column": 
                [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "全选",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交人",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "商家名称",
                        "prop": "bussinessname",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "类型",
                        "prop": "type"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "内容",
                        "prop": "content",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交时间",
                        "prop": "time",
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
                                "url":"/checkmanage/BussinessInfo", //优先执行url
                            },
                            {
                                "label":"通过",
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
                                "label":"不通过",
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
            },
            pageJson5:{
            "selectBox":true,
            "column": 
                [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "全选",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交人",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "商家名称",
                        "prop": "bussinessname",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "类型",
                        "prop": "type"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "内容",
                        "prop": "content",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提交时间",
                        "prop": "time",
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
                                "url":"/checkmanage/BussinessInfo", //优先执行url
                            },
                            {
                                "label":"通过",
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
                                "label":"不通过",
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
            },
        }
    },
    beforeCreate(){

    },
    methods:{
        handleClick(t){
            // console.log(t);
        }
    },
    mounted(){

    },
    components:{
        NomalTable
    }
}
</script>
<style lang="less" scoped>
.box{
    position: relative;
}
.box .fixed{
    position: absolute;
    z-index: 999999;
    right: 0;
    top: -50px
}
</style>