<template>
<div>
    <div class="chartbox">
        <div class="echart" :id="chartid || 'chart'" style="width:100%;height:376px"></div>
    </div>
</div>
</template>
<script>
import echarts from 'echarts'
export default {
    data: function() {
        return {
        }
    },
    props:['Datax','Datay','chartid','option'],
    methods: {
        goto(v){
            this.$router.push(v)
        },
        reinitchart() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector("#"+(this.chartid || 'chart')));
            // 指定图表的配置项和数据
            var defaultoption = {
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
            var endoption=this.option||{};
            function getType(obj){
                //tostring会返回对应不同的标签的构造函数
                var toString = Object.prototype.toString;
                var map = {
                    '[object Boolean]'  : 'boolean', 
                    '[object Number]'   : 'number', 
                    '[object String]'   : 'string', 
                    '[object Function]' : 'function', 
                    '[object Array]'    : 'array', 
                    '[object Date]'     : 'date', 
                    '[object RegExp]'   : 'regExp', 
                    '[object Undefined]': 'undefined',
                    '[object Null]'     : 'null', 
                    '[object Object]'   : 'object'
                };
                if(obj instanceof Element) {
                    return 'element';
                }
                return map[toString.call(obj)];
            };       
            // p是特别设置的属性，c是默认属性，如果设置了会被覆盖
            function deepCopy(p,c){
                var c=c||{}; 
                for(var i in p){
                    if(getType(p[i]) ==="object"){
                        c[i]=(p[i].constructor===Array)? [] : {};
            　　　　　　　deepCopy(p[i],c[i]);
                    }else{
                        c[i]=p[i];
                    }
                }        
                return c;
            };
            endoption = deepCopy(endoption,defaultoption);
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(endoption);
            window.onresize = myChart.resize;
        }
    },
    mounted() {
        this.$nextTick(
            this.reinitchart()
        )
    },
    computed: {
        datax() {
            return (this.Datax || ["7-19", "7-18", "7-17", "7-16", "7-15", "7-14", "7-18", "7-17", "7-16", "7-15", "7-14", "7-18", "7-17", "7-16", "7-15", "7-14"])
        },
        datay() {
            return (this.Datay || [5, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20])
        }
    }
}
</script>
<style lang='less' scoped>


.chartbox {
    background-color: #fff;
    .btn {
        display: inline-block;
        width: 60px;
        height: 32px;
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
        margin-top: 12px;
        padding-left: 31px;
        padding-right: 12px;
        display: flex;
        justify-content: space-between;
    }
    .cbtn {
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
            width: 24%;
            list-style: none; // background-color: #fff;
            height: 85px;
            line-height: 85px;
            text-align: center;
            margin-right: 10px;
            border-radius: 10px;
            cursor: pointer;
            color: #fff;
            margin-bottom: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
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
</style>