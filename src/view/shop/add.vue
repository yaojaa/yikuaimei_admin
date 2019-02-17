<template>
   <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">



<el-steps :active="step" simple>
  <el-step  @click.native="goNextStep(1)" title="基本信息" icon="el-icon-edit"></el-step>
  <el-step  @click.native="goNextStep(2)" title="加盟商信息" icon="el-icon-edit"></el-step>
</el-steps>




<div class="panel">


<div class="form-panel p-xl"  v-if="step==1">
                   <!--form start-->
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">


  <el-form-item label="公司名称" prop="shop_name">
    <el-input v-model="ruleForm.shop_name"></el-input>
  </el-form-item>
<el-form-item label="城市" >
    <area-cascader v-model="ruleForm.address_code" :level='1' :data="pcaa"></area-cascader>

  </el-form-item>



    <el-form-item label="公司地址" prop="shop_address">
    <el-input v-model="ruleForm.shop_address"></el-input>
  </el-form-item>


  <el-form-item label="法人姓名" prop="shop_corporation">
    <el-input v-model="ruleForm.shop_corporation"></el-input>
  </el-form-item>

  <el-form-item label="手机号" prop="shop_phone">
    <el-input v-model="ruleForm.shop_phone"></el-input>
  </el-form-item>

     <el-form-item label="法人身份证">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="shop_sfz_pic_z"
           >

        <img width="100%" v-if="ruleForm.shop_sfz_pic_z" :src="ruleForm.shop_sfz_pic_z" >
        
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
          :on-success="shop_sfz_pic_f"
           >
  <img width="100%" v-if="ruleForm.shop_sfz_pic_f" :src="ruleForm.shop_sfz_pic_f" >
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>上传背面</p>
        </div>       </el-upload>

  </el-form-item>

  <el-form-item label="营业执照号" prop="shop_licence_num">
    <el-input v-model="ruleForm.shop_licence_num"></el-input>
  </el-form-item>

   <el-form-item label="营业执照">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="shop_licence_pic"
           >
       <img width="100%" v-if="ruleForm.shop_licence_pic" :src="ruleForm.shop_licence_pic" >
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>上传营业执照</p>
        </div>

       </el-upload>

  </el-form-item>



   <el-form-item label="门店封面图">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="shop_pic"
           >
       <img width="100%" v-if="ruleForm.shop_pic" :src="ruleForm.shop_pic" >
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>门店封面图 尺寸320*320像素</p>
        </div>

       </el-upload>

  </el-form-item>

     <el-form-item label="门店环境图">

       <img width="120" v-for="(img,i) in ruleForm.shop_environment" :src="img" >

         <el-upload
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          list-type="picture-card"

          :on-success="shop_environment"
           >
        
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>

       </el-upload>

  </el-form-item>





  <el-form-item>
    <el-button size="large" type="primary" @click="goNextStep(2)" >下一步</el-button>
  </el-form-item>
</el-form>

</div>



<!--步骤2-->

 <div class="form-panel p-xl" v-if="step==2">

   <el-form :model="ruleForm" :rules="rules" ref="ruleForm3" label-width="100px" class="demo-ruleForm">


   

    <el-form-item label="门店类别">
    <el-radio-group v-model="ruleForm.shop_type">
      <el-radio :label="1">加盟</el-radio>
      <el-radio :label="2">非加盟</el-radio>
    </el-radio-group>
  </el-form-item>

     <el-form-item label="行业" prop="category_id">
                <el-select v-model="ruleForm.category_id" placeholder="请选择所属行业分类" >
                    <el-option v-for="item in CATEGORYOPTIONS" :label="item.category_name" :value="item.category_id" :key="`${item.category_id}category_id`" />
                </el-select>                   
            </el-form-item>

    <el-form-item label="归属加盟商" prop="name" required>

    <el-select v-model="ruleForm.fid" placeholder="请选择">
    <el-option
      v-for="item in business_list"
      :key="item.business_id"
      :label="item.business_name"
      :value="item.business_id">
    </el-option>
  </el-select>

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
    "shop_name" : "",//公司名称
    "shop_brand_name" : "no",//品牌名称
    "shop_pic" : "",//门店封面图
    "shop_address" : "公司地址",//公司地址
    "category_id" : [],//行业分类id数组
    "shop_type" : 1,//商铺类型 0:母店 1:子店
    "shop_corporation" : "",//法人
    "shop_sfz_num" : "",//身份证号
    "shop_sfz_pic_z" : "",//身份证正面照片
    "shop_sfz_pic_f" : "",//身份证反面照片
    "shop_licence_num" : "",//营业执照号
    "shop_licence_pic" : "",//营业执照照片
    "shop_phone" : "18668991178",//手机号
    "address_code" : "110000",//地址编码
    "shop_longitude" : "",//门店经度
    "shop_latitude" : "",//门店纬度
    "shop_environment" : [],//门店环境图片数组
    "review_id" : "5be55f3e4c22ad1bd0007e2c",//加盟商审核信息的_id
    "business_id" : 13,//加盟商审核信息的business_id

    shop_environment:[]
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
 shop_pic(res){
      this.ruleForm.shop_pic = res.data.url
    },
  shop_licence_pic(res){
      this.ruleForm.shop_licence_pic = res.data.url
    },
    shop_environment(res){
      this.ruleForm.shop_environment.push(res.data.url)
    },
     shop_sfz_pic_z(res){
      this.ruleForm.shop_sfz_pic_z = res.data.url
    },
     shop_sfz_pic_f(res){
      this.ruleForm.shop_sfz_pic_f = res.data.url
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
          this.$axios.post("/api/admin/shop/create", this.ruleForm).then(res => {

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
.el-upload--picture-card {
  width: 120px;
  height: 120px;
  display: inline-block;
}
</style>
