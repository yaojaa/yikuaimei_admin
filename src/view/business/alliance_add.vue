<template>
   <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">



<el-steps :active="step" simple>
  <el-step  @click.native="goNextStep(1)" title="编辑基本信息" icon="el-icon-edit"></el-step>
  <el-step  @click.native="goNextStep(2)" title="编辑进货信息" icon="el-icon-edit"></el-step>
  <el-step  @click.native="goNextStep(3)" title="编辑详细信息" icon="el-icon-edit"></el-step>
</el-steps>




<div class="panel">


<div class="form-panel p-xl"  v-if="step==1">
                   <!--form start-->
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
<!-- business_logo -->
<el-form-item label="加盟商logo">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="business_logo"
           >

        <img width="100%" v-if="ruleForm.business_logo" :src="ruleForm.business_logo" >
        
        <div  v-else style="padding-top: 10%">
          
          <i class="el-icon-plus" style="font-size: 48px"></i>
        </div> 

    </el-upload>


  </el-form-item>

  <el-form-item label="公司名称" prop="business_name">
    <el-input v-model="ruleForm.business_name"></el-input>
  </el-form-item>
    <el-form-item label="公司地址" prop="business_company_adress">
    <el-input v-model="ruleForm.business_company_adress"></el-input>
  </el-form-item>

  <el-form-item label="城市" class="shop-add-city">
    <area-cascader v-model="ruleForm.address_code2" :level='1' :data="pcaa" @change="handleChange"></area-cascader>

  </el-form-item>

  <el-form-item label="法人姓名" prop="business_corporation">
    <el-input v-model="ruleForm.business_corporation"></el-input>
  </el-form-item>

  <el-form-item label="手机号" prop="business_phone">
    <el-input v-model="ruleForm.business_phone"></el-input>
  </el-form-item>

     <el-form-item label="法人身份证">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="business_sfz_pic_z"
           >

        <img width="100%" v-if="ruleForm.business_sfz_pic_z" :src="ruleForm.business_sfz_pic_z" >
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>上传正面</p>
        </div> 

    </el-upload>


  </el-form-item>

     <el-form-item label="法人身份证">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="business_sfz_pic_f"
           >
  <img width="100%" v-if="ruleForm.business_sfz_pic_f" :src="ruleForm.business_sfz_pic_f" >
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>上传背面</p>
        </div>       </el-upload>

  </el-form-item>

  <el-form-item label="营业执照号" prop="business_licence_num">
    <el-input v-model="ruleForm.business_licence_num"></el-input>
  </el-form-item>

   <el-form-item label="营业执照">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="business_licence_pic"
           >
       <img  v-if="ruleForm.business_licence_pic" :src="ruleForm.business_licence_pic" width="360px" height="180px">
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>上传营业执照</p>
        </div>

       </el-upload>

  </el-form-item>


  <el-form-item>
    <el-button size="large" type="primary" @click="goNextStep(2)" >下一步</el-button>
  </el-form-item>
</el-form>

</div>


<!--步骤2-->

 <div class="form-panel p-xl"  v-if="step==2">

   <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

    <el-form-item label="合同编号" prop="business_contract_num" required>
    <el-input v-model="ruleForm.business_contract_num"></el-input>
  </el-form-item>

    <el-form-item label="进货提成比例（徒弟）" prop="business_stock_percent_1" required>
    <el-input v-model="ruleForm.business_stock_percent_1"></el-input>
  </el-form-item>

      <el-form-item label="进货提成比例（徒孙）" prop="business_stock_percent_2" required>
    <el-input v-model="ruleForm.business_stock_percent_2"></el-input>
  </el-form-item>

     <el-form-item label="线下耗材折扣" prop="business_discount_mater" required>
    <el-input v-model="ruleForm.business_discount_mater"></el-input>
  </el-form-item>

      <el-form-item label="线下商品折扣" prop="business_discount_goods" required>
    <el-input v-model="ruleForm.business_discount_goods"></el-input>
  </el-form-item>

     <el-form-item label="线下仪器折扣" prop="business_discount_device" required>
    <el-input v-model="ruleForm.business_discount_device"></el-input>
  </el-form-item>

    <el-form-item>
    <el-button size="large" type="primary" @click="goNextStep(3)" >下一步</el-button>
  </el-form-item>
</el-form>





 </div>

