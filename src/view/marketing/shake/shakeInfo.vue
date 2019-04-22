<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">

                <div class="form-panel p-xl"  >
                    <!--form start-->
                    <el-form  label-width="170px" class="demo-ruleForm" >

                        <el-form-item label="活动名称：" >
                            {{ruleForm.activity_title}}
                        </el-form-item>

                        <el-form-item label="活动卖点：">
                            {{ruleForm.activity_subject}}
                        </el-form-item>
                        <el-form-item label="封面图：" >
                            <img v-if="ruleForm.activity_img" :src="ruleForm.activity_img" class="avatar">
                        </el-form-item>

                        <el-form-item label="活动规则：">
                            {{ruleForm.activity_desc}}
                        </el-form-item>

                         <el-form-item label="活动时间：">
                            {{ruleForm.activity_start_time}}-{{ruleForm.activity_end_time}}
                        </el-form-item>

                         <el-form-item label="每人每天可参与：">
                            {{ruleForm.limits.limit_times}} <span>次</span>
                        </el-form-item>
                         <el-form-item label="状态：">
                             <p v-if="ruleForm.activity_status==1">下架</p>
                             <p v-else>上架</p>
                        </el-form-item>
                        <el-form-item label="活动期间一共可参与：">
                            <p v-if="limitsStatus">不限</p>
                            <p v-else >{{ruleForm.limits.limit_total_times}}</p>
                        </el-form-item>
                        <p class="gift-title">奖品</p>
                        <div class="gift-table width980" >
                            <div class="table-th">
                            <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div></div>
                            <div class="table-body" v-for="item in ruleForm.rules.shakes" :key="item.index">
                            <div class="body-gift-choice body-item">
                                <div class="item-choice" >
                                    <div class="goods-div ">
                                      <div class="goods-div-left">
                                        <p class="margin-top10"><span class="price">¥{{item.reduce_price/100}}</span><span>{{item.coupon_title}}</span></p>
                                        <p class="margin-top10">满{{item.price/100}}元可用</p>
                                      </div>
                                      <div class="goods-div-right">
                                      <img v-if="item.coupon_img" :src="item.coupon_img" width="70px" height="70px">
                                      <p v-else class="no-img">暂无图片</p>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div class="body-gift-img body-item">
                                <div class="item-upload" >
                                    <img width="178px" v-if="item.gifts_img" :src="item.gifts_img" >
                                </div>
                            </div>
                            <div class="body-gift-number body-item">
                                <div class="item-number" >
                                    {{item.gifts_num}}
                                </div>
                            </div>
                            <div class="body-gift-text body-item">
                                <div class="item-text" >
                                    {{item.gifts_probability}}
                                </div>
                            </div>
                            </div>
                        </div>
                        <p class="gift-title"> 默认奖</p>
                        <div class="gift-table width980" >
                            <div class="table-th">
                                <div class="th-item">奖品</div>
                                <div class="th-item">奖品图</div>
                            </div>
                            <div class="table-body">
                                <div class="comfort-left comfort-item">
                                    
                                    <div class="goods-div ">
                                    <div class="goods-div-left">
                                      <p class="margin-top10"><span class="price">¥{{ruleForm.rules.shake_default.reduce_price/100}}</span><span>{{ruleForm.rules.shake_default.coupon_title}}</span></p>
                                      <p class="margin-top10">满{{ruleForm.rules.shake_default.price/100}}元可用</p>
                                    </div>
                                    <div class="goods-div-right">
                                     <img v-if="ruleForm.rules.shake_default.coupon_img" :src="ruleForm.rules.shake_default.coupon_img" width="70px" height="70px">
                                     <p v-else class="no-img">暂无图片</p>
                                    </div>
                              </div>
                                </div>
                                <div class="comfort-right comfort-item">
                                   <img width="360px"  :src="ruleForm.rules.shake_default.gifts_img" >
                                </div>
                                </div>
                        </div>
                    </el-form>

                </div>

            </div>
        </div>
    </div>
   
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
export default {
  name: "tabletest",

  data() {
    return {
      limitsStatus:"",
      itemLIst:[
        {
          name:"奖品",
          index:1
        },
        {
          name:"奖品图",
          index:2
        },
        {
          name:"奖品数量",
          index:3
        },
        {
          name:"中奖率",
          index:4
        }
      ],
      breadcrumb: [
        //面包屑
        {
          name: "营销管理/营销应用", //名字
          url:'/marketing/markList'
        },
        {
          name: "摇一摇详情" //名字
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
        
        "limits":{
          "limit_total_times":"", //总次数限制 0 不限
          "limit_times": "" // 每人每天次数限制 0 不限
        },
        "rules":{
          "shake_default" : { // 安慰奖
          "coupon_code" :"", // 优惠券编号
          "gifts_img" : "" // 图片
          },
          "shakes":[
            {
              "index":0,
              "coupon_code" : "", // 优惠券编号
              "gifts_img" : "",  // 奖品图片
              "gifts_num" : null, // 总数量
              "gifts_probability" : null  // 中奖几率
            },
            {
              index:1,
              "coupon_code" : "", // 优惠券编号
              "gifts_img" : "",  // 奖品图片
              "gifts_num" : null, // 总数量
              "gifts_probability" : null  // 中奖几率
            },
          {
              index:2,
              "coupon_code" : "", // 优惠券编号
              "gifts_img" : "",  // 奖品图片
              "gifts_num" : null, // 总数量
              "gifts_probability" : null  // 中奖几率
            },
            {
              index:3,
              "coupon_code" : "", // 优惠券编号
              "gifts_img" : "",  // 奖品图片
              "gifts_num" : null, // 总数量
              "gifts_probability" : null  // 中奖几率
            },
            {
              index:4,
              "coupon_code" : "", // 优惠券编号
              "gifts_img" : "",  // 奖品图片
              "gifts_num" : null, // 总数量
              "gifts_probability" : null  // 中奖几率
            },
            {
              index:5,
              "coupon_code" : "", // 优惠券编号
              "gifts_img" : "",  // 奖品图片
              "gifts_num" : null, // 总数量
              "gifts_probability" : null  // 中奖几率
            },
            {
              index:6,
              "coupon_code" : "", // 优惠券编号
              "gifts_img" : "",  // 奖品图片
              "gifts_num" : null, // 总数量
              "gifts_probability" : null  // 中奖几率
            },
            {
              index:7,
              "coupon_code" : "", // 优惠券编号
              "gifts_img" : "",  // 奖品图片
              "gifts_num" : null, // 总数量
              "gifts_probability" : null  // 中奖几率
            }
          ]
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
    
    let params = this.$route.params;
    //如果是编辑
    if (Object.keys(params).length) {
       
       
        this.$axios.post("/api/admin/activity/info",params).then(res => {
          if(res.data.code==0){
              this.ruleForm = res.data.data;
              //判断当前是限制还是不限制
              if(res.data.data.limits.limit_total_times==0){
                this.limitsStatus = 0
              }else{
                this.limitsStatus =1
              }
          }
          
        })
    }
     
  },
  computed: {}
};
</script>

<style scoped>
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

.left0{
  left:0px;
}
.background-blue{
  background-color: blue
}

.item-choice,.item-upload,.item-number,.item-text{
  width:100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-number,.item-upload{
  border-left:0px;
}
.choice-button,.number-input,.text-input{
  width:80px;
  height: 30px;
  border:1px solid #ccc;
  color:#333;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  border-radius:6px;
}
.choice-button{
  cursor:pointer;
  font-size:14px;
}

.item-upload{
  overflow: hidden;
  position: relative;
  left: 0px;
  top:0px;
}

  .item-upload .avatar-uploader{
    width:180px;
    height: 100px;
    overflow: hidden;
  }
.item-upload .avatar {
    width: 178px;
    height: 100px;
    display: block;
  }

 .item-upload .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .item-upload img{
    position:absolute;
    left: 0px;
    top:0px;
  }
  .upload-img-icon{
    width: 178px;
    height: 100px;
    overflow: hidden;
    position: relative;
    left: 0px;
    top: 0px;
  }
  .position-icon{
    position: absolute;
    left:62px;
    top:20px;
  }
  .comfort-item{
    flex: 1
  }
  .comfort-item{
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .comfort-button{
    width:80px;
    height: 30px;
    border:1px solid #ccc;
    color:#333;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    border-radius:6px;
  }
  .comfort-right{
  max-width:360px;
  width:360px;
  height: 100px;
  overflow: hidden;
  position: relative;
  left: 0px;
  top:0px;
}

  .comfort-right .avatar-uploader{
    width:360px;
    height: 100px;
    overflow: hidden;
  }
.comfort-right .avatar {
    width: 358px;
    height: 100px;
    display: block;
  }
 .comfort-right .el-upload,.comfort-right .el-upload--text{
    width:358px;
    height: 100px;
    overflow: hidden;
  }
 .comfort-right .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .comfort-right img{
    position:absolute;
    left: 0px;
    top:0px;
  }
   .comfort-right .upload-img-icon{
    width: 358px;
    height: 100px;
    overflow: hidden;
    position: relative;
    left: 0px;
    top: 0px;
  }
  .comfort-right .position-icon{
    position: absolute;
    left: 160px;
  }
  .bottom-form{
    margin-top:20px;
  }
  .finish{
    width:170px;
    height: 50px;
    margin: auto;
    margin-top:30px;
  }
  .goods-div{
    width:211px;
    height: 70px;
    font-size: 12px;
    color:#fff;
    border-radius:6px;
    background-color: #7224D8;
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
    margin-top:6px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .no-img{
    width:70px;
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    text-align: center;
  }
  .shake-box .el-radio__input,.invite-box .el-radio__input{
    position: absolute;
    bottom:14px;
    left: 1px
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
.width720{
  width:720px;
}

.shake-box .el-tabs__content .el-radio:first-of-type{
  margin-left: 30px;
}

.mt10{
  margin-top: 10px;
}
.mb10{
  margin-bottom: 10px;
}
.width980{
  width:980px;
}
</style>


