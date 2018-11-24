<template>
    <div class="con">
        <div class="textboxcontainer">
            <!-- <div class="textbox" v-for="(v,i) in 2" :key="i">
                <div class="text-t">
                    <p class="f13 text-info"><i class="iconfont"></i>{{'今日接待人数（人）'}}</p>
                    <h3 class="f24" v-countup='{startvalue:0,endvalue:200}'></h3>
                    <span class="f12 text-muted">总接待人数200</span>
                </div>
                <div class="text-c">
                    <div>
                        <p class="f12 text-info">{{'昨日接待人数'}}</p>
                        <h4 class="f14">65</h4>
                    </div>
                    <div class="line"></div>
                    <div>
                        <p class="f12 text-info">{{'环比接待人数'}}</p>
                        <h4 class="f14">40%</h4>
                    </div>
                </div>
            </div> -->
            <data-display :data='data'></data-display>
        </div>
        <div class="sub-heading">
            <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">数据列表</span></h3>
            <div class="sub-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/servermanage/addserver' })">添加客服</el-button>
            </div>
        </div>
        <NomalTable :table-json="tableJson"></NomalTable>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable';
import DataDisplay from '@/components/common/DataDisplay';
export default {
    data() {
        return {
            israse: true,
            data:[
                {
                    title:'今日接待人数（人）',
                    num:600,
                    label:'总接待人数200人',
                    lefttitle:'昨日接待人数',
                    lfetnum:65,
                    righttitle:'环比接待人数',
                    rightnum:70,
                },
                {
                    title:'今日接待次数（人）',
                    num:500,
                    label:'总接待次数200次',
                    lefttitle:'昨日接待人数',
                    lfetnum:6555,
                    righttitle:'环比接待次数',
                    rightnum:70,
                }
            ],
            tableJson: {
                "column": [ //行

                    {
                        "type": "text",
                        "align": "center",
                        "label": "手机号码",
                        "prop": "address"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "客服姓名",
                        "prop": "date",
                        "width": "200",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "所属分公司",
                        "prop": "address"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "当前状态",
                        "prop": "date",
                        "width": "100",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "添加时间",
                        "prop": "address"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "最后登录",
                        "prop": "date",
                        "width": "200",

                    },
                    {
                        "type": "switch",
                        "label": " 是否启用",
                        "align": "center",
                        "width": "80",
                        "prop": "switch",
                        "config": {
                            "activeColor": "green",
                            "inactiveColor": "gray",
                            "value": ["0", "1"],
                        }
                    },
                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width": "",
                        "list": [{
                                "label": "查看记录",
                                "type": "edit",
                                "url": "/servermanage/check?id=1123", //优先执行url
                                onClick(tablePage, self) {
                                    console.log(self.vue)
                                    console.log(tablePage.isShow)
                                    self.nomal = !self.nomal;
                                    tablePage.isShow = !tablePage.isShow
                                }
                            },
                            {
                                "label": "编辑",
                                "type": "edit",
                                "url": "", //优先执行url
                                onClick(tablePage, self) {
                                    console.log(self.vue)
                                    console.log(tablePage.isShow)
                                    self.nomal = !self.nomal;
                                    tablePage.isShow = !tablePage.isShow
                                }
                            },
                            {
                                "label": "删除",
                                "type": "edit",
                                "url": "", //优先执行url
                                onClick(tablePage, self) {
                                    console.log(self.vue)
                                    console.log(tablePage.isShow)
                                    self.nomal = !self.nomal;
                                    tablePage.isShow = !tablePage.isShow
                                }
                            },
                        ]
                    }
                ],
            },
        }
    },
    beforeCreate() {

    },
    mounted() {

    },
    components: {
        NomalTable,
        DataDisplay
    }
}
</script>
<style lang="less" scoped>
.con /deep/ .pagination {
    display: none;
}

.top {
    display: flex;
    justify-content: space-between;
    >div {
        flex: 1;
        text-align: center;
        background-color: #fff;
        padding: 20px;
    }
}

.top>div:nth-child(1) {
    margin-right: 20px;
}

.tbottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        text-align: center;
        flex: 1;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
            margin-top: 10px;
        }
    }
    .line {
        flex: 0;
        border: 1px dashed #eee;
        height: 100px;
        background-color: #ddd;
    }
}

.bottom {
    position: relative;
}

.bottom>.title {
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    margin-bottom: 50px;
    h4 {
        display: inline-block;
        margin-left: 15px;
        color: #666;
    }
}

.bottom /deep/ .addserver {
    position: absolute;
    right: 10px;
    top: 44px;
}
</style>