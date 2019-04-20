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
                <el-tab-pane label="银行卡" name="bankCard"></el-tab-pane>
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
                                    <div class="hd">法人代表：</div>
                                    <div class="bd">{{info.shop_corporation}}</div>
                                </div>
                                <div class="item">
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
                                    <div class="bd">{{info.shop_is_use===1?'启用':'不启用'}}</div>
                                </div>

                                <div class="item">
                                    <div class="hd">加盟时间：</div>
                                    <div class="bd">{{info.shop_ctime}}</div>
                                </div>

                                <div class="item">
                                    <div class="hd">公司地址：</div>
                                    <div class="bd">{{info.shop_address}}</div>
                                </div>

                                <div class="item">
                                    <div class="hd">营业执照号：</div>
                                    <div class="bd">{{info.shop_licence_num}}</div>
                                </div>

                                <div class="item">
                                    <div class="hd">营业执照：</div>
                                    <div class="bd">
                                        <img :src="info.shop_licence_pic" width="200">
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="hd">门店环境图：</div>
                                    <div class="bd">
                                        <img v-for="item in info.shop_environment" :src="item" :key="item" width="200">
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
                                    <div class="bd">{{info.shop_ctime}}</div>
                                  </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <div class="page-column"  v-if="tab=='bankCard'">
                <div class="page-main">

                    <div class="panel ">
            
                        <div class="panel-body width600 ">
                            <el-form :model="ruleForm"  label-width="100px" class="demo-ruleForm" >
                                <el-form-item label="姓名：">
                                    <el-input v-model="ruleForm.user"></el-input>
                                </el-form-item>
                                <el-form-item  label="所属银行：">
                                    <el-select v-model="value" placeholder="请选择所属银行" @change="bankChange">
                                        <el-option
                                            v-for="item in bankLIst"
                                            :key="item.code"
                                            :label="item.name"
                                            :value="item.code">
                                        </el-option>
                                    </el-select>                   
                                </el-form-item>
                                <el-form-item label="银行卡号：">
                                    <el-input v-model="ruleForm.num"></el-input>
                                </el-form-item>

                                <el-form-item label="开户行" >
                                    <el-input v-model="ruleForm.branch"></el-input>
                                </el-form-item>
                                <el-form-item class="margin-auto">
                                    <el-button size="large" type="primary" @click="submit()" >提交</el-button>
                                </el-form-item>

                            

                            
                            </el-form>
                        </div>
                    </div>
                    <div class="panel">
                        
                        <div class="panel-body">
                            <div class="bank-info-box" v-if="flag">
                                <p>{{bankInfo.bank_name}}</p>
                                <p>{{bankInfo.bind_card_nu}}</p>
                                <p class="card-btn"  @click="unBindCard()">解除绑定</p>
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
            flag:false,
            bankLIst:[],
            bankInfo:{},
            value:"",
            id:'',
            shopList:{},
            ruleForm:{
                id:"",
                user:"",//银行卡持有姓名
                num:"",//银行卡号
                branch:"",//开户行
                code:""//银行代码

            }
        }
    },

    beforeRouteUpdate(to, from, next) {

    },
    created() {},
    computed: {

    },
    mounted() {


        console.log(this.$route.params)

        this.id = this.$route.params.id

        this.getData(this.$route.params)

        this.getShopList()
        this.getBankList()//获取银行卡列表
        this.getbankInfo()



    },
    methods: {

        handleTabsClick(e){
            console.log(this.tab)
        },

        getData(params) {

            this.$axios({
                method: 'get',
                url: '/api/admin/shop/detail',
                params: params
            }).then((res) => {

                if(res.data.code ==0){
                    this.info = res.data.data;
                    console.log(this.info,'info')
                    //debugger;
                }else{
                    this.$alert('接口返回错误')
                }
                
            }).catch((error) => {
                this.$alert('接口返回错误'+error)
            });
        },
        submit(){
            this.ruleForm.id = this.id
            console.log(this.ruleForm,'ruleForm')
            this.$axios.post("/api/admin/shop/bindCard",this.ruleForm).then(res => {
                if(res.data.code ==0){
                    this.flag = true
                    this.$alert('绑定成功')
                    this.getbankInfo()
                }else{
                    this.$alert('接口返回错误')
                }
                
            })
        },
        unBindCard(){
            this.$axios({
                method: 'get',
                url: '/api/admin/shop/unBindCard',
                params:{
                    id:this.id
                }
                
            }).then((res) => {

                if(res.data.code ==0){
                    this.flag = false
                    this.$alert('解绑成功')
                }else{
                    this.$alert('接口返回错误')
                }
                
            }).catch((error) => {
                this.$alert('接口返回错误'+error)
            });
        },
        getBankList(){
            this.$axios({
                method: 'get',
                url: '/api/admin/select/bankList'
                
            }).then((res) => {

                if(res.data.code ==0){
                    this.bankLIst = res.data.data
                }else{
                    this.$alert('接口返回错误')
                }
                
            }).catch((error) => {
                this.$alert('接口返回错误'+error)
            });
        },
        bankChange(e){
            console.log(e)
            this.ruleForm.code = e;
        },
        //获取银行卡信息
        getbankInfo(){
            this.$axios({
                method: 'get',
                url: '/api/admin/shop/bindCardInfo',
                params:{
                    id:this.id
                }
                
            }).then((res) => {

                if(res.data.code ==0){
                    this.bankInfo = res.data.data
                    if(res.data.data.length!=0){
                        this.flag = true
                    }
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
  .width600{
      width: 360px;
      margin: 0 auto;
  }
  .bank-info-box{
      width: 200px;
      height: 100rpx;
      padding:20px;
      border-radius:4px;
      border:1px solid #dedede;
      background-color: #dedede;
      margin-right:10px;
      margin-top: 10px;
  }
  .bank-info-box p{
      height:30px;
      line-height: 30px;
      color:#333;
  }
  .card-btn{
      padding:6px 10px;
      border:none;
      background: none;
      background-color: #fff;
      border:1px solid #dedede;
      border-radius:10px;
      color:#333;
      margin-top: 6px;
      width: 40%;
      margin: 0 auto;
      text-align: center;
      height: 26px;
      line-height: 26px;
      font-size: 16px;
      margin-top: 10px;
      cursor: pointer;
  }
  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .fl{
      float: left;
  }
</style>