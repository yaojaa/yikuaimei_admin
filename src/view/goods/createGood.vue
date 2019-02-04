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
              <el-tab-pane label="编辑基本信息" name="BasicInfo" class="panel" disabled>
                <FormlistItem @changeTabNext="$_changeTab_next" @changeTabPre="$_changeTab_pre"/>
              </el-tab-pane>
              <el-tab-pane label="添加耗材" name="addGoodFriend" class="panel" v-if="isGoodFriend" disabled>
                <!-- v-if="服务才有，要判断type" -->
                <FormlistGoodFriend @changeTabNext="$_changeTab_next" @changeTabPre="$_changeTab_pre"/>
              </el-tab-pane>
              <el-tab-pane label="编辑商品详情" name="ProductDetails" class="panel" disabled>
                <FormlistProduct @changeTabNext="$_changeTab_next" @changeTabPre="$_changeTab_pre"/>
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
import FormlistGoodFriend from "@/components/createGood/formlist_goodFriend";

export default {
  name: "tabletest",
  components: {
    BreadCrumb,
    FormlistItem,
    FormlistProduct,
    FormlistGoodFriend
  },

  data() {
    return {
      breadcrumb, //面包屑
      editName: "BasicInfo", // tab标签默认定位
    };
  },

  computed: {
    good_type(){
      return this.$route.query.good_type
    },

    /** 
     * 是否是耗材，品相
    */
    isGoodFriend(){
      return this.$route.query.good_type === 1  //1门店服务 2平台商品 3品项管理 4虚拟卡券
    }
  },

  created() {
    const id = this.$route.query.good_id
    this.$store.commit('createdGoode/initFormInfo')  // 每次进页面初始化信息
    this.$store.commit('createdGoode/setFormInfo',{good_type:this.good_type})

    // 编辑项目 good_id存在或不等于0 则当前是编辑页面
    if(+id){ 
      this.$store.dispatch('createdGoode/fetchFormInfo', {
        id, // 商品的good_id字段 @TODO
      })
    }
  },

  methods: {
    /** *
     * 导航切换
     */
    $_changeTab_next(tab, event) {
      switch (this.editName) {
        case 'BasicInfo':
          this.editName = this.isGoodFriend ? 'addGoodFriend' : 'ProductDetails'
          break;
        case 'addGoodFriend':
          this.editName = 'ProductDetails'
          break;
        default:
          break;
      }
    },

    $_changeTab_pre(tab, event) {
      switch (this.editName) {
        case 'ProductDetails':
          this.editName = this.isGoodFriend ? 'addGoodFriend' : 'BasicInfo'
          break;
        case 'addGoodFriend':
          this.editName = 'BasicInfo'
          break;
        default:
          break;
      }
    }
  }
}
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

#createGood .el-tabs__item.is-disabled {
    color: #303133;
}
#createGood .el-tabs__item.is-active{
    color: #7224D8;
    cursor: pointer;
}
</style>
