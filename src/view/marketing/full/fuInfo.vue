<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">

            <div class="panel">

                <div class="form-panel p-xl" >
                    <!--form start-->
                    <el-form  label-width="170px" class="demo-ruleForm" >

                    <el-form-item label="活动名称：" >
                            {{ruleForm.activity_title}}
                        </el-form-item>

                        <el-form-item label="活动卖点：">
                            {{ruleForm.activity_subject}}
                        </el-form-item>
                        <el-form-item label="封面图：" >
                            <img v-if="ruleForm.activity_img" :src="ruleForm.activity_img" class="avatar" width="200px" height="150px">
                        </el-form-item>

                        <el-form-item label="活动规则：">
                            {{ruleForm.activity_desc}}
                        </el-form-item>

                         <el-form-item label="活动时间：">
                            {{ruleForm.activity_start_time}}-{{ruleForm.activity_end_time}}
                        </el-form-item>
                        <el-form-item label="类型：">
                          <el-radio-group v-model="ruleForm.rules.full_gifts_type">
                            <el-radio  :label="1">服务</el-radio>
                            <el-radio  :label="2">商品</el-radio>
                            <el-radio  :label="3">虚拟商品</el-radio>
                          </el-radio-group>
                        </el-form-item>
                       

                     <div class="gift-table gift-person width980" >
                        <div class="table-th">
                            <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div>
                        </div>
                        <div v-if="ruleForm.rules.full_gifts">
                            <div class="table-body"   v-for="skuItem in ruleForm.rules.full_gifts" >
                                <div class="person-item ">
                                    满{{skuItem.price/100}}元
                                </div>
                                <div class="person-item">
                                    <div class="goods-div ">
                                      <div class="goods-div-left">
                                        <p class="margin-top10"><span class="price">¥{{skuItem.reduce_price/100}}</span><span>{{skuItem.coupon_title}}</span></p>
                                        <p class="margin-top10">满{{skuItem.price/100}}元可用</p>
                                      </div>
                                      <div class="goods-div-right">
                                      <img v-if="skuItem.coupon_img" :src="skuItem.coupon_img" width="70px" height="70px">
                                      <p v-else class="no-img">暂无图片</p>
                                      </div>
                                    </div>
                                </div>
                                <div class="person-item ">
                                  <img :src="skuItem.image" alt="" width="238px" height="100px">
                                    
                                </div>
                            
                            </div>
                        </div>
                    </div>
                   

                    </el-form>

                </div>

                <!--步骤2-->

                
              
                




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
     
      itemLIst:[
        {
          name:"购买满（元）",
          index:1
        },
        {
          name:"赠送商品",
          index:2
        },
        {
          name:"赠送商品图",
          index:3
        }
        
      ],
      
       breadcrumb: [
                //面包屑
                {
                    name: "营销管理/营销应用", //名字
                    url: '/marketing/markList'
                },
                {
                    name: "满赠活动", //名字
                    url: '/marketing/full/list'
                },
                {
                    name: "满赠活动详情" //名字
                }
            ],
      
      ruleForm:{
          "rules":{
              "full_gifts":[]
          }
      }

    };
  },
  methods:{

  },
      
    
    
    

  

  components: {
    BreadCrumb
    // formlist
  },
  mounted() {
    
  },
  created() {
    
    let params = this.$route.params;
    if (Object.keys(params).length) {
      
        this.$axios.post("/api/admin/activity/info",params).then(res => {
            if(res.data.code==0){
                this.ruleForm = res.data.data;
            }
            
        })
    }
      
  }
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
    background-color: #fff;
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
    color:#333;
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


