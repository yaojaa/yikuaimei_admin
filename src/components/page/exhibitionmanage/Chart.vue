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
        <table-search :searchs="searchs"></table-search>
        <div class="sub-heading">
            <h3 class="sub-title">
                <span class="sub-icon">
                    <img  src="/static/img/sub_icon.png" width="100%">
                </span>
                <span  class="title">展会数据</span>
            </h3> 
            <div  class="sub-actions"><a  href=""></a></div>
        </div>
        <div class="panel">
            <div  class="panel-heading"><h3  class="panel-title">参战人数</h3></div>
            <chart :Datax='datax' :Datay='datay' :chartid="'chart4'"></chart>
        </div>
        <div class="panel">
            <div  class="panel-heading"><h3  class="panel-title">参展商家</h3></div>
            <chart :Datax='datax' :Datay='datay' :chartid="'chart5'" :option='option2'></chart>
        </div>
        <div class="panel">
            <div  class="panel-heading"><h3  class="panel-title">订单数量</h3></div>
            <chart :Datax='datax' :Datay='datay' :chartid="'chart6'" :option='option3'></chart>
        </div>
        <div class="panel">
            <div  class="panel-heading"><h3  class="panel-title">成交金额</h3></div>
           <chart :Datax='datax' :Datay='datay' :chartid="'chart7'" :option='option4'></chart>
        </div>
    </div>
</div>
</template>
<script>
import TableSearch from '@/components/common/TableSearch'
import chart from '@/components/common/chart.vue'
export default {
    data: function() {
        var datay=[5, 20, 15, 20, 35, 30, 45, 40, 55, 50, 65, 70, 85, 80, 95, 100, 115]
        return {
            datax:["7-19", "7-18", "7-17", "7-16", "7-15", "7-14", "7-18", "7-17", "7-16", "7-15", "7-14", "7-18", "7-17", "7-16", "7-15", "7-14"],
            datay:datay,
            option2:{
                series: [
                    {
                        name:'销量',
                        type: 'line',
                        // stack: '总量',
                        smooth: true,
                        data: datay.map(v=>v+5)
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        // stack: '总量',
                        smooth: true,
                        data:datay.map(v=>v+10)
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        // stack: '总量',
                        smooth: true,
                        data:datay.map(v=>v+25)
                    }
                ]
            },
            option3:{
                series: [
                    {
                        name:'销量',
                        type: 'line',
                        // stack: '总量',
                        smooth: true,
                        data: datay.map(v=>v+10)
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        // stack: '总量',
                        smooth: true,
                        data:datay.map(v=>v+20)
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        // stack: '总量',
                        smooth: true,
                        data:datay.map(v=>v+115)
                    }
                ]
            },
            option4:{
                series: [
                    {
                        name:'销量',
                        type: 'line',
                        // stack: '总量',
                        smooth: true,
                        data: datay.map(v=>v+10)
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        // stack: '总量',
                        smooth: true,
                        data:datay.map(v=>v+20)
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        // stack: '总量',
                        smooth: true,
                        data:datay.map(v=>v+30)
                    }
                ]
            },
            searchs:{
                "list": [
                    {
                        "type": "input-select",  //选择器
                        "label": "展会城市",
                        "name": "zhanhui",
                        "value": "zhanhui",
                        "options": [
                            {
                                "name":"选择展会",
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
                    }
                ]
            },

        }
    },
    methods: {
        getData(v){
            console.log(v)
        }
    },
    mounted() {

    },
    computed: {
    },
    components:{
        chart,
        TableSearch
    }
}
</script>
<style lang='less' scoped>
.con /deep/ .chartbox{
    margin-top: 0;
}
</style>