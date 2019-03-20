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
            @changeTab="$_changeTab"
            :goodType='good_type'
            :goodId='good_id'
            :active="active"
          />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { breadcrumb, breadcrumbEdit,GOODTYPE } from "@/constans/createdGood";
import BreadCrumb from "@/components/common/BreadCrumb";
import FormlistItem from "@/components/createGood/phaseFormlist";

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
    $_changeTab(num) {
      this.active = num
    }
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
  height:29px;
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
.div__input {
  border: 1px solid #dcdfe6; /** 默认 */
  border: 1px solid #67c23a; /** 失去焦点 */
  border: 1px solid #f56c6c; /** 报错 */
  border: 1px solid #7224d8; /** :focus 获得焦点 */
  padding-right: 30px;
}
.form-width-small .avatar-uploader .el-upload--text{
    width:146px;
    height: 146px;
    font-size: 28px;
    color: #8c939d;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda
}

.avatar-uploader  .avatar-uploader-icon{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.avatar-uploader  .el-icon-plus:before {
    content: "\E62B";
}

.avatar-uploader  .avatar-uploader-icon p{
    color: rgba(102, 102, 102, 1);
    font-size: 16px;
    text-align: left;
    margin-bottom: 10px;
}

#createGood .el-input--small{
    min-height:30px
}

#createGood  .avatar{
    width: 100%
}
#createGood  .outText{
    position: absolute;
    top: 0;
    left: 270px;
}

.goodSkuInfo_row{
    margin:10px
}

#createGood .table .el-input{
    width:80px;
}
#createGood .el-input input{
    padding:5px
}
.table_icon_text{
    color:#999999
}
.table_icon_text i{
    margin-right: 5px
}
.table_upload div{
    border: 0;
    width:auto;
    height: auto;
}
.table_upload__disabled .el-upload--picture{
    display: none
}
.form-footer{
    text-align: center
}
#createGood  .el-table__row .cell{
    position: relative;
}



#createGood  .el-table__row .cell .outText1{
    position: absolute;
    top: 6px;
    left: 95px;
}

#createGood .el-tag--small {
    margin: 0 5px;
}

.canAdd .el-upload--picture-card{
    display: none
}

.canAddVidio>ul{
    display: none
}
#createGood .el-form-item--small .el-form-item__content .good_notes .el-textarea__inner{
    max-width: 400px;
    width: 310px
}
.hahah{
    padding:40px
}
.el-upload-list--picture-card .el-upload-list__item .el-upload-list__item-status-label .el-icon-close{
    display: block;
    color:#fff;
    top: 2px;
    left: 0;
}
.el-upload-list--picture-card .el-upload-list__item .el-upload-list__item-status-label{
    display: block !important
}
.el-upload-list--picture-card .el-upload-list__item .el-upload-list__item-status-label .el-icon-close:before {
    content: "\E60F";
}
.good_video{
    float:left;
    margin-right: 20px
}
.clearfix{
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
</style>
