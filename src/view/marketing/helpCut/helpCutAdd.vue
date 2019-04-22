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
                        <img v-if="ruleForm.activity_img" :src="ruleForm.activity_img" class="avatar help-upload-img">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:48px;margin-top:15%"></i>
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

                    <el-form-item label="有效时间：">
                        <el-col :span="5">
                            领取后
                        </el-col>
                        <el-col :span="6" style="margin-right:10px">
                            <el-input v-model="ruleForm.rules.days" ></el-input>
                        </el-col>
                        <el-col :span="6" >
                            天内有效
                        </el-col>
                        
                      
                    </el-form-item>

                    

                    <el-form-item label="状态：">
                      <el-radio-group v-model="ruleForm.activity_status">
                        <el-radio  :label="1">下架</el-radio>
                        <el-radio  :label="2">上架</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="类型：">
                      <el-radio-group v-model="ruleForm.rules.bargain_type">
                        <el-radio  :label="1">服务</el-radio>
                        <el-radio  :label="2">商品</el-radio>
                        <el-radio  :label="4">虚拟商品</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="choiceGoodsClick">请选择</el-button>
                    </el-form-item>
                     <!-- 表单 -->
                     <div class="gift-table gift-person width980" >
                      <div class="table-th">
                        <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div>
                      </div>

                     <div class="table-body table-full "   v-for="item in ruleForm.rules.bargain" :key="item.good_id">
                       <div class="full-item  " >
                         <div class="full-item-left">
                           <img v-if="item.good_ico"  :src="item.good_ico" alt="" width="50px" height="50px">
                         </div>
                         <div class="full-item-right">
                           <p v-if="item.good_name">{{item.good_name}}</p>
                           <p v-if="item.price">¥{{item.price}}</p>
                         </div>
                       </div>
                       <div class="full-item"   >
                            <input type="text" v-model="item.max_price"  class="input-val">
                       </div>
                       <div class="full-item"  >
                            <input type="text" v-model="item.reduce_solid_price"  class="input-val">
                       </div>
                       <div class="full-item"  >
                           <p style="display:flex;margin-top:20px; margin-bottom:10px;"><span style="margin-left:20px">最大值：</span><input type="text" v-model="item.reduce_max_price"  class="max-input-val"></p>
                           <p style="display:flex;margin-top:20px; margin-bottom:10px;"><span style="margin-left:20px">最小值：</span><input type="text" v-model="item.reduce_min_price"  class="max-input-val"></p>
                        
                       </div>
                       <div class="full-item">
                            <input type="text" v-model="item.first_solid_price"  class="input-val">
                       </div>
                       <div class="full-item" >
                          <p style="display:flex;margin-top:20px; margin-bottom:10px;"><span style="margin-left:20px">最大值：</span><input type="text" v-model="item.first_max_price"  class="max-input-val"></p>
                               
                            <p style="display:flex;margin-top:20px; margin-bottom:10px;"><span style="margin-left:20px">最小值：</span><input type="text" v-model="item.first_min_price"  class="max-input-val"></p>   
 
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
                    <el-dialog title="选择指定商品" :visible.sync="goodsVisible" class="person-box">
                       <el-form-item>
                            <div v-if="goodShow" class="good_show">
                                
                                      <div class="goods-div " v-for="item in goodsData" :key="item.sku">
                                          <div class="goods-div-right">
                                          <img v-if="item.good_ico" :src="item.good_ico" width="70px" height="70px">
                                          <p v-else class="no-img">暂无图片</p>
                                          </div>
                                          <div class="goods-div-left">
                                          <p class="color-blue">{{item.good_name}}</p>
                                          
                                              <p class="color-black">¥{{item.price/100}}</p>
                                              <p  class="color-black">{{item.sku_str}}</p>
                                         
                                          </div>
                                      </div>
                                </div>
                       
                            </el-form-item>
                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId">
                            <el-tab-pane v-for="item  in industryForm" :label="item.category_name"  :value="item.category_name" :key="item.category_id">
                                    <el-checkbox v-model="checkedList"    :label="item.sku" :key="item.sku" v-for="item in goodsList">
                                        <div class="goods-div " >
                                            <div class="goods-div-right">
                                            <img v-if="item.good_ico" :src="item.good_ico" width="70px" height="70px">
                                            <p v-else class="no-img">暂无图片</p>
                                            </div>
                                            <div class="goods-div-left">
                                            <p class="color-blue">{{item.good_name}}</p>
                                            <div >
                                                <p class=" color-black">¥{{item.price/100}}</p>
                                                <p class=" color-black">{{item.sku_str}}</p>
                                            </div>
                                            </div>
                                        </div>
                                  
                                  </el-checkbox>
                               
                                
                            </el-tab-pane>
                        </el-tabs>
                        
                        
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="goodsCancal">取 消</el-button>
                            <el-button type="primary" @click="helpSure">确 定</el-button>
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
       
      dataList:[],
      goodShow:false,
      index:"1",
      goodsVisible:false,
      imageUrl:"",
      checkedList:[], //选中数据数组
      limitsStatus:"",
      goodsData:[],
      activeId:"",
      goodsList:{},
      "tabPosition":"left",
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
          name:"最高优惠",
          index:2
        },
        {
          name:"新用户砍价",
          index:3
        },
        {
          name:"老用户砍价",
          index:4
        },
        {
          name:"新用户奖励",
          index:5
        },
        {
          name:"老用户奖励",
          index:6
        }
      ],
      
       breadcrumb: [
                //面包屑
                {
                    name: "营销管理/营销应用", //名字
                    url: '/marketing/markList'
                },
                {
                    name: "帮砍", //名字
                    url: '/marketing/helpCut/list'
                },
                {
                    name: "添加" //名字
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
          this.$axios.get("/api/admin/select/goodsList?type=1&category_id="+this.index+"&good_type="+this.ruleForm.rules.bargain_type).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    console.log(this.goodsList,'goodsList55555')
                   
                }
            })
      },
    
    helpSure(){
     

      this.goodsVisible = false;
      
      
      this.ruleForm.rules.bargain = this.goodsData
      debugger
      for(var i = 0; i<this.ruleForm.rules.bargain.length; i++){
          this.ruleForm.rules.bargain[i].goods_id = this.goodsData[i].good_id;
          this.ruleForm.rules.bargain[i].max_price = "";
          this.ruleForm.rules.bargain[i].reduce_solid_price = "";
          this.ruleForm.rules.bargain[i].reduce_min_price = "";
          this.ruleForm.rules.bargain[i].reduce_max_price = "";
          this.ruleForm.rules.bargain[i].first_solid_price = "";
          this.ruleForm.rules.bargain[i].first_min_price = "";
          this.ruleForm.rules.bargain[i].first_max_price = "";
          
      }

    //   this.ruleForm.rules.days = this.days
        debugger
     
          
      },
    goodsCancal(){
      this.goodsData = []
      this.checkedList = []
      this.goodsVisible = false
    },
    
    uploadActivityImg(res){
      this.ruleForm.activity_img = res.data.url
      
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
      submit(){
        
        let params = this.$route.params;
        var obj=JSON.parse(JSON.stringify(this.ruleForm));
        
        for(let i=0; i<this.ruleForm.rules.bargain.length; i++){
        obj.rules.bargain[i].max_price = this.ruleForm.rules.bargain[i].max_price*100
        obj.rules.bargain[i].reduce_solid_price = this.ruleForm.rules.bargain[i].reduce_solid_price*100
        obj.rules.bargain[i].reduce_min_price = this.ruleForm.rules.bargain[i].reduce_min_price*100
        obj.rules.bargain[i].reduce_max_price = this.ruleForm.rules.bargain[i].reduce_max_price*100
        obj.rules.bargain[i].first_solid_price = this.ruleForm.rules.bargain[i].first_solid_price*100
        obj.rules.bargain[i].first_min_price = this.ruleForm.rules.bargain[i].first_min_price*100
        obj.rules.bargain[i].first_max_price =  this.ruleForm.rules.bargain[i].first_max_price*100

        }
        if (Object.keys(params).length) {
            obj.activity_code = params.activity_code
            
            this.$axios.post("/api/admin/activity/edit",obj).then(res => {
                if(res.data.code ==0){
                    this.$alert('编辑成功')
                    this.$router.push('/marketing/helpCut/list')
                }else{
                    this.$alert('接口返回错误')
                }
                
            })
        }else{
            //var parms = this.ruleForm;
            
            debugger
            this.$axios.post("/api/admin/activity/addBargain", obj).then(res => {
                if(res.data.code == 0){
                    this.$alert('添加成功！')
                    
                   this.$router.push('/marketing/helpCut/list')
                }else{
                    this.$alert(res.data.msg)
                }
            }).catch((e)=>{

                this.$alert('操作失败'+e)

            })
        }


      }
     
      
    },
    watch:{
        "activeId":function(val){
            val = Number(val)+1
            this.index= val 

            this.$axios.get("/api/admin/select/goodsList?type=1&good_type="+this.ruleForm.rules.bargain_type+"&category_id="+val).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    console.log(this.goodsList,'goodsList111111')
                }
            })
            
        },
        "checkedList":function(e){
          console.log(e,'eee');
          this.goodsData = []
          for(var i = 0; i<this.goodsList.length; i++){
            for(var j = 0; j<e.length; j++){
              if(this.goodsList[i].sku==e[j]){
                this.goodsList[i].sku_code = e[j]
                this.goodsData.push(this.goodsList[i])
              }
            }
          } 
          console.log(this.goodsData,'this.goodsData22222')
          this.goodShow = true
                
        }
        
    },


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
          


            for(let i=0; i<this.ruleForm.rules.bargain.length;i++){
              this.ruleForm.rules.bargain[i].max_price = this.ruleForm.rules.bargain[i].max_price/100
               this.ruleForm.rules.bargain[i].reduce_solid_price = this.ruleForm.rules.bargain[i].reduce_solid_price/100
                this.ruleForm.rules.bargain[i].reduce_min_price = this.ruleForm.rules.bargain[i].reduce_min_price/100
                 this.ruleForm.rules.bargain[i].reduce_max_price = this.ruleForm.rules.bargain[i].reduce_max_price/100
                  this.ruleForm.rules.bargain[i].first_solid_price = this.ruleForm.rules.bargain[i].first_solid_price/100
                   this.ruleForm.rules.bargain[i].first_min_price = this.ruleForm.rules.bargain[i].first_min_price/100
                    this.ruleForm.rules.bargain[i].first_max_price = this.ruleForm.rules.bargain[i].first_max_price/100
            }
            //判断当前是限制还是不限制
            if(res.data.data.limits.limit_total_times==0){
              this.limitsStatus = 0
            }else{
              this.limitsStatus =1
            }
        })
    }
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

