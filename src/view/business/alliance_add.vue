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


  <el-form-item label="公司名称" prop="business_company_name">
    <el-input v-model="ruleForm.business_company_name"></el-input>
  </el-form-item>
<el-form-item label="城市" >
    <area-cascader v-model="ruleForm.address_code" :level='1' :data="pcaa"></area-cascader>

  </el-form-item>



    <el-form-item label="公司地址" prop="business_company_adress">
    <el-input v-model="ruleForm.business_company_adress"></el-input>
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
       <img width="100%" v-if="ruleForm.business_licence_pic" :src="ruleForm.business_licence_pic" >
        
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

</el-form>



 </div>

<!--步骤3-->

 <div class="form-panel p-xl" v-if="step==3">

   <el-form :model="ruleForm" :rules="rules" ref="ruleForm3" label-width="100px" class="demo-ruleForm">

    <el-form-item label="推荐人平台账号" prop="name" required>

    <el-select v-model="ruleForm.fid" placeholder="请选择">
    <el-option
      v-for="item in business_list"
      :key="item.business_id"
      :label="item.business_name"
      :value="item.business_id">
    </el-option>
  </el-select>

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
    <el-button size="large" type="primary" @click="submit()" >提交</el-button>
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
import { CATEGORYOPTIONS } from "../constans/createdGood";
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
      breadcrumb: [
        //面包屑
        {
          name: "加盟商管理", //名字
          url:'alliance'
        },
        {
          name: "添加加盟商" //名字
        }
      ],

      ruleForm:{
    "business_phone" : "",//加盟商手机号
    "business_company_name" : "",//公司名称
    "category_id" : [1,2,8],//行业id 3或[3]或[3,5,7]
    "business_type" : 1,//1加盟 2非加盟
    "business_corporation" : "",//法人
    "address_code" : "",//地址编码

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
    handleFaceUploadSuccess(){},
     goNextStep(n){
      this.step = n
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
     business_sfz_pic_f(res){
      this.ruleForm.business_sfz_pic_f = res.data.url
    },

    getBusinessList(){

       this.$axios.get("/api/admin/select/businessList").then(res =>{

        console.log(res)
        if(res.data.code ==0){

          this.business_list = res.data.data
        }


       })

    } ,
    
    submit(){

      this.ruleForm.address_code = this.ruleForm.address_code[2]
          this.$axios.post("/api/admin/business/create", this.ruleForm).then(res => {

                    console.log(res)

                    if(res.data.code == 0){

                        this.$alert('添加加盟商成功！')

                        this.$router.push('/alliance')

                    }else{
                        this.$alert(res.data.msg)
                    }


                }).catch((e)=>{

                  this.$alert('操作失败'+e)

                })





    }
  },
  components: {
    BreadCrumb,
    formlist
  },
  created() {
    this.getBusinessList()
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
