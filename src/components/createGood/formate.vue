<template>
    <!-- dialog showFormatInfo弹框 -->
    <el-dialog title="添加规格" :visible.sync="showFormat" size="large">
        <el-row :gutter="20">
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="4">名称</el-col>
            <el-col :span="12">选项</el-col>
        </el-row>
        <div v-for="(item,idx) in formatInfo" :key="item.name">
            <el-row :gutter="20">
                <el-col :span="4">{{idx=== 0? '一组':'二组'}}</el-col>
                <el-col :span="4">   
                    <el-input v-model="item.name" placeholder="请输入名称"/>                        
                </el-col>
                <el-col :span="12"> 
                    <el-tag v-for="(tag,idx) in item.list"  :key="tag"
                        :closable="idx!==0" :disable-transitions="false"
                        @close="$_deletedTag(item.list,tag)">
                        {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-model="inputValue" ref="saveTagInput" size="small" placeholder="请输入选项" />
                    <i class="el-icon-plus" @click="$_createFormat(item.list)" />
                </el-col>
            </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showFormat = false">取 消</el-button>
            <el-button type="primary" @click="$_addFormat">确 定</el-button>
        </div>
    </el-dialog>
    <!-- dialog 弹框 End -->  
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: [],
      formatInfo: [
        {
          name: "功效",
          list: ["美白保湿"]
        },
        {
          name: "容量",
          list: ["25ml", "50ml", "100ml"]
        }
      ],
      showFormat: false,
      inputValue: ""
    };
  },
  props: {},
  components: {},
  methods: {
    /** *
     * 确定添加规格
     */
    $_addFormat() {
      // 传过去this.createFormat 返回code=0是成功
      this.showFormat = false;
      this.$emit("addFormat", this.formatInfo);
    },

    /** *
     * 添加规格
     */
    $_createFormat(list) {
      let inputValue = this.inputValue;
      if (inputValue) {
        list.push(inputValue);
      }
      this.inputValue = "";
    },

    /** *
     * 删除标签
     */
    $_deletedTag(list, tag) {
      list.splice(list.indexOf(tag), 1);
    }
  },
  created() {}
};
</script>
<style>
</style>


