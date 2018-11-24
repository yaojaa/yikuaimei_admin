<template>
<div class="page-container">
    <div class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/userlist' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/userlist/info/exhibition' }">展会信息</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: $route.path }">展会详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>    
    <div class="page-content">
        <div class="sub-heading">
            <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">展会详情</span></h3>
            <div class="sub-actions">
                <el-button size="mini" type="primary" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
        <div class="top">
            <div class=" info mb-n panel imgbox">
                <img src="../../../../static/img/img.jpg" alt="">
                <p>Kevin</p>
            </div>
            <div class="panel info mb-n">
                <div class=" info mb-n">
                    <cd :showdata='showdata'></cd>
                </div>
                <div class=" info mb-n">
                    <cd :showdata='showdata2'></cd>
                </div>                
            </div>
        </div>
        <div>
            <div>
                <table-tabs :page-tabs="pageTapsCard" @tabs-click="pageTapsClick"></table-tabs>
            </div>
        </div>
        <nomal-table :table-json="tablePage" :url="url" v-show="index===0"></nomal-table> 
        <nomal-table :table-json="tablePage2" :url="url" v-show="index===1"></nomal-table> 
        <nomal-table :table-json="tablePage3" :url="url" v-show="index===2"></nomal-table>             
    </div>
</div>
</template>
<script>
import NomalTable from '../../common/NomalTable';
import cd from '../../common/showdetail';
import msg from '../../common/TalkBox'
import TableTabs from '@/components/common/TableTabs'
export default {
    data() {
        return {
            index:0,
            activeName:'first',
            listkey: 3,
            url: "",
            pageTapsCard:{
                "type":"card",
                "list":[
                    {
                        "label":"采购单",
                        "name": "0",
                    },
                    {
                        "label":"购买商品",
                        "name": "1",
                    }
                    ,
                    {
                        "label":"回访记录",
                        "name": "2",
                    }
                ],
                "activeVal":"0" //初始值
            },
            tablePage: {
                "column": [ //行
                    {
                            "type": "text",
                            "label": "商品信息",
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
                        "align": "center",
                        "label": "品牌名称",
                        "prop": "date"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "采购",
                        "prop": "date"

                    }
                ],
                formatter: function(data) { //表格数据处理
                    // return data
                    return data.splice(2, 8);
                },
            },
            tablePage2: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "姓名",
                        "prop": "address"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "手机号码",
                        "prop": "date"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "详细地址",
                        "prop": "address"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "邮政编码",
                        "prop": "date"

                    }
                ],
                formatter: function(data) { //表格数据处理
                    // return data
                    return data.splice(2, 8);
                },
            }, 
            tablePage3: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "联系时间",
                        "prop": "address"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "客服人员",
                        "prop": "date"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "备注信息",
                        "prop": "address"

                    }
                ],
                formatter: function(data) { //表格数据处理
                    // return data
                    return data.splice(2, 8);
                },
            },            
            showdata: [{
                    type: 7,
                    label: '用户编号',
                    title: '76937'
                },
                {
                    type: 7,
                    label: '联系方式',
                    title: '18888888888'
                },
                {
                    type: 7,
                    label: '性别',
                    title: '女'
                },
                {
                    type: 7,
                    label: '生日',
                    title: '1992年2月2日'
                }
            ],
            showdata2: [{
                    type: 7,
                    label: '注册时间',
                    title: '2018-05-05 16:30:30'
                },
                {
                    type: 7,
                    label: '用户来源',
                    title: '微信小程序'
                },
                {
                    type: 7,
                    label: '城市',
                    title: '鄂尔多斯'
                }
            ]
        }
    },
    // 需要传入userid识别
    // props:[userid],
    beforeCreate() {
        // $axios('api/userinfo?userid=userid').then(this.)
    },
    mounted() {
    },
    methods:{
        pageTapsClick(index,el){
            this.index = index
        }
    },
    components: {
        NomalTable,
        cd,
        msg,
        TableTabs
    }
}
</script>
<style lang="less" scoped>
.page-content /deep/ .labeltext{
    margin: 0;
}
.message {
    .messagebox {
        height: 600px; // background-color: #eee;
    }
}

.top {
    display: flex;
    margin-bottom: 30px;
    .imgbox {
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-bottom: 20px;
        img {
            border-radius: 50%;
            height: 80px;
            width: 80px;
            margin-right: 20px;
            // margin-top: 30px
        }
        p {
            color: #7224D8;
            font-size: 18px;
        }
    }
    .note {}
}
.top>div:nth-child(1){
        // flex: 1;
        padding: 20px;
        margin-right:10px;

    }
.top>div:nth-child(2){
        display: flex;
        flex: 1;
        padding: 20px;
        padding-left: 100px;
    }
.top /deep/ .pbox {
    flex: 1!important
}

</style>