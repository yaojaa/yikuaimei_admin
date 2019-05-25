<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">

            <div class="panel" id="help_info">

                <div class="form-panel p-xl" style="width:720px">
                    <!--form start-->
                    <el-form :model="ruleForm"  label-width="100px" class="demo-ruleForm" >

                    <el-form-item label="活动名称：" >
                        {{ruleForm.activity_title}}
                       
                    </el-form-item>

                    <el-form-item label="活动卖点：" >
                        {{ruleForm.activity_subject}}
                    </el-form-item>

                    <el-form-item label="封面图：" >
                        <img v-if="ruleForm.activity_img" :src="ruleForm.activity_img" class="avatar">  
                    </el-form-item>

                    <el-form-item label="活动规则：" >
                        {{ruleForm.activity_desc}}
                    </el-form-item>
                    <el-form-item label="活动时间：">
                        {{ruleForm.activity_start_time}}至{{ruleForm.activity_end_time}}
                    </el-form-item>

                    <el-form-item label="有效时间：">
                        <el-col :span="5">
                            领取后
                        </el-col>
                        <el-col :span="6" style="margin-right:10px">
                            {{ruleForm.rules.days}}
                        </el-col>
                        <el-col :span="6" >
                            天内有效
                        </el-col>
                        
                      
                    </el-form-item>

                    

                    <el-form-item label="状态：">
                        {{ruleForm.activity_status==1?"下架":"上架"}}
       
                    </el-form-item>

                    <el-form-item label="类型：">
                        <p v-if="ruleForm.rules.bargain_type==1">服务</p>
                        <p v-if="ruleForm.rules.bargain_type==2">商品</p>
                        <p v-if="ruleForm.rules.bargain_type==4">虚拟商品</p>

                    </el-form-item>
                    
                    </el-form>
                    <div class="gift-table gift-person width980" >
                      <div class="table-th">
                        <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div>
                      </div>

                     <div class="table-body table-full "   v-for="(item,index) in ruleForm.rules.bargain" :key="index">
                       <div class="full-item  " >
                         <div class="full-item-left">
                           <img v-if="item.good_ico"  :src="item.good_ico" alt="" width="50px" height="50px">
                         </div>
                         <div class="full-item-right">
                           <p v-if="item.good_name">{{item.good_name}}</p>
                           <p v-if="item.price">¥{{(item.price/100).toFixed(2)}}</p>
                         </div>
                       </div>
                       <div class="full-item "   >
                         <p class="p_ld">¥{{(item.max_price/100).toFixed(2)}}</p>
                            <!-- <input type="text" v-model="item.max_price"  class="input-val"> -->
                       </div>
                       <div class="full-item"  >
                            <p class="p_ld">{{item.users}}<span class="person">人</span></p>
                       </div>
                       <div class="full-item"  >
                         <p class="p_ld">¥{{(item.new_user_price/100).toFixed(2)}}</p>
                            
                       </div>
                       <div class="full-item"  >
                           <p style="display:flex;margin-top:20px; margin-bottom:10px;"><span style="margin-left:20px">最大值：</span>¥{{(item.old_user_max_price.toFixed(2))}}</p>
                           <p style="display:flex;margin-top:20px; margin-bottom:10px;"><span style="margin-left:20px">最小值：</span>¥{{(item.old_user_min_price.toFixed(2))}}</p>
                        
                       </div>
                       <div class="full-item ">
                         
                            <div class="choiced" >
                              <div class="coupon-div relative" v-for="(skuItem,idx) in item.coupon_list" :key="idx">
                                    <div class=" coupon-div-left">
                                      <p class="margin-top10"><span class="price">¥{{skuItem.rules.reduce_price/100}}</span><span>{{skuItem.coupon_title}}</span></p>
                                      <p class="margin-top10">满{{skuItem.rules.price/100}}元可用</p>
                                    </div>
                                    <div class=" coupon-div-right">
                                     <img v-if="item.coupon_img" :src="skuItem.coupon_img" width="70px" height="70px">
                                     <p v-else class="coupon-div-img">暂无图片</p>
                                    </div>
                                   
                              </div>
                            </div>
                            
                       </div>
                       
                       
                      
                       
                     </div>
                  </div>

                </div>

                  
                </div>
              
                




