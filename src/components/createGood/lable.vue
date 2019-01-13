<template>
    <!-- dialog_showLable 弹框 -->
    <el-dialog title="标签" :visible.sync="lable_show" size="large">
    <div>
        已选：
        <el-tag v-for="(tag,idx) in tagIdArr" :key="tag" closable type="gray" @close="$_deleteTag(idx)">
            {{tag}}
        </el-tag>
    </div>
    
    <el-row>
      <el-col :span="8"> 
          <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" v-for="item in shopgoods.data" :key="item.tag_group_name"  @select="computedSons">
            <el-menu-item :index="item.tag_group_name" v-if="!item.tag_group_sons">
              <span slot="title"> {{item.tag_group_name}} </span>
            </el-menu-item>

            <el-submenu :index="item.tag_group_name" v-else> 
              <template slot="title"> <span>{{item.tag_group_name}}</span> </template>
              <el-menu-item v-for="sons in item.tag_group_sons" :key="sons.tag_group_name" :index="sons.tag_group_name">
                {{sons.tag_group_name}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
      </el-col>

      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <ul class="lableList">
              <li 
                v-for="list in good_category_sons" 
                :key="list.tag_group_name || list.tag_name"
                @click="addLable(list.tag_group_name || list.tag_name)"
                >
                {{list.tag_group_name || list.tag_name}}
              </li>
          </ul>
        </div>
      </el-col>
    </el-row>
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
      lable_show: false,
      good_category_sons:{},
      findLable:''
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
    },
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
    addLable(good_category_name,good_category_id) {
    //  let obj =  axios.{url,paranm:{}good_category_id:1},return {
    //     {}
    //   }
    //   obj.good_category_name
      this.tagIdArr.push(good_category_name,);
    },

    /** *
     * 删除标签
     */
    $_deleteTag(idx) {
      this.tagIdArr.splice("idx", 1);
    },

    /** 
     * 展示good_category_sons
    */
   computedSons(key, keyPath ){
    console.log(key, keyPath )
    // this.good_category_sons = item.tag_group_sons ? data.tag_group_sons[0].tag_list : item.tag_list
   }
  },

  computed:{
    defaultActive(){
      let data = this.shopgoods.data[0]
      if(!data){
        return ''
      }
      return data.tag_group_sons ? data.tag_group_sons[0].tag_group_name : data.tag_group_name
    },
  },
  watch: {
    defaultActive:function (newQuestion, oldQuestion) {
      console.log(newQuestion, oldQuestion)
    }
  },
  created() {
    let data = this.shopgoods.data[0]
    this.good_category_sons = data.tag_group_sons ? data.tag_group_sons[0].tag_list : data.tag_list
  }
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

.title_input{
  width:100px;
  position: absolute;
  top: 7px;
  right: 76px;
}
</style>


