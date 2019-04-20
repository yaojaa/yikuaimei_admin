<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="140px" class="demo-ruleForm">

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
                            <el-radio :label="6">偷偷美微掌柜</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="培训地址:" prop="train_address">
                        <el-input v-model="ruleForm.train_address"></el-input>
                    </el-form-item>
                    <el-form-item label="培训价格:" prop="train_price">
                        <el-input v-model="ruleForm.train_price"></el-input>
                    </el-form-item>
                    <el-form-item label="培训内容:" prop="train_content">
                        <el-input type="textarea" v-model="ruleForm.train_content" :rows="5"></el-input>
                    </el-form-item>
                    <el-form-item label="培训链接:" prop="train_url">
                        <el-input type="textarea" v-model="ruleForm.train_url" :rows="3"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="培训展示图:">
                        <el-upload
                        class="avatar-uploader"
                        action="/api/admin/fileupload/image"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
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
                    name: "加盟商管理"
                },
                {
                    name: "培训列表",
                    url: "/training/list"
                },
                {
                    name: "添加培训",
                    url: "/training/add"
                }
            ],
        ruleForm:{
            "id":"",
            "train_title" : "",//培训标题
            "train_type" : 1,// 培训类型 1门店5S管理培训 2店务培训 3美容服务技巧 4店长班 5服务话术培训 6偷偷美微掌柜
            "train_content" : "",//培训内容
            "train_url" : "",//培训链接
            "train_business_on" : 1,//加盟商是否接收
            "train_shop_on" : 0,//门店是否接收
            "train_pic":"",//培训展示图
            "train_address":"",//培训地址
            "train_price":""//培训价格
        },

        rules: {
            train_title: [
            { required: true, message: '请输入培训标题', trigger: 'blur' },
            ],
            train_type: [
            { required: true, message: '请选择培训类型', trigger: 'change' }
            ],
            train_content: [
            { required: true, message: '请填写培训内容', trigger: 'blur' }
            ],
            train_url: [
            { required: true, message: '请填写培训链接', trigger: 'blur' }
            ],
            train_business_on: [
            {  required: true, message: '请至少选择一个标签', trigger: 'change' }
            ],
            train_shop_on: [
            {  required: true, message: '请至少选择一个标签', trigger: 'change' }
            ],
            train_address: [
            { required: true, message: '请输入培训地址', trigger: 'blur' }
            ],
            train_price: [
            { required: true, message: '请填写培训价格', trigger: 'blur' }
            ]
        }
    };
  },
  methods:{
    handleAvatarSuccess(res, file) {
        this.ruleForm.train_pic = res.data.url;
      },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    submit(){
        let params = this.$route.params;
        this.ruleForm.id = params.id

        if (Object.keys(params).length) {
                 
            this.$axios.post("/api/admin/train/modify", this.ruleForm).then(res => {
                if(res.data.code == 0){
                    this.$alert('编辑成功！')
                    this.$router.push('/training/list')
                }else{
                    this.$alert(res.data.msg)
                }
            }).catch((e)=>{

                this.$alert('操作失败'+e)

            })
        }else{

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
        }

      },
    

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

    created() {
        let params = this.$route.params;
        if (Object.keys(params).length) {
            this.$axios.get("/api/admin/train/detail",{ params: params }).then(res => {
                this.ruleForm = res.data.data;
               
                //this.form1.category_id = res.data.data.category_id
                // this.getshopAccout(this.form1.create_user.shop_id)
                // this.loadMechanic();


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
</style>


