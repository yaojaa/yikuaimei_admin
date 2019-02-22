<template>
    <el-dialog title="选择耗材" :visible.sync="goodFriend_show" size="large">
        <div>
            <span>已选：</span>
            <productCard 
                @deleteTag="$_deleteTag(idx)" 
                :closeble="true" 
                v-for="(item,idx) in good_friendsDialog" 
                :key="`${item.good_name}good_friendsDialog`" 
                :goodName="item.good_name" 
                :price="item.price_low"
                />
            <span v-if="!good_friendsDialog.length">还没有选择任何耗材</span>
        </div>
        <el-row>
            <el-col :span="3"> 
                <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" v-for="item in CATEGORYOPTIONS" :key="`${item.category_name}category_name`" @select="computedRightData(item.category_id,item.category_name)" >
                    <el-menu-item :index="item.category_name">
                        <span slot="title"> {{item.category_name}} </span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21">
                <productCard
                    :goodName="list.good_name" 
                    :price="list.price_low"
                    v-for="list in goodFriendsList" 
                    :key="`${list.good_name}goodFriendsList`"
                    :class="{productCard__disable: isDisable(list.good_id) }" 
                    @click="$_addGoodFriend(list)"
                />
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="goodFriend_show = false">取 消</el-button>
            <el-button type="primary" @click="$_confirmAdd">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
/** 
 * 耗材详情
*/
import { mapState } from "vuex";
import { CATEGORYOPTIONS } from "../../constans/createdGood";
import productCard from "@/components/createGood/product_card";

export default {
  name: "createGood-goodFriend",

  components: {
    productCard
  },

  data() {
    return {
        goodFriend_show: false, // 选择弹框状态
        CATEGORYOPTIONS,
        defaultActive:'美容',
        currentFormInfo:{},
        good_friends: [], // 已选耗材
        goodFriendsList:[], // 详情数据展示
        good_friendsDialog:[]
    };
  },

  computed: {
    ...mapState('createdGoode',['formInfo','goodFriends']), // 可选标签数据
  },

  methods: {

     /** 
      * 已选标签不可点选
     */
    isDisable(good_id){
        let findObj = this.good_friendsDialog.filter(item => item.good_id === good_id)
        if(findObj.length > 0){
            return true
        }else{
            return false
        }
    },

    /** 
     * 添加标签
    */
    $_addGoodFriend(goodFriendsInfo){
        if(!this.isDisable(goodFriendsInfo.good_id)){
            let obj = {
                good_id: goodFriendsInfo.good_id , //耗材id
                sku_list: goodFriendsInfo.sku_list , // 耗材sku_id列表
                good_name: goodFriendsInfo.good_name , // 耗材名字
                good_ico: goodFriendsInfo.good_ico , //耗材图标
                price_low: goodFriendsInfo.price_low , // 耗材价格区间低
                price_high: goodFriendsInfo.price_high, // 耗材价格区间高
                group_sku_id:[],
                group_sku_str:[]
            }
            this.good_friendsDialog.push(obj)
        }
    },

    /** 
     * 确定添加按钮
    */
    $_confirmAdd(){
        this.good_friends = _.cloneDeep(this.good_friendsDialog)
        this.goodFriend_show = false
    },

    /** 
     * 删除标签
    */
    $_deleteTag(idx){
        this.good_friendsDialog.splice(idx,1)
    },

    /** 
     * 计算右侧数据
    */
    computedRightData(category_id,category_name){
        this.defaultActive = category_name
        if(this.goodFriends[category_id]){
            this.goodFriendsList = this.goodFriends[category_id]
            return
        }
        this.$store.dispatch('createdGoode/fetchGoodFriends',{good_type: 3,category_id: category_id}).then((res)=>{
            this.goodFriendsList = res
        })
    }
  },
};
</script>
<style>

#goodFriend {
    padding:10px
}

/* #goodFriend .header{

} */

.el-table th>.cell{
    text-align: center;
    background: #F3F4FE;
    color:#15151C;
    font-weight: normal;
    padding: 5px;
    font-size: 14px
}

#goodFriend .footer{
    width: 100%;
    text-align: center;
    margin:10px
}

.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .productCard__disable .el-card__body{
      background: #D3D3D3
  }
</style>


