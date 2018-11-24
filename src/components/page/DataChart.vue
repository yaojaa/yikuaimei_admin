<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>数据报表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="page-content">
            <div class="sub-heading mt-n">
                <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">交易数据</span></h3>
                <div class="sub-actions">
                    <div class="title">
                        <el-button>昨天</el-button>
                        <el-button>最近7天</el-button>
                        <el-button>最近30天</el-button>
                        <el-button>日期选择</el-button>
                        <el-button>导出数据</el-button>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <chart :Datax='datax' :Datay='datay' :chartid="'chart1'" :option='option'></chart>
                </div>
            </div>
            <div class="sub-heading">
                <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">新老用户平台交易</span></h3>
                <div class="sub-actions">
                    <div class="title">
                        <div class="title">
                            <el-button>本月</el-button>
                            <el-button>上月</el-button>
                            <el-button>日期选择</el-button>
                            <el-button>导出数据</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <div class="flexbox">
                        <chart class="chart2" :Datax='datax' :Datay='datay' :chartid="'chart2'" :option='option2'></chart>
                        <!-- <nomal-table class="table" :table-json="pageJson1" :url="url1"></nomal-table> -->
                        <div class="tablebox">
                            <el-table :data="tableData" border style="width: 100%">
                                <el-table-column prop="user" label="用户" align='center'>
                                </el-table-column>
                                <el-table-column prop="pay" label="付款金额" align='center'>
                                </el-table-column>
                                <el-table-column prop="payc" label="对比上一月" width="150" align='center'>
                                </el-table-column>
                                <el-table-column prop="num" label="付款人数" align='center'>
                                </el-table-column>
                                <el-table-column prop="numc" label="对比上一月" width="150" align='center'>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import chart from '@/components/common/chart.vue'
export default {
    data() {
        var datay = [5, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20]
        return {
            datax: ["7-19", "7-18", "7-17", "7-16", "7-15", "7-14", "7-18", "7-17", "7-16", "7-15", "7-14", "7-18", "7-17", "7-16", "7-15", "7-14"],
            datay: datay,
            option: {
                color: ['#3398DB'],
                // tooltip : {
                //     trigger: 'axis',
                //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                //     }
                // },
                xAxis: [{
                    type: 'category',
                    data: ['0-50元', '51-100元', '101-200元', '201-500元', '501-1000元', '5001-10000元', '10001元以上'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    // name:'交易数',
                    type: 'bar',
                    barWidth: '30%',
                    data: [10, 52, 200, 334, 390, 330, 220],
                    itemStyle: {
                        normal: {
                            color: 'pink'
                        }
                    }
                }]
            },
            option2: {
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                series: [{
                    name: '销量',
                    type: 'pie',
                    // stack: '总量',
                    smooth: true,
                    data: [
                        { value: 735, name: '新客户' },
                        { value: 510, name: '老客户' },
                    ]
                }],
            },
            tableData: [{
                    user: '新用户',
                    pay: '9999',
                    payc: '5%',
                    num: '2123',
                    numc: '6%'
                },
                {
                    user: '老用户',
                    pay: '8888',
                    payc: '5%',
                    num: '2123',
                    numc: '6%'
                }
            ]
        }
    },
    beforeCreate() {

    },
    mounted() {

    },
    components: {
        chart
    }
}
</script>
<style lang="less" scoped>
.flexbox {
    display: flex;
    .chart2 {
        width: 50%;
    }
    .table {
        width: 50%;
    }
}

.tablebox>div {
    margin-top: 150px;
}

.title {
    text-align: right
}
</style>