.background-blue{
  background-color: blue
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
   width:980px;
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
    margin-bottom:10px;
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
 .full-item{
     width:100%;
     height: 120px;
     float: left;
    
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
  margin: 0 auto;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #444;
  border-radius:4px;
  border:none;
  border:1px solid #ccc;
  padding:0px 8px;
  margin-top: 44px;
  display: block;

}
.max-input-val{
    width:40px;
    height: 24px;
    font-size: 13px;
    color: #444;
}
.person-box .el-checkbox:first-of-type{
  margin-left: 30px;
}
.help-upload-img{
  max-width: 360px;
  width: 358px;
  height: 176px;
  max-height: 176px
}
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
  .el-checkbox__input{
  position: absolute ;
  right:6px ;
  top: 6px ;
  
}
.el-checkbox__input{
  position: absolute ;
  right:6px ;
  top: 6px ;
  
}
.el-dialog__body{
  background-color: #fff;
}
.el-tabs__nav-wrap::after{
  background-color: #f6f6f6
}
.el-tabs__item{
  color:#666;
}
.goods-div-left p{
  color:#333;
}
.goods-div-left p.money{
  color:#E89925 100%
}
.goods-div{
  border-radius:6px;
  box-shadow: 0px 0px 18px 0px rgba(211, 211, 211, 0.5);
  display: inline-block;
  margin-left: 10px;
  background-color:#fff;

}
p{
  margin:0px;
}

.input-val{
  width:40% !important;
}
.line-center{
  text-align: center;
  line-height:32px;
}
.gift-table{
  font-size: 14px;
}

</style>


