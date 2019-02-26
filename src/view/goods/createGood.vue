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
          <el-steps :active="active" finish-status="success" simple>
            <el-step title="编辑基本信息" />
            <el-step title="添加耗材" v-if="good_type === GOODTYPE['serviceList']" />
            <el-step title="编辑商品详情" v-if="good_type !== GOODTYPE['fictitiousList']"/>
          </el-steps>
          <FormlistItem 
            @changeTabPre="$_changeTab"
            :goodType='good_type'
            :goodId='good_id'
            :active="active"
          />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { breadcrumb, breadcrumbEdit,GOODTYPE } from "../../constans/createdGood";
import BreadCrumb from "@/components/common/BreadCrumb";
import FormlistItem from "@/components/createGood/formlist";

export default {
  name: "tabletest",
  components: {
    BreadCrumb,
    FormlistItem
  },

  data() {
    return {
      breadcrumb: [], //面包屑
      active: 0, // tab标签默认定位
      GOODTYPE
    };
  },

  computed: {
    ...mapState('createdGoode',['formInfo']),

    good_type(){
      return Number(this.$route.query.good_type)
    },

    good_id(){
      return Number(this.$route.query.good_id)
    }
  },

  created() {
    const {good_type,good_id} = this
    this.breadcrumb = !good_id ? breadcrumb[good_type] : breadcrumbEdit[good_type]
  },

  methods: {
    /** *
     * 导航切换
     */
    $_changeTab(num) {this.active = +(this.active + num)}
  }
}
</script>

<style scope>
#createGood .panel {
  padding: 20px 0;
}

#createGood .el-steps--simple{
  background: rgba(238, 239, 255, 1);
  margin:20px 0 30px 0
}

#createGood .page-content{
  background: #fff;
  padding:0;
  padding-bottom: 20px;
  margin: 20px
}

#createGood .el-step__title{
  color: rgba(102, 102, 102, 1);
  font-size: 18px;
  font-weight: normal;
}

#createGood .input__tabs {
  color: rgba(68, 70, 90, 1);
  font-size: 12px;
}

#createGood .el-input--small,
.el-textarea__inner {
  max-width: 260px;
  /* min-height: 100px !important; */
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
