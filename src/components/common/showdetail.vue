<template>
    <div class="showdetail">
        <div v-for="(item, idx) in showdata" :key="idx">
            <!-- 1文本 -->
            <p class="singlep" v-if="item.type===1">{{item.text}}</p>
            <!-- <el-row v-if="item.type===1 && item.countInLine===1">
                <el-col class="text" :span="24/item.countInLine">
                    <div><span v-if="item.label">{{item.label}}:</span>{{item.value}}</div>
                </el-col>
            </el-row>
            <el-col class="text" v-if="item.type===1 && item.countInLine!==1" :span="24/item.countInLine">
                <div><span v-if="item.label">{{item.label}}:</span>{{item.value}}</div>
            </el-col> -->
            <!-- 2标题 -->
            <!-- <el-row class="titlecontainer" v-if="item.type===2">
                <el-col :span="24">
                    <div class="title">{{item.value}}</div>
                </el-col>
            </el-row> -->
            <!-- 3列表 -->
            <!-- <div v-if="item.type===3" class="listcontainer">
                <span>{{item.label}}</span>
                <ul>
                    <li v-for="(v,i) in item.value" :key="i"><span>{{i+1}}、</span>{{v}}</li>
                </ul>
            </div> -->
            <!-- 4全宽度图片 -->
            <div v-else-if="item.type===4" class="imgcontainer">
                <img :src="item.url" alt="">
            </div>
            <!-- 5地图 -->
            <div v-if="item.type===5" class="imgbox">
                <span class="f12">{{item.label+'：'}}</span>
                <div>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div>{{item.longitude}}</div>
                        </el-col>
                        <el-col :span="6">
                            <div>{{item.latitude}}</div>
                        </el-col>
                    </el-row>
                    <Map :longitude='item.longitude' :latitude='item.latitude' :city='item.city'></Map> 
                </div>
            </div>
            <!-- 6表格 -->
            <!-- <div v-if="item.type===6" class="tablecontainer">
                <el-table class="table" v-for="(v,i) in item.value" :key="i" row-class-name="tablerow" :data="item.value[i]" border :style="{width:(100/item.col)+'%',display:'inline-block'}" :show-header="false">
                        <el-table-column prop="name"></el-table-column>
                        <el-table-column prop="address"></el-table-column>
                </el-table>
            </div> -->
            <!-- lebal模式 -->
            <div class="labeltext" v-else-if="item.type===7">
                    <span>{{item.label===""?"":item.label+'：'}}</span>
                    <!-- 文字的话 -->
                    <div class="pbox" v-if="item.title">
                        <p v-if="Object.prototype.toString.call(item.title)==='[object String]'">{{item.title}}</p>
                        <p v-if="Object.prototype.toString.call(item.title)==='[object Array]'" v-for="(v,i) in item.title" :key="i">{{v}}</p>
                    </div>
                    <!-- 图片的话 -->
                    <div class="labelimgbox" v-else-if="item.imgurl">
                        <div v-if="Object.prototype.toString.call(item.imgurl)==='[object String]'">
                            <img :src="item.imgurl" alt="">
                        </div>
                        <div v-else-if="Object.prototype.toString.call(item.imgurl)==='[object Array]'">
                            <img :src="v" alt="" v-for="(v,i) in item.imgurl" :key="i">
                        </div>
                    </div>
                    <slot class="slotbox"></slot>

            </div>
            <!-- lebal 图片列表模式，左图片右边文字说明列表 -->
            <div style="margin:20px 10px 20px 0" class="labelimg" v-else-if="item.type===8">
                    <img :src="item.imgurl" alt="">
                    <div class="slot" v-html="item.slot"></div>
            </div>
            <!-- <div v-if="item.type===6" class="tablecontainer">
                <el-row>
                    <el-col :span="12" v-for="(v,i) in item.value" :key="i">
                        <el-row :span="12" v-for="(val,idx) in v" :key="idx">
                            <el-col class="tablebox" :span="12">{{val.name}}</el-col>
                            <el-col class="tablebox" :span="12">{{val.address}}</el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div> -->
        </div>
    </div>
</template>

<script>
import Map from '@/components/common/map.vue'
export default {
    data(){
        return {
            
        }
    },
    methods:{
        tablefliter(v){
            // console.log(v)
            
        }
    },
    components:{
        Map
    },
    props: ['showdata'],
    watch: {
        // showdata: function(val) {
        // this.resdata = val;
        // }
    },
    created(){
        
    },
    mounted(){

    }
}
</script>

<style lang='less' scoped>
.showdetail .listcontainer span{
    margin-left: 15px
}
.showdetail .listcontainer ul{
margin-left: 15px
}
.showdetail .listcontainer ul li{
    list-style: none
}
.showdetail .el-row{
    margin: 0 !important
}
.showdetail .titlecontainer .title{
    font-size: 18px;
    margin: 15px
}
.showdetail .tablecontainer .tablebox{
    border: 1px solid #000;
    height: 30px;
    text-align: center;
    line-height:30px;
}
.showdetail .tablecontainer .table :nth-of-type(2){
    border-right: none;
    /* background-color: gray; */
}
.showdetail .text{
    font-size: 14px;
    margin-left: 30px;
    line-height: 20px
}

.showdetail .imgcontainer img{
    display: block;
    margin: 20px auto;
}
 .showdetail .imgcontainer .title{
     display: block;
     margin-left: 15px;
     font-size: 18px
 }
 .showdetail .imgcontainer .imgbox{
     display: inline-block;
     margin-left: 30px
 }
 .showdetail .imgcontainer .imglabel{
     display: block;
     text-align: center;
 }
.showdetail .el-table__row.tablerow{
    height: 40px;
}
.imgbox{
    display: flex;
    margin-bottom: 12px;
    span{
        // flex: 1 1 100px;
        flex: 1;
        text-align: right;
        line-height: 19px;
        color: #666
    }
    div{
        flex:3;
        // line-height: 19px;
        color: #333;
        // margin-top: -1px;
    }
}
.labeltext{
    margin:20px 0;
    display: flex;
    margin-bottom: 12px;
    span{
        min-width: 100px;
        // flex: 1 1 100px;
        flex: 1;
        text-align: right;
        line-height: 19px;
        color: #999;
        font-size: 14px;
    }
    p{
        min-width: 150px;
        font-size: 14px;
        flex:3;
        line-height: 19px;
        color: #999;
        // margin-top: -1px;
    }
    // 后期删除
    .labelimgbox,.pbox{
         flex: 3;
         display:flex;
         flex-wrap: wrap;
         img{
             margin: 10px;
         }
    }
    .labelimgbox div{
        // display: flex;
        // flex-wrap: wrap;
    }
    img{
        // display: block;
        // width: 500px;
        // height: 300px;
        background-color: #eee;
    }
}
.singlep{
    font-size: 14px
}
.labelimg{
    display: flex;
    img{
        display: block;
        width: 120px;
        height: 100px;
        background-color: #eee;
        margin-right: 10px;
    }
    .slot{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
}
.pbox{
    flex-wrap: wrap;
    p{
        width: 100%;
        flex-basis: 100%;
        margin-bottom: 10px;
    }
}
</style>