<!--form end-->
            </div>
        </div>
    </div>
   
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
// import formlist from "@/components/formlist";
// import { CATEGORYOPTIONS } from "../../constans/createdGood";
// import { pca, pcaa } from 'area-data'; // v5 or higher
export default {
  name: "tabletest",

  data() {
    return {
       
    //   dataList:[],
    //   goodShow:false,
    //   index:"1",
    //   goodsVisible:false,
    //   imageUrl:"",
    //   checkedList:[], //选中数据数组
    //   limitsStatus:"",
    //   goodsData:[],
    //   activeId:"",
    //   goodsList:{},
    //   "tabPosition":"left",
    //   limit_total_times:"",
     
    //   industryForm:[
    //     {
    //       name:"通用券",
    //       type:1
    //     },
    //     {
    //       name:"行业券",
    //       type:2
    //     },
    //     {
    //       name:"服务券",
    //       type:3
    //     },
    //     {
    //       name:"商品券",
    //       type:4
    //     },
    //     {
    //       name:"虚拟商品券",
    //       type:5
    //     }

    //   ],
      
      itemLIst:[
        {
          name:"商品",
          index:1
        },
        {
          name:"最高返现",
          index:2
        },
        {
          name:"可返现",
          index:3
        },
        {
          name:"新用户砍价",
          index:4
        },
        {
          name:"老用户砍价",
          index:5
        },
        {
          name:"选择优惠券",
          index:6
        }
      ],
      
      breadcrumb: [
        //面包屑
        {
          name: "营销管理/营销应用", //名字
          url:'/marketing/markList'
        },
        {
          name: "帮砍详情" //名字
        }
      ],
     
      ruleForm:{
        "activity_title" : "",//活动名称
        "activity_subject" : "",//活动卖点
        "activity_desc" : "", //活动规则
        "activity_img" : "",//封面图
        "activity_status":2, //状态  1 下架 2上架
        "activity_start_time": "", //活动开始时间
        "activity_end_time": "", //活动结束时间
        "rules" : {  // 帮砍规则
           "bargain_type":1,
           "days":"",
        }
        
      }

      

    };
  },
  methods:{},
    
  mounted() {},
  components: {
    BreadCrumb
    // formlist
  },

  created() {
    // console.log(this.$route.params,'this.$route.params')
    let params = this.$route.params;
    console.log(params,'3333')
    //如果是编辑
    if (Object.keys(params).length) {
       
        //this.params = params;
        console.log(params,'params')
        this.$axios.post("/api/admin/activity/info",params).then(res => {
          console.log(res.data.data,'data----data')
          //this.ruleForm.activity_status = res.data.data.activity_status
            this.ruleForm = res.data.data;
            //判断当前是限制还是不限制
            
            
        })
    }
    
  },
  computed: {}
};
</script>

<style scoped>
/* .form-panel{
  width:720px
} */
.width200px{
  width:200px
}
.line-center{
  text-align: center;
}
.activity-img{
  font-size: 13px;
  color:#585858;
}
.limit-title{
  display: inline-block;
  width:140px;
}
.limit-rules{
  display: inline-block;
  width:250px;
}
.limit-no{
  position: relative;
  left: 0px;
  top: 10px;
}
.gift-title{
  font-size: 18px;
  color:#484848;
  font-weight: bold;
  margin-top:20px;
  margin-bottom:20px;
  text-align: center
}

.background-blue{
  background-color: blue
}
  .table-th{
    width:100%;
    height: 30px;
    color:#15151C;
    line-height: 30px;
    background-color:#EEEFFF;
    display: flex;
  }
.th-item{
  flex: 1;
  text-align: center
}
.table-body{
  width:100%;
  display: flex
  
}
.table-full{
   width:740px;
}


.body-item{
  flex:1;
  
}



.full-item-left{
  float: left;
  width:50px;
  height: 50px;
  margin-top:30px;
  
}
.full-item-right{
  float: left;
  margin-left: 10px;
  width:60px;
  height: 50px;
  margin-top: 40px;
  font-size: 14px;
}

  .goods-div{
    width:211px;
    height: 70px;
    font-size: 12px;
    color:#fff;
    border-radius:6px;
    border:1px solid #ccc;
  }
.clearfix:after{
  content:".";
  display:block;
  height:0;
  clear:both;
  visibility:hidden
  }
  .goods-div-left{
    width:120px;
    padding: 10px ;
    height: 50px;
    float: left;
    
  }
  .goods-div-right{
    width:70px;
    height: 70px;
    float: left;
    border-left:1px solid #ccc;
  }
  .price{
    font-size: 16px;
    font-weight: bold;
    color:#fff;
    margin-right:6px;
  }
  .margin-top10{
    margin-top:10px;
  }
  .no-img{
    width:70px;
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    text-align: center;
  }
 .full-item{
     width:120px;
     height: 120px;
     float: left;
    border:1px solid #ccc;
 }

/* .tab-overflow .el-tabs{
    overflow-y: scroll;
} */
.tab-overflow .el-tabs--border-card{
  /* height: 200px; */
  overflow-y: scroll;
}
.choiced{
  font-size: 12px;
  text-align: center;
  color: #000;
}
.tab-overflow .color-blue{
    color:#d0eee8;
     height: 20px;
    line-height:20px;
     overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.tab-overflow .color-black{
    color:#333;
    height: 20px;
    line-height:20px;
     overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.gift-person{
  top:0px;
  margin-bottom:20px;
}
.price-input{
  width:80px;
  height: 30px;
  border:1px solid #666;
}
.full-item .input-val{
  
  
  display: block;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #444;
  border-radius:4px;
  border:none;
  border:1px solid #ccc;
  padding:0px 8px;
  margin: 0 auto;
  margin-top: 44px;
  

}
.max-input-val{
    width:40px;
    height: 24px;
    font-size: 13px;
    color: #444;
}
.avatar{
   max-width: 360px;
  width: 358px;
  height: 176px;
  max-height: 176px
}
#help_info .coupon-div{
  width: 160px;
  height: 70px;
  font-size: 12px;
  color:#fff;
  border-radius:6px;
  border:1px solid #ccc;
  margin-bottom:10px;
  background-color: #7224D8;
}
#help_info .coupon-div-left{
  float: left;
  width:100px;
  height: 70px;
}
#help_info .coupon-div-right{
  float: left;
  width: 60px;
  height: 70px;
  line-height: 70px;
}
#help_info .coupon-div-img{
  width: 60px;
  height: 70px;
}
#help_info .relative{
  position: relative;
  left: 0px;
  top: 0px;
}


#help_info .price{
  color: #fff;
}
#help_info .gift-table{
  width: 980px;
}
#help_info .full-item{
  width: 162px;
  border:none;
  text-align: center;
  
}
#help_info .table-full{
  width:980px;
}
#help_info .p_ld{
  margin-top: 40px;
}
</style>


