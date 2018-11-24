<template>
<div class="page">
    <div class="page-header">
        <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
    </div> 
    <div class="page-content">
        <nomal-table :table-json="tableJson" :url="url" :axios-type="'get'">
            <table-search :searchs="searchs"></table-search>
        </nomal-table>
    </div>
    <el-dialog title="联系" :visible.sync="shadow">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="短信" name="first">
                <el-form ref="form1" :model="form1" label-width="80px">
                    <el-form-item label="选择模板">
                        <el-select v-model="form1.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="短信内容">
                        <el-input type="textarea" v-model="form1.desc"></el-input>
                    </el-form-item> 
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit1">确定</el-button>
                        <el-button @click="shadow=false">取消</el-button>
                    </el-form-item>                     
                </el-form>              
            </el-tab-pane>
            <el-tab-pane label="站内信" name="second">
                <el-form ref="form2" :model="form2" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form2.name"></el-input>
                    </el-form-item>
                    <el-form-item label="URL链接地址">
                        <el-input v-model="form2.url"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input type="textarea" v-model="form2.desc"></el-input>
                    </el-form-item> 
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit2">确定</el-button>
                        <el-button @click="shadow=false">取消</el-button>
                    </el-form-item>                     
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="赠送优惠券" name="third">
                <nomal-table :table-json="tableJson2" :url="url"></nomal-table>
                <el-button type="primary" @click="onSubmit3">确定</el-button>
                <el-button @click="shadow=false">取消</el-button>
            </el-tab-pane>
            <el-tab-pane label="赠送实物券" name="fourth">
                <nomal-table :table-json="tableJson3" :url="url"></nomal-table>
                <el-button type="primary" @click="onSubmit4">确定</el-button>
                <el-button @click="shadow=false">取消</el-button>
            </el-tab-pane>
        </el-tabs>        
    </el-dialog>
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
                url: "/api/admin/user/index?page=1&sid=size=1029n74p7ln8hnmhk3lih5vl1tlr-8d1dwc52hBjhFUoAw7qjkyT/lec8pChVIDeN/tZHy2Pk2jKRSX083g4MiH79PyIFolkPy4R2IEsx",
                form1:{
                    region:'',
                    desc:'【婚博会】（消费提醒）您刚消费一笔100.00元的婚积金，查看详情，点击3.cn/iieuui552'
                },
                form2:{
                    name:'',
                    url:'jiehun',
                    desc:''
                },
                activeName:'first',
                shadow:false,
                breadcrumb: [  //面包屑
                    {
                        "name" :"用户管理", //名字
                    }
                ],
                searchs: {
                    "list": [
                        {
                            "type": "input-text",  //输入文本
                            "label": "用户账号",
                            "name": "user_id",
                            "value": "user_id",
                            "placeholder": "用户ID",
                        },
                        {
                            "type": "input-text",  //输入文本
                            "label": "用户姓名",
                            "name": "user_real_name",
                            "value": "user_real_name",
                            "placeholder": "用户姓名",
                        },
                        {
                            "type": "input-date",  //输入日期
                            "label":"注册时间",
                            "name": "user_ctime",
                            "value":"user_ctime",

                        },
                        {
                            "type": "input-select",  //选择器
                            "label": "渠道来源",
                            "name": "user_source",
                            "value": "user_source",
                            // "url":"/api/admin/user/Index?user_source",
                            // "axiosType":"get",
                            "options": [
                                {
                                    "name":"全部",
                                    "value":"1",
                                },
                                {
                                    "name":"微信",
                                    "value":"2",
                                },
                                {
                                    "name":"app",
                                    "value":"3",
                                },,
                                {
                                    "name":"其他",
                                    "value":"4",
                                },
                            ],
                        },
                    ]
                },
                tableJson: {
                    formatter(data){
                        return data.data
                    },
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "用户编号",
                            "prop": "user_id",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "手机号码",
                            "prop": "user_phone",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "用户姓名",
                            "prop": "user_real_name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "状态",
                            "prop": "user_status",
                            "width": "150",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "注册时间",
                            "prop": "user_ctime",
                            "width": "",
                            
                        },
                        {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            "list": [
                                {
                                    "label":"联系",
                                    "type":"detail",
                                    // "url":"/", //优先执行url
                                    onClick(tablePage, self,row){
                                        self.shadow=true
                                    }

                                },
                                {
                                    "label":"查看详情",
                                    "type":"detail",
                                    // "url":"/userlist/info", //优先执行url
                                    onClick(tablePage, self, row){
                                        self.$router.push({path: '/userinfo/sinfo/' + row.user_id })
                                    }

                                },
                                {
                                    "label":"查看收入",
                                    "type":"detail",
                                    "url":"/userincome", //优先执行url

                                },
                            ]
                        }
                    ],
                },
                tableJson2: {
                    "selectBox":true,
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "优惠券模板ID",
                            "prop": "name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "优惠券名称",
                            "prop": "address",
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
                            "label": "有效期",
                            "prop": "address",
                            "width": "",
                            
                        }
                    ],
                    formatter: function(data) { //表格数据处理
                    // return data
                    return data.splice(5, 8);
                    },
                },
                tableJson3: {
                    "selectBox":true,
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "ID",
                            "prop": "name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "实物券名称",
                            "prop": "address",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "有效期",
                            "prop": "address",
                            "width": "150",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "领取地址",
                            "prop": "address",
                            "width": "",
                            
                        }
                    ],
                    formatter: function(data) { //表格数据处理
                    // return data
                    return data.splice(5, 8);
                    },
                }



            }
        },
        components: {
            NomalTable,
            TableSearch,
            BreadCrumb
        },
        created() {
            this.$axios.get('/api/admin/user/index',{
                params:{
                    page:1,
                    pagesize:10,
                    sid:'29n74p7ln8hnmhk3lih5vl1tlr-8d1dwc52hBjhFUoAw7qjkyT/lec8pChVIDeN/tZHy2Pk2jKRSX083g4MiH79PyIFolkPy4R2IEsx'
                }
            }).then(data=>{
                console.log('这里这里',data)

            })
        },
        computed: {
           
        },
        methods: {
            handleClick(){},
            onSubmit1(){
                console.log('1成功')
            },
            onSubmit2(){
                console.log('2成功')
            },
            onSubmit3(){
                console.log('3成功')
            },
            onSubmit4(){
                console.log('4成功')
            }
        }
    }

</script>

<style scoped>

</style>
