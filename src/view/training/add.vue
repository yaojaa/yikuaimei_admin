<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>培训</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">

                    <el-form-item label="培训标题:" prop="train_title">
                        <el-input v-model="ruleForm.train_title"></el-input>
                    </el-form-item>

                    <el-form-item label="培训类型:" prop="train_type">
                        <el-radio-group v-model="ruleForm.train_type">
                            <el-radio :label="1">门店5S管理培训</el-radio>
                            <el-radio :label="2">店务培训</el-radio>
                            <el-radio :label="3">美容服务技巧</el-radio>
                            <el-radio :label="4">店长班</el-radio>
                            <el-radio :label="5">服务话术培训</el-radio>
                            <el-radio :label="5">偷偷美微掌柜</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="培训内容:" prop="train_content">
                        <el-input type="textarea" v-model="ruleForm.train_content" :rows="10"></el-input>
                    </el-form-item>
                    <el-form-item label="培训链接:" prop="train_url">
                        <el-input type="textarea" v-model="ruleForm.train_url" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="培训地址:" prop="train_address">
                        <el-input v-model="ruleForm.train_address"></el-input>
                    </el-form-item>
                    <el-form-item label="培训价格:" prop="train_price">
                        <el-input v-model="ruleForm.train_price"></el-input>
                    </el-form-item>
                    <el-form-item label="培训展示图:">
                        <el-upload
                        class="avatar-uploader"
                        action="/api/admin/fileupload/image"
                        :show-file-list="false"
                        :on-success="train_pic"
                        :on-remove="handleRemove"
                        >
                        <img width="100%" v-if="ruleForm.train_pic" :src="ruleForm.train_pic" >
                        <div  v-else style="padding-top: 10%">
                        <i class="el-icon-plus" style="font-size: 48px"></i>
                        </div>
                    </el-upload>
                    </el-form-item>

                    <el-form-item label="加盟商是否接收:" prop="train_business_on">
                        <el-radio-group v-model="ruleForm.train_business_on">
                            <el-radio :label="0">不接收</el-radio>
                            <el-radio :label="1">接收</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="门店是否接收:" prop="train_shop_on">
                        <el-radio-group v-model="ruleForm.train_shop_on">
                            <el-radio :label="0">不接收</el-radio>
                            <el-radio :label="1">接收</el-radio>
                        </el-radio-group>
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
        "train_title" : "",//培训标题
        "train_type" : 1,// 培训类型 1门店5S管理培训 2店务培训 3美容服务技巧 4店长班 5服务话术培训 6偷偷美微掌柜
        "train_content" : "",//培训内容
        "train_url" : "",//培训链接
        "train_business_on" : "1",//加盟商是否接收
        "train_shop_on" : "0",//门店是否接收
        "train_pic":"",//培训展示图
        "train_address":"",//培训地址
        "train_price":""//培训价格
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
        }
    };
  },
  methods:{
      train_pic(res){
      this.ruleForm.train_pic = res.data.url
    },
    handleRemove(file, fileList) {
       this.ruleForm.shop_environment.splice(file.url,1)
        console.log(this.ruleForm.shop_environment,'shop_environment')
    }
    

      // getBusinessList(){

      //   this.$axios.get("/api/admin/select/businessList").then(res =>{
      //     if(res.data.code ==0){
      //       this.business_list = res.data.data;
      //     }


      //   })

      // } ,
      
      
      
    },


  mounted() {},
  components: {
    BreadCrumb
  },

  created() {},
  computed: {}
};
</script>

<style scoped>

.page-content{
    padding:30px 40px;
    background-color: #fff;
}
.demo-ruleForm{
    /* width: 524px; */
}
</style>


