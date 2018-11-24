<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>监控中心</el-breadcrumb-item>
                    <el-breadcrumb-item>抽免单</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="page-content">
            <!-- <el-row :gutter="20">
                <el-col :span="12" v-for="(v,i) in 2" :key="i">
                    <div class="panel-box">
                        <div class="panel-hd mb-lg">
                            <p class="f13 text-info"><i class="iconfont"></i>{{'昨日抽免单人数（人）'}}</p>
                            <h3 class="f24 mt-sm" v-countup='{startvalue:0,endvalue:200}'></h3>
                        </div>
                        <div class="panel-bd">
                            <div class="col">
                                <p class="f12 text-info">{{'注册用户'}}</p>
                                <h4 class="f14">65</h4>
                            </div>
                            <div class="col">
                                <p class="f12 text-info">{{'生成订单'}}</p>
                                <h4 class="f14">3</h4>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row> -->
            <data-display :data='data'></data-display>
            <div class="sub-heading">
                <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">数据列表</span></h3>
            </div>
            <nomal-table :table-json="tableJson" :url="url"></nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import DataDisplay from '@/components/common/DataDisplay';
export default {
    data() {
        return {
            data:[
                {
                    title:'昨日抽免单人数（人）',
                    num:600,
                    // label:'总接待人数200人',
                    lefttitle:'注册用户',
                    lfetnum:65,
                    righttitle:'生成订单',
                    rightnum:70,
                },
                {
                    title:'昨日抽免单人数（人）',
                    num:500,
                    // label:'总接待次数200次',
                    lefttitle:'注册用户',
                    lfetnum:6555,
                    righttitle:'生成订单',
                    rightnum:70,
                }
            ],
            url: "./static/vuetable.json",
            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "手机号码",
                        "prop": "date",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "抽免单时间",
                        "prop": "name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "注册用户",
                        "prop": "address",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "生成订单",
                        "prop": "address",
                        "width": "",
                    }
                ]
            }
        }
    },
    components: {
        NomalTable,
        DataDisplay
    },
    created() {

    },
    computed: {

    },
    methods: {


    }
}
</script>
<style lang='less' scoped>
.panel-box {
    padding: 20px;
    text-align: center;
    background: #fff;
    .panel-bd {
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        .col {
            -webkit-flex: 1;
            -moz-flex: 1;
            -ms-flex: 1;
            -o-flex: 1;
            flex: 1;
            line-height: 1.5;
            &:first-child {
                border-right: 1px solid #F5ECFF;
            }
        }
    }
}
.text-info{
    line-height: 18px;
    margin: 5px;
}
</style>