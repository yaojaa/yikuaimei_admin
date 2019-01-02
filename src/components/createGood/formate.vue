<template>
    <!-- dialog showFormatInfo弹框 -->
    <el-dialog title="添加规格" :visible.sync="showFormat" size="large">
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
        <el-input v-model="BasicInfo.input" suffix-icon="el-icon-close" disabled :on-icon-click="$_deleted" />                     
        <el-input v-model="BasicInfo.input" suffix-icon="el-icon-close" disabled :on-icon-click="$_deleted" />                     
        </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button @click="showFormat = false">取 消</el-button>
        <el-button type="primary" @click="$_createFormat">确 定</el-button>
    </div>
    </el-dialog>
    <!-- dialog 弹框 End -->  
</template>

<script>
export default {
  data() {
    return {
      BasicInfo: {},
      showFormat: false
    };
  },
  props: {},
  components: {},
  methods: {
    $_deleted() {
      console.log("deleted");
    },

    /** *
     * 添加规格
     */
    $_createFormat() {
      // 传过去this.createFormat 返回code=0是成功
      this.showFormat = false;
    }
  },
  created() {}
};
</script>
<style>
</style>


