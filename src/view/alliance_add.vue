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

    <el-form-item label="公司地址" prop="business_company_adress">
    <el-input v-model="ruleForm.business_company_adress"></el-input>
  </el-form-item>


  <el-form-item label="法人姓名" prop="business_corporation">
    <el-input v-model="ruleForm.business_corporation"></el-input>
  </el-form-item>

  <el-form-item label="手机号" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

     <el-form-item label="法人身份证">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="handleFaceUploadSuccess"
           >

           上传正面
<!-- 
          <img width="100%" v-if="form1.user_info.pic_before" :src="form1.user_info.pic_before" class="avatar"> -->
<!--           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
 -->        </el-upload>


  </el-form-item>

     <el-form-item label="法人身份证">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="handleFaceUploadSuccess"
           >
           上传背面
         <!--  <img width="100%" v-if="form1.user_info.pic_before" :src="form1.user_info.pic_before" class="avatar"> -->
<!--           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
 -->        </el-upload>

  </el-form-item>

  <el-form-item label="营业执照号" prop="business_licence_num">
    <el-input v-model="ruleForm.business_licence_num"></el-input>
  </el-form-item>

   <el-form-item label="营业执照">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="handleFaceUploadSuccess"
           >
           上传营业执照
         <!--  <img width="100%" v-if="form1.user_info.pic_before" :src="form1.user_info.pic_before" class="avatar"> -->
<!--           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
 -->        </el-upload>

  </el-form-item>


  <el-form-item>
    <el-button size="large" type="primary" @click="goNextStep(2)" >下一步</el-button>
    <el-button size="large" @click="resetForm('ruleForm1')">重置</el-button>
  </el-form-item>
</el-form>

</div>


<!--步骤2-->

 <div class="form-panel p-xl"  v-if="step==2">

   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="合同编号" prop="name" required>
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

    <el-form-item label="进货提成比例（徒弟）" prop="name" required>
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

      <el-form-item label="进货提成比例（徒孙）" prop="name" required>
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

     <el-form-item label="线下耗材折扣" prop="name" required>
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

      <el-form-item label="线下商品折扣" prop="name" required>
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

     <el-form-item label="线下仪器折扣" prop="name" required>
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

</el-form>

 </div>

<!--步骤3-->

 <div class="form-panel p-xl" v-if="step==3">

   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="推荐人平台账号" prop="name" required>
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

      <el-form-item label="行业" prop="category_id">
                <el-select v-model="ruleForm.name" placeholder="请选择所属行业分类" >
                    <el-option v-for="item in CATEGORYOPTIONS" :label="item.category_name" :value="item.category_id" :key="`${item.category_id}category_id`" />
                </el-select>                   
            </el-form-item>

    <el-form-item label="加盟商类型">
    <el-radio-group v-model="ruleForm.name">
      <el-radio label="加盟"></el-radio>
      <el-radio label="非加盟"></el-radio>
    </el-radio-group>
  </el-form-item>



    <el-form-item label="售价" prop="name" required>
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

  <el-form-item label="原价" prop="name" required>
    <el-input v-model="ruleForm.name"></el-input>
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

export default {
  name: "tabletest",

  data() {
    return {
      step: 1,
      url: "",
      CATEGORYOPTIONS,
      breadcrumb: [
        //面包屑
        {
          name: "加盟商管理" //名字
        },
        {
          name: "添加加盟商" //名字
        }
      ],

      ruleForm:{
    "name":1,
    "business_phone" : "18655556666",//加盟商手机号
    "business_company_name" : "公司名称",//公司名称
    "category_id" : [1,2,8],//行业id 3或[3]或[3,5,7]
    "business_type" : 1,//1加盟 2非加盟
    "business_corporation" : "张三",//法人
    "address_code" : "110000",//地址编码
    "business_longitude" : "112.3",//经度
    "business_latitude" : "134.5",//纬度
    "business_sfz_num" : "370684198909212231",//身份证号
    "business_sfz_pic_z" : "/z.jpg",//身份证正面照片地址
    "business_sfz_pic_f" : "/f.jpg",//身份证反面照片地址
    "business_licence_num" : "2356325623",//营业执照号码
    "business_licence_pic" : "/ico.jpg",//营业执照图片地址
    "business_company_adress" : "大望路27号",//公司地址
    "review_id" : "5be55f3e4c22ad1bd0007e2c",//加盟商审核信息的_id
    "business_contract_num" : "34563434",//合同编号
    "business_stock_percent_1" : 80,//徒弟进货提成比例 30即30%
    "business_stock_percent_2" : 80,//徒孙进货提成比例 30即30%
    "business_discount_mater" : 70,//线下耗材折扣
    "business_discount_goods" : 60,//线下商品折扣
    "business_discount_device" : 90,//线下仪器折扣
    "business_join_money" : 900,//加盟费用
    "business_join_reward" : 90,//推荐人奖励
    "fid" : 11,//推荐加盟商id
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
      }
  },
  components: {
    BreadCrumb,
    formlist
  },
  created() {},
  computed: {}
};
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
</style>
