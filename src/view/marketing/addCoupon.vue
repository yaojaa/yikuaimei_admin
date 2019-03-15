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
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">

                    <el-form-item label="优惠券标题:" prop="coupon_title">
                        <el-input v-model="ruleForm.coupon_title"></el-input>
                    </el-form-item>
                    <el-form-item label="面值:" prop="rules">
                        <el-input v-model="ruleForm.rules.reduce_price"></el-input>
                    </el-form-item>
                    <el-form-item label="可使用次数:" prop="limits">
                        <el-input v-model="ruleForm.limits.limit_total_times"></el-input>
                    </el-form-item>
                    <el-form-item label="可使用频率:">
                        每
                        <el-select v-model="ruleForm.limits.limit_cycle">
                            <el-option label="日" value="1"></el-option>
                            <el-option label="周" value="2" ></el-option>
                            <el-option label="月" value="3" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="次数">
                        <el-input v-model="ruleForm.limits.limit_times"></el-input>
                    </el-form-item>
                    <el-form-item label="使用范围" >
                        <el-radio-group v-model="ruleForm.coupon_range_type" @change="handleChange">
                            <el-radio label="1">全国</el-radio>
                            <el-radio label="2">指定行业</el-radio>
                            <el-radio label="3">指定商品</el-radio>
                            <el-radio label="4">指定服务</el-radio>
                            <el-radio label="5">指定虚拟商品</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div>
                        <div v-if="ruleForm.coupon_range_type==2">
                            {{industry_id}}
                        </div>
                        <div v-if="ruleForm.coupon_range_type==3">
                            {{}}
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
                        
                        <!-- <el-form-item label="行业" >
                            <el-select v-model="industry_id" placeholder="请选择所属行业分类" >
                                <el-option v-for="item in industryForm" :label="item.category_name" :value="item.category_id" :key="`${item.category_id}category_id`" />
                            </el-select>                   
                        </el-form-item>
                        -->
                        <div slot="footer" class="dialog-footer">
                            <!-- <el-button @click="goodsCancal">取 消</el-button> -->
                            <el-button type="primary" @click="goodsSure">确 定</el-button>
                        </div> 
                    </el-dialog>

                    <!-- <el-form-item label="活动专属:" prop="coupon_in_shop">
                        <el-radio-group v-model="ruleForm.coupon_in_shop">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                            
                        </el-radio-group>
                    </el-form-item> -->
                    
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
                "is_full" : 0, // 是否满减  1满减 2立减
                "price" : 1000,  // 满多少
                "reduce_price" : 1000  // 减多少
            },
            "limits" : { // 参与限制
                "limit_cycle" : "", // 限制周期  1 日 2周 3月
                "limit_times" : 10, // 周期内限制使用次数
                "limit_total_times" : 0, // 次数限制 0 不限
            },
            "coupon_range" : { //弹窗列表选择
                "category_id" : 1,
                "goods_id" :  0
            },
            
            "coupon_in_shop":0,
            "coupon_range_type":1// 1全国 2行业 3商品 4服务 5 虚拟商品
            
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
        "industry_id":"",
        "goods_name":"",
        "tabPosition":"left",
        "activeId":"",
        "radioGoodsId":"",
        checkedGoods:{},//以选中商品
        "checkedGoodsId":"",//已经选中的商品id
        "goodShow":false //选中商品是否显示
        
        
       


    };
  },
  methods:{
      handleChange(e){
        console.log(e,'eeee')
        //   var _this = this;
        //   console.log(this,'this')

          
        switch (e)
        {
            case "2": //2行业  
            console.log(11111)
              this.industryVisible = true      //行业弹窗
            break;
            case "3": //3商品
            console.log(11111)
               this.goodsVisible = true  //
            break;
            case 4: //4服务
                //服务弹窗
            break;
            case 5: //5 虚拟商品
                //虚拟商品弹窗
            
        }
      },
      industrySure(){
        //行业弹窗确定
        if(this.industry_id==""){
            this.$alert('必须选择行业')
        }else{
            this.ruleForm.coupon_range.category_id = this.industry_id;
            
            this.industryVisible = false;
        }
        
      },
      goodsSure(){
          //商品弹窗确定
          if(this.checkedGoodsId==""){
              this.$alert('必须选择商品')
          }else{
              this.ruleForm.coupon_range.goods_id = this.checkedGoodsId;
              this.goodsVisible = false;
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
            //var parms = this.ruleForm;
            this.$axios.post("/api/admin/train/create", this.ruleForm).then(res => {
                if(res.data.code == 0){
                    this.$alert('添加成功！')
                    this.$router.push('/training/list')
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
            this.$axios.get("/api/admin/select/goodsList?good_type=2&category_id="+this.industryForm[val].category_id).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    console.log(this.goodsList,'goodsList')
                    

                }
            })
        },
        radioGoodsId:function(event){
            this.goodsList.forEach((item) => {
                if (item.good_id == event) {
                    this.checkedGoods = item;
                    console.log(this.checkedGoods,'this.checkedGoods')
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
        // let params = this.$route.query;
        // if (Object.keys(params).length) {
        //     this.params = params
        //     this.$axios.get("/api/admin/train/detail?id="+params.id).then(res => {
        //         this.ruleForm = res.data.data;
        //         debugger;
        //         //this.form1.category_id = res.data.data.category_id
        //         // this.getshopAccout(this.form1.create_user.shop_id)
        //         // this.loadMechanic();


        //     })
        // }

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
</style>


