<template>
   <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        




<div class="panel">
<el-steps   :active="step" finish-status="success" align-center>
  <el-step  @click.native="goNextStep(1)" title="顾客信息"></el-step>
  <el-step  @click.native="goNextStep(2)" title="检测报告"></el-step>
  <el-step  @click.native="goNextStep(3)" title="案列详情"></el-step>
  <el-step  @click.native="goNextStep(4)" title="商品服务"></el-step>
</el-steps>


<!--step start-->

<div class="form-panel p-xl" v-if="step==1">
 <!--form start-->
 <el-form :model="form1" :rules="rules" ref="form1" label-width="100px" class="demo-ruleForm">

  <h3 class="form_title_label">发布人信息：</h3>
  <el-form-item label="发布门店">
    <el-autocomplete
      class="inline-input"
      v-model="form1.create_user.shop_name"
      :fetch-suggestions="querySearch"
      :debounce=300
      placeholder="请输入门店名称"
      @select="handleSelectShopName"
    ></el-autocomplete>

  </el-form-item>

      <el-form-item label="所属行业">
    <el-select @change="loadMechanic(form1.category_id)" v-model="form1.category_id" placeholder="请选择所属行业">
      <el-option label="美容" value="美容"></el-option>
      <el-option label="美甲美睫" value="美甲美睫"></el-option>
      <el-option label="美发" value="美发"></el-option>
      <el-option label="美体" value="美体"></el-option>
      <el-option label="轻医美" value="轻医美"></el-option>
    </el-select>
  </el-form-item>

<el-form-item label="发布人">
 <el-select v-model="form1.create_user.user_name" placeholder="请选择发布人">
      <el-option v-for="(el,index) in accountList" :label="el.shop_account_name" value="el.shop_account_id">{{el.shop_account_name}}</el-option>
    </el-select>
  </el-form-item>
  <!-- /api/admin/select/shopAccountList  -->

  <el-form-item label="发布人职务">
    <el-select v-model="form1.create_user.mechanic" placeholder="请选择发布人职务">
            <el-option v-for="(el,index) in mechanicList" :label="el.mechanic_name" :value="el.mechanic_id"></el-option>

    </el-select>
  </el-form-item>

  

     <h3 class="form_title_label">顾客信息:</h3>

    <el-form-item label="姓名">
   <el-input v-model="form1.user_info.user_name" placeholder=""></el-input>

  </el-form-item>
  <el-form-item label="手机号">
   <el-input v-model="form1.user_info.user_phone" placeholder=""></el-input>

  </el-form-item>

  <el-form-item label="出生日期">
   <el-input v-model="form1.user_info.user_birth" placeholder=""></el-input>

  </el-form-item>

  <el-form-item label="身高">
   <el-input v-model="form1.user_info.user_height" placeholder=""></el-input>

  </el-form-item>

  <el-form-item label="体重">
   <el-input v-model="form1.user_info.user_weight" placeholder="请输入发布人姓名"></el-input>

  </el-form-item>

 <el-form-item label="职业">
   <el-input v-model="form1.user_info.user_job" placeholder="请输入发布人姓名"></el-input>

  </el-form-item>

    <el-form-item label="皮肤现状">
    <el-input type="textarea" v-model="form1.user_info.skin"></el-input>
  </el-form-item>

    <el-form-item label="临床诊断" prop="desc">
    <el-input type="textarea" v-model="form1.user_info.diagnosis"></el-input>
  </el-form-item>
    <el-form-item label="上传图片">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="handleFaceUploadSuccess"
           >
          <img width="100%" v-if="form1.user_info.pic_before" :src="form1.user_info.pic_before" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>


  </el-form-item>

  <el-form-item label="上传图片" prop="pic_after">

         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="handleFaceUploadSuccessAfter"
           >
          <img width="100%" v-if="form1.user_info.pic_after" :src="form1.user_info.pic_after" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </el-form-item> 

  <el-form-item>
    <el-button type="primary" @click="goNextStep(2)" >下一步</el-button>
 </el-form-item>
</el-form>

<!--form end-->
                </div>

<!--step end-->

<!--step2 start-->
<div class="form-panel p-xl" v-if="step==2">
 <!--form start-->
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  
    <el-form-item label="上传检测报告" prop="report">

        <el-upload
          class="upload-demo"
          drag
          action="/api/admin/fileupload/image"
          :on-success="handleReportUploadSuccess"

          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>before</em></div>
        </el-upload>
  </el-form-item>

  

  <el-form-item>
    <el-button type="primary" @click="goNextStep(3)" >下一步</el-button>
 </el-form-item>
</el-form>
</div>

<!--step end-->

<!--step3 start-->

<div class="form-panel p-xl" v-if="step==3">
 <!--form start-->
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <el-form-item label="专家建议">
       <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="form1.expert_suggest.content">
      </el-input>
  </el-form-item>

<el-upload
  class="uploader_small"
  multiple="true"
  file-list ="form1.expert_suggest.pic_list"
  action="/api/admin/fileupload/image"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

<!--上传ITEM -->
 <el-form-item label="产品或仪器介绍" prop="desc">
       <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
  </el-form-item>

  <el-upload
  class="uploader_small"
  multiple="true"
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<!--上传ITEM-->

<!--上传ITEM -->
 <el-form-item label="操作流程或视频" prop="desc">
       <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
  </el-form-item>

  <el-upload
  class="uploader_small"
  multiple="true"
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<!--上传ITEM-->

