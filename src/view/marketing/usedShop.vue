<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>满减立减优惠券</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            
        </div>
        <div class="page-content">
            <div class="shop-card clearfix" v-if="cardInfo!={}">
                <div class="item-left" >
                    <p><span class="card-price">¥{{cardInfo.rules.price}}</span><span>{{cardInfo.coupon_title}}</span></p>
                    <p>满{{cardInfo.rules.reduce_price}}可用</p>
                    <p>{{cardInfo.coupon_expire.coupon_expire_start_time}}--{{cardInfo.coupon_expire.coupon_expire_end_time}}</p> 
                </div>
                <div class="item-right">
                     <div v-if="cardInfo.coupon_img">
                         <img width="100%"  :src="cardInfo.coupon_img" >
                     </div>
                     <div class="no-img" v-else>
                         暂无图片
                     </div>
                     
                </div>
            </div>
            
            <nomal-table v-if="!flag" v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
            
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'

export default {
    data() {
        return {
            flag:true,
            cardInfo:{},
            
            searchs: {
                "list": [
                    {
                        "type": "input-text", //输入文本
                        "label": "门店",
                        "name": "shop_name",
                        "value": "",
                        "placeholder": "门店名称",
                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "地址",
                        "name": "shop_address",
                        "value": "",
                        "placeholder": "请输入地址",
                    }
                    
                ]
            },
            
            url: "/api/admin/coupon/shopList?coupon_code="+this.$route.params.coupon_code,
            

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "门店ID",
                        "prop": "shop_id",
                        "width": ""
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "参与时间",
                        "prop": "shop_coupon_ctime",
                        "width": "",

                    },
                    
                    {
                        "type": "text",
                        "align": "center",
                        "label": "门店类型",
                        "width": "",
                        formatter(row) {
                            return "加盟商"
                        }
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "门店名称",
                        "prop": "shop_name",
                        "width": "200",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "地址",
                        "prop": "shop_address",

                    }
                    
                ],
            }



        }
    },
    components: {
        NomalTable,
        TableSearch
    },
    created() {
        
    },
    
    computed: {
        //console.log(this.coupon_info,'this')
    },
    mounted(){
        
        this.getCouponData(this.$route.params)
        
    },
    methods: {
        getCouponData(params){
            this.$axios.get("/api/admin/coupon/shopList",{params:params}).then(res => {
                if(res.data.code == 0){
                    console.log(res.data,'data')
                    this.cardInfo = res.data.coupon_info
                    console.log(this.$route.params)
                    //this.url = "/api/admin/coupon/shopList?coupon_code="+this.$route.params.coupon_code
                    console.log(this.cardInfo,'this.cardInfo')
                    this.flag = false;
                    //  console.log(this.url,'this.url')
                    
                }else{
                    this.$alert(res.data.msg)
                }
            }).catch((e)=>{

                this.$alert('操作失败'+e)

            })
        },
        
        listenSwitchChange(data) {
            console.log(data,'data')
        },
        openModal() {

            console.log('openModal')
        },
        getData(k, v) {
            this.$refs.table.getData({
                [k]: v
            })
        }


    }
}
</script>
<style scoped>
.shop-card{
    width:345px;
    height:120px;
    background-color: #f73c3c;
    border-radius:6px;
    
}
.item-left{
    float: left;
    width:245px;
    height: 120px;
    font-size: 14px;
    color: #fff;
}
.item-left p{
    width:240px;
    margin-left:15px;
    margin-top:10px;
    height:26px;
    line-height: 26px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.item-right{
    width:100px;
    float: right;
    height: 120px;
}
.item-right img{
    width:120px;
    height: 120px;
}

 .no-img {
    font-size: 16px;
    height: 120px;
    width: 100%;
    line-height: 120px;
    color:#585858;
    text-align:center;
}
.card-price{
    font-size:20px;
    font-weight: bold;
    margin-right:10px;
}
.clearfix:after{
content:"";
display:block;
visibility:hidden;
clear:both;
height:0;
}
</style>


