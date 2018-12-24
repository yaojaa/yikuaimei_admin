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
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  <h3 class="form_title_label">发布人信息：</h3>
  <el-form-item label="发布门店" prop="name">
    <el-autocomplete
      class="inline-input"
      v-model="ruleForm.name"
      :fetch-suggestions="querySearch"
      placeholder="请输入门店名称"
      @select="handleSelect"
    ></el-autocomplete>

  </el-form-item>

<el-form-item label="发布人">
   <el-input v-model="form.name" placeholder="请输入发布人姓名"></el-input>

  </el-form-item>
  <el-form-item label="发布人职务">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="中级" value="shanghai"></el-option>
      <el-option label="高级" value="beijing"></el-option>
    </el-select>
  </el-form-item>

      <el-form-item label="所属行业">
    <el-select v-model="ruleForm.region" placeholder="请选择所属行业">
      <el-option label="中级" value="shanghai"></el-option>
      <el-option label="高级" value="beijing"></el-option>
    </el-select>
  </el-form-item>

    <el-form-item label="所属职务">
    <el-select v-model="ruleForm.region" placeholder="请选择所属职务">
      <el-option label="中级" value="shanghai"></el-option>
      <el-option label="高级" value="beijing"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="活动区域" prop="form.region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>

    <h3 class="form_title_label">顾客信息:</h3>

    <el-form-item label="姓名">
   <el-input v-model="form.user_info.user_name" placeholder="请输入发布人姓名"></el-input>

  </el-form-item>

  <el-form-item label="手机号">
   <el-input v-model="form.name" placeholder="请输入发布人姓名"></el-input>

  </el-form-item>

  <el-form-item label="出生日期">
   <el-input v-model="form.name" placeholder="请输入发布人姓名"></el-input>

  </el-form-item>

  <el-form-item label="身高">
   <el-input v-model="form.name" placeholder="请输入发布人姓名"></el-input>

  </el-form-item>

  <el-form-item label="体重">
   <el-input v-model="form.name" placeholder="请输入发布人姓名"></el-input>

  </el-form-item>

 <el-form-item label="职业">
   <el-input v-model="form.name" placeholder="请输入发布人姓名"></el-input>

  </el-form-item>

    <el-form-item label="皮肤现状" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>

    <el-form-item label="临床诊断" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
    <el-form-item label="上传图片" prop="desc">
        <el-upload
          class="upload-demo"
          drag
          action="/api/admin/fileupload/image"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>before</em></div>
        </el-upload>
  </el-form-item>

  <el-form-item label="上传图片" prop="desc">

        <el-upload
          class="upload-demo"
          drag
          action="/api/admin/fileupload/image"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>after</em></div>
        </el-upload>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="goNextStep(1)" >下一步</el-button>
<!--     <el-button @click="resetForm('ruleForm')">重置</el-button>
 -->  </el-form-item>
</el-form>

<!--form end-->
                </div>

<!--step end-->

<!--step2 start-->

<div class="form-panel p-xl" v-if="step==2">
 <!--form start-->
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  
    <el-form-item label="上传检测报告" prop="desc">

        <el-upload
          class="upload-demo"
          drag
          action="/api/admin/fileupload/image"
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
   <el-form-item label="专家建议" prop="desc">
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

<!--step4 start-->

<div class="form-panel p-xl" v-if="step==4">
 <!--form start-->
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  
<!--     <el-form-item label="选择商品或服务" prop="desc">


  </el-form-item> -->

  <h3>商品服务：（选择案例包含的商品或服务）</h3>

  <el-tabs type="border-card">
  <el-tab-pane label="商品">
    <ul>
      <li>商品名称</li>
    <li>商品名称</li>
  <li>商品名称</li>
<li>商品名称</li>
<li>商品名称</li>
</ul>
  </el-tab-pane>
  <el-tab-pane label="服务">
        <ul>
      <li>服务名称</li>
    <li>服务名称</li>
  <li>服务名称</li>
<li>服务名称</li>
<li>服务名称</li>
</ul>
  </el-tab-pane>
</el-tabs>

  

  <el-form-item>
    <el-button type="primary" @click="goNextStep(4)" >提交</el-button>
 </el-form-item>
</el-form>
</div>

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
      step: 4,
      breadcrumb: [
        //面包屑
        {
          name: "案例" //名字
        },
    
        {
          name: "添加案例" //名字
        }
      ],
      form:{
    "category_id":1,//行业id
    "create_user":{//创建人信息
        "shop_id":6,//门店id
        "shop_account_id":1,//门店账号id
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
        "pic_before":"/1.jpg",//图片before
        "pic_after":"/2.jpg"//图片after
    },
    "report":["r1.jpg","r2.jpg"],//检测报告
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
    //下一步
    goNextStep(n){
      this.step = n
    },
       handleSelect(){},
        //搜索门店
       querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
      },
      loadAll() {

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
