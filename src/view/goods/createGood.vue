<template>
   <div class="page" id="createGood">
        <!-- 面包屑 -->
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <!-- 面包屑 End -->

        <!-- tab 内容 -->
        <div class="page-content">
          <template>
            <el-tabs v-model="editName" @tab-click="handleClick">
              <el-tab-pane label="编辑基本信息" name="BasicInfo">
                <div class="panel">
                  <!-- 表单list -->
                  <el-form ref="BasicInfo" :model="BasicInfo" :rules="rules" label-width="120px">
                    <el-form-item label="名称：" prop="name">
                      <el-input  v-model="BasicInfo.name" placeholder="名称为2-30个字" />                                                    
                    </el-form-item>
                    <el-form-item label="商品卖点：" prop="sellingPoint">
                      <el-input type="textarea" v-model="BasicInfo.sellingPoint" placeholder="长度为2-50个字" suffix-icon="el-icon-arrow-right" />    
                      <p class="input__tabs">在商品详情页标题下面展示卖点信息，建议50字以内</p>                                                
                    </el-form-item>
                    <el-form-item label="行业分类：" prop="businesSort">
                      <el-input  v-model="BasicInfo.businesSort" placeholder="请选择所属行业分类" />                          
                    </el-form-item>
                    <el-form-item label="标签：" prop="lable" @click="showLableInfo = true">
                      <el-input  v-model="BasicInfo.lable" placeholder="请添加商品分类"  suffix-icon="el-icon-arrow-right" :on-icon-click="$_showLableInfo" readonly />
                      <p class="input__tabs">可设置多个标签</p>
                    </el-form-item>
                    <el-form-item label="规格" props="format">
                      <!-- format_none format_add -->
                      <el-radio-group v-model="BasicInfo.singleButton" @click="this.$_showFormatInfo">
                        <el-radio-button label="无规格"></el-radio-button>
                        <el-radio-button label="添加规格" @click="showFormatInfo = true"></el-radio-button>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="">
                      <el-row :gutter="20">
                        <el-col :span="4">名称</el-col>
                        <el-col :span="12">选项</el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :span="4">   
                          <el-input v-model="BasicInfo.input" placeholder="请输入名称"/>                        
                        </el-col>
                        <el-col :span="12"> 
                          <el-input v-model="BasicInfo.input" placeholder="请输入选项" suffix-icon=""/>
                          <i class="el-icon-plus"></i>                        
                        </el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :span="4">名称</el-col>
                        <el-col :span="12">选项</el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :span="4">                           
                          <el-input v-model="BasicInfo.input" placeholder="请输入名称"  disabled/>                           
                        </el-col>
                        <el-col :span="12">                           
                          <el-tag :closable="true" type="gray">标签一</el-tag>
                          <el-input v-model="BasicInfo.input" suffix-icon="" disabled />                     
                          <el-input v-model="BasicInfo.input" suffix-icon="el-icon-close" disabled :on-icon-click="handleIconClick" />                     
                          <el-input v-model="BasicInfo.input" suffix-icon="el-icon-close" disabled :on-icon-click="handleIconClick" />                     
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item label="库存：" prop="exist">
                      <el-input  v-model="BasicInfo.exist" placeholder="10000" suffix-icon="el-icon-arrow-right" />                                                    
                    </el-form-item>
                    <el-form-item label="单位：" prop="coupon">
                      <el-input  v-model="BasicInfo.coupon" placeholder="箱" suffix-icon="el-icon-arrow-right" />                                                                       
                    </el-form-item>
                    <el-form-item label="商品编码：" prop="productCode">
                      <el-input  v-model="BasicInfo.productCode" placeholder="支持14以内的数字+英文组合"  />                                                                              
                    </el-form-item>
                    <el-form-item label="售价：" prop="sellPrice">
                      <el-input  v-model="BasicInfo.sellPrice" placeholder="请输入套餐在婚博会标价" />                                                                                                        
                      <span class="outText">元</span>
                    </el-form-item>
                    <el-form-item label="原价：" prop="price">
                      <el-input  v-model="BasicInfo.price" placeholder="¥5000" />                                                                                                        
                      <span class="outText">元</span>
                    </el-form-item>
                    <el-form-item label="商品图片：" prop="productPng">
                      <div class="upload-title">
                        您可以上传3-6张图片及1个视频作为商品展示图，<br />
                        展示在商品页顶部的图片，支持上传1-6张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为1242*1242，支持JPG、PNG等大部分格式图片，单张图片大小不超过5M 
                      </div>
                      <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview(arguments[0],0)"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus upload-placeholder">
                          <p>添加图片</p><span>还可以添加6张</span>
                        </i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="" prop="uploadArray">
                      <div class="upload-title">
                        展示在商品页顶部的视频，<a>最多可上传 1 个视频</a>，
                        支持MP4视频格式，<a>视频大小不能超过20M</a>
                      </div>
                      <div class="uploadArray_content">
                        <el-upload
                          action="https://jsonplaceholder.typicode.com/posts/"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview(arguments[0],0)"
                          :on-remove="handleRemove">
                          <i class="el-icon-plus upload-placeholder productView">
                            <p>添加视频</p>
                          </i>
                        </el-upload>
                        <el-upload
                          action="https://jsonplaceholder.typicode.com/posts/"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview(arguments[0],0)"
                          :on-remove="handleRemove">
                          <i class="el-icon-plus upload-placeholder productViewFirstPng">
                            <p>添加视频首图</p>
                          </i>
                        </el-upload>
                      </div>
                    </el-form-item>
                    <el-form-item label="商品展示图：" prop="showPng">
                      <div class="upload-title">
                        <p>展示在商品页顶部的图片，支持上传 1 张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为400*400，支持JPG、PNG等大部分格式图片，单张图片大小不超过2M</p>
                      </div>
                      <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview(arguments[0],0)"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus upload-placeholder">
                          <p>添加图片</p><span>只能上传一张</span>
                        </i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit('form')">表单提交</el-button>
                      <el-button>下一步</el-button>
                      <el-button>取消</el-button>
                    </el-form-item>
                  </el-form>
                  <!-- 表单list End -->
                      
                  <!-- dialog_showLableInfo 弹框 -->
                  <el-dialog title="标签" :visible.sync="showLableInfo" size="large">
                    <div>
                      已选：
                      <el-tag
                        v-for="tag in tags"
                        :key="tag.name"
                        :closable="true"
                        :type="tag.type"
                      >
                      {{tag.name}}
                      </el-tag>
                    </div>
                    <el-button type="primary" icon="search">搜索</el-button>
                    <el-tabs type="border-card" tab-position="left">
                      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                      <!-- <el-tab-pane v-for="(item,idx) in list" :key="idx" label="item.lable">{{item.content}}</el-tab-pane> -->
                    </el-tabs>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="showLableInfo = false">取 消</el-button>
                      <el-button type="primary" @click="showLableInfo = false">确 定</el-button>
                    </div>
                  </el-dialog>
                  <!-- dialog 弹框 End -->

                  <!-- dialog showFormatInfo弹框 -->
                  <el-dialog title="添加规格" :visible.sync="showFormatInfo" size="large">
                    <el-row :gutter="20">
                      <el-col :span="4">&nbsp;</el-col>
                      <el-col :span="4">名称</el-col>
                      <el-col :span="12">选项</el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="4">一组</el-col>
                      <el-col :span="4">   
                        <el-input v-model="BasicInfo.input" placeholder="请输入名称"/>                        
                      </el-col>
                      <el-col :span="12"> 
                        <el-input v-model="BasicInfo.input" placeholder="请输入选项" suffix-icon=""/>
                        <i class="el-icon-plus"></i>                        
                      </el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="4">&nbsp;</el-col>
                      <el-col :span="4">名称</el-col>
                      <el-col :span="12">选项</el-col>
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="4">二组<p>(非必填)</p></el-col>
                      <el-col :span="4">                           
                        <el-input v-model="BasicInfo.input" placeholder="请输入名称"  disabled/>                           
                      </el-col>
                      <el-col :span="12">                           
                        <el-tag :closable="true" type="gray">标签一</el-tag>
                        <el-input v-model="BasicInfo.input" suffix-icon="" disabled />                     
                        <el-input v-model="BasicInfo.input" suffix-icon="el-icon-close" disabled :on-icon-click="handleIconClick" />                     
                        <el-input v-model="BasicInfo.input" suffix-icon="el-icon-close" disabled :on-icon-click="handleIconClick" />                     
                      </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="showFormatInfo = false">取 消</el-button>
                      <el-button type="primary" @click="showFormatInfo = false">确 定</el-button>
                    </div>
                  </el-dialog>
                  <!-- dialog 弹框 End -->                 
                </div>
              </el-tab-pane>
              <el-tab-pane label="编辑商品详情" name="ProductDetails">
                <!-- 表单list -->
                哈哈
                <!-- 表单list End -->
              </el-tab-pane>
            </el-tabs>
          </template>
            
        </div>
    </div>
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
  name: "tabletest",
  data() {
    return {
      editName: 'BasicInfo', // tab标签默认定位
      url: "",
      BasicInfo:{},
      showLableInfo:false,
      showFormatInfo:false,
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur' }
          ],
          sellingPoint: [
            { required: true, message: '请填写商品卖点', trigger: 'blur' },
            { min: 2, max: 50, message: '请填写商品卖点', trigger: 'blur' }
          ],
          businesSort: [
            { required: true, message: '请选择所属行业分类', trigger: 'blur' }
          ],
          lable: [
            { required: true, message: '请添加标签', trigger: 'blur' },
          ],
          format: [
            { required: true, message: '请选择规格', trigger: 'change' }
          ],
          exist: [
            { required: true, message: '请选择库存', trigger: 'blur' },
          ],
          coupon: [
            { required: true, message: '请选择单位', trigger: 'blur' },
          ],
          productCode: [
            { required: true, message: '请填写商品编码', trigger: 'blur' },
          ],
          sellPrice: [
            { required: true, message: '请填写售价', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请填写原价', trigger: 'blur' },
          ],
        },
      breadcrumb: [
        //面包屑
        {
          name: "商品管理" //名字
        },
        {
          name: "平台商品", //名字
          url: '/goodList'
        },
        {
          name: "添加商品" //名字
        }
      ],
      options: [
        {
          name: "productPng",
          type: "upload",
          label: "商品图片：",
          title: "您可以上传3-6张图片及1个视频作为商品展示图，<br />展示在商品页顶部的图片，支持上传1-6张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为1242*1242，支持JPG、PNG等大部分格式图片，单张图片大小不超过5M ",
          placeholder: "<p>添加图片</p><span>还可以添加6张</span>",
          value: ""
        },
        // @TODO 文字有高亮 && 添加图片，还可以添加6张 & 添加视频 & 添加视频首图
        {
          name: "uploadArray",
          type: "uploadArray",
          title:'展示在商品页顶部的视频，<a>最多可上传 1 个视频</a>，支持MP4视频格式，<a>视频大小不能超过20M</a>',
          content:[{
            name: "productView",
            label: "",
            placeholder: "<p>添加视频</p>",
          },
          {
            name: "productViewFirstPng",
            label: "",
            placeholder: "<p>添加视频首图</p>",
          }]
        },
        {
          name: "showPng",
          type: "upload",
          label: "商品展示图：",
          title:'<p>展示在商品页顶部的图片，支持上传 1 张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为400*400，支持JPG、PNG等大部分格式图片，单张图片大小不超过2M</p>',          
          placeholder: "<p>添加图片</p><span>只能上传一张</span>",
          value: ""
        },
        {
          name: "next",
          type: "button",
          value: "下一步"
        }
      ],
      options2: [
        {
          name: "name",
          type: "textarea",
          label: "补充说明：",
          placeholder: '请填写购买须知',
          rules: [
            {
              required: true,
              message: "请填写购买须知",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "showPng",
          type: "upload",
          label: "商品展示图：",
          title:'<p>展示在商品的图片详情中的图片，至少上传1张，拖拽图片调整图片顺序，双击可预览大图，图片1242*1242px，单张图片不要超过5M，支持JPG、PNG等常见图片格式。</p>',          
          placeholder: "<p>添加图片</p><span>还可以添加6张</span>",
          value: ""
        },
      ],
      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'gray' },
          { name: '标签三', type: 'primary' },
          { name: '标签四', type: 'success' },
        ]
    };
  },
  components: {
    BreadCrumb
  },
  created() {},
  computed: {},
  methods: {
    $_showLableInfo(){
      console.log(111)
      this.showLableInfo = true
    },

    $_showFormatInfo(){
      this.showFormatInfo=true
    },
    /** *
     * tab标签切换事件
     */
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleIconClick(){},
    handlePictureCardPreview(file, index) {
      // let { name } = this.formdata[index];
      // this.form[name] = file.url;
      // this.dialogVisible = true;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
  }
};
</script>

