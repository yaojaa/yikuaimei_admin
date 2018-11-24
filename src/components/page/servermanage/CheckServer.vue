<template>

    <div>
        <div class="sub-heading mt-n">
            <h3 class="sub-title">
                <span class="title" style="font-size:14px;color:#666">当前客服：钫钫  主管-17610639336</span>
            </h3> 
            <div class="sub-actions"><a href=""></a></div>
        </div>
        <div class="panel textboxcontainer">
            <!-- <div class="textbox" v-for="(v,i) in 2" :key="i">
                <div class="text-t">
                    <p class="f13 text-info"><i class="iconfont"></i>{{'今日接待人数（人）'}}</p>
                    <h3 class="f24" v-countup='{startvalue:0,endvalue:200}'></h3>
                    <span class="f12 text-muted">总接待人数200</span>
                </div>
                <div class="text-c">
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
                </div>
            </div>            -->
            <data-display :data='data'></data-display>
        </div>
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">历史接待次数</h3>
                <div class="panel-actions">
                    <div class="btnbox f12">
                        <div class="btnrightbox">
                            <a @click="getdaynum=7;reinitchart()" :class="{currentbtn:getdaynum===7}" class="cbtn f9 color9">7天</a>
                            <a @click="getdaynum=30;reinitchart()" :class="{currentbtn:getdaynum===30}" class="cbtn f9 color9">30天</a>
                        </div>
                    </div>
                </div>
            </div>            
            <div class="panel-body">
                <div class="echart chartline" ref="chart"  style="width:100%;height:376px"></div>
            </div>
        </div>

        <!-- <servercentercheck></servercentercheck> -->
        <div class="sub-heading">
            <h3 class="sub-title">
                <span class="sub-icon"><img src="/static/img/sub_icon.png" width="100%"></span>
                <span class="title">接待用户</span>
            </h3> 
            <div class="sub-actions"><a href=""></a></div>
        </div>
        <div class="panel">
            <msg :table='false' :url='1'></msg>
        </div>

    </div>
</template>
<script>
import echarts from 'echarts'
import DataDisplay from '@/components/common/DataDisplay.vue'
import msg from '@/components/common/TalkBox.vue'
export default {
    data() {
        return {
            getdaynum: 7,
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
        }
    },
    beforeCreate() {

    },

    mounted() {
        this.reinitchart()
    },
    components: {
        // servercentercheck
        msg,
        DataDisplay
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
                return [5, 20, 36, 10, 10, 20]
            } else {
                return [5, 15, 36, 10, 10, 20, 15, 36, 10, 10, 20, 15, 36, 10, 10, 20]
            }
        }
    },
    methods: {
        reinitchart() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector(".chartline"));
            console.log(this.datax);
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
                    // type: 'scatter',
                    type: 'line',
                    smooth: true,
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
    }
}
</script>
<style lang="less" scoped>
.con {
    background-color: transparent;
    border: none;
    margin-top: 30px;
}

.con /deep/ .text-b {
    display: none;
}

.textboxcontainer {
    background-color: #f8f9fa;
    position: relative;
    width: 100%; // height: 170px;
    display: flex;
    justify-content: space-between;
    .textbox {
        background-color: #fff;
        flex: 1;
        margin-right: 20px;
    }
    div{
        margin: 0;
    }
    .text-b {
        // margin-top: 21px;
        // position: absolute;
        // bottom: 0;
        // left: 0;
        // margin-bottom: -5px ;
        padding-top: 19px;
        /deep/ .el-progress {
            display: none;
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
    padding: 10px 0;
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
        // padding-left: 11px;
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
.textbox:nth-child(2){
    margin-right: 0
}
.text-b /deep/ .el-progress-bar__outer {
    overflow: visible;
}

.text-b /deep/ .el-progress-bar__innerText {
    color: #999;
    margin: 0 -16px;
    margin-top: -37px;
}

// .top{
//     display: flex;
//     justify-content: space-between;
//     >div{
//         flex: 1;
//         text-align: center;
//         background-color: #fff;
//         padding: 20px;
//     }
// }
// .top>div:nth-child(1){
//         margin-right: 20px;
// }
// .tbottom{
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     div{
//         text-align: center;
//         flex: 1;
//         height: 120px;
//         display: flex;
//         flex-direction:column;
//         justify-content: center;
//         span{
//             margin-top: 10px;
//         }
//     }
//     .line{
//         flex: 0;
//         border: 1px dashed #eee;
//         height: 100px;
//         background-color: #ddd;
//     }
// }
.btnbox {
    margin-top: 12px;
    padding-left: 31px;
    padding-right: 12px;
    display: flex;
    justify-content: flex-end;
}

.cbtn {
    margin: 5px;
    color: #666;
    display: inline-block;
    width: 35px;
    height: 32px;
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
</style>