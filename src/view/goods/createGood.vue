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
              <el-tab-pane label="编辑基本信息" name="BasicInfo" class="panel">
                <!-- base 表单 -->
                <FormlistItem @changeTab="$_changeTab" />
              </el-tab-pane>
              <el-tab-pane label="编辑商品详情" name="ProductDetails">
                <!-- product 表单 -->
                <FormlistProduct @changeTab="$_changeTab" />
              </el-tab-pane>
            </el-tabs>
          </template>          
        </div>
    </div>
</template>

<script>
import { breadcrumb } from "../../constans/createdGood";
import { mapState } from "vuex";

import BreadCrumb from "@/components/common/BreadCrumb";
import FormlistItem from "@/components/createGood/formlist";
import FormlistProduct from "@/components/createGood/formlist_product";

export default {
  name: "tabletest",
  components: {
    BreadCrumb,
    FormlistItem,
    FormlistProduct
  },

  data() {
    return {
      breadcrumb, //面包屑
      editName: "BasicInfo", // tab标签默认定位
    };
  },

  created() {
    const id = this.$route.params.good_id
    const good_type = this.$route.params.good_id  //
    if(+id){ // good_id存在或者不等于0 则当前是编辑页面
      // 编辑选项，获取列表信息 获取商品 / 服务 / 采购品项 列表
      this.$store.dispatch('createdGoode/fetchFormInfo', {
        id, // 商品的good_id字段 @TODO
      })
    }
  },

  methods: {
    /** *
     * 导航切换
     */
    $_changeTab(tab, event) {
      this.editName =
        this.editName === "ProductDetails" ? "BasicInfo" : "ProductDetails";
    },
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
