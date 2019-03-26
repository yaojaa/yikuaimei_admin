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
            <el-step  @click.native="goNextStep(2)" title="编辑详情信息" icon="el-icon-edit"></el-step>
            </el-steps>



            <div class="panel">

                <div class="form-panel p-xl"  v-if="step==1">
                                <!--form start-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm" >




                    <el-form-item label="法人姓名" prop="shop_corporation">
                        <el-input v-model="ruleForm.shop_corporation"></el-input>
                    </el-form-item>

                    <el-form-item label="营业执照号" prop="shop_licence_num">
                        <el-input v-model="ruleForm.shop_licence_num"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button size="large" type="primary" @click="goNextStep(2)" >下一步</el-button>
                    </el-form-item>
                    
                    </el-form>

                </div>

                <!--步骤2-->

                <div class="form-panel p-xl" v-if="step==2">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm3" label-width="100px" class="demo-ruleForm">

                        




                    
                    </el-form>


                </div>




<!--form end-->
            </div>
        </div>
    </div>
   
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
// import formlist from "@/components/formlist";
// import { CATEGORYOPTIONS } from "../../constans/createdGood";
// import { pca, pcaa } from 'area-data'; // v5 or higher
export default {
  name: "tabletest",

  data() {
    return {
    //   pcaa,
    //   dialogImageUrl: '',
    //   dialogVisible: false,
      step: 1,
    //   url: "",
    //   business_name:null,
    // //   CATEGORYOPTIONS,
    //   params:{},
    //   edit:false,
      breadcrumb: [
        //面包屑
        {
          name: "营销管理/营销应用", //名字
          url:'alliance'
        },
        {
          name: "摇一摇" //名字
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
        "address_code" : "",//地址编码
        "shop_longitude" : "",//门店经度
        "shop_latitude" : "",//门店纬度
        "shop_environment" : [],//门店环境图片数组
        "business_id" : null,//加盟商审核信息的business_id
        // "shop_environment":[],
        "address_code2":""
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
    //    if(n==1){
    //      this.mapTX();
    //    }
       this.step = n;
      
    },
    // querySearchAsync(queryString, callback) {
    //   var list = [{}];
    //   //调用的后台接口
    //   if(queryString==undefined){
    //     var url = "/api/admin/select/businessList" ;
    //   }else{
    //     var url = "/api/admin/select/businessList?business_id=" + queryString;
    //   }

    //   this.$axios.get(url).then(res =>{
    //       if(res.data.code ==0){
    //         //this.business_list = res.data.data;
    //         //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
    //         for(let i of res.data.data){
    //             i.value = i.business_name;  //将想要展示的数据作为value
                
    //         }
    //         list = res.data.data;
    //         callback(list);
    //       }
    //     })
    //   // //从后台获取到对象数组
    //   // this.$axios.get(url).then((response)=>{
        
          
    //   // }).catch((error)=>{
    //   // console.log(error);
    //   // });
    // },
    // handleSelect(event) {
    //   console.log(event,'event');
    //   this.ruleForm.business_id = event.business_id;
    //   //console.log(this.ruleForm.business_id,'this.ruleForm.business_id');
    //   //debugger;
    // },
    // handleChange(event){
    //   this.ruleForm.address_code = event[event.length-1];
    //   console.log(this.ruleForm.address_code,'this.ruleForm.address_code')
    // },
    //  handleRemove(file, fileList) {
    //    this.ruleForm.shop_environment.splice(file.url,1)
    //     console.log(this.ruleForm.shop_environment,'shop_environment')
    // },
    // handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //     this.dialogVisible = true;
    // },
    // resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   },
    // shop_pic(res){
    //   this.ruleForm.shop_pic = res.data.url
    // },
    // shop_licence_pic(res){
    //     this.ruleForm.shop_licence_pic = res.data.url
    //   },
    //   shop_environment(res){
    //     this.ruleForm.shop_environment.push(res.data.url)
    //   },
    //   shop_sfz_pic_z(res){
    //     this.ruleForm.shop_sfz_pic_z = res.data.url
    //   },
    //   shop_sfz_pic_f(res){
    //     this.ruleForm.shop_sfz_pic_f = res.data.url
    //   },

      // getBusinessList(){

      //   this.$axios.get("/api/admin/select/businessList").then(res =>{
      //     if(res.data.code ==0){
      //       this.business_list = res.data.data;
      //     }


      //   })

      // } ,
      
      submit(){
        console.log(this.ruleForm,'this.ruleForm');
            this.$axios.post("/api/admin/shop/create", this.ruleForm).then(res => {

                      if(res.data.code == 0){

                          this.$alert('添加门店成功！')

                          this.$router.push('/shop/list')

                      }else{
                          this.$alert(res.data.msg)
                      }


                  }).catch((e)=>{

                    this.$alert('操作失败'+e)

                  })
      },
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
        }
      
    },


  mounted() {
    //this.getBusinessList();

    //如果是从审核门店中过来
    // if(this.$route.query.review){
    //   this.getReviewData(this.$route.query.review)
    // }
    

  },
  components: {
    BreadCrumb
    // formlist
  },

  created() {
    // let params = this.$route.params;
    // //如果是编辑门店
    // if (Object.keys(params).length) {
    //     this.edit = true;
    //     this.params = params;
    //     console.log(params,'params')
    //     this.$axios.get("/api/admin/shop/detail", { params: params }).then(res => {
    //       console.log(res.data.data,'data----data')
    //         this.ruleForm = res.data.data;
    //         // this.mapTX(this.ruleForm.position.latitude,this.ruleForm.position.longitude)
    //         // this.form1.category_id = res.data.data.category_id
    //         // this.getshopAccout(this.form1.create_user.shop_id)
    //         // this.loadMechanic();


    //     })
    // }else{
    // //   this.mapTX()
    // }

      
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
#atlas {
  width:100%;
  height:300px;
}
.avatar-uploader .el-upload--text {
  /* width: 146px;
  height: 146px; */
  font-size: 12px;
}
.shop-add-city-message{
  color:#606266;
  font-size:12px;
}
</style>
<style>
  .shop-add-city .el-form-item__content .area-selected-trigger{
   padding-top:2px;
 }
</style>

