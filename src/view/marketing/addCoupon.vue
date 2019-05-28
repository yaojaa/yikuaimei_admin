<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel coupon-apnel">
                <el-form :model="ruleForm" :rules="rules"  label-width="120px" class="demo-ruleForm">

                    <el-form-item label="优惠券标题:" prop="coupon_title">
                        <el-col :span="6">
                            <el-input v-model="ruleForm.coupon_title"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="面值:">
                        <el-col :span="2">
                            <el-input v-model="ruleForm.rules.reduce_price"></el-input>
                        </el-col>
                    </el-form-item>

                     <el-form-item label="可使用次数:">
                         <el-col :span="2">
                            <el-input v-model="ruleForm.limits.limit_total_times"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="可使用频率:">
                       <el-col :span="4">
                        <!-- 如果选择不限制 那么 limit_times 就是0  -->
                        <el-radio-group  v-model="limitsStatus">
                            <el-radio :label="0">不限</el-radio> 
                            <el-radio :label="1">限制</el-radio>
                        </el-radio-group>
                       </el-col>
                       <el-col :span="4" style="margin-left:-20px">
                           <span>每</span>
                            <el-select v-model="ruleForm.limits.limit_cycle" placeholder="请选择" style="width:60px">
                                <el-option label="日" value="1"></el-option>
                                <el-option label="周" value="2"></el-option>
                                <el-option label="月" value="3"></el-option>
                            </el-select>
                       </el-col>
                       <el-col :span="4" style="margin-left:-80px">
                           <el-input v-model="ruleForm.limits.limit_times" style="width:60px"></el-input><span>次</span>
                       </el-col>
                       
                    </el-form-item>

                    <el-form-item label="最低消费:">
                       <el-col :span="5">
                        <!-- 如果选择不限制 那么 limit_times 就是0  -->
                        <el-radio-group  v-model="ruleForm.rules.is_full">
                            <el-radio :label="0">无门槛</el-radio> 
                            <el-radio :label="1">满</el-radio>
                        </el-radio-group>
                       </el-col>
                       
                       <el-col :span="5" style="margin-left:-60px">
                           <el-input v-model="ruleForm.rules.price" style="width:60px"></el-input><span>元可用</span>
                       </el-col>
                       
                    </el-form-item>

                    <el-form-item label="使用范围:" >
                        <el-radio-group v-model="ruleForm.coupon_range_type" @change="handleChange">
                            <el-radio :label="1">通用</el-radio>
                            <el-radio :label="2">指定行业</el-radio>
                            <el-radio :label="3">指定服务</el-radio>
                            <el-radio :label="4">指定商品</el-radio>
                            <el-radio :label="5">指定虚拟商品</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="使用规则:">
                        <el-col :span="6">
                            <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="ruleForm.coupon_desc"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="活动专属:">
                       <el-col :span="6">
                        <el-radio-group  v-model="ruleForm.coupon_in_shop">
                            <el-radio :label="1">否</el-radio> 
                            <el-radio :label="2">是</el-radio>
                        </el-radio-group>
                       </el-col>
                       
                       
                       
                    </el-form-item>
    
                    <el-form-item label="使用有效期:">
                        <el-col :span="24">
                            <el-radio-group v-model="ruleForm.coupon_expire_type" @change="dataChange">
                                
                                <el-radio  :label="1">固定日期
                                    <!-- <el-date-picker
                                        v-model="dateArray"
                                        default-time="dateArray"
                                        @change="dataArrChange"
                                        type="datetimerange"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker> -->
                                    <el-date-picker
                                        v-model="dataStart"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        @change="dataStartChange"
                                        align="right"
                                        :picker-options="pickerOptions">
                                    </el-date-picker>
                                    至
                                    <el-date-picker
                                        v-model="dataEnd"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        @change="dataEndChange"
                                        align="right"
                                        :picker-options="pickerOptions">
                                    </el-date-picker>

                                    
                                </el-radio>
                                <div class="heigth20px"></div>
                                <el-radio :label="2" >领取当日开始
                                    <el-input v-model="ruleForm.coupon_expire.coupon_expire_day" @blur="dateDaysChange"></el-input>
                                    天内有效
                                </el-radio>
                                
                                
                        </el-radio-group>
                    </el-col>
                    </el-form-item>
                    
                    
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
                    <el-dialog title="选择指定服务" :visible.sync="goodsVisible">
                        <el-form-item>
                            <div v-if="goodShow" class="good_show">
                                <el-radio v-model="checkedGoodsId" :label="checkedGoods.good_id"><img :src="checkedGoods.good_ico" width="30px" height="30px">{{checkedGoods.good_name}}</el-radio>
                            </div>
                            <el-col :span="12">
                                <el-input v-model="goods_name" placeholder="搜索"></el-input>
                            </el-col>
                           
                            <el-col :span="5" style="text-indent:8px">
                                <el-button type="primary" @click="goodsSearch" >查询</el-button>
                            </el-col>
                        </el-form-item>

                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId">
                            <el-tab-pane v-for="item in industryForm" :label="item.category_name"  :value="item.category_id" >
                                <p class="line-hidden" v-for="item in goodsList" :key="item.good_id"><el-radio v-model="radioGoodsId" :label="item.good_id"><img :src="item.good_ico" width="20px" height="20px"><span class="ml6">{{item.good_name}}</span></el-radio></p>
                                
                            </el-tab-pane>
                        </el-tabs>
                        
                        
                        <div slot="footer" class="dialog-footer">
                            <!-- <el-button @click="goodsCancal">取 消</el-button> -->
                            <el-button type="primary" @click="goodsSure">确 定</el-button>
                        </div> 
                    </el-dialog>
                    <!-- 指定服务弹窗列表  -->
                    <el-dialog title="选择指定商品" :visible.sync="serviceVisible">
                        <el-form-item>
                             <div v-if="goodShow" class="good_show">
                                <el-radio v-model="checkedGoodsId" :label="checkedGoods.good_id"><img :src="checkedGoods.good_ico" width="30px" height="30px"><span class="ml6">{{checkedGoods.good_name}}</span></el-radio>
                            </div>
                             <el-col :span="12">
                                <el-input v-model="goods_name" placeholder="搜索"></el-input>
                            </el-col> 
                           
                            <el-col :span="5" style="text-indent:8px">
                                <el-button type="primary" @click="serviceSearch">查询</el-button>
                            </el-col>
                        </el-form-item>

                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId">
                            <el-tab-pane v-for="item in industryForm" :label="item.category_name"  :value="item.category_id" >
                                <p class="line-hidden" v-for="item in goodsList" :key="item.good_id"><el-radio v-model="radioServiceId" :label="item.good_id"><img :src="item.good_ico" width="30px" height="30px"><span class="ml6">{{item.good_name}}</span></el-radio></p>
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
                                <el-radio v-model="checkedGoodsId" :label="checkedGoods.good_id"><img :src="checkedGoods.good_ico" width="30px" height="30px">{{checkedGoods.good_name}}</el-radio>
                            </div>
                             <el-col :span="12">
                                <el-input v-model="goods_name" placeholder="搜索"></el-input>
                            </el-col> 
                           
                            <el-col :span="5" style="text-indent:8px">
                                <el-button type="primary" @click="virGoodsSearch">查询</el-button>
                            </el-col>
                        </el-form-item>

                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId">
                            <el-tab-pane v-for="item in industryForm" :label="item.category_name"  :value="item.category_id" >
                                <p class="line-hidden" v-for="item in goodsList" :key="item.good_id"><img :src="item.good_ico" width="30px" height="30px"><el-radio v-model="radioServiceId" :label="item.good_id"><span class="ml6">{{item.good_name}}</span></el-radio></p>
                                
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
                    name: "添加" //名字
                }
            ],
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        ruleForm:{
            "coupon_desc":"",//使用规则
            "coupon_code":"",
            "coupon_title" : "",//优惠券标题
            rules: {  // 规则
                "is_full" : 0, // 是否满减  
                "price" : "",  // 满多少
                "reduce_price" : ""  // 减多少
            },

            limits : { // 参与限制
                "limit_cycle" : "1", // 限制周期  1 日 2周 3月
                "limit_times" : "", // 周期内限制使用次数
                "limit_total_times" : "", // 次数限制 0 不限
            },
            coupon_range:{
                category_id:1,
                goods_id:0
            },
            "coupon_expire_type":1,
            "coupon_in_shop":1,
            "coupon_range_type":1,
            "date_expire_type":0,
            coupon_expire : {
                "coupon_expire_day" : "",  //固定天数时使用
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
        "dateDays":"", //领取时间（固定天数）
        "limitsStatus":0, //限制频率
        "dataStart":"",
        "dataEnd":""

        
        
        
       


    };
  },
  methods:{
    cloneObj(obj) {
        return JSON.parse(JSON.stringify(obj))
    },

    
      //次数限制功能
    //   limitsChange(e){

    //       if(e==0){
    //         //   this.ruleForm.limits.limit_cycle = 1
    //           this.ruleForm.limits.limit_times = 0

    //       }else{
    //           this.ruleForm.limits.limit_total_times = 0
    //       }
          
    //       this.ruleForm.rules.is_full = e
        
          
    //   },
      handleChange(e){
       
        console.log(e,'eeee')
        //   var _this = this;
        //   console.log(this,'this')

                        
          
        switch (e)
        {
            case 2: //行业  
              this.industryVisible = true 
            break;
            case 3: //服务
                this.serviceVisible = true  //服务弹窗
                this.selectRadioId = 1;
                this.serviceSearch()
            break;
            case 4: //商品
                
                this.goodsVisible = true  //商品弹窗
                this.goodsSearch()
                this.selectRadioId = 2;

            break;
            case 5: //虚拟商品
                this.inventedVisible = true
                this.virGoodsSearch()
                this.selectRadioId = 4;
            break;
            
                //虚拟商品弹窗
            
        }
      },
      dataChange(e){
          this.ruleForm.coupon_expire_type = e;
          
      },
    //   dataArrChange(e){
         
    //       this.ruleForm.coupon_expire.coupon_expire_start_time = this.dateArray[0];
    //       this.ruleForm.coupon_expire.coupon_expire_end_time = this.dateArray[1];
    //   },
      dataStartChange(){
          this.ruleForm.coupon_expire.coupon_expire_start_time = this.dataStart
      },
      dataEndChange(){
          this.ruleForm.coupon_expire.coupon_expire_end_time = this.dataEnd
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
          this.ruleForm.coupon_range = {}
          debugger
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
          this.ruleForm.coupon_range = {}
          debugger
          console.log(this.checkedGoodsId,'222222222222')
          //虚拟商品确定
          if(this.checkedGoodsId==""){
              console.log(this.checkedGoodsId,'checkedGoodsId1')
              this.$alert('必须选择虚拟商品')
          }else{
              console.log(this.checkedGoodsId,'checkedGoodsId2');
              this.ruleForm.coupon_range.goods_id = this.checkedGoodsId;
              this.inventedVisible = false;
          }
      },
      serviceSure(){
          this.ruleForm.coupon_range = {}
          debugger
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
          this.ruleForm.coupon_range = {}
          console.log('商品搜索--------')
        //商品搜索
        var goodName = this.goods_name;
        this.$axios.get("/api/admin/select/goodsList?good_type=2&good_name="+goodName).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    this.goods_name = "" //查询完毕清空input
                }else{
                    this.$message({ message: res.data.msg, type: 'warning' });
                }
            })

      },
        serviceSearch(){
            console.log('服务搜索----------')
        //服务搜索
        var goodName = this.goods_name;
        this.$axios.get("/api/admin/select/goodsList?good_type=1&good_name="+goodName).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    this.goods_name = "" //查询完毕清空input
                }else{
                    this.$message({ message: res.data.msg, type: 'warning' });
                }
            })

      },
        virGoodsSearch(){
            console.log('虚拟商品搜索---------')
        //虚拟商品
        var goodName = this.goods_name;
        this.$axios.get("/api/admin/select/goodsList?good_type=4&good_name="+goodName).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    this.goods_name = "" //查询完毕清空input
                }else{
                    this.$message({ message: res.data.msg, type: 'warning' });
                }
            })

      },
    submit(){
        
        let params = this.$route.params;
        const obj = this.cloneObj(this.ruleForm)
        obj.coupon_range = this.ruleForm.coupon_range
        // clone
        // const obj = $.extend(true,{},this.ruleForm)
        // const obj=JSON.parse(JSON.stringify(this.ruleForm))
        // this.deepCopyLd(obj);
        // debugger
        obj.rules.reduce_price=this.formatPrice(obj.rules.reduce_price);
        obj.rules.price = this.formatPrice(obj.rules.price)
        // obj = JSON.parse(obj)
        debugger
        if (Object.keys(params).length) {
            this.ruleForm.coupon_code = params.coupon_code
            this.$axios.post("/api/admin/coupon/edit",obj).then(res => {
                if(res.data.code ==0){
                    this.$alert('编辑成功')
                    this.$router.push('/marketing/fullReducionCouponList')
                }else{
                    this.$alert('接口返回错误')
                }
                
            })
        }else{
            //var parms = this.ruleForm;
            this.$axios.post("/api/admin/coupon/addReduce", obj).then(res => {
                if(res.data.code == 0){
                    this.$alert('添加成功！')
                    
                    this.$router.push('/marketing/fullReducionCouponList')
                }else{
                    this.$alert(res.data.msg)
                }
            }).catch((e)=>{

                this.$alert('操作失败'+e)

            })
        }


      },
      getCategoryList(){
          //获取行业列表
        this.$axios.get("/api/admin/select/categoryList").then(res =>{
          if(res.data.code ==0){
            this.industryForm = res.data.data;
            console.log(this.industryForm,'industryForm')
          }

        })
          
      },
        formatPrice(price) {
            return (price*100);
        },
        formatPrice1(price) {
            return (price/100);
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
            this.$axios.get("/api/admin/select/goodsList?category_id="+this.industryForm[val].category_id+"&good_type="+this.selectRadioId).then(res =>{
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
                    if(res.data.data.limits.limit_times==0){
                        this.limitsStatus = 0
                    }else{
                        this.limitsStatus = 1
                    }
                    console.log(this.limitsStatus,'limitsStatus')
                    const list = {} 
                    

                    const _obj = JSON.parse(JSON.stringify(res.data.data));
                    for(var key in res.data.data.coupon_range){
                        list[key] = res.data.data.coupon_range[key]
                    }
                    
                    _obj.rules.reduce_price = this.formatPrice1(_obj.rules.reduce_price)
                    _obj.rules.price = this.formatPrice1(_obj.rules.price)
                    this.dataStart = _obj.coupon_expire.coupon_expire_start_time 
                    this.dataEnd = _obj.coupon_expire.coupon_expire_end_time 
                    this.ruleForm = _obj
                    this.ruleForm.coupon_range = list
                    console.log(this.ruleForm,'ruleForm')

                   

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


 .el-textarea__inner{
    width: 100%;
    max-width: 100%;
}
.el-radio{
    font-weight: normal !important
}


</style>


