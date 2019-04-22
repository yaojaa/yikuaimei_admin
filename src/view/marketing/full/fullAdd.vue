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



            <div class="panel invite-box">

                <div class="form-panel p-xl "  v-if="step==1">
                    <!--form start-->
                    <el-form :model="ruleForm"  ref="ruleForm1" label-width="100px" class="demo-ruleForm" >

                    <el-form-item label="活动名称：" >
                        <el-input v-model="ruleForm.activity_title"></el-input>
                    </el-form-item>

                    <el-form-item label="活动卖点：" >
                        <el-input v-model="ruleForm.activity_subject"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图：" >

                      <el-upload
                        class="avatar-uploader"
                        action="/api/admin/fileupload/image"
                        :show-file-list="false"
                        :on-success="uploadActivityImg"
                        >
                        <img v-if="ruleForm.activity_img" :src="ruleForm.activity_img" class="avatar invite-upload-img">
                       <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:48px;margin-top:15%"></i>
                      </el-upload>
                      <div class="upload-title">
                          <p class="upload-title-red">支持上传一张图片，图片宽高比为1242*1242，支持JPEG、PNG 等大部分图片格式</p>
                      </div>

                    </el-form-item>

                    <el-form-item label="活动规则：" >
                        <el-input type="textarea" v-model="ruleForm.activity_desc" rows="7"></el-input>
                    </el-form-item>
                    

                    <el-form-item>
                        <el-button size="large" type="primary" @click="goNextStep(2)" >下一步</el-button>
                    </el-form-item>
                    
                    </el-form>

                </div>

                <!--步骤2-->

                <div class="form-panel p-xl width720" v-if="step==2">
                  <el-form :model="ruleForm"  ref="ruleForm2" label-width="160px" class="demo-ruleForm" >
                    
                    <el-form-item label="开始时间：">
                        <el-col :span="10">
                          <el-date-picker type="date" style="width:100%" placeholder="选择日期" v-model="ruleForm.activity_start_time" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-col>
                        <el-col class="line-center" :span="4">至</el-col>
                        <el-col :span="10">
                          <el-date-picker type="date" style="width:100%" placeholder="选择日期" v-model="ruleForm.activity_end_time"  value-format="yyyy-MM-dd"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="类型：">
                      <el-radio-group v-model="ruleForm.rules.full_gifts_type">
                        <el-radio  :label="1">服务</el-radio>
                        <el-radio  :label="2">商品</el-radio>
                        <el-radio  :label="3">虚拟商品</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                  <p class="gift-title"> 优惠设置</p>
                  <el-button type="primary"  class="button-add" @click="buttonAdd()">增加</el-button>
                  <div class="gift-table width980 " >
                     <div class="table-th">
                       <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div>
                     </div>
                     <div class="table-body" v-for="(skuItem,index) in ruleForm.rules.full_gifts">
                       <div class="body-gift-number body-item">
                         <div class="item-number" >
                           <input type="text" v-model="skuItem.price" class="number-input"/>
                         </div>
                       </div>
                       <div class="body-gift-choice body-item">
                         <div class="item-choice" >
                          
                            <div class="choiced" v-if="skuItem.coupon_code">
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
                            <div class="choice-button" v-else  @click="choiceClick(index)">请选择</div>
                         </div>
                       </div>
                       <div class="body-gift-img body-item">
                         <div class="item-upload marking-upload" >
                           
                            <el-upload
                              class="avatar-uploader"
                              action="/api/admin/fileupload/image"
                              :show-file-list="false"
                              :on-success="show_img.bind(null, {'index':index})" :data="skuItem"
                              >
                            <img width="238px" v-if="skuItem.image" :src="skuItem.image" class="invite-img">
                              <div v-else  class="upload-img-icon"> 
                                <i class="el-icon-plus position-icon" style="font-size:48px"></i>
                              </div>       
                            </el-upload>
                         </div>
                       </div>
                       <div class="body-gift-choice body-item">
                         <div class="item-choice">
                            <el-button type="primary" @click="deletedClick(index)">删除</el-button>
                         </div>
                       </div>
                       
                     </div>
                  </div>
                 
                  
                  
                  <el-form :model="ruleForm"  ref="ruleForm3" class="bottom-form">
                    
                    <el-form-item label="状态：">
                      <el-radio-group v-model="ruleForm.activity_status">
                        <el-radio  :label="1">下架</el-radio>
                        <el-radio  :label="2">上架</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div class="finish">
                      <el-button size="large" type="primary" @click="goNextStep(1)" >上一步</el-button>
                      <el-button size="large" type="primary" @click="submit" >上架</el-button>
                    </div>
                      <div class="tab-overflow shake-box">

                
                <!-- 指定商品弹窗 -->
                    <el-dialog title="选择指定商品" :visible.sync="goodsVisible">
                       <el-form-item>
                            <div v-if="goodShow" class="good_show">
                                <el-radio v-model="checkedGoodsId" :label="checkedGoods.coupon_code">
                                  <div class="goods-div ">
                                    <div class="goods-div-left">
                                      <p class="margin-top10"><span class="price">¥{{checkedGoods.rules.reduce_price/100}}</span><span>{{checkedGoods.coupon_title}}</span></p>
                                      <p class="margin-top10">满{{checkedGoods.rules.price/100}}元可用</p>
                                    </div>
                                    <div class="goods-div-right">
                                     <img v-if="checkedGoods.coupon_img" :src="checkedGoods.coupon_img" width="70px" height="70px">
                                     <p v-else class="no-img">暂无图片</p>
                                    </div>
                                  </div>
                                </el-radio>
                                </div>
                       
                           
                                <!-- <el-col :span="12">
                                  <el-input v-model="goods_name" placeholder="搜索"></el-input>
                                </el-col>
                           
                                <el-col :span="5">
                                    <el-button type="primary" @click="goodsSearch">查询</el-button>
                                </el-col> -->
                            </el-form-item>
                           
                            
                        

                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId">
                            <el-tab-pane v-for="item in industryForm" :label="item.name"  :value="item.type" :key="`${item.type}type`">
                                <el-radio v-model="radioGoodsId" :label="item.coupon_code" :key="item.coupon_code" v-for="item in goodsList">
                                  <div class="goods-div ">
                                    <div class="goods-div-left">
                                      <p class="margin-top10"><span class="price">¥{{item.rules.reduce_price/100}}</span><span>{{item.coupon_title}}</span></p>
                                      <p class="margin-top10">满{{item.rules.price/100}}元可用</p>
                                    </div>
                                    <div class="goods-div-right">
                                     <img v-if="item.coupon_img" :src="item.coupon_img" width="70px" height="70px">
                                     <p v-else class="no-img">暂无图片</p>
                                    </div>
                                  </div>
                                  
                                  </el-radio>
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
      buttonIndex:"1",
      // goods_name:"", //商品名字
      index:'',
      gitfNumber:"",
      radioGoodsId:"",
      goodShow:false,
      goodsVisible:false,
      goodsDefaultVisible:false,
      imageUrl:"",
      dialogImageUrl:"",
      radioGoodsId:"",
      date:"",
      activeId:"",
      goodsList:{},
      checkedGoods:{},//以选中商品
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
          name:"满（）元",
          index:1
        },
        {
          name:"商品",
          index:2
        },
        {
          name:"商品图",
          index:3
        },
        {
          name:"操作",
          index:4
        }
      ],
      
    //   url: "",
    //   business_name:null,
    // //   CATEGORYOPTIONS,
    //   params:{},
    //   edit:false,
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
        "rules" : {  // 规则
        "full_gifts_type" : 2, // 类型 1 服务 2商品 3虚拟商品
       "full_gifts" : [
                {
                    "coupon_code" : "",
                    "price" : "",
                    "image" : "",
                    "coupon_title":"",
                    "coupon_img":"",
                    "price":"",
                    "reduce_price":""
                }
                
        ]
      }
      }

    };
  },
  methods:{
    buttonAdd(){
      
      this.ruleForm.rules.full_gifts.push({
        "coupon_code" : "",
        "price" : "",
        "image" : ""
      })
      
      console.log(this.ruleForm.rules.full_gifts,'~~~~~~')
    },
    deletedClick(_index){
      console.log(_index,'index')

      if(this.ruleForm.rules.full_gifts.length==1){
        this.$alert('必须保留一项')
      }else{
       
        this.ruleForm.rules.full_gifts.splice(_index, 1)
        console.log(this.ruleForm.rules.full_gifts,'@@@@@@@@@@')
        
       
      }
      
    },


    goodsSure(){
      // debugger;

          // //商品弹窗确定
          if(this.checkedGoodsId==""){
              console.log(this.checkedGoodsId,'checkedGoodsId')
              this.$alert('必须选择商品')
          }else{
                this.ruleForm.rules.full_gifts[this.index].coupon_code = this.checkedGoodsId 
                this.ruleForm.rules.full_gifts[this.index].coupon_title = this.checkedGoods.coupon_title  
                this.ruleForm.rules.full_gifts[this.index].coupon_img = this.checkedGoods.coupon_img 
                this.ruleForm.rules.full_gifts[this.index].price = this.checkedGoods.rules.price
                this.ruleForm.rules.full_gifts[this.index].reduce_price = this.checkedGoods.rules.reduce_price 
                this.goodsVisible = false;
             
          }
          
      },
    goodsCancal(){
      this.goodsVisible = false
    },
    choiceClick(_index){
      this.index = _index;
      this.goodsVisible = true
    },
    show_img(obj,res,f){
    
      debugger
       this.ruleForm.rules.full_gifts[obj.index].image = res.data.url
        // this.dialogImageUrl = res.data.url
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
    getGoodsList(){
          //获取通用券数据
        this.$axios.get("/api/admin/select/coupon?type=1").then(res =>{
          if(res.data.code ==0){
            this.goodsList = res.data.data
          }

        })
          
      },
    
      
      submit(){
        let params = this.$route.params;
        this.ruleForm.activity_code = params.activity_code
        var obj=JSON.parse(JSON.stringify(this.ruleForm));
       
        for(let i=0; i<obj.rules.full_gifts.length;i++){
          obj.rules.full_gifts[i].price = obj.rules.full_gifts[i].price*100
        }
        debugger
        
        
        //如果是编辑
        if (Object.keys(params).length) {
                      this.$axios.post("/api/admin/activity/edit", obj).then(res => {

                      if(res.data.code == 0){

                          this.$alert(res.data.msg)
                         this.$router.push('/marketing/full/list')
                          

                      }else{
                          this.$alert(res.data.msg)
                      }


                  }).catch((e)=>{

                    this.$alert('操作失败'+e)

                  })
        }else{
                  console.log(this.ruleForm,'choiceLIst')
        // console.log(this.ruleForm,'this.ruleForm');
            this.$axios.post("/api/admin/activity/addFullGifts", obj).then(res => {

                      if(res.data.code == 0){

                          this.$alert(res.data.msg)
                          this.$router.push('/marketing/full/list')
                          

                      }else{
                          this.$alert(res.data.msg)
                      }


                  }).catch((e)=>{

                    this.$alert('操作失败'+e)

                  })
        }
        

      },
      
      
    },
    watch:{
        "activeId":function(val){
            val = Number(val)+1
           
           
            console.log(val,'val')
            // var parms ={
            //     "good_type":2,
            //     "category_id":this.industryForm[val].category_id
            // }
            // console.log(parms,'parms')
            //观察tab选项卡改变调用接口
            this.$axios.get("/api/admin/select/coupon?type="+val).then(res =>{
                if(res.data.code ==0){
                    this.goodsList = res.data.data;
                    //console.log(this.goodsList,'goodsList')
                    

                }
            })
        },
        radioGoodsId:function(event){
            //指定商品
            this.goodsList.forEach((item) => {
                if (item.coupon_code == event) {
                    this.checkedGoods = item;
                    this.checkedGoodsId = item.coupon_code
                    console.log(this.checkedGoods,'checkedGoods')
                    
                    this.goodShow = true
                }
            })
        }
    },


  mounted() {
    // if(this.ruleForm.rules.old_users.length-1==)
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
    console.log(this.$route.params,'this.$route.params')
    let params = this.$route.params;
   
    //如果是编辑
    if (Object.keys(params).length) {
       
        this.params = params;
        console.log(params,'params')
        this.$axios.post("/api/admin/activity/info",params).then(res => {
          console.log(res.data.data,'data----data')
          //this.ruleForm.activity_status = res.data.data.activity_status
            this.ruleForm = res.data.data;
            debugger
            for(let i=0; i<this.ruleForm.rules.full_gifts.length;i++){
              this.ruleForm.rules.full_gifts[i].price = this.ruleForm.rules.full_gifts[i].price/100
            }

            
        })
    }
     this.getGoodsList(); //获取优惠券列表  
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


