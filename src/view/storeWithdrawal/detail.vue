<template>
    <div class="page">
        <div class="page-header">
             <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
            <el-tabs v-model="tab" @tab-click="handleTabsClick" class="primary-tab">
                <el-tab-pane label="基本信息" name="info"></el-tab-pane>
            </el-tabs>

            
           
            <div class="page-column"  v-if="tab=='info'">
                <div class="page-main">

                  <div class="panel-status text-justify">
                <div><span>状态：</span><span class="f18 bold">
                    {{['审核不通过','待审核','审核通过',][info.shop_withdraw_status]}}

                </span></div>
                <div v-if="info.shop_withdraw_status == 1">
                   <el-button @click="reject" size="mini" plain >拒绝</el-button>
                    <el-button  @click="agree" size="mini" type="primary">同意</el-button>
                </div>
            </div>


                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title bold">基本信息</h3>
                        </div>
                        <div class="panel-body">
                            <div class="item-list f14 four-text">
                                <div class="item">
                                    <div class="hd">审核人名称：</div>
                                    <div class="bd">{{info.admin_name}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">提现金额：</div>
                                    <div class="bd">{{formatPrice(info.shop_withdraw_amount)}}元</div>
                                </div>
                                
                                <div class="item">
                                    <div class="hd">提现时间：</div>
                                    <div class="bd">{{info.shop_withdraw_ctime}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">门店名称：</div>
                                    <div class="bd">{{info.shop_name}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">门店地址：</div>
                                    <div class="bd">{{info.shop_address}}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                  
                </div>

                <!-- <div class="page-side">
                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title bold">审核记录</h3>
                        </div>
                        <div class="panel-body">
                              <div class="item-list f14" >
                                  <div class="item" v-if="info.review_status ==1">
                                    <div class="bd bold">待审核</div>
                                  </div>

                                  <div v-else>
                                        <div class="item">
                                    <div class="hd">处理人：</div>
                                    <div class="bd">{{info.user_name}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">处理时间：</div>
                                    <div class="bd">{{info.review_time}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">备注：</div>
                                    <div class="bd">{{info.reason}}</div>
                                </div>
                                  </div>
                              
                            </div>
                        </div>
                    </div>
                </div> -->

            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
export default {
    name: 'detail',

    components: {
        BreadCrumb
    },
    inject:['reload'],

    data() {
        return {
            breadcrumb: [
                //面包屑
                {
                    name: "审核管理"
                },
                {
                    name: "门店提现",
                    url: "/storeWithdrawal/list"
                },
                {
                    name: "详情",
                    url: "/storeWithdrawal/detail"
                }

            ],
            tab: 'info',
            info: {
                "shop_withdraw_amount":"1",

                "shop_info": {
                    "shop_name": "美皮肤青年路店3", // 门店名称
                    "shop_address": "公司地址" // 门店地址
                }
            },
            id:''
            // shopList:{}
        }
    },

    beforeRouteUpdate(to, from, next) {},
    created() {},
    computed: {

    },
    mounted() {
        console.log(this.$route.params,'params')


        this.id = this.$route.params.shop_withdraw_id

        this.getData(this.$route.params)




    },
    methods: {

        handleTabsClick(e){
            console.log(this.tab)
        },

        getData(params) {

            this.$axios({
                method: 'get',
                url: '/api/admin/shop/withdrawInfo',
                params: params
            }).then((res) => {

                if(res.data.code ==0){
                    this.info = res.data.data
                }else{
                    this.$alert('接口返回错误')
                }
                
            }).catch((error) => {
                this.$alert('接口返回错误'+error)
            });
        },

                reject(){
    
                    var rejectPams = {
                        "type":2,
                        "shop_withdraw_id":this.id

                    }
                    this.$axios.post("/api/admin/shop/withdrawReview",rejectPams).then(res => {
                        if(res.data.code == 0){
                             this.reload();
                            
                        }else{
                            this.$alert(res.data.msg)
                        }
                    }).catch((e)=>{

                        this.$alert('操作失败'+e)

                    })

                // this.$axios({
                //     method: 'post',
                //     url: '/api/admin/shop/withdrawReview',
                //     params: {
                //         shop_withdraw_id:this.id,
                //         type:2
                //     }
                // }).then((res) => {

                //     if(res.data.code ==0){
                //         this.reload();
                //         // this.shopList = res.data.data
                //     }else{
                //         this.$alert('接口返回错误')
                //     }
                    
                // }).catch((error) => {
                //     this.$alert('接口返回错误'+error)
                // });
            },



       

        agree(){
            var agreePams = {
                        "type":1,
                        "shop_withdraw_id":this.id

                    }
                    this.$axios.post("/api/admin/shop/withdrawReview",agreePams).then(res => {
                        if(res.data.code == 0){
                             this.reload();
                            
                        }else{
                            this.$alert(res.data.msg)
                        }
                    }).catch((e)=>{

                        this.$alert('操作失败'+e)

                    })

        },



        formatPrice(price) {
            return (price / 100).toFixed(2);
        }
    }
}
</script>
<style scoped>
  .item-list.four-text .hd{
    width: 6em
  }
</style>



