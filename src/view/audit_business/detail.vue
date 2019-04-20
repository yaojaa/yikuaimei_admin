<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
            <el-tabs v-model="tab" @tab-click="handleTabsClick" class="primary-tab">
                <el-tab-pane label="基本信息" name="info"></el-tab-pane>
                <el-tab-pane label="拥有门店" name="shop"></el-tab-pane>
            </el-tabs>

            <div class="page-column"  v-if="tab=='shop'">
                <div class="p-xl">  
                  <el-table
                  :data="shopList"
                  style="width: 100%">
                  <el-table-column
                    prop="shop_name"
                    label="门店"
                    width="280">
                  </el-table-column>
                  <el-table-column
                    prop="shop_ctime"
                    label="创建时间"
                    width="180">
                  </el-table-column>

                      <el-table-column
                    prop="shop_service_phone"
                    label="类型">
                  </el-table-column>


                  <el-table-column
                    prop="shop_service_phone"
                    label="店长">
                  </el-table-column>

                     <el-table-column
                    prop="shop_service_phone"
                    label="手机号">
                  </el-table-column>


                </el-table>
                </div> 

            </div>
           
            <div class="page-column"  v-if="tab=='info'">
                <div class="page-main">

                     <div class="panel-status text-justify">
                <div><span>状态：</span><span class="f18 bold">
                    {{['','审核中','审核通过','审核不通过'][info.review_status]}}

                </span></div>
                <div v-if="info.review_status == 1">
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
                                    <div class="hd">法人代表：</div>
                                    <div class="bd">{{info.business_corporation}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">联系电话：</div>
                                    <div class="bd">{{info.business_phone}}</div>
                                </div>
                                <div class="item">
                                    <div class="hd">公司名称：</div>
                                    <div class="bd">{{info.business_name}}</div>
                                </div>
                                    <div class="item">
                                    <div class="hd">加盟商类型：</div>
                                    <div class="bd">{{info.business_type===1?'加盟':'非加盟'}}</div>
                                </div>
                                <!-- <div class="item">
                                    <div class="hd">行业：</div>
                                    <div class="bd">{{info.category_name}}</div>
                                </div> -->

                                <div class="item">
                                    <div class="hd">推荐人：</div>
                                    <div class="bd">{{info.referee_phone}}</div>
                                </div>

                                   <div class="item">
                                    <div class="hd">法人身份证：</div>
                                    <div class="bd">

                                        <img :src="info.business_sfz_pic_z" width="200">

                                         <img :src="info.business_sfz_pic_f" width="200">
                                        

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title bold">公司信息</h3>
                        </div>
                        <div class="panel-body">
                            <div class="item-list f14 four-text">
                                <!-- <div class="item">
                                    <div class="hd">经营状态：</div>
                                    <div class="bd">在业
                                    </div>
                                </div> -->

                                <div class="item">
                                    <div class="hd">加盟时间：</div>
                                    <div class="bd">{{info.create_time}}</div>
                                </div>

                                <!-- <div class="item">
                                    <div class="hd">加盟费：</div>
                                    <div class="bd">{{info.business_join_money}}</div>
                                </div> -->

                                <div class="item">
                                    <div class="hd">公司地址：</div>
                                    <div class="bd">{{info.business_company_adress}}</div>
                                </div>


                                <div class="item">
                                    <div class="hd">营业执照号：</div>
                                    <div class="bd">{{info.business_licence_num}}</div>
                                </div>

                                <div class="item">
                                    <div class="hd">营业执照：</div>
                                    <div class="bd">
                                        <img :src="info.business_licence_pic" width="200">

                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                  
                </div>

                 <div class="page-side">
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
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
export default {
    name: 'detail',

    inject:['reload'],

    data() {
        return {
            breadcrumb: [
                //面包屑
                {
                    name: "审核管理"
                },
                {
                    name: "加盟商列表",
                    url: "/audit/business"
                },
                {
                    name: "加盟商详情",
                    url: "/audit/business/detail"
                }
            ],
            tab: 'info',
            info: {},
            id:'',
            shopList:{}
        }
    },

    beforeRouteUpdate(to, from, next) {

    },
    components: {
        BreadCrumb
    },
    created() {},
    computed: {

    },
    mounted() {


        console.log(this.$route.params)

        this.id = this.$route.params.id

        this.getData(this.$route.params)

        this.getShopList()



    },
    methods: {

        handleTabsClick(e){
            console.log(this.tab)
        },

        agree(){
          this.$router.push('/business/alliance_add?review='+this.id)
        },

        getData(params) {

            this.$axios({
                method: 'get',
                url: '/api/admin/business/reviewDetail',
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

        getShopList(){


            this.$axios({
                method: 'get',
                url: '/api/admin/business/getBusinessShop',
                params: {
                    id:this.id,
                    page_size:100
                }
            }).then((res) => {

                if(res.data.code ==0){
                    this.shopList = res.data.data
                }else{
                    this.$alert('接口返回错误')
                }
                
            }).catch((error) => {
                this.$alert('接口返回错误'+error)
            });
        },

        formatPrice(price) {
            return (price / 100).toFixed(2);
        },

        reject(){

        this.$prompt('请输入原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {

             this.$axios({
                method: 'post',
                url: '/api/admin/business/reviewFail',
                params: {
                    id:this.id,
                    reason:value
                }
            }).then((res) => {

                if(res.data.code ==0){
                    this.reload();
                    this.shopList = res.data.data
                }else{
                    this.$alert('接口返回错误')
                }
                
            }).catch((error) => {
                this.$alert('接口返回错误'+error)
            });

        }).catch(() => {});

        }
    }
}
</script>
<style scoped>
  .item-list.four-text .hd{
    width: 6em
  }
</style>