<template>
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
        <el-select v-model="BasicInfo.businesSort" placeholder="请选择所属行业分类">
            <el-option
            v-for="item in businesSortOptions"
            :key="item.value"
            :label="item.label"/>
        </el-select>                         
    </el-form-item>
    <el-form-item label="标签：" prop="lable">
        <el-input  v-model="BasicInfo.lable" placeholder="请添加商品分类"  suffix-icon="el-icon-arrow-right" @focus="$_showLable" readonly />
        <p class="input__tabs">可设置多个标签</p>
    </el-form-item>
    <el-form-item label="规格" props="format">
        <!-- format_none format_add -->
        <el-radio-group v-model="BasicInfo.singleButton" @change="this.$_showFormat">
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
            <el-input v-model="BasicInfo.input" suffix-icon="el-icon-close" disabled :on-icon-click="$_deleted" />                     
            <el-input v-model="BasicInfo.input" suffix-icon="el-icon-close" disabled :on-icon-click="$_deleted" />                     
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
</template>

<script>
export default {
  name: "createGood-formlist",

  data() {
    return {
      BasicInfo: {},
      showLable: false, // 展示标签
      businesSortOptions: [
        {
          value: "0",
          label: "美容"
        },
        {
          value: "1",
          label: "美发"
        },
        {
          value: "1",
          label: "美甲"
        },
        {
          value: "2",
          label: "美体"
        },
        {
          value: "3",
          label: "青医美"
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在2-30个字符", trigger: "blur" }
        ],
        sellingPoint: [
          { required: true, message: "请填写商品卖点", trigger: "blur" },
          { min: 2, max: 50, message: "请填写商品卖点", trigger: "blur" }
        ],
        businesSort: [
          { required: true, message: "请选择所属行业分类", trigger: "blur" }
        ],
        lable: [{ required: true, message: "请添加标签", trigger: "blur" }],
        format: [{ required: true, message: "请选择规格", trigger: "change" }],
        exist: [{ required: true, message: "请选择库存", trigger: "blur" }],
        coupon: [{ required: true, message: "请选择单位", trigger: "blur" }],
        productCode: [
          { required: true, message: "请填写商品编码", trigger: "blur" }
        ],
        sellPrice: [{ required: true, message: "请填写售价", trigger: "blur" }],
        price: [{ required: true, message: "请填写原价", trigger: "blur" }]
      }
    };
  },
  props: {
    showFormatInfo: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  methods: {
    $_deleted() {
      console.log("deleted");
    },
    /** *
     * 展示标签
     */
    $_showLable() {
      console.log(111);
      this.$emit("changeLableStatus");
    },

    /** *
     * 展示规格
     */
    $_showFormat() {
      this.$emit("changeFormatStatus");
    },

    handlePictureCardPreview(file, index) {
      // let { name } = this.formdata[index];
      // this.form[name] = file.url;
      // this.dialogVisible = true;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    }
  },
  created() {}
};
</script>
<style>
</style>


