<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">

            <el-steps :active="step" simple>
            <el-step  @click.native="goNextStep(1)" title="编辑基本信息" icon="el-icon-edit"></el-step>
            <el-step  @click.native="goNextStep(2)" title="编辑详情信息" icon="el-icon-edit"></el-step>
            </el-steps>



            <div class="panel">

                <div class="form-panel p-xl"  v-if="step==1">
                    <!--form start-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm" >

                    <el-form-item label="活动名称：" prop="activity_title">
                        <el-input v-model="ruleForm.activity_title"></el-input>
                    </el-form-item>

                    <el-form-item label="活动卖点：" prop="activity_subject">
                        <el-input v-model="ruleForm.activity_subject"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图：" >

                      <el-upload
                        class="avatar-uploader"
                        action="/api/admin/fileupload/image"
                        :show-file-list="false"
                        :on-success="uploadActivityImg"
                        >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                  <div class="upload-title">
                      <p class="upload-title-red">支持上传一张图片，图片宽高比为1242*1242，支持JPEG、PNG 等大部分图片格式</p>
                  </div>


                    </el-form-item>

                    <el-form-item label="活动规则：" prop="activity_desc">
                        <el-input type="textarea" v-model="ruleForm.activity_desc" rows="7"></el-input>
                    </el-form-item>
                    

                    <el-form-item>
                        <el-button size="large" type="primary" @click="goNextStep(2)" >下一步</el-button>
                    </el-form-item>
                    
                    </el-form>

                </div>

                <!--步骤2-->

                <div class="form-panel p-xl" v-if="step==2">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-width="160px" class="demo-ruleForm" >
                    
                    <el-form-item label="活动时间：">
                        <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.activity_start_time" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line-center" :span="2">至</el-col>
                        <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.activity_end_time" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="参与人数：">
                      <el-col :span="12">
                        <el-input v-model="ruleForm.rules.walking_default_users" placeholder="请输入人数"></el-input><span></span>
                      </el-col>
                    </el-form-item>

                    <el-form-item label="参与次数限制：">
                        <el-radio-group v-model="limitsStatus"   @change="limitsChange">
                            <el-col :span="8" >
                              <div class="limit-no">
                                <el-radio :label="0">不限</el-radio>
                              </div>
                            </el-col>
                         
                            <el-col :span="8">
                              <el-radio :label="1">限制 一人<el-input v-model="ruleForm.limits.limit_total_times"></el-input>次</el-radio>
                            </el-col>
                           
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="状态：">
                      <el-radio-group v-model="ruleForm.activity_status">
                        <el-radio  :label="1">下架</el-radio>
                        <el-radio  :label="2">上架</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="类型：">
                      <el-radio-group v-model="ruleForm.rules.walking_type">
                        <el-radio  :label="1">服务</el-radio>
                        <el-radio  :label="2">商品</el-radio>
                        <el-radio  :label="4">虚拟商品</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="choiceGoodsClick">请选择</el-button>
                    </el-form-item>
                     <!-- 表单 -->
                     <div class="gift-table gift-person" >
                      <div class="table-th">
                        <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div>
                      </div>
                     <div class="table-body" v-for="item in goodsData" :key="item.sku_code">
                       <div class="person-item person-width clearfix">
                         <div class="person-item-left">
                           <img v-if="item.good_ico"  :src="item.good_ico" alt="" width="50px" height="50px">
                         </div>
                         <div class="person-item-right">
                           <p v-if="item.good_name">{{item.good_name}}</p>
                           <p v-if="item.price">{{item.price}}</p>
                         </div>
                       </div>
                       <div class="person-item" v-for="item in details" :key="item.users">
                         <el-input v-model="item.offer_price" type="number"></el-input>
                       </div>
                       
                      
                       
                     </div>
                  </div>
                    <div class="finish">
                      <el-button size="large" type="primary" @click="goNextStep(1)" >上一步</el-button>
                      <el-button size="large" type="primary" @click="submit" >上架</el-button>
                    </div>
                   
                   
                  </el-form>
 
                 
                  <el-form :model="ruleForm"  ref="ruleForm3" class="bottom-form">
                <div class="tab-overflow">
                <!-- 指定商品弹窗 -->
                    <el-dialog title="选择指定商品" :visible.sync="goodsVisible">
                       <el-form-item>
                            <div v-if="goodShow" class="good_show">
                                
                                      <div class="goods-div clearfix" v-for="item in goodsData" :key="item.sku">
                                          <div class="goods-div-right">
                                          <img v-if="item.good_ico" :src="item.good_ico" width="70px" height="70px">
                                          <p v-else class="no-img">暂无图片</p>
                                          </div>
                                          <div class="goods-div-left">
                                          <p class="color-blue">{{item.good_name}}</p>
                                          
                                              <p class="color-black">¥{{item.price}}</p>
                                              <p  class="color-black">{{item.sku_str}}</p>
                                         
                                          </div>
                                      </div>
                                </div>
                       
                            </el-form-item>
                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId">
                            <el-tab-pane v-for="item  in industryForm" :label="item.category_name"  :value="item.category_name" :key="item.category_id">
                                    <el-checkbox v-model="checkedList"    :label="item.sku" :key="item.sku" v-for="item in goodsList">
                                        <div class="goods-div clearfix" >
                                            <div class="goods-div-right">
                                            <img v-if="item.good_ico" :src="item.good_ico" width="70px" height="70px">
                                            <p v-else class="no-img">暂无图片</p>
                                            </div>
                                            <div class="goods-div-left">
                                            <p class="color-blue">{{item.good_name}}</p>
                                            <div >
                                                <p class=" color-black">¥{{item.price}}</p>
                                                <p class=" color-black">{{item.sku_str}}</p>
                                            </div>
                                            </div>
                                        </div>
                                  
                                  </el-checkbox>
                               
                                
                            </el-tab-pane>
                        </el-tabs>
                        
                        
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="goodsCancal">取 消</el-button>
                            <el-button type="primary" @click="goodsSure">确 定</el-button>
                        </div> 
                    </el-dialog>
                </div>
                
                  </el-form>
                  
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
      walking:[],
      details: [
            {
              "users" : 2, // 满几人
              "offer_price" : "" // 金额
            },{
              "users" : 3,
              "offer_price" : ""
            },{
              "users" : 4,
              "offer_price" : ""
            },{
              "users" : 5,
              "offer_price" : ""
            }
          ],
      
      goodShow:false,
      index:"1",
      goodsVisible:false,
      imageUrl:"",
      checkedList:[], //选中数据数组
    //   dialogImageUrl:"",
      limitsStatus:"",
      goodsData:[],
      //skuList:[],
      
      activeId:"",
      goodsList:{},
    //   checkedGoods:{},//以选中商品
      "checkedGoodsId":"",//已经选中的商品id
      "tabPosition":"left",
      // shakes:{},// 奖品编码  奖品数量 奖品图片 中奖率集合
     
      limit_total_times:"",
      step: 1,
      industryForm:[
        {
          name:"通用券",
          type:1
        },
        {
          name:"行业券",
          type:2
        },
        {
          name:"服务券",
          type:3
        },
        {
          name:"商品券",
          type:4
        },
        {
          name:"虚拟商品券",
          type:5
        }

      ],
      
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
          url:'alliance'
        },
        {
          name: "多人同行" //名字
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
          "limit_total_times":"", //次数限制 0 不限
         
        },
        "rules":{
          "walking_type":1,
          "walking_default_users":"",
          "walking":[]
          
        }
        
      },

        rules: {
          activity_title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          activity_subject: [
            { required: true, message: '请输入活动描述', trigger: 'blur' },
          ],
          activity_desc: [
            { required: true, message: '请输入活动卖点', trigger: 'blur' },
          ]

        }

    };
  },
  methods:{
      choiceGoodsClick(){
          this.goodsVisible = true
          this.goodsData = []
          this.checkedList = []
          this.$axios.get("/api/admin/select/goodsList?type=1&category_id="+this.index+"&good_type="+this.ruleForm.rules.walking_type).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    //console.log(this.goodsList,'goodsList')
                }
            })
      },
    
    goodsSure(){

      // this.ruleForm.rules.shakes[this.index].coupon_code = this.checkedGoodsId 
      this.goodsVisible = false;
      this.walking = this.goodsData 
      for(var i = 0; i<this.walking.length; i++){
        this.walking[i].sku_code = this.walking[i].sku
        this.walking[i].details = this.details
      }
      console.log(this.walking,'this.walking')
      
             
          
          
      },
    goodsCancal(){
      this.goodsData = []
      this.checkedList = []
      this.goodsVisible = false
    },
    
    uploadActivityImg(res){
      this.imageUrl = res.data.url
      
    },
   
    limitsChange(e){
      if(e==0){
          this.ruleForm.limits.limit_total_times = 0
        console.log('00000')
      }else{
        
        this.ruleForm.limits.limit_total_times = this.limit_total_times
        console.log('11111')
      }
     

    },

    handleFaceUploadSuccess(){},
     goNextStep(n){
    //    if(n==1){
    //      this.mapTX();
    //    }
       this.step = n;
      
    },
    getCategoryList(){
          //获取行业列表
        this.$axios.get("/api/admin/select/categoryList").then(res =>{
          if(res.data.code ==0){
            this.industryForm = res.data.data
            console.log(this.industryForm,'industryForm')
          }

        })
      },
      //默认弹窗初始化数据
    //   getGoodsList(){
    //         this.$axios.get("/api/admin/select/goodsList?good_type=1&category_id=1").then(res =>{
    //             if(res.data.code ==0){
    //                 this.goodsList = res.data.data;
    //                 console.log(this.goodsList,'goodsList')
    //             }
    //         })
    //   },
    
   

      submit(){
        
        console.log(this.ruleForm,'choiceLIst')
        // console.log(this.ruleForm,'this.ruleForm');
            this.$axios.post("/api/admin/activity/addShake", this.ruleForm).then(res => {

                      if(res.data.code == 0){

                          this.$alert(res.data.msg)
                          this.$router.push('/marketing/shake/list')
                          

                      }else{
                          this.$alert(res.data.msg)
                      }


                  }).catch((e)=>{

                    this.$alert('操作失败'+e)

                  })
      },
      
    },
    watch:{
        "activeId":function(val){
            val = Number(val)+1
            this.index= val 

            this.$axios.get("/api/admin/select/goodsList?type=1&good_type="+this.ruleForm.rules.walking_type+"&category_id="+val).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    //console.log(this.goodsList,'goodsList')
                }
            })
            
        },
        "checkedList":function(e){
          this.goodsData = []
          for(var i = 0; i<this.goodsList.length; i++){
            for(var j = 0; j<e.length; j++){
              if(this.goodsList[i].sku==e[j]){
                this.goodsData.push(this.goodsList[i])
              }
            }
          }
          this.goodShow = true
          
          console.log(this.goodsData,'data')
            
        }
        
    },


  mounted() {
    //this.getBusinessList();

    //如果是从审核门店中过来
    // if(this.$route.query.review){
    //   this.getReviewData(this.$route.query.review)
    // }
    

  },
  components: {
    BreadCrumb
    // formlist
  },

  created() {
    // console.log(this.$route.params,'this.$route.params')
    // let params = this.$route.params;
    // //如果是编辑
    // if (Object.keys(params).length) {
       
    //     this.params = params;
    //     console.log(params,'params')
    //     this.$axios.post("/api/admin/activity/info",params).then(res => {
    //       console.log(res.data.data,'data----data')
    //       //this.ruleForm.activity_status = res.data.data.activity_status
    //         this.ruleForm = res.data.data;
    //         //判断当前是限制还是不限制
    //         if(res.data.data.limits.limit_total_times==0){
    //           this.limitsStatus = 0
    //         }else{
    //           this.limitsStatus =1
    //         }
    //     })
    // }
     //this.getGoodsList(); //弹窗初始化接口
     this.getCategoryList(); //获取行业列表  
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

</style>


