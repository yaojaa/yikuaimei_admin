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
                  <Formlist 
                    @changeLableStatus="$_changeLableStatus"
                    @changeFormatStatus="$_changeFormatStatus"
                    @changeTab="$_changeTab"
                    :formatInfo = "formatInfo"
                  />
                  <Lable :tags="tags" :shopgoods="shopgoods"
                  @deleteTag="$_deleteTag"
                  ref="lable" />
                  <Formate  ref="formate"  @addFormat="$_addFormat"/>
                </div>
              </el-tab-pane>
              <el-tab-pane label="编辑商品详情" name="ProductDetails">
                <!-- 表单list -->
                <FormlistProduct @changeTab="$_changeTab" />
                <!-- 表单list End -->
              </el-tab-pane>
            </el-tabs>
          </template>
            
        </div>
    </div>
</template>

<script>
import info from "../../moke";
import BreadCrumb from "@/components/common/BreadCrumb";
import Formate from "@/components/createGood/formate";
import Formlist from "@/components/createGood/formlist";
import FormlistProduct from "@/components/createGood/formlist_product";
import Lable from "@/components/createGood/lable";
import Goods from "../../moke/goods";

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
      editName: "BasicInfo", // tab标签默认定位

      BasicInfo: {},
      formatInfo: {}, // form 列表数据

      showFormatInfo: false, // 展示规格
      shopgoods: {}, // 可选规格列表
      tags: [], // 已选标签
      createFormat: info.shopgoods,
      Goods: Goods,

      breadcrumb: [
        //面包屑
        {
          name: "商品管理" //名字
        },
        {
          name: "平台商品", //名字
          url: "/goodList"
        },
        {
          name: "添加商品" //名字
        }
      ]
    };
  },

  created() {
    // @TODO 获取可选规格 this.shopgoods = "axios 请求回来的数据";
    this.shopgoods = Goods.shopgoods;
    // @TODO 获取已选标签
    this.tags = [
      { name: "标签一", type: "" },
      { name: "标签二", type: "gray" },
      { name: "标签三", type: "primary" },
      { name: "标签四", type: "success" }
    ];
  },

  computed: {},

  methods: {
    $_changeLableStatus() {
      this.$refs.lable.showLable = true;
    },
    $_changeFormatStatus() {
      this.$refs.formate.showFormat = true;
    },

    $_deleteTag(idx) {
      this.tags.splice("idx", 1);
    },
    $_showFormatInfo() {
      this.showFormatInfo = true;
    },
    /** *
     * tab标签切换事件
     */
    $_changeTab(tab, event) {
      debugger;
      this.editName =
        this.editName === "ProductDetails" ? "BasicInfo" : "ProductDetails";
    },
    /** *
     * 添加规格
     */
    $_addFormat(formatInfo) {
      this.formatInfo = formatInfo;
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

#createGood .searchIcon {
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
