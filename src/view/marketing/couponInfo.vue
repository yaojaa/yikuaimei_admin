<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
      
            <div class="page-column">
                <div class="page-main">

               

                    <div class="panel">
                        <div class="panel-body">
                            <div class="item-list f14 four-text">
                                <div class="item">
                                    <div class="hd">优惠券标题：</div>
                                    <div class="bd">{{info.coupon_title}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">面值：</div>
                                    <div class="bd">{{formatPrice(info.rules.reduce_price)}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">次数限制：</div>
                                    <div class="bd" v-if="info.limits.limit_total_times==0">

                                         <div>可使用次数：{{info.limits.limit_times}}</div>
                                         <div>可使用频率：不限制</div>
                                    
                                    </div>
                                    <div class="bd" v-if="info.limits.limit_total_times!=0">

                                         <div>可使用次数：每
                                            <span v-if="info.limits.limit_cycle==1">日</span>
                                            <span v-if="info.limits.limit_cycle==2">周</span>
                                            <span v-if="info.limits.limit_cycle==3">月</span>
                                            <span>{{info.limits.limit_times}}次</span>
                                         </div>
                                         <div>可使用频率：限制</div>
                                        
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="hd">最低消费：</div>
                                    <div class="bd">{{formatPrice(info.rules.price)}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">使用范围：</div>
                                    <div class="bd" v-if="info.coupon_range_type==1">通用</div>
                                    <div class="bd" v-if="info.coupon_range_type==2"><span>{{ category_name }}</span></div>
                                    <div class="bd" v-if="info.coupon_range_type==3">
                                        <p>商品</p>
                                        <div v-for="item in goodsInfo" :key="item.good_id">
                                            <img :src="item.good_ico" alt="" width="60px" height="60px">
                                            <span style="margin-left:20px">{{ item.good_name}}</span>
                                        </div>
                                    </div>
                                    <div class="bd" v-if="info.coupon_range_type==4">
                                        <p>服务</p>
                                        <div v-for="item in goodsInfo" :key="item.good_id">
                                            <img :src="item.good_ico" alt="" width="60px" height="60px">
                                            <span style="margin-left:20px">{{ item.good_name}}</span>
                                        </div>
                                    
                                    </div>
                                    <div class="bd" v-if="info.coupon_range_type==5">
                                        <p>虚拟卡券</p>
                                        <div v-for="item in goodsInfo" :key="item.good_id">
                                            <img :src="item.good_ico" alt="" width="60px" height="60px">
                                            <span style="margin-left:20px">{{ item.good_name}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="hd">使用有效期：</div>
                                    <div class="bd" v-if="info.coupon_expire.coupon_expire_start_time">{{info.coupon_expire.coupon_expire_start_time+"--"+info.coupon_expire.coupon_expire_end_time}}</div>
                                    <div class="bd" v-else>领取后{{info.coupon_expire.coupon_expire_day}}天内有效</div>
                                </div>
                                <!-- <div class="item">
                                    <div class="hd">联系电话：</div>
                                    <div class="bd">{{info.shop_phone}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">公司名称：</div>
                                    <div class="bd">{{info.shop_name}}</div>
                                </div>
                                    <div class="item">
                                    <div class="hd">企业类型：</div>
                                    <div class="bd">{{info.shop_type===1?'母店':'子店'}}</div>
                                </div>
                                    <div class="item">
                                    <div class="hd">行业：</div>
                                    <div class="bd">{{info.category_name}}</div>
                                </div>

                                <div class="item">
                                    <div class="hd">归属加盟商：</div>
                                    <div class="bd">{{info.business_name}}</div>
                                </div>

                                <div class="item">
                                    <div class="hd">法人身份证：</div>
                                    <div class="bd">
                                        <img :src="info.shop_sfz_pic_z" width="200">
                                        <img :src="info.shop_sfz_pic_f" width="200">
                                    </div>
                                </div> -->


                            </div>
                        </div>
                    </div>
                    
                  
                </div>



            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
export default {
    name: 'detail',
    data() {
        return {
            breadcrumb: [
                //面包屑
                {
                    name: "营销管理", //名字
                    url: '/marketing/markList'
                },
                {
                    name: "满减/立减优惠券", //名字
                    url: '/marketing/fullReducionCouponList'
                },
                {
                    name: "详情" //名字
                }
            ],
            info:{
                "rules" : {  // 规则
                    "is_full" : 0, // 是否满减  1满减 2立减
                    "price" : 1000,  // 满多少
                    "reduce_price" : 1000  // 减多少
                },
                "limits" : { // 参与限制
                    "limit_cycle" : 1, // 限制周期  1 日 2周 3月
                    "limit_times" : 10, // 周期内限制使用次数
                    "limit_total_times" : 0, // 次数限制 0 不限
                },
                "coupon_expire" : {
                    "coupon_expire_day" : 10,  //固定天数时使用
                    "coupon_expire_start_time" :  "2018-09-10 00:00:00",
                    "coupon_expire_end_time" :  "2018-12-10 00:00:00"
                },
                "coupon_range":{
                    "category_id":1
                }
            },
            categoryList:{},
            category_name:"",
            goodsList:{},
            goodsInfo:{}

        }
    },

    beforeRouteUpdate(to, from, next) {

    },
    created() {
        this.getData(this.$route.params)
        this.getCategoryList()
        this.getGoodsList()
    },
    computed: {

    },
    mounted() {},
    components: {
    BreadCrumb
    },
    methods: {
        formatPrice(price) {
            return (price/100);
        },
        getCategoryList(){
            //获取行业列表
            this.$axios.get("/api/admin/select/categoryList").then(res =>{
            if(res.data.code ==0){
                this.categoryList = res.data.data;

                this.categoryList.forEach((item) => {
                   
                    if (this.info.coupon_range.category_id== item.category_id) {
                        this.category_name = item.category_name
                        console.log(this.category_name,'this.info')
                        return this.category_name
                        // this.checkedGoods = item;
                        // console.log(this.checkedGoods,'this.checkedGoods')
                        // this.goodShow = true
                    }
                })
                
            }

            })
            
        },
        getGoodsList(){
            this.$axios.get("/api/admin/select/goodsList").then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    this.goodsList.forEach((item) => {
                   
                        if (this.info.coupon_range.goods_id== item.good_id) {
                            this.goodsInfo = item
                            
                        }
                    })
                }else{
                    this.$message({ message: res.data.msg, type: 'warning' });
                }
            })
        },
        getData(params) {
            //console.log(params,'params')
            this.$axios({
                method: 'get',
                url: '/api/admin/coupon/info',
                params: params
            }).then((res) => {

                if(res.data.code ==0){
                    this.info = res.data.data;
                    // this.category_id = res.data.data.coupon_range.category_id
                    //console.log("category_id",this.category_id)
                    //debugger;
                }else{
                    this.$alert('接口返回错误')
                }
                
            }).catch((error) => {
                this.$alert('接口返回错误'+error)
            });
        }
    }
}
</script>
<style scoped>
  .item-list.four-text .hd{
    width: 6em;
    text-align: right
  }
</style>