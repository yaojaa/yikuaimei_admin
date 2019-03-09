<template>
    <el-dialog title="添加规格" :visible.sync="format_show" size="large" id="format_show"  @close="$_close" >
        <el-row :gutter="20">
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="4">名称</el-col>
            <el-col :span="12">选项</el-col>
        </el-row>
        
        <div v-for="(item,idx) in goodSkuInfo" :key="`goodSkuInfo_${idx}`">
            <el-row :gutter="20" v-if="idx===0">
                <el-col :span="4">一组</el-col>
                <el-col :span="4">   
                    <el-input v-model="item.name" placeholder="请输入名称" />                        
                </el-col>
                <el-col :span="12"> 
                    <el-input v-model="item.list[0]" placeholder="请输入选项" :disabled="item.list && item.list.length > 1"/>
                    <el-tag v-for="(tag,index) in item.list"  :key="index"
                      :disable-transitions="false"
                      :closable="true"
                      @close="$_deletedTag(item.list,tag)"
                      v-if="index !== 0">
                      {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" 
                      v-model="item.inputValue" 
                      ref='saveTagInput0'
                      size="small" 
                      placeholder="请输入选项" 
                      v-if="inputVisible0" 
                      :style="{width:'100px'}"
                      @keyup.enter.native="handleInputConfirm(idx,item.list)"
                      @blur="handleInputConfirm(idx,item.list)"
                      />
                    <i class="el-icon-plus" @click="$_createFormat(idx)" v-else />
                </el-col>
            </el-row>

            <el-row :gutter="20" v-else>
                <el-col :span="4">二组</el-col>
                <el-col :span="4">   
                    <el-input v-model="item.name" placeholder="请输入名称" />                        
                </el-col>
                <el-col :span="12"> 
                    <el-input v-model="item.list[0]" placeholder="请输入选项" :disabled="item.list && item.list.length > 1"/>
                    <el-tag v-for="(tag,index) in item.list"  :key="tag"
                      :disable-transitions="false"
                      :closable="true"
                      @close="$_deletedTag(item.list,tag)"
                      v-if="index !== 0">
                      {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" 
                      v-model="item.inputValue" 
                      ref='saveTagInput1'
                      size="small" 
                      placeholder="请输入选项" 
                      v-if="inputVisible1" 
                      :style="{width:'100px'}"
                      @keyup.enter.native="handleInputConfirm(idx,item.list)"
                      @blur="handleInputConfirm(idx,item.list)"
                      />
                    <i class="el-icon-plus" @click="$_createFormat(idx)" v-else />
                </el-col>
            </el-row>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button @click="$_closeFormat">取 消</el-button>
            <el-button type="primary" @click="$_addFormat">确 定</el-button>
        </div>
    </el-dialog>
    <!-- dialog 弹框 End -->  
</template>

<script>
import _ from 'lodash'

export default {
  name: "dialog-formate",

  props:{
    goodSkuinfo:{
      type:Array,
      default:()=>[]
    }
  },

  data() {
    return {
      format_show: false,
      inputVisible0: false,
      inputVisible1: false,
      goodSkuInfo: [
        {
            name: '',
            list: [],
            inputValue: ''
        },
        {
            name: '',
            list: [],
            inputValue: ''
        }
      ]
    };
  },

  watch: {
    goodSkuinfo: {
      handler: function (newVal, oldVal) {
        if(this.goodSkuinfo.length){
          this.goodSkuInfo = _.cloneDeep(newVal)
        }
      },
      deep: true
    }
  },
  
  methods: {
    /** *
     * 确定添加规格
     */
    $_addFormat() {
      const goodSkuInfo = this.goodSkuInfo;
      if(goodSkuInfo[0].list.length){
        this.format_show = false;
        this.$emit("addFormat", this.goodSkuInfo);
      }else{
        this.$message({
          message: '请填写规格',
          type: 'warning'
        });
      }
    },

    $_close(){
      if(!this.goodSkuInfo[0].list.length){
        this.$emit("changeSingleButton");
      }
    },

    $_closeFormat() {
      this.format_show = false;
      this.$emit("closeFormat");
    },

    /** *
     * 添加规格
     */
    $_createFormat(idx) {
      let inputVisible = 'inputVisible' + idx
      this[inputVisible] = true;
      this.$nextTick(_ => {
        this.$refs[`saveTagInput${idx}`][0].$refs.input.focus();
      });
    },

    /** 
     * 点击加号和失去焦点事件
    */
    handleInputConfirm(idx, list) {
      let inputVisible = 'inputVisible' + idx
      let inputValue = this.goodSkuInfo[idx].inputValue;
      if (inputValue) {
        list.push(inputValue);
      }
      this.goodSkuInfo[idx].inputValue = "";
      this[inputVisible] = false;
    },

    /** *
     * 删除标签
     */
    $_deletedTag(list, tag) {
      list.splice(list.indexOf(tag), 1);
    }
  }
};
</script>
<style>
#format_show .el-input{
  display: inline;
}

#format_show .el-input input{
  width: 84px
}

#format_show .el-tag{
    height: 32px;
    line-height: 32px;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    display: inline-block;
    margin-right: 5px
}

.el-input.is-disabled .el-input__inner{
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
  cursor: default;
}

#format_show .el-row{
  margin: 10px
}
</style>


