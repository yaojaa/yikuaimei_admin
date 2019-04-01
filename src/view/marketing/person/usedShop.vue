<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>多人同行</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            
        </div>
        <div class="page-content">
            <div class="shop-card clearfix" v-if="cardInfo!={}">
                <p>活动名称{{cardInfo.activity_title}}</p>
                <p>{{cardInfo.activity_rule_type_name}}</p>
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
            
            url: "/api/admin/activity/shopList?activity_code="+this.$route.params.activity_code,
            

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
                        "prop": "shop_activity_ctime",
                        "width": "",

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
            this.$axios.get("/api/admin/activity/shopList",{params:params}).then(res => {
                if(res.data.code == 0){
                    //console.log(res.data,'data')
                    this.cardInfo = res.data.activity_info
                    //console.log(this.$route.params)
                    //this.url = "/api/admin/coupon/shopList?coupon_code="+this.$route.params.coupon_code
                    //console.log(this.cardInfo,'this.cardInfo')
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
    height:100px;
    padding-top:20px;
    background-color: #f73c3c;
    border-radius:6px;
    
}
.shop-card p{
    width:100%;
    text-align: center;
    
    margin-bottom:20px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
}

</style>