<!--步骤3-->

 <div class="form-panel p-xl" v-if="step==3">

   <el-form :model="ruleForm" :rules="rules" ref="ruleForm3" label-width="140px" class="demo-ruleForm">

    <el-form-item label="推荐人平台账号" v-model="ruleForm.fid">

    
  <el-autocomplete
      v-model="business_na_me"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect">
  </el-autocomplete>
  </el-form-item>

      <el-form-item label="行业" prop="category_id">
                <el-select v-model="ruleForm.category_id" placeholder="请选择所属行业分类" >
                    <el-option v-for="item in CATEGORYOPTIONS" :label="item.category_name" :value="item.category_id" :key="`${item.category_id}category_id`" />
                </el-select>                   
            </el-form-item>

    <el-form-item label="加盟商类型">
    <el-radio-group v-model="ruleForm.business_type">
      <el-radio :label="1">加盟</el-radio>
      <el-radio :label="2">非加盟</el-radio>
    </el-radio-group>
  </el-form-item>



    <el-form-item label="加盟费" prop="business_join_money" required>
    <el-input v-model="ruleForm.business_join_money"></el-input>
  </el-form-item>

  <el-form-item label="推荐人奖励" prop="business_join_reward" required>
    <el-input v-model="ruleForm.business_join_reward"></el-input>
  </el-form-item>


  <el-form-item>
    <el-button size="large" type="primary" @click="submitForm()" >提交</el-button>
  </el-form-item>
</el-form>


 </div>




