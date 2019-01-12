<template>
    <!-- dialog showFormatInfo弹框 -->
    <el-dialog title="添加规格" :visible.sync="format_show" size="large">
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
                    <el-tag v-for="(tag,index) in item.list"  :key="tag"
                        :closable="index!==0" :disable-transitions="false"
                        @close="$_deletedTag(item.list,tag)">
                        {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-model="item.inputValue" ref="saveTagInput" size="small" placeholder="请输入选项" 
                    v-if="inputVisible" :style="{width:'100px'}"
                    @keyup.enter.native="handleInputConfirm(idx,item.list)"
                    @blur="handleInputConfirm(idx,item.list)"
                    >
                    </el-input>
                    <i class="el-icon-plus" @click="$_createFormat(idx)" v-else />
                </el-col>
            </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="format_show = false">取 消</el-button>
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
          list: ["美白保湿", "美白保湿2"],
          inputValue: ""
        },
        {
          name: "容量",
          list: ["25ml", "50ml", "100ml"],
          inputValue: ""
        }
      ],
      format_show: false,
      inputVisible: false
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
      this.format_show = false;
      this.$emit("addFormat", this.formatInfo);
    },

    /** *
     * 添加规格
     */
    $_createFormat(idx) {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput[idx].$refs.input.focus();
      });
    },

    handleInputConfirm(idx, list) {
      let inputValue = this.formatInfo[idx].inputValue;
      if (inputValue) {
        list.push(inputValue);
      }
      this.formatInfo[idx].inputValue = "";
      this.inputVisible = false;
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


