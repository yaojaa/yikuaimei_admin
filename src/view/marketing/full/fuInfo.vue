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
                       

                     <div class="gift-table gift-person" >
                        <div class="table-th">
                            <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div>
                        </div>
                        <div v-if="ruleForm.rules.full_gifts">
                            <div class="table-body"   v-for="skuItem in ruleForm.rules.full_gifts" >
                                <div class="person-item ">
                                    满{{skuItem.price}}元
                                </div>
                                <div class="person-item">
                                    编号为{{skuItem.coupon_code}}的优惠券
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
          url:'alliance'
        },
        {
          name: "满赠活动/详情" //名字
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
.gift-table{
  width:720px;
  margin:0 auto;
  position: relative;
  left: -120px;
  top: 10px;

}
.background-blue{
  background-color: blue
}
.table-th{
  width:100%;
  height: 50px;
  color:#fff;
  line-height: 50px;
  background-color:#03a380;
  display: flex;
}
.th-item{
  flex: 1;
  text-align: center
}
.table-body{
  width:100%;
  display: flex;
}

.body-item{
  flex:1;
  
}
.person-item{
  width:100%;
  height: 100px;
  border-left:1px solid #ccc;
  border-bottom:1px solid #ccc;
  border-right:1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.person-width{
  width:140px;
  height: 100px;
}
.person-width p{
  font-size: 13px;
  margin-top: 10px;
}
.person-item-left{
  float: left;
  width:50px;
  height: 50px;
}
.person-item-right{
  float: left;
  margin-left: 10px;
  width:80px;
  height: 50px;
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

</style>


