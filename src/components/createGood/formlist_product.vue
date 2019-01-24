<template>
    <!-- 表单list -->
    <el-form ref="formInfo" :model="formInfo" :rules="rules" label-width="120px">
    <el-form-item label="商品展示图：" prop="productPng">
        <div class="upload-title">
        展示在商品的图片详情中的图片，至少上传1张，拖拽图片调整图片顺序，双击可预览大图，图片1242*1242px，单张图片不要超过5M，支持JPG、PNG等常见图片格式。
        </div>
        <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview(arguments[0],0)"
        :on-remove="handleRemove"
        :file-list="formInfo.show_img_arr">
        >
        <i class="el-icon-plus upload-placeholder">
            <p>添加图片</p><span>还可以添加6张</span>
        </i>
        </el-upload>
    </el-form-item>
    <el-form-item label="补充说明：">
        <el-input type="textarea" v-model="formInfo.good_notes" placeholder="请填写购买须知" suffix-icon="el-icon-arrow-right" />    
        <p class="input__tabs">请填写购买须知</p>  
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="$_changeTab">上一步</el-button>
        <el-button @click="createProduct">上架</el-button>
    </el-form-item>
    </el-form>
    <!-- 表单list End -->
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "createGood-formlist",

  data() {
    return {
      // @TODO
      rules: {
        good_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在2-30个字符", trigger: "blur" }
        ],
        good_explain: [
          { required: true, message: "请填写商品卖点", trigger: "blur" },
          { min: 2, max: 50, message: "请填写商品卖点", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "请选择所属行业分类", trigger: "blur" }
        ],
        tag_id_arr: [
          { required: true, message: "请添加标签", trigger: "blur" }
        ],
        format: [{ required: true, message: "请选择规格", trigger: "change" }],
        exist: [{ required: true, message: "请选择库存", trigger: "blur" }],
        unit: [{ required: true, message: "请选择单位", trigger: "blur" }],
        productCode: [
          { required: true, message: "请填写商品编码", trigger: "blur" }
        ],
        sellPrice: [{ required: true, message: "请填写售价", trigger: "blur" }],
        price: [{ required: true, message: "请填写原价", trigger: "blur" }]
      }
    };
  },

  computed: {
    ...mapState('createdGoode',['formInfo','lableList']) // 可选标签数据
  },

  methods: {
    handlePictureCardPreview(file, index) {
      // let { name } = this.formdata[index];
      // this.form[name] = file.url;
      // this.dialogVisible = true;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    /** *
     * 创建，调用创建接口
     */
    createProduct() {
      console.log(this.create);
      alert("创建成功");
    },

    /** *
     * 切换tab
     */
    $_changeTab() {
      this.$emit("changeTab");
    }
  }
};
</script>
<style>
</style>