<!--form end-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import formlist from "@/components/formlist";
import { CATEGORYOPTIONS } from "../../constans/createdGood";
import { pca, pcaa } from 'area-data'; // v5 or higher
console.log(pcaa)
export default {
  name: "tabletest",

  data() {
    return {
      pcaa,
      step: 1,
      url: "",
      CATEGORYOPTIONS,
      business_list:[],
      business_na_me:null,
      breadcrumb: [
        //面包屑
        {
          name: "加盟商管理" //名字
         
        },
        {
          name: "加盟商列表", //名字
          url:"/business/alliance"
        },
        {
          name: "添加加盟商", //名字
          url:"/business/alliance_add"
        }
      ],

      ruleForm:{
        "id":"",
    "business_phone" : "",//加盟商手机号
    "business_name" : "",//公司名称
    "category_id" : [1,2,8],//行业id 3或[3]或[3,5,7]
    "business_type" : 1,//1加盟 2非加盟
    "business_corporation" : "",//法人
    "address_code" : "",//地址编码
    "address_code2":"",
    "business_logo":"", //加盟商logo


    "business_sfz_num" : "222",//身份证号
    "business_sfz_pic_z" : "",//身份证正面照片地址
    "business_sfz_pic_f" : "",//身份证反面照片地址
    "business_licence_num" : "",//营业执照号码
    "business_licence_pic" : "",//营业执照图片地址
    "business_company_adress" : "",//公司地址
    "business_longitude" : "112.3",//经度
    "business_latitude" : "134.5",//纬度
    "business_contract_num" : "",//合同编号
    "business_stock_percent_1" : 80,//徒弟进货提成比例 30即30%
    "business_stock_percent_2" : 80,//徒孙进货提成比例 30即30%
    "business_discount_mater" : 70,//线下耗材折扣
    "business_discount_goods" : 60,//线下商品折扣
    "business_discount_device" : 90,//线下仪器折扣
    "business_join_money" : 900,//加盟费用
    "business_join_reward" : 90,//推荐人奖励
    "fid" : '',//推荐加盟商id
  },

        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
      options: [
        {
          name: 'coupon_template_type',
          value: '1'
        },
        {
          name: "coupon_template_name",
          type: "input",
          label: "模板名称",
          placeholder: '优惠券名称',
          rules: [
            {
              required: true,
              message: "请输入优惠券模板名称",
                            trigger: "blur"

            }
          ],
          value: ""
        },
        
      ]
    };
  },
  methods:{
    handleFaceUploadSuccess(){

    },
    querySearchAsync(queryString, callback) {
      var list = [{}];
      //调用的后台接口
      if(queryString==undefined){
        var url = "/api/admin/select/businessList" ;
      }else{
        var url = "/api/admin/select/businessList?business_id=" + queryString;
      }

      this.$axios.get(url).then(res =>{
          if(res.data.code ==0){
            //this.business_list = res.data.data;
            //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
            for(let i of res.data.data){
                i.value = i.business_name;  //将想要展示的数据作为value
                
            }
            list = res.data.data;
            callback(list);
          }
        })
      // //从后台获取到对象数组
      // this.$axios.get(url).then((response)=>{
        
          
      // }).catch((error)=>{
      // console.log(error);
      // });
    },
      handleSelect(event) {
      console.log(event,'event');
      this.ruleForm.fid = event.business_id;
      //console.log(this.ruleForm.business_id,'this.ruleForm.business_id');
      //debugger;
    },
    // getBusinessVal(_val){
    //   var _this,_businessList;
    //       _this = this,
    //       _businessList = this.business_list;
    //       console.log(_businessList,'_businessList')
    //   _businessList.forEach(function(value,index,arr){
    //     if(arr[index].business_id==_val){
    //       _this.ruleForm.business_name = arr[index].business_name;
    //     }
    //   })
    //   // for(var i=0; i<_businessList.length; i++){
    //   //   if(_businessList[i].id==_val){
    //   //     this.ruleForm.business_name = _businessList[i].name;
    //   //   }
    //   // }

      
     
    // },
    getReviewData(id) {
      this.$axios({
          method: 'get',
          url: '/api/admin/shop/reviewDetail?id='+id,
          
      }).then((res) => {

          if(res.data.code ==0){
              Object.assign(this.ruleForm,res.data.data) 
          }else{
              this.$alert('接口返回错误')
          }
          
      }).catch((error) => {
          this.$alert('接口返回错误'+error)
      });
    },
    goNextStep(n){
      this.step = n
    },
    handleChange(event){
      this.ruleForm.address_code = event[event.length-1];
      console.log(this.ruleForm.address_code,'this.ruleForm.address_code')
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },

    business_licence_pic(res){
      this.ruleForm.business_licence_pic = res.data.url
    },
     business_sfz_pic_z(res){
      this.ruleForm.business_sfz_pic_z = res.data.url
    },
    business_logo(res){
      this.ruleForm.business_logo = res.data.url
    },
     business_sfz_pic_f(res){
      this.ruleForm.business_sfz_pic_f = res.data.url
    },

    // getBusinessList(){

    //    this.$axios.get("/api/admin/select/businessList").then(res =>{

    //     console.log(res)
    //     if(res.data.code ==0){

    //       this.business_list = res.data.data　;
    //       console.log(this.business_list,'business_list')
    //     }


    //    })

    // },
    submitForm(){
        let params = this.$route.params;
        this.ruleForm.id = params.business_id
        if (Object.keys(params).length) {

          
        
     

        
 
            
            this.$axios.post("/api/admin/business/modify", this.ruleForm).then(res => {



                  if(res.data.code == 0){

                      this.$alert('编辑加盟商成功！')

                      this.$router.push('/business/alliance')

                  }else{
                      this.$alert(res.data.msg)
                  }
              }).catch((e)=>{
                this.$alert('操作失败'+e)

              })
        }else{
                this.$axios.post("/api/admin/business/create", this.ruleForm).then(res => {

                  console.log(res)

                  if(res.data.code == 0){

                      this.$alert('添加加盟商成功！')

                      this.$router.push('/business/alliance')

                  }else{
                      this.$alert(res.data.msg)
                  }
              }).catch((e)=>{
                this.$alert('操作失败'+e)

              })
        }
          //this.ruleForm.address_code = this.ruleForm.address_code[2]

    }
  },
  components: {
    BreadCrumb,
    formlist
  },
  created() {
    //this.getBusinessList()
    //编辑加盟商
        let params = this.$route.params;

        if (Object.keys(params).length) {
            
            this.$axios.get("/api/admin/business/getOneById?id="+params.business_id).then(res => {
              if(res.data.code==0){
                  this.ruleForm = res.data.data;
                        this.$axios.get("/api/admin/select/businessList?business_id=" + this.ruleForm.fid).then(res =>{
                        if(res.data.code ==0){
                          
                          this.business_na_me = res.data.data[0].business_name
                          
                        }
                      })
              }
                
               
            
            })


        }
  },
  mounted(){
    //如果是从审核加盟商中过来
    if(this.$route.query.review){
      this.getReviewData(this.$route.query.review)
    }
  },
  computed: {}
};
</script>

<style scoped>
.area-select .area-selected-trigger{
  padding: 0px 20px 7px 12px
}
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
</style>
