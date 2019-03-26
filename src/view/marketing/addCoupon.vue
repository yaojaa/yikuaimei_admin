<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>营销管理/满减立减优惠券</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <el-form :model="ruleForm" :rules="rules"  label-width="120px" class="demo-ruleForm">

                    <el-form-item label="优惠券标题:" prop="coupon_title">
                        <el-col :span="12">
                            <el-input v-model="ruleForm.coupon_title"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="面值:">
                        <el-col :span="12">
                            <el-input v-model="ruleForm.rules.reduce_price"></el-input>
                        </el-col>
                    </el-form-item>

                     <el-form-item label="可使用次数:">
                         <el-col :span="6">
                            <el-input v-model="ruleForm.limits.limit_total_times"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="可使用频率:">
                       <el-col :span="6">
                        <!-- 如果选择不限制 那么 limit_times 就是0  -->
                        <el-radio-group  v-model="limitsStatus">
                            <el-radio label="0">不限</el-radio> 
                            <el-radio label="1">限制</el-radio>
                        </el-radio-group>
                       </el-col>
                       <el-col :span="4">
                           <span>每</span>
                            <el-select v-model="ruleForm.limits.limit_cycle" placeholder="请选择" style="width:100px">
                                <el-option label="日" value="1"></el-option>
                                <el-option label="周" value="2"></el-option>
                                <el-option label="月" value="3"></el-option>
                            </el-select>
                       </el-col>
                       <el-col :span="6">
                           <el-input v-model="ruleForm.limits.limit_times" style="width:100px"></el-input><span>次</span>
                       </el-col>
                    </el-form-item>

                    <el-form-item label="最低消费:">
                       <el-col :span="6">
                        <!-- 如果选择不限制 那么 limit_times 就是0  -->
                        <el-radio-group @change="limitsChange" v-model="ruleForm.rules.is_full">
                            <el-radio label="0">无门槛</el-radio> 
                            <el-radio label="1">满</el-radio>
                        </el-radio-group>
                       </el-col>
                       
                       <el-col :span="6">
                           <el-input v-model="ruleForm.rules.price" style="width:100px"></el-input><span>元可用</span>
                       </el-col>
                       
                    </el-form-item>

                    <el-form-item label="使用范围:" >
                        <el-radio-group v-model="ruleForm.coupon_range_type" @change="handleChange">
                            <el-radio label="1">通用</el-radio>
                            <el-radio label="2">指定行业</el-radio>
                            <el-radio label="3">指定商品</el-radio>
                            <el-radio label="4">指定服务</el-radio>
                            <el-radio label="5">指定虚拟商品</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动专属:">
                       <el-col :span="6">
                        <el-radio-group  v-model="ruleForm.coupon_in_shop">
                            <el-radio label="1">否</el-radio> 
                            <el-radio label="2">是</el-radio>
                        </el-radio-group>
                       </el-col>
                       
                       
                       
                    </el-form-item>
    
                    <el-form-item label="使用有效期:">
                        <el-col :span="18">
                            <el-radio-group v-model="ruleForm.date_expire_type" @change="dataChange">
                                
                                <el-radio v-model="ruleForm.coupon_expire_type" label="1">固定日期
                                    <el-date-picker
                                        v-model="dateArray"
                                        @change="dataArrChange"
                                        type="datetimerange"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-radio>
                                <div class="heigth20px"></div>
                                <el-radio label="2" v-model="ruleForm.coupon_expire_type">领取当日开始
                                    <el-input v-model="ruleForm.coupon_expire.coupon_expire_day" @blur="dateDaysChange"></el-input>
                                    天内有效
                                </el-radio>
                                
                                
                        </el-radio-group>
                    </el-col>
                    </el-form-item>
                    <!-- coupon_in_shop -->
                    
                    <div>
                        <div v-if="ruleForm.coupon_range_type==2" class="pd-left">
                            <span>已选:{{industry_name}}</span>
                            
                        </div>
                        <div v-if="ruleForm.coupon_range_type==3" class="pd-left">
                            <span>已选:{{checkedGoods.good_name}} <img v-if="checkedGoods.good_ico" :src="checkedGoods.good_ico" width="40px" height="40px"></span>
                        </div>
                        <div v-if="ruleForm.coupon_range_type==4">
                            <span>已选:{{checkedGoods.good_name}} <img v-if="checkedGoods.good_ico" :src="checkedGoods.good_ico" width="40px" height="40px"></span>
                        </div>
                         <div v-if="ruleForm.coupon_range_type==5">
                            <span>已选:{{checkedGoods.good_name}} <img v-if="checkedGoods.good_ico" :src="checkedGoods.good_ico" width="40px" height="40px"></span>
                        </div>
                    </div>

                    <!-- 指定行业弹窗 -->
                    <el-dialog title="行业列表" :visible.sync="industryVisible">
                        <el-form-item label="行业" >
                            <el-select v-model="industry_id" placeholder="请选择所属行业分类" >
                                <el-option v-for="item in industryForm" :label="item.category_name" :value="item.category_id" :key="`${item.category_id}category_id`" />
                            </el-select>                   
                        </el-form-item>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="industrySure">确 定</el-button>
                        </div>
                    </el-dialog>

                    <!-- 指定商品弹窗 -->
                    <el-dialog title="选择指定商品" :visible.sync="goodsVisible">
                        <el-form-item>
                            <div v-if="goodShow" class="good_show">
                                <el-radio v-model="checkedGoodsId" :label="checkedGoods.good_id">{{checkedGoods.good_name}}<img :src="checkedGoods.good_ico" width="30px" height="30px"></el-radio>
                            </div>
                            <el-col :span="12">
                                <el-input v-model="goods_name" placeholder="搜索"></el-input>
                            </el-col>
                           
                            <el-col :span="5">
                                <el-button type="primary" @click="goodsSearch">查询</el-button>
                            </el-col>
                        </el-form-item>

                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId">
                            <el-tab-pane v-for="item in industryForm" :label="item.category_name"  :value="item.category_id" :key="`${item.category_id}category_id`">
                                <el-radio v-model="radioGoodsId" :label="item.good_id" :key="item.good_id" v-for="item in goodsList">{{item.good_name}}<img :src="item.good_ico" width="30px" height="30px"></el-radio>
                            </el-tab-pane>
                        </el-tabs>
                        
                        
                        <div slot="footer" class="dialog-footer">
                            <!-- <el-button @click="goodsCancal">取 消</el-button> -->
                            <el-button type="primary" @click="goodsSure">确 定</el-button>
                        </div> 
                    </el-dialog>
                    <!-- 指定服务弹窗列表  -->
                    <el-dialog title="选择指定服务" :visible.sync="serviceVisible">
                        <el-form-item>
                             <div v-if="goodShow" class="good_show">
                                <el-radio v-model="checkedGoodsId" :label="checkedGoods.good_id">{{checkedGoods.good_name}}<img :src="checkedGoods.good_ico" width="30px" height="30px"></el-radio>
                            </div>
                             <el-col :span="12">
                                <el-input v-model="goods_name" placeholder="搜索"></el-input>
                            </el-col> 
                           
                            <el-col :span="5">
                                <el-button type="primary" @click="goodsSearch">查询</el-button>
                            </el-col>
                        </el-form-item>

                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId">
                            <el-tab-pane v-for="item in industryForm" :label="item.category_name"  :value="item.category_id" :key="`${item.category_id}category_id`">
                                <el-radio v-model="radioServiceId" :label="item.good_id" :key="item.good_id" v-for="item in goodsList">{{item.good_name}}<img :src="item.good_ico" width="30px" height="30px"></el-radio>
                            </el-tab-pane>
                        </el-tabs>
                        
                        
                        <div slot="footer" class="dialog-footer">
                            
                            <el-button type="primary" @click="serviceSure">确 定</el-button>
                        </div> 
                    </el-dialog>
                    
                <!-- 虚拟商品弹窗列表  -->
                <el-dialog title="选择虚拟商品" :visible.sync="inventedVisible">
                        <el-form-item>
                             <div v-if="goodShow" class="good_show">
                                <el-radio v-model="checkedGoodsId" :label="checkedGoods.good_id">{{checkedGoods.good_name}}<img :src="checkedGoods.good_ico" width="30px" height="30px"></el-radio>
                            </div>
                             <el-col :span="12">
                                <el-input v-model="goods_name" placeholder="搜索"></el-input>
                            </el-col> 
                           
                            <el-col :span="5">
                                <el-button type="primary" @click="goodsSearch">查询</el-button>
                            </el-col>
                        </el-form-item>

                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId">
                            <el-tab-pane v-for="item in industryForm" :label="item.category_name"  :value="item.category_id" :key="`${item.category_id}category_id`">
                                <el-radio v-model="radioServiceId" :label="item.good_id" :key="item.good_id" v-for="item in goodsList">{{item.good_name}}<img :src="item.good_ico" width="30px" height="30px"></el-radio>
                            </el-tab-pane>
                        </el-tabs>
                        
                        
                        <div slot="footer" class="dialog-footer">
                            
                            <el-button type="primary" @click="inventedSure">确 定</el-button>
                        </div> 
                    </el-dialog>





                    <el-form-item class="margin-auto">
                        <el-button size="large" type="primary" @click="submit()" >提交</el-button>
                    </el-form-item>
               </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