<!--上传ITEM-->
 <el-form-item label="操作记录" prop="desc">
       <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
  </el-form-item>

  <el-upload
  class="uploader_small"
  multiple="true"
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<!--上传ITEM-->


<!--上传ITEM-->
 <el-form-item label="两次数据对比" prop="desc">
       <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
  </el-form-item>

  <el-upload
  class="uploader_small"
  multiple="true"
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<!--上传ITEM-->

<!--上传ITEM-->
 <el-form-item label="专家解析" prop="desc">
       <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
  </el-form-item>

  <el-upload
  class="uploader_small"
  multiple="true"
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<!--上传ITEM 点评师点评-->

<!--上传ITEM-->
 <el-form-item label="点评师点评" prop="desc">
       <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
  </el-form-item>

  <el-upload
  class="uploader_small"
  multiple="true"
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<!--上传ITEM 点评师点评-->







  
  <el-form-item>
    <el-button type="primary" @click="goNextStep(3)" >下一步</el-button>
 </el-form-item>
</el-form>
</div>

<!--step end-->
<!--step end-->



            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import formlist from "@/components/formlist";

export default {
  name: "tabletest",
  data() {
    return {
      step: 1,
      breadcrumb: [
        //面包屑
        {
          name: "案例" //名字
        },
    
        {
          name: "添加案例" //名字
        }
      ],
      accountList:[],
      mechanicList:[],//职务列表
    form1:{
    "category_id":'',//行业id
    "create_user":{//创建人信息
        "user_name":'',
        "shop_name":'',
        "shop_id":0,//门店id
        "shop_account_id":1,//门店账号id
        "mechanic": '', //职务名称
        "shop_account_melevel":1//职称级别id
    },
    "user_info":{//顾客信息
        "user_name":"顾客2",//姓名
        "user_phone":"18666666666",//手机
        "user_birth":"1995-06-09",//生日
        "user_height":163,//身高单位CM
        "user_weight":49,//体重单位KG
        "user_job":"术士",//工作
        "skin":"皮肤现状",
        "diagnosis":"临床诊断",
        "pic_before":"",//图片before
        "pic_after":""//图片after
    },
    "report":[],//检测报告
    "expert_suggest":{
        "content":"专家建议内容",
        "pic_list":["1.jpg","2.jpg","3.jpg"]//图片或视频列表
    },
    "product_introduce":{
        "content":"产品介绍内容",
        "pic_list":["1.jpg","2.jpg","3.jpg"]
    },
    "operate_process":{
        "content":"操作流程内容",
        "pic_list":["1.jpg","2.jpg","3.jpg"]
    },
    "operate_record":{
        "content":"操作记录内容",
        "pic_list":["1.jpg","2.jpg","3.jpg"]
    },
    "data_contrast":{
        "content":"两次数据对比内容",
        "pic_list":["1.jpg","2.jpg","3.jpg"]
    },
    "expert_analysis":{
        "content":"专家解析内容",
        "pic_list":["1.jpg","2.jpg","3.jpg"]
    },
    "expert_review":{
        "content":"点评师点评内容",
        "pic_list":["1.jpg","2.jpg","3.jpg"]
    },
    "goods_id_list":[119,120],//商品id数组
    "service_id_list":[109,110,111,112]//服务id数组
},
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
  components: {
    BreadCrumb,
    formlist
  },
  created() {},
  computed: {},
  methods: {

    handleReportUploadSuccess(res,file){

      console.log(res.data.url)

     this.form1.report.push(res.data.url)


    },
    handleFaceUploadSuccess(res, file) {
       this.form1.user_info.pic_before = res.data.url
      },
    handleFaceUploadSuccessAfter(res, file) {
       this.form1.user_info.pic_after = res.data.url
      },


    handleSelectShopName(item){
      this.form1.create_user.shop_id = item.id
      this.getshopAccout(item.id)
    },

    getshopAccout(shop_id){

      this.$axios.get('/api/admin/select/shopAccountList?shop_id'+shop_id)
      .then(res=>{
        this.accountList = res.data.data
      })

    },

    loadMechanic(category_id){

      const MAP= {
        '美容':1,
       '美甲美睫':2 ,
       '美发':3,
        '美体':4,
         '轻医美':5
       }

      this.$axios.get('/api/admin/select/mechanic?category_id='+MAP[category_id])
      .then(res=>{
        this.mechanicList = res.data.data
      })

    },

    //mechanicList
    //下一步
    goNextStep(n){
      this.step = n
    },
        //搜索门店
       querySearch(queryString, cb) {

        this.load_shop_list(queryString).then(data=>{


                  let source_data= data.map((it)=>{
                    return {"value":it.shop_name,"id": it.shop_id}
                  })

                   // 调用 callback 返回建议列表的数据
                 cb(source_data)

        })

      },

      load_shop_list(s) {
        return new Promise((resolve,reject)=>{
          this.$axios.get('/api/admin/select/shopList?shop_name='+s).then(res=>{
               
               if(res.data.code ==0){
                    resolve(res.data.data)
               }else{
                    reject(res.data.msg)
               }
          
        })
        })

      }
}
}
</script>

<style scoped>
  .el-upload--text{
     width: 100px;
     height:100px;
    line-height: 100px
  }


h3.form_title_label{
  padding: 28px 0
}
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}

/*.uploader_small {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height:100px;
  }
  .uploader_small:hover {
    border-color: #409EFF;
  }
*/


</style>
