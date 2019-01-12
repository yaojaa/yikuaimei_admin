<template>
    <!-- dialog_showLable 弹框 -->
    <el-dialog title="标签" :visible.sync="lable_show" size="large">
    <el-col :span="12">
      <!-- <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu> -->
    </el-col>
    <div>
        已选：
        <el-tag v-for="(tag,idx) in tagIdArr" :key="idx" closable type="gray" @close="$_deleteTag(idx)">
            {{tag}}
        </el-tag>
        <el-button type="primary" icon="searchIcon">搜索</el-button>
    </div>
    
    <el-tabs tab-position="left">
        <el-tab-pane  v-for="item in shopgoods.data"  :key="item.good_category_name" :label="item.good_category_name">
            <ul class="lableList">
                <li 
                v-for="list in item.good_category_sons" 
                :key="list.good_category_name"
                @click="addLable(list.good_category_id)" 
                >
                  {{list.good_category_name}}
                </li>
            </ul>
        </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
        <el-button @click="lable_show = false">取 消</el-button>
        <el-button type="primary" @click="$_addLable">确 定</el-button>
    </div>
    </el-dialog>
    <!-- dialog 弹框 End -->
</template>

<script>
export default {
  data() {
    return {
      lable_show: false
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
    tagIdArr: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    // lable_show: function(newQuestion, oldQuestion) {
    //   console.log(newQuestion, oldQuestion);
    //   this.$emit("changeStatus", newQuestion);
    // }
  },

  methods: {
    /** *
     * 确定添加标签
     */
    $_addLable() {
      // 传过去this.createFormat 返回code=0是成功
      this.lable_show = false;
      this.$emit("addLable", this.tagIdArr);
    },

    /**
     * 添加标签 @请求相关联标签，添加，， 去重逻辑
     */
    addLable(good_category_id) {
      this.tagIdArr.push(good_category_id);
    },

    /** *
     * 删除标签
     */
    $_deleteTag(idx) {
      this.tagIdArr.splice("idx", 1);
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


