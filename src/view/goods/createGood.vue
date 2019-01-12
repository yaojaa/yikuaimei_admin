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
            <el-tabs v-model="editName">
              <el-tab-pane label="编辑基本信息" name="BasicInfo">
                <div class="panel">
                  <!-- base 表单 -->
                  <Formlist 
                    :formInfo = "formInfo"
                    @changeLableStatus="$_changeLableStatus"
                    @changeFormatStatus="$_changeFormatStatus"
                    @changeTab="$_changeTab"
                  />
                  <!-- base 表单 End-->

                  <!-- 添加标签弹框 -->
                  <Lable 
                    :tagIdArr = "formInfo.tag_id_arr" 
                    :shopgoods="shopgoods"
                    @addLable = "$_addLable"
                    ref="lable" />
                  <!-- 添加标签弹框 End -->

                  <!-- 添加规格弹框 -->
                  <Formate    
                    :formInfo = "formInfo"
                    @addFormat="$_addFormat"
                    ref="formate"
                    />
                  <!-- 添加规格弹框  End-->
                </div>
              </el-tab-pane>
              <el-tab-pane label="编辑商品详情" name="ProductDetails">
                <!-- product 表单 -->
                <FormlistProduct
                  :formInfo = "formInfo"
                  @changeTab="$_changeTab"
                />
                <!-- product 表单 End -->
              </el-tab-pane>
            </el-tabs>
          </template>          
        </div>
    </div>
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import Formate from "@/components/createGood/formate";
import Formlist from "@/components/createGood/formlist";
import FormlistProduct from "@/components/createGood/formlist_product";
import Lable from "@/components/createGood/lable";

import { breadcrumb } from "../../constans/createdGood";
import { mapState, mapActions } from "vuex";

export default {
  name: "tabletest",
  components: {
    BreadCrumb,
    Formate,
    Formlist,
    Lable,
    FormlistProduct
  },

  data() {
    return {
      breadcrumb, //面包屑
      editName: "BasicInfo", // tab标签默认定位
    };
  },

  created() {
    console.log(this.formInfo);
    // @TODO 获取可选规格 this.shopgoods = "axios 请求回来的数据";
  },

  computed: {
    ...mapState({
      formInfo: state => state.createdGoode.formInfo, // form 表格数据
      shopgoods: state => state.createdGoode.shopgoods // 可选标签数据
    })
  },

  methods: {
    /**
     * 展示标签弹框
     */
    $_changeLableStatus() {
      this.$refs.lable.lable_show = true;
    },

    /**
     * 展示规格弹框
     */
    $_changeFormatStatus() {
      this.$refs.formate.format_show = true;
    },

    /** *
     * 导航切换
     */
    $_changeTab(tab, event) {
      this.editName =
        this.editName === "ProductDetails" ? "BasicInfo" : "ProductDetails";
    },

    /** *
     * @TODO 添加规格 formInfo 应该是个数组
     */
    $_addFormat(formatInfo) {
      this.formInfo.formatInfo = formatInfo;
    },

    /**
     * 添加标签
     */
    $_addLable(tag_id_arr) {
      this.formInfo.tag_id_arr = tag_id_arr;
    }
  }
};
</script>

<style>
#createGood .panel {
  padding: 20px 0;
}

#createGood .input__tabs {
  color: rgba(68, 70, 90, 1);
  font-size: 12px;
}

#createGood .el-input--small,
.el-textarea__inner {
  max-width: 260px;
}

#createGood .el-radio-button__inner {
  margin-right: 10px;
  border-left: 1px solid #dcdfe6;
  border-radius: 4px !important;
}

#createGood .dialog_format {
  display: flex;
  flex-direction: row;
}
#createGood .dialog_format > div {
  flex: 1;
}

#createGood .outText {
  position: absolute;
  right: -20px;
  top: 0;
}

#createGood .upload-title {
  max-width: 500px;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  text-align: left;
  font-family: bold;
}
#createGood .el-dialog {
  width: 80%;
}

#createGood #formItem .el-input__suffix {
  right: 0;
  border-radius: 4px;
}

#createGood .el-input__suffix {
  right: 0;
  border-radius: 4px;
  background-color: rgba(114, 36, 216, 1);
  border: 1px solid rgba(114, 36, 216, 1);
}

#createGood .el-input__suffix i {
  width: 15px;
}

#createGood .el-upload--picture-card {
  position: relative;
}

#createGood .upload-placeholder {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#createGood .upload-placeholder p {
  color: rgba(102, 102, 102, 1);
  font-size: 15px;
  text-align: left;
  margin-bottom: 10px;
}

.upload-placeholder span {
  color: rgba(153, 153, 153, 1);
  font-size: 15px;
  left: 804px;
}

#createGood .uploadArray_content {
  display: flex;
  flex-direction: row;
}

.uploadArray_content div {
  margin-right: 20px;
  border-left-width: 1px;
}

#createGood .dialog_format {
  display: flex;
  flex-direction: row;
}
#createGood .dialog_format > div {
  flex: 1;
}

#createGood .outText {
  position: absolute;
  right: -20px;
  top: 0;
}

#createGood .upload-title {
  max-width: 500px;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  text-align: left;
  font-family: bold;
}

#createGood #formItem .el-input__suffix {
  right: 0;
  border-radius: 4px;
}

#createGood .el-input__suffix {
  right: 0;
  border-radius: 4px;
  background-color: rgba(114, 36, 216, 1);
  border: 1px solid rgba(114, 36, 216, 1);
}

#createGood .el-input__suffix i {
  width: 15px;
}

#createGood .el-upload--picture-card {
  position: relative;
}

#createGood .upload-placeholder {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#createGood .upload-placeholder p {
  color: rgba(102, 102, 102, 1);
  font-size: 15px;
  text-align: left;
  margin-bottom: 10px;
}

.upload-placeholder span {
  color: rgba(153, 153, 153, 1);
  font-size: 15px;
  left: 804px;
}

#createGood .uploadArray_content {
  display: flex;
  flex-direction: row;
}

.uploadArray_content div {
  margin-right: 20px;
  border-left-width: 1px;
}
</style>
