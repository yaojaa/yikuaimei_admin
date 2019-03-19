<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>加盟商</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
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
                    {{['删除','正常'][info.business_status]}}
                </span></div>
             <!--    <div>
                    <el-button size="mini" plain @click="">拒绝退款</el-button>
                    <el-button size="mini" type="primary" @click="">同意退款</el-button>
                </div> -->
            </div>

                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title bold">基本信息</h3>
                        </div>
                        <div class="panel-body">
                            <div class="item-list f14 four-text">
                                
                                <div class="item">
                                    <div class="hd">加盟商logo：</div>
                                    <div class="bd" v-if="info.business_logo">
                                        <img :src="info.business_logo" width="200">
                                    </div>
                                    <div class="bd" v-else>
                                        暂无logo
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="hd">法人代表：</div>
                                    <div class="bd">{{info.business_corporation}}

                                        拥有{{info.shop_total}}家门店
                                    </div>
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
                                    <div class="hd">企业类型：</div>
                                    <div class="bd">{{info.business_type===1?'加盟':'非加盟'}}</div>
                                </div>
                                    <div class="item">
                                    <div class="hd">行业：</div>
                                    <div class="bd">{{info.category_name}}</div>
                                </div>

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
                                <div class="item">
                                    <div class="hd">经营状态：</div>
                                    <div class="bd">{{info.business_is_use===1?'启用':'不启用'}}</div>
                                </div>

                                <div class="item">
                                    <div class="hd">加盟时间：</div>
                                    <div class="bd">{{info.business_ctime}}</div>
                                </div>

                                <div class="item">
                                    <div class="hd">加盟费：</div>
                                    <div class="bd">{{info.business_join_money}}</div>
                                </div>

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
                                  <div class="item">
                                   <div class="hd">审核人：</div>
                                    <div class="bd">{{info.admin_user_name}}</div>
                                  </div>
                                  <div class="item">
                                   <div class="hd">审核时间：</div>
                                    <div class="bd">{{info.business_ctime}}</div>
                                  </div>
                              <!--   <div class="item">
                                    <div class="hd">处理人：</div>
                                    <div class="bd">孙妮雅</div>
                                </div>
                                <div class="item">
                                    <div class="hd">处理时间：</div>
                                    <div class="bd">2018-11-12  12:27:53</div>
                                </div>
                                <div class="item">
                                    <div class="hd">备注：</div>
                                    <div class="bd">已和客户沟通，确定过敏。</div>
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
export default {
    name: 'detail',

    components: {},

    data() {
        return {
            tab: 'info',
            info: {},
            id:'',
            shopList:{}
        }
    },

    beforeRouteUpdate(to, from, next) {},
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

        getData(params) {

            this.$axios({
                method: 'get',
                url: '/api/admin/business/getOneById',
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
        }
    }
}
</script>
<style scoped>
  .item-list.four-text .hd{
    width: 6em
  }
</style>