<template>
    <!-- dialog_showLable 弹框 -->
    <el-dialog title="标签" :visible.sync="lable_show" size="large">
      <p v-if="JSON.stringify(lableList) === '{}' || lableList.length === 0">暂无标签数据，请联系后台人员添加</p>
      <div v-if="lableList.length">
          已选：
          <el-tag v-for="(tag,idx) in tag_list" :key="tag.tag_id" closable type="gray" @close="$_deleteTag(idx)">
              {{tag.tag_name}}
          </el-tag>
      </div>
      
      <el-row>
        <el-col :span="6"> 
            <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" v-for="item in lableList" :key="item.tag_group_name"  @select="computedSons">
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

        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <ul class="lableList">
                <li 
                  v-for="list in good_category_sons" 
                  :key="list.tag_group_name || list.tag_name"
                  :class="{ li__disable: isDisable(list.tag_group_id || list.tag_id)}"
                  @click="addLable(list.tag_group_name || list.tag_name,list.tag_group_id || list.tag_id)"
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
import { mapState } from "vuex";
import _ from 'lodash'

export default {
  name: "dialog-lable",

  props:['tagList'],

  data() {
    return {
      lable_show: false,
      good_category_sons: {},
      tag_list: []
    }
  },


  computed:{

    ...mapState('createdGoode',['lableList']), // 可选标签数据
    
    defaultActive(){
      console.log(this.lableList,'lableList1111')
      let data = this.lableList[0] || {}
      if(!data){
        return ''
      }
      return data.tag_group_sons ? data.tag_group_sons[0].tag_group_name : data.tag_group_name
    }
  },

  watch: {
    tagList: {
      handler: function (newVal, oldVal) {
        this.tag_list = _.cloneDeep(newVal)
      },
      deep: true
    },

    lableList(val) {
      this.initSons()
    },
    
    lable_show:{
      handler: function (newVal, oldVal) {
        if(newVal && this.tag_list,length){
          this.tag_list = _.cloneDeep(this.tagList)
        }
      }
    },
  },

  methods: {
    /** *
     * 确定添加标签
     */
    $_addLable() {
      this.lable_show = false;
      this.$emit('addLable',this.tag_list)  // 更新store 里已选的数据 @TODO 提交的时候需要处理成纯id的数组
    },

    /**
     * 添加标签 @请求相关联标签并添加
     */
    addLable(good_category_name,good_category_id) {
      let obj = {tag_id:good_category_id,tag_name:good_category_name}
      const isdisable = this.isDisable(good_category_id)
      if(isdisable){
        return
      }
      this.$axios.get("/api/admin/select/getFriendTagList?tag_id=" + good_category_id).then(res => {
          let arr = res.data.data || []
          arr.push(obj)
          this.tag_list = _.unionBy(this.tag_list , arr , 'tag_id');
      })
    },

    /** 
     * 不可点击标签样式
    */
   isDisable(tag_id){
      let arr = this.tag_list.filter(item=> item.tag_id == tag_id)
      return arr.length ? true : false
   },

    /** *
     * 删除标签
     */
    $_deleteTag(idx) {
      this.tag_list.splice(idx, 1);
    },

    /** 
     * 展示good_category_sons
    */
    computedSons(key, keyPath ){
        let sons = this.lableList.filter(item => item.tag_group_name == keyPath[0])
        if(keyPath.length === 2 &&  sons.length){
          sons = sons[0].tag_group_sons.filter(item => item.tag_group_name == keyPath[1])
        }
        this.good_category_sons =  sons.length ? sons[0].tag_list :''
    },

    initSons(){
      // debugger
      // console.log(this.lableList,'lableList')

      let obj = this.lableList[0] || {}
      this.good_category_sons = obj.tag_group_sons ? obj.tag_group_sons[0].tag_list : obj.tag_list
    }
  },

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

.lableList li.li__disable{
  color:#c3c3c3
}
</style>


