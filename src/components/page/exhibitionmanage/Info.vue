<template>
<div class="page">
    <div class="page-header">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>展会</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path:'/exhibitionmanage' }">展会管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{activeName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    <div class="page-content">
        <div class="panel">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane class="info" label="展会信息" name="展会信息">
                    <ShowDetail :showdata='showdata1'></ShowDetail>
                </el-tab-pane>
                <el-tab-pane class="flexbox2" label="参展商家" name="参展商家">
                    <ShowDetail :showdata='showdata2'></ShowDetail>
                </el-tab-pane>
                <el-tab-pane label="参展用户" name="参展用户">
                    <nomal-table :table-json="pageJson1" :url="url1"></nomal-table>   
                </el-tab-pane>
                <el-tab-pane label="展会活动" name="展会活动">
                    <nomal-table :table-json="pageJson2" :url="url2"></nomal-table>
                </el-tab-pane>
            </el-tabs>            
        </div>

    </div>
</div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import ShowDetail from '@/components/common/showdetail'
import NomalTable from '@/components/common/NomalTable'
export default {
    data(){
        return{
            url1:'',
            url2:'',
            activeName:'展会信息',
            name:'展会信息',
            showdata1:[
                {
                    type:7,
                    label:'展会名称',
                    title:'北京2018年春季婚博会'
                },
                {
                    type:7,
                    label:'展会时间',
                    title:'2018-05-22 至 2018-06-01'
                },
                {
                    type:7,
                    label:'报名时间',
                    title:'2018-05-22 至 2018-06-01'
                },
                {
                    type:7,
                    label:'展会城市',
                    title:'北京'
                },
                {
                    type:7,
                    label:'详细地址',
                    title:'北京国际会议中心'
                },
                {
                    type:7,
                    label:'展会地图',
                    imgurl:'/static/img/ditu.png'
                },
                {
                    type:7,
                    label:'展会广告图',
                    imgurl:['/static/img/2.png','/static/img/2.png']
                },
                {
                    type:7,
                    label:'展会描述',
                    title:'北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心北京国际会议中心'
                }
            ],
            showdata2:[
                {
                    type:8,
                    imgurl:'/static/img/3.jpg',
                    slot:`<p>蒙娜丽莎婚纱摄影总店</p><p>联系方式：17610639336</p><p>费用：￥1000.00</p>`
                },
                {
                    type:8,
                    imgurl:'/static/img/3.jpg',
                    slot:`<p>蒙娜丽莎婚纱摄影总店</p><p>联系方式：17610639336</p><p>费用：￥1000.00</p>`
                },
                {
                    type:8,
                    imgurl:'/static/img/3.jpg',
                    slot:`<p>蒙娜丽莎婚纱摄影总店</p><p>联系方式：17610639336</p><p>费用：￥1000.00</p>`
                },
                {
                    type:8,
                    imgurl:'/static/img/3.jpg',
                    slot:`<p>蒙娜丽莎婚纱摄影总店</p><p>联系方式：17610639336</p><p>费用：￥1000.00</p>`
                },
                {
                    type:8,
                    imgurl:'/static/img/3.jpg',
                    slot:`<p>蒙娜丽莎婚纱摄影总店</p><p>联系方式：17610639336</p><p>费用：￥1000.00</p>`
                },
                {
                    type:8,
                    imgurl:'/static/img/3.jpg',
                    slot:`<p>蒙娜丽莎婚纱摄影总店</p><p>联系方式：17610639336</p><p>费用：￥1000.00</p>`
                }
            ],
            pageJson1:{
            "column": 
                [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "用户昵称",
                        "prop": "name"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "手机号码",
                        "prop": "phone",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "索票时间",
                        "prop": "time"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "参展时间",
                        "prop": "showtime",
                        "width": "200",
                        
                    }
                ],
            },
            pageJson2:{
            "column": 
                [ //行
                    {
                        "type": "text",
                        "label": "活动名称",
                        "prop": "address",
                        "width": "300",
                        "align": "center",
                        formatter(row) {
                            let str = "<div style='display:flex; align-items:center; background-color#fff;'>";
                            str += "<div style='width:74px;height:74px;padding:8px; flex-shrink:0;'><img style='width:100%; height:100%;' src='/static/img/img.jpg'></div>";
                            str += "<div style='flex-grow:1; text-align:left;'>" + row.address + "</div>"

                            str += "</div>";
                            return str;
                        }
                            
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "状态",
                        "prop": "status",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "参与人数",
                        "prop": "innum"
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "中奖人数",
                        "prop": "num",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "中奖礼品",
                        "prop": "goods",
                        "width": "200",
                        
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "活动时间",
                        "prop": "showtime",
                        "width": "200",
                        
                    }
                ],
            },
        }
    },
    beforeCreate(){

    },
    mounted(){
        
    },
    components:{
        BreadCrumb,
        ShowDetail,
        NomalTable
    },
    methods:{
        handleClick(t,ev){
            this.name = t.label
        }
    }
}
</script>
<style lang="less" scoped>
.flexbox2{
    color: #666;
    .showdetail{
        display: flex;
        flex-wrap: wrap;
    }
}
.info /deep/ .showdetail .labeltext .pbox{
    flex: 6
}
.info /deep/ .showdetail .labeltext .labelimgbox{
    flex: 6
}
</style>