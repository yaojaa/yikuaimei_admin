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



            <div class="panel" id="new_person">

                <div class="form-panel p-xl "  v-if="step==1">
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
                        <img v-if="ruleForm.activity_img" :src="ruleForm.activity_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:48px"></i>
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

                <div class="form-panel p-xl width720" v-if="step==2">
                  
                  <p class="gift-title"> 设置奖品</p>
                  <p class="gift-title">以下奖品必须全部选择，否则无法上架</p>
                  <div class="gift-table left0 width980" >
                     <div class="table-th">
                       <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div>
                     </div>
                     <div class="table-body" v-for="skuItem in ruleForm.rules.new_users" :key="skuItem.idx">
                       <div class="body-gift-choice body-item">
                         <div class="item-choice" >
                          
                            <div class="choiced" v-if="skuItem.coupon_code">
                              <div class="goods-div " @click="choiceClick(skuItem.idx)">
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
                            <div class="choice-button" v-else  @click="choiceClick(skuItem.idx)">请选择</div>
                         </div>
                       </div>
                       <div class="body-gift-img body-item">
                         <div class="item-upload marking-upload" >
                           
                            <el-upload
                              class="avatar-uploader"
                              action="/api/admin/fileupload/image"
                              :show-file-list="false"
                              :on-success="show_img.bind(null, {'data':skuItem})" :data="skuItem"
                              >
                            <img width="176px"  height="96px" max-width="178px" max-height="96px" v-if="skuItem.gifts_img" :src="skuItem.gifts_img" >
                              <div v-else  class="upload-img-icon"> 
                                <i class="el-icon-plus position-icon" style="font-size:48px"></i>
                              </div>       
                            </el-upload>
                         </div>
                       </div>
                       <div class="body-gift-number body-item">
                         <div class="item-number" >
                           <input type="text" v-model="skuItem.gifts_name" class="number-input"/>
                         </div>
                       </div>
                       <div class="body-gift-text body-item">
                         <div class="item-text" >
                           <input type="text" v-model="skuItem.gifts_desc" class="text-input"/>
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
                      <div class="tab-overflow newPerson-box">

                
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
                            </el-form-item>
                           
                            
                        

                        <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;"  v-model="activeId" >
                            <el-tab-pane v-for="item in industryForm" :label="item.name"  :value="item.type" :key="`${item.type}type`">
                                <el-radio v-model="radioGoodsId" :label="item.coupon_code" :key="item.coupon_code" v-for="item in goodsList">
                                  <div class="goods-div">
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
      // 
      
      goods_name:"", //商品名字
      index:'',
      gitfNumber:"",
      radioGoodsId:"",
      goodShow:false,
      goodsVisible:false,
      goodsDefaultVisible:false,
      imageUrl:"",
      date:"",
      activeId:"",
      goodsList:[],
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
          name:"奖品",
          index:1
        },
        {
          name:"奖品图",
          index:2
        },
        {
          name:"名称",
          index:3
        },
        {
          name:"备注",
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
                    name: "新人红包", //名字
                    url: '/marketing/newPerson/list'
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
        "rules" : {  // 规则
          "new_users" : [
            {
              "idx":0,
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "coupon_code" : "",  // 优惠券编号
              "gifts_name" : "",  // 奖品名称
              "gifts_img" : "",    // 奖品图片
              "gifts_desc" : "",    // 奖品描述
              "coupon_title":"",
              "coupon_img":"",
              "price":"",
              "reduce_price":""
            },
            {
              "idx":1,
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "coupon_code" : "",  // 优惠券编号
              "gifts_name" : "",  // 奖品名称
              "gifts_img" : "",    // 奖品图片
              "gifts_desc" : "",    // 奖品描述
              "coupon_title":"",
              "coupon_img":"",
              "price":"",
              "reduce_price":""
            },
            {
              "idx":2,
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "coupon_code" : "",  // 优惠券编号
              "gifts_name" : "",  // 奖品名称
              "gifts_img" : "",    // 奖品图片
              "gifts_desc" : "",    // 奖品描述
              "coupon_title":"",
              "coupon_img":"",
              "price":"",
              "reduce_price":""
            },
            {
              "idx":3,
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "coupon_code" : "",  // 优惠券编号
              "gifts_name" : "",  // 奖品名称
              "gifts_img" : "",    // 奖品图片
              "gifts_desc" : "",    // 奖品描述
              "coupon_title":"",
              "coupon_img":"",
              "price":"",
              "reduce_price":""
            },
            {
              "idx":4,
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "coupon_code" : "",  // 优惠券编号
              "gifts_name" : "",  // 奖品名称
              "gifts_img" : "",    // 奖品图片
              "gifts_desc" : ""     // 奖品描述
            },
            {
              "idx":5,
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "coupon_code" : "",  // 优惠券编号
              "gifts_name" : "",  // 奖品名称
              "gifts_img" : "",    // 奖品图片
              "gifts_desc" : "",    // 奖品描述
              "coupon_title":"",
              "coupon_img":"",
              "price":"",
              "reduce_price":""
            },
            {
              "idx":6,
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "coupon_code" : "",  // 优惠券编号
              "gifts_name" : "",  // 奖品名称
              "gifts_img" : "",    // 奖品图片
              "gifts_desc" : "",    // 奖品描述
              "coupon_title":"",
              "coupon_img":"",
              "price":"",
              "reduce_price":""
            },
            {
              "idx":7,
              "gifts_type" : 1,  // 礼品类型 1 优惠券 2 现金红包
              "coupon_code" : "",  // 优惠券编号
              "gifts_name" : "",  // 奖品名称
              "gifts_img" : "",    // 奖品图片
              "gifts_desc" : "",    // 奖品描述
              "coupon_title":"",
              "coupon_img":"",
              "price":"",
              "reduce_price":""
            },
          ]
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
  //  goodsSearch(){
  //         console.log('商品搜索--------')
  //       //商品搜索
  //       var goodName = this.goods_name;
  //       this.$axios.get("/api/admin/select/goodsList?good_type=1&good_name="+goodName).then(res =>{
  //               if(res.data.code ==0){
  //                   this.goodsList = res.data.data;
  //                   this.goods_name = "" //查询完毕清空input
  //               }else{
  //                   this.$message({ message: res.data.msg, type: 'warning' });
  //               }
  //           })

  //     },
    goodsSure(){
      // debugger;

          // //商品弹窗确定
          if(this.checkedGoodsId==""){
              console.log(this.checkedGoodsId,'checkedGoodsId')
              this.$alert('必须选择商品')
          }else{
                console.log(this.checkedGoodsId ,'this.checkedGoodsId')
                //debugger
                //console.log(this.ruleForm.rules.,'index')
                this.ruleForm.rules.new_users[this.index].coupon_code = this.checkedGoodsId 
                this.ruleForm.rules.new_users[this.index].coupon_title = this.checkedGoods.coupon_title 
                this.ruleForm.rules.new_users[this.index].coupon_img = this.checkedGoods.coupon_img
                this.ruleForm.rules.new_users[this.index].price = this.checkedGoods.rules.price
                this.ruleForm.rules.new_users[this.index].reduce_price = this.checkedGoods.rules.reduce_price

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
     
       this.ruleForm.rules.new_users[obj.data.idx].gifts_img = res.data.url
        
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
        //如果是编辑
        if (Object.keys(params).length) {
                      this.$axios.post("/api/admin/activity/edit", this.ruleForm).then(res => {

                      if(res.data.code == 0){

                          this.$alert(res.data.msg)
                          this.$router.push('/marketing/newPerson/list')
                          

                      }else{
                          this.$alert(res.data.msg)
                      }


                  }).catch((e)=>{

                    this.$alert('操作失败'+e)

                  })
        }else{
                  console.log(this.ruleForm,'choiceLIst')
        // console.log(this.ruleForm,'this.ruleForm');
            this.$axios.post("/api/admin/activity/addNewUser", this.ruleForm).then(res => {

                      if(res.data.code == 0){

                          this.$alert(res.data.msg)
                          this.$router.push('/marketing/newPerson/list')
                          

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
    //this.getCategoryList()
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
       
       
        console.log(params,'params')
        this.$axios.post("/api/admin/activity/info",params).then(res => {
          if(res.data.code==0){
              this.ruleForm = res.data.data;
             
              
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
  #new_person .goods-div{
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
#new_person .el-input--small,#new_person .el-textarea__inner{
  max-width: 370px;
}
#new_person .el-checkbox:first-of-type{
  margin-left: 30px;
}

</style>