export default {
  name: "training",
  data() {
    return {
        ruleForm:{
            "coupon_title" : "",//优惠券标题
            "rules" : {  // 规则
                "is_full" : "1", // 是否满减  
                "price" : "",  // 满多少
                "reduce_price" : "100"  // 减多少
            },
            
            "coupon_in_shop" : "1",

            "limits" : { // 参与限制
                "limit_cycle" : "1", // 限制周期  1 日 2周 3月
                "limit_times" : "", // 周期内限制使用次数
                "limit_total_times" : "0", // 次数限制 0 不限
            },
            "coupon_range" : { //弹窗列表选择
                "category_id" : 1,
                "goods_id" :  0
            },
            "coupon_expire_type":"1",
            "coupon_in_shop":0,
            "coupon_range_type":"0",
            "date_expire_type":0,
            "coupon_expire" : {
                "coupon_expire_day" : 10,  //固定天数时使用
                "coupon_expire_start_time" :  "",
                "coupon_expire_end_time" :  ""
            }
            
        },
        rules: {
            coupon_title: [
            { required: true, message: '优惠券标题', trigger: 'blur' },
            ],
            coupon_range_type: [
            { required: true, message: '请选择使用范围', trigger: 'change' }
            ]
            
        },
        industryForm:{},
        goodsList:[],
        "formLabelWidth":"120px",
        "industryVisible":false,//指定行业显示与否
        "goodsVisible":false, //指定商品显示与否
        "serviceVisible":false, //服务弹窗显示与否
        "inventedVisible":false, //虚拟商品弹窗显示与否
        "industry_id":"",
        "goods_name":"",
        "tabPosition":"left",
        "activeId":"",
        "radioGoodsId":"",
        "radioServiceId":"",
        checkedGoods:{},//以选中商品
        "checkedGoodsId":"",//已经选中的商品id
        "goodShow":false, //选中商品是否显示
        "industry_name":"", //选中行业的名称
        "selectRadioId":"", //当前页面选中的radio的id
        dateArray:[], // 时间选择器数组
        "dateDays":"", //领取时间（固定天数）
        "limitsStatus":"0", //限制频率
        
        
        
       


    };
  },
  methods:{
      //次数限制功能
      limitsChange(e){
          if(e==0){
              this.ruleForm.limits.limit_cycle = 1
              this.ruleForm.limits.limit_times = 0

          }
          if(e==1){
              //限制使用周期
          }

          
      },
      handleChange(e){
        this.selectRadioId = e;
        console.log(e,'eeee')
        //   var _this = this;
        //   console.log(this,'this')

                        
          
        switch (e)
        {
            case "2": //行业  
              this.industryVisible = true 
            break;
            case "3": //商品
               this.goodsVisible = true  //商品弹窗
            break;
            case "4": //服务
                this.serviceVisible = true  //服务弹窗
            break;
            case "5": //虚拟商品
                this.inventedVisible = true
            break;
            
                //虚拟商品弹窗
            
        }
      },
      dataChange(e){
          this.ruleForm.coupon_expire_type = e;
          
      },
      dataArrChange(e){
         
          this.ruleForm.coupon_expire.coupon_expire_start_time = this.dateArray[0];
          this.ruleForm.coupon_expire.coupon_expire_end_time = this.dateArray[1];
      },
      dateDaysChange(){
         
          this.ruleForm.coupon_expire.coupon_expire_start_time = "";
          this.ruleForm.coupon_expire.coupon_expire_end_time = "";
      },
      industrySure(){
        //行业弹窗确定
        if(this.industry_id==""){
            this.$alert('必须选择行业')
        }else{
            console.log(this.industryForm,'industryForm')
            console.log(this.industry_id,'industry_id')
            this.ruleForm.coupon_range.category_id = this.industry_id;

            this.industryVisible = false;
            
            this.industryForm.forEach((item) => {
                if (item.category_id == this.industry_id) {
                    this.industry_name = item.category_name
                    console.log(this.industry_name,'this.industry_name')
                    // this.checkedGoods = item;
                    // console.log(this.checkedGoods,'this.checkedGoods')
                    // this.goodShow = true
                }
            })

        }
        
      },
      goodsSure(){
          //商品弹窗确定
          if(this.checkedGoodsId==""){
              console.log(this.checkedGoodsId,'checkedGoodsId')
              this.$alert('必须选择商品')
          }else{
              console.log(this.checkedGoodsId,'checkedGoodsId');
              this.ruleForm.coupon_range.goods_id = this.checkedGoodsId;
              this.goodsVisible = false;
          }
      },
      inventedSure(){
          //虚拟商品确定
          if(this.checkedGoodsId==""){
              console.log(this.checkedGoodsId,'checkedGoodsId')
              this.$alert('必须选择虚拟商品')
          }else{
              console.log(this.checkedGoodsId,'checkedGoodsId');
              this.ruleForm.coupon_range.goods_id = this.checkedGoodsId;
              this.industryVisible = false;
          }
      },
      serviceSure(){
          if(this.checkedGoodsId==""){
              console.log(this.checkedGoodsId,'checkedGoodsId')
              this.$alert('必须选择服务')
          }else{
              console.log(this.checkedGoodsId,'checkedGoodsId');
              this.ruleForm.coupon_range.goods_id = this.checkedGoodsId;
              this.serviceVisible = false;
          }
      },
      goodsSearch(){
        //商品搜索
        var goodName = this.goods_name;
        this.$axios.get("/api/admin/select/goodsList?good_name="+goodName).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    this.goods_name = "" //查询完毕清空input
                }else{
                    this.$message({ message: res.data.msg, type: 'warning' });
                }
            })

      },
    submit(){
        console.log(this.ruleForm,'this.ruleForm');
        this.ruleForm.rules.reduce_price = this.ruleForm.rules.reduce_price*100;
        this.ruleForm.rules.price = this.ruleForm.rules.price*100;
            //var parms = this.ruleForm;
            this.$axios.post("/api/admin/coupon/addReduce", this.ruleForm).then(res => {
                if(res.data.code == 0){
                    this.$alert('添加成功！')
                    
                    this.$router.push('/marketing/fullReducionCouponList')
                }else{
                    this.$alert(res.data.msg)
                }
            }).catch((e)=>{

                this.$alert('操作失败'+e)

            })
      },
      getCategoryList(){
          //获取行业列表
        this.$axios.get("/api/admin/select/categoryList").then(res =>{
          if(res.data.code ==0){
            this.industryForm = res.data.data;
            console.log(this.industryForm,'industryForm')
          }

        })
          
      }
    //   getServiceLIst(){
    //       //获取服务列表
    //       this.$axios.get("/api/admin/select/goodsList?good_type=1").then(res =>{
    //       if(res.data.code ==0){
    //         // this.industryForm = res.data.data;
    //         console.log(res.data.data,'getServiceLIst')
    //       }

    //     })
          
    //   }
    },
    watch:{
        "activeId":function(val){
            console.log(this,'this')
            // var parms ={
            //     "good_type":2,
            //     "category_id":this.industryForm[val].category_id
            // }
            // console.log(parms,'parms')
            //观察tab选项卡改变调用接口
            this.$axios.get("/api/admin/select/goodsList?category_id="+this.industryForm[val].category_id+"&good_type"+this.selectRadioId).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    console.log(this.goodsList,'goodsList')
                    

                }
            })
        },
        radioGoodsId:function(event){
            //指定商品
            this.goodsList.forEach((item) => {
                if (item.good_id == event) {
                    this.checkedGoods = item;
                    this.checkedGoodsId = item.good_id
                    console.log(this.checkedGoods,'checkedGoods')
                    
                    this.goodShow = true
                }
            })
        },
        radioServiceId:function(event){
            //指定服务
            this.goodsList.forEach((item) => {
                if (item.good_id == event) {
                    this.checkedGoods = item;
                    this.checkedGoodsId = item.good_id
                    console.log(this.checkedGoods,'checkedGoods')
                    
                    this.goodShow = true
                }
            })
        }
},


  mounted() {},
  components: {
    BreadCrumb
  },

    created() {
        this.getCategoryList(); //获取行业列表
        //this.getServiceLIst(); //获取服务列表

        //编辑优惠券
        let params = this.$route.params;
        if (Object.keys(params).length) {
            this.$axios.get("/api/admin/coupon/info",{params:params}).then(res => {
                if(res.data.code ==0){
                    this.ruleForm = res.data.data;
                    this.dateArray[0] = this.ruleForm.coupon_expire.coupon_expire_start_time 
                    this.dateArray[1] = this.ruleForm.coupon_expire.coupon_expire_end_time 
                }else{
                    this.$alert('接口返回错误')
                }
                
            })
        }
       

    },
  computed: {}
};
</script>

<style scoped>

.page-content{
    padding:30px 40px;
    background-color: #fff;
}
.margin-auto{
    margin-left: 25%;
    margin-top: 25px;
}
.good_show{
    margin-bottom:20px;
}
.pd-left{
    padding-left:50px;
}
.heigth20px{
    height:20px;
    width: 100%;

}
</style>