<style>
#createGood .panel{
  padding:20px 0
}

#createGood .input__tabs{
  color: rgba(68, 70, 90, 1);
  font-size: 12px;
}

#createGood .el-input--small, .el-textarea__inner{
  max-width: 260px
}

#createGood .el-radio-button__inner{
  margin-right: 10px;
  border-left: 1px solid #dcdfe6;
  border-radius: 4px !important;
}

#createGood .search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}

#createGood .dialog_format{
  display: flex;
  flex-direction:row;
}
#createGood .dialog_format>div{
  flex:1
}

#createGood .outText {
  position: absolute;
  right: -20px;
  top: 0;
}

#createGood .upload-title{
  max-width: 500px;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  text-align: left;
  font-family: bold
}


#createGood #formItem .el-input__suffix{
  right: 0;
  border-radius: 4px;
}

#createGood .el-input__suffix{
  right: 0;
  border-radius: 4px;
  background-color: rgba(114, 36, 216, 1);
  border: 1px solid rgba(114, 36, 216, 1);
}

#createGood .el-input__suffix i {
  width: 15px
}

#createGood .el-upload--picture-card{
  position: relative;
}

#createGood .upload-placeholder {
  position: absolute;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100%
}

#createGood .upload-placeholder p{
  color: rgba(102, 102, 102, 1);
  font-size: 15px;
  text-align: left;
  margin-bottom: 10px
}

.upload-placeholder span{ 
  color: rgba(153, 153, 153, 1);
  font-size: 15px;
  left: 804px;
}

#createGood .uploadArray_content{
  display: flex;
  flex-direction: row
}

.uploadArray_content div{
  margin-right:20px;
  border-left-width: 1px
}
</style>
