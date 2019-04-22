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
                            <img v-if="ruleForm.activity_img" :src="ruleForm.activity_img" class="avatar">
                        </el-form-item>

                        <el-form-item label="活动规则：">
                            {{ruleForm.activity_desc}}
                        </el-form-item>

                         <el-form-item label="活动时间：">
                            {{ruleForm.activity_start_time}}-{{ruleForm.activity_end_time}}
                        </el-form-item>
                        <el-form-item label="参与人数：">    
                        {{ruleForm.rules.walking_default_users}}人参与
                        </el-form-item>
                        <el-form-item label="参与次数限制：">
                         <p v-if="ruleForm.limits.limit_total_times==0">不限</p>
                         <p v-else >一人{{ruleForm.limits.limit_total_times}}次</p>
                        
                        </el-form-item>
                        <el-form-item label="选择服务/商品：">
                          
                         <p v-if="ruleForm.rules.walking_type==1">商品</p>
                         <p v-if="ruleForm.rules.walking_type==2">服务</p>
                         <p v-if="ruleForm.rules.walking_type==4">虚拟商品</p>
                        
                        </el-form-item>

                     <div class="gift-table gift-person width980" >
                      <div class="table-th">
                        <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div>
                      </div>

                     <div class="table-body"  v-for="item in ruleForm.rules.walking" :key="item.sku">
                       <div class="person-item person-width ">
                         <div class="person-item-left">
                           <img v-if="item.good_ico"  :src="item.good_ico" alt="" width="80px" height="80px">
                         </div>
                         <div class="person-item-right">
                           <p v-if="item.goods_name">{{item.goods_name}}</p>
                           <p v-if="item.goods_price">{{item.goods_price/100}}</p>
                         </div>
                       </div>
                       <div class="person-item"  v-for="skuItem in item.details">
                        
                          {{skuItem.offer_price/100}}
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
          name:"商品",
          index:1
        },
        {
          name:"2人",
          index:2
        },
        {
          name:"3人",
          index:3
        },
        {
          name:"4人",
          index:4
        },
        {
          name:"5人",
          index:5
        }
      ],
      
      breadcrumb: [
        //面包屑
        {
          name: "营销管理/营销应用", //名字
          url:'/marketing/markList'
        },
        {
          name: "营销管理/多人同行", //名字
          url:'/marketing/person/list'
        },
        {
          name: "多人同行详情" //名字
        }
      ],
      
      ruleForm:{
        "limits": {
          "limit_total_times": 0
        },
        "rules":{
          "walking_default_users":"",
          "walking": [
            {
            "sku_code": "15U16U31",
            "details": [
              {
                "users": 2,
                "offer_price": 100
              },
              {
                "users": 3,
                "offer_price": 0
              },
              {
                "users": 4,
                "offer_price": 50
              },
              {
                "users": 5,
                "offer_price": 0
              }
            ]
          
          }]

        }
        
      }
        

    }
  },
  methods:{},
  components: {
    BreadCrumb
    // formlist
  },
  mounted() {
    //console.log(this.$route.params,'this.$route.params')
    let params = this.$route.params;
    //如果是编辑
    if (Object.keys(params).length) {
       
       
        //console.log(params,'params')
        this.$axios.post("/api/admin/activity/info",params).then(res => {
          if(res.data.code==0){
              this.ruleForm = res.data.data;
          }
          
        })
    }
  },
  created() {
    
      
  }
};
</script>

<style scoped>
/* .form-panel{
  width:720px
} */
.width980{
  width:980px;
}
.person-item-left{
  width: auto;
  height: auto;
}
.person-item-right{
  width: auto;
  height: auto;
}
.person-width{
  width: 100%;
}
</style>


