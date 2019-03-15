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
                        <el-select v-model="form.limits.limit_cycle">
                            每
                            <el-option label="日" value="1" ></el-option>
                            <el-option label="日" value="2" ></el-option>
                            <el-option label="日" value="3" ></el-option>
                            
                        </el-select>
                        <el-input v-model="form.limits.limit_times"></el-input>
                        次
                    </el-form-item>

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
                "limit_cycle" : 1, // 限制周期  1 日 2周 3月
                "limit_times" : 10, // 周期内限制使用次数
                "limit_total_times" : 0, // 次数限制 0 不限
            },
            "coupon_in_shop":0
            
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
</style>


