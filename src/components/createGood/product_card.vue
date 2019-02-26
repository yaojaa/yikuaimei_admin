<template>
    <div id="product_card" @click="$_click">
        <div class="el-card__body">
            <img src="../../assets/2.png" class="image">
            <div class="right">
                <p class="right_title">{{goodName}}</p>
                <span>¥{{(price/100).toFixed(2)}}</span>
            </div>
            <i class="el-icon-error product_card_icon" @click="$_deleteTag" v-if="closeble" />
        </div>
    </div>
</template>

<script>
export default {
  name: "product-card",

  data() {
    return {
        currentDate: new Date()
    };
  },

  props:{
      goodName:{
          type:String,
          default:''
      } ,

      price:{
          type:Number,
          default:0
      },

      closeble:{
          type:Boolean,
          default:false
      },

  },

  methods: {
      $_deleteTag(){
          this.$emit('deleteTag')
      },

      $_click(){
          this.$emit('click')
      }

  },
};
</script>
<style>
  #product_card{
      width: 263px;
      border: 0;
      padding:7px;
      display: inline-block;
  }

  #product_card .el-card__body{
      border: 1px solid #ebeef5;
      position: relative;
      width: 244px;
      height:126px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      padding:9px
      
  }

  #product_card .el-card__body img{
      float: left;
      width: 80px;
  }

  #product_card .el-card__body .right{
      float: left;
      width: 110px;
      margin-left:10px
  }
  .right_title{
      width:130px
  }

  .product_card_icon{
      position: absolute;
      color:#7224D8;
      right: -7px;
      top:-7px
  }
</style>


