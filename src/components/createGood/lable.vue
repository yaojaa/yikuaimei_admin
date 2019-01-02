<template>
    <!-- dialog_showLable 弹框 -->
    <el-dialog title="标签" :visible.sync="showLable" size="large">
    <div>
        已选：
        <el-tag v-for="(tag,idx) in tags" :key="idx" closable type="gray" @close="$_deleteTag(idx)">
            {{tag}}
        </el-tag>
        <el-button type="primary" icon="searchIcon">搜索</el-button>
    </div>
    
    <el-tabs tab-position="left">
        <el-tab-pane  v-for="item in shopgoods.data"  :key="item.good_category_name" :label="item.good_category_name">
            <ul class="lableList">
                <li v-for="list in item.good_category_sons" :key="list.good_category_name" >{{list.good_category_name}}</li>
            </ul>
        </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
        <el-button @click="showLable = false">取 消</el-button>
        <el-button type="primary" @click="showLable = false">确 定</el-button>
    </div>
    </el-dialog>
    <!-- dialog 弹框 End -->
</template>

<script>
export default {
  data() {
    return {
      BasicInfo: {},
      showLable: false
    };
  },
  props: {
    /** *
     * 可选分类
     */
    shopgoods: {
      type: Object,
      default: () => {}
    },
    /** *
     * 已选标签
     */
    tags: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    // showLable: function(newQuestion, oldQuestion) {
    //   console.log(newQuestion, oldQuestion);
    //   this.$emit("changeStatus", newQuestion);
    // }
  },

  methods: {
    /** *
     * 删除标签
     */
    $_deleteTag(idx) {
      this.$emit("deleteTag", idx);
    }
  },
  created() {}
};
</script>
<style>
.lableList li {
  float: left;
  padding: 5px;
  width: 30%;
  list-style: none;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
}
.el-tag--gray {
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  background-color: rgba(114, 36, 216, 1);
  border-radius: 15px;
}
.el-tag--gray .el-tag__close {
  color: rgba(255, 255, 255, 1);
}
</style>


