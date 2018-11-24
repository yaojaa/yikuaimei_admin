<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>核心数据</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="page-header-actions">
                
            </div>
        </div>
        <div class="page-content">
            <div class="panel textboxcontainer">
                <data-display :data='data' :progress='true'></data-display>
            </div>
            <!-- 业绩展示图标，echart -->
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">业绩</h3>
                </div>
                <div class="panel-body chartbox">
                    <div class="btnbox f12">
                        <div class="btnleftbox">
                            <a @click="charttype='newuser';reinitchart()" :class="{currentbtn:charttype==='newuser'}" class="btn f10 color3">新增用户</a>
                            <a @click="charttype='sell';reinitchart()" :class="{currentbtn:charttype==='sell'}" class="btn f10 color3">销售额</a>
                            <a @click="charttype='order';reinitchart()" :class="{currentbtn:charttype==='order'}" class="btn f10 color3">订单量</a>
                        </div>
                        <div class="btnrightbox">
                            <a @click="getdaynum=7;reinitchart()" :class="{currentbtn:getdaynum===7}" class="cbtn f9 color9">7天</a>
                            <a @click="getdaynum=30;reinitchart()" :class="{currentbtn:getdaynum===30}" class="cbtn f9 color9">30天</a>
                        </div>
                    </div>
                    <div class="echart" ref="chart" id="chart" style="width:100%;height:376px"></div>
                </div>
            </div>
            <!-- 常用功能部分 -->
            <div class="sub-heading">
                <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">常用功能</span></h3>
                <div class="sub-actions"></div>
            </div>
            <div class="commonusebtn">
                <div class="fn-col" style="background:#1660FD url('/static/img/copy1.png') no-repeat right bottom">
                    <img src="/static/img/fn_icon1.png" width="52">
                    <span>{{'分公司'}}</span>
                </div>

                <div class="fn-col" style="background:#BD10E0 url('/static/img/copy2.png') no-repeat right bottom">
                    <img src="/static/img/fn_icon2.png" width="52">
                    <span>{{'广告位'}}</span>
                </div>

                <div class="fn-col" style="background:#FC507A url('/static/img/copy3.png') no-repeat right bottom">
                    <img src="/static/img/fn_icon3.png" width="52">
                    <span>{{'客服'}}</span>
                </div>

                <div class="fn-col" style="background:#9164F6 url('/static/img/copy4.png') no-repeat right bottom">
                    <img src="/static/img/fn_icon4.png" width="52">
                    <span>{{'优惠券模板'}}</span>
                </div>

                <div class="fn-col" style="background:#6476F6 url('/static/img/copy5.png') no-repeat right bottom">
                    <img src="/static/img/fn_icon5.png" width="52">
                    <span>{{'添加常用功能'}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import DataDisplay from '@/components/common/DataDisplay.vue'
export default {
    data: function() {
        return {
            charttype: 'newuser',
            getdaynum: 30,
            data:[
                {
                    title:'主营收入',
                    num:33600,
                    label:'总会员1990人',
                    lefttitle:'昨日新增会员数（人）',
                    lfetnum:65,
                    righttitle:'环比新增会员数',
                    rightnum:70,
                },
                {
                    title:'总订单数',
                    num:19400,
                    label:'总销售额 65,725 万元',
                    lefttitle:'昨日销售额（元）',
                    lfetnum:6555,
                    righttitle:'环比销售额',
                    rightnum:70,
                },
                {
                    title:'会员数（笔）',
                    num:300,
                    label:'总订单量 1356 万单',
                    lefttitle:'昨日订单量（元）',
                    lfetnum:65,
                    righttitle:'环比订单量',
                    rightnum:70,
                }
            ]
        }
    },
    components:{
        DataDisplay
    },
    methods: {
        goto(v) {
            this.$router.push(v)
        },
        reinitchart() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector("#chart"));
            // 指定图表的配置项和数据
            var option = {
                title: {

                },
                tooltip: {

                },
                legend: {

                },
                xAxis: {
                    data: this.datax
                },
                yAxis: {},
                grid: {
                    x: 60,
                    y: 60,
                    x2: 11,
                    y2: 50
                },
                series: [{
                    // name: '销量',
                    type: 'line',
                    // smooth: true,
                    data: this.datay,
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                    offset: 0,
                                    color: '#fff' // 0% 处的颜色
                                },
                                {
                                    offset: .1,
                                    color: '#7224D8' // 10% 处的颜色
                                },
                                {
                                    offset: .9,
                                    color: '#7224D8' // 90% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#fff' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },
    mounted() {
        this.reinitchart();
    },
    computed: {
        datax() {
            if (this.getdaynum === 7) {
                return ["7-19", "7-18", "7-17", "7-16", "7-15", "7-14"]
            } else if (this.getdaynum === 30) {
                return ["7-19", "7-18", "7-17", "7-16", "7-15", "7-14", "7-18", "7-17", "7-16", "7-15", "7-14", "7-18", "7-17", "7-16", "7-15", "7-14"]
            }

        },
        datay() {
            if (this.getdaynum === 7) {
                switch (this.charttype) {
                    case 'newuser':
                        return [5, 20, 36, 10, 10, 20];
                        break;
                    case 'sell':
                        return [55, 20, 36, 50, 10, 20];
                        break;
                    case 'order':
                        return [24, 20, 36, 10, 70, 20];
                        break;
                    default:
                        return [5, 20, 36, 10, 10, 20];
                        break;
                }
            } else if (this.getdaynum === 30) {
                switch (this.charttype) {
                    case 'newuser':
                        return [5, 15, 36, 10, 10, 20, 15, 36, 10, 10, 20, 15, 36, 10, 10, 20];
                        break;
                    case 'sell':
                        return [5, 15, 35, 45, 55, 67, 15, 35, 45, 55, 67, 15, 35, 45, 55, 67];
                        break;
                    case 'order':
                        return [15, 25, 46, 10, 20, 30, 25, 36, 50, 20, 30, 55, 16, 30, 50, 70];
                        break;
                    default:
                        return [5, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 55];
                        break;
                }
            }
        }
    }
}
</script>
<style lang='less' scoped>
@import '../../assets/z.less';
.textboxcontainer {
    background-color: transparent;
    position: relative;
    width: 100%; // height: 170px;
    display: flex;
    justify-content: space-between;
    .textbox {
        background-color: #fff;
        flex: 1;
        margin-right: 20px;
    }
    div:nth-last-child(1) {
        margin: 0;
    }
    .text-b {
        // margin-top: 21px;
        // position: absolute;
        // bottom: 0;
        // left: 0;
        // margin-bottom: -5px ;
        padding-top: 19px;
        /deep/ .el-progress-bar {
            margin-bottom: -12px;
        }
        /deep/ .el-progress-bar__outer {
            background-color: #CDCFE8;
        }
    }
}

;
.text-t {
    padding-top: 16px;
    text-align: center;
    p {
        line-height: 17px;
    }
    ;
    h3 {
        margin-top: 10px;
        line-height: 29px;
    }
    ;
    span {
        line-height: 14px;
    }
    ;
}

.text-c {
    margin-top: 27px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
        flex: 1;
        white-space: nowrap;
        text-align: center;
    }
    ;
    div:nth-child(1) {
        padding-left: 11px;
    }
    .line {
        flex: 0 0 1px;
        height: 34px;
        background-color: #f5ecff;
    }
    ;
    p {
        line-height: 18px;
        margin: 5px;
    }
}

.text-b /deep/ .el-progress-bar__outer {
    overflow: visible;
}

.text-b /deep/ .el-progress-bar__innerText {
    color: #999;
    margin: 0 -16px;
    margin-top: -37px;
}
.text-info{
    line-height: 18px;
}
.chartbox {
    .btn {
        display: inline-block; // width: 60px;
        padding: 0 15px;
        margin-right: 8px;
        height: 30px;
        line-height: 32px;
        text-align: center;
        background-color: #f4ecff;
        border: none;
        color: #333;
        border-radius: 15px;
        cursor: pointer;
    }
    h2 {
        padding-left: 31px;
    }
    .btnbox {
        padding-right: 12px;
        display: flex;
        justify-content: space-between;
    }
    .cbtn {
        display: inline-block;
        width: 35px;
        height: 32px;
        margin-left: 8px;
        line-height: 32px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #999;
        background-color: #fff;
        cursor: pointer;
    }
    .currentbtn {
        background-color: #7224d8;
        color: #fff;
        border: none;
    }
}

.cfunction {
    h2 {
        margin-top: 40px;
        margin-bottom: 30px;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            -webkit-flex: 1;
            -moz-flex: 1;
            -ms-flex: 1;
            -o-flex: 1;
            flex: 1;
            list-style: none; // background-color: #fff;
            height: 85px;
            line-height: 85px;
            text-align: center;
            margin-right: 20px;
            border-radius: 4px;
            cursor: pointer;
            color: #fff;
            margin-bottom: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 53px;
                height: 53px;
                margin-right: 25px;
                border-radius: 50%;
            }
        }
        li:nth-last-child(1) {
            margin-right: 0;
        }
    }
}

.fn-col {
    padding: 16px 10px;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    img {
        // vertical-align: middle;
        // margin-right: 10px;
        position: absolute;
    }
    span{
        line-height: 52px;
        display: block;
        text-align: center;
        padding-left: 52px;
    }
    &:hover{
        opacity: 0.9;
    }
}
.commonusebtn{
    display: flex;
    div{
        flex: 1;
        margin-right: 20px;
    }
    div:nth-last-child(1){
        margin-right: 0;
    }
}
div /deep/ .el-progress-bar__inner{
    animation: progress-bar-stripes 5s linear infinite;
    background-image: linear-gradient(15deg,rgba(255,255,255,0.25) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.25) 75%,transparent 75%,rgba(255,255,255,0.25) 100%);
}
@keyframes progress-bar-stripes
{
    0% {
    background-position: 0 0;
    }
    100% {
    background-position: 580px 0;
    }
}
</style>