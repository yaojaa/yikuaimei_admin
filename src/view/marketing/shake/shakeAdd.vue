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
                    
                    <el-form-item label="开始时间：">
                        <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.activity_start_time" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line-center" :span="2">至</el-col>
                        <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.activity_end_time" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="每人每天可参与：">
                      <el-col :span="12">
                        <el-input v-model="ruleForm.limits.limit_times" placeholder="请输入"></el-input><span></span>
                      </el-col>
                      <el-col :span="4" class="line-center">
                        <span>次</span>
                      </el-col>
                    </el-form-item>

                    <el-form-item label="活动期间一共可参与：">
                        <el-radio-group v-model="limitsStatus"   @change="limitsChange">
                            <el-col :span="8" >
                              <div class="limit-no">
                                <el-radio :label="0">不限</el-radio>
                              </div>
                            </el-col>
                         
                            <el-col :span="8">
                              <el-radio :label="1">限制<el-input v-model="ruleForm.limits.limit_total_times"></el-input>次</el-radio>
                            </el-col>
                           
                        </el-radio-group>
                    </el-form-item>
                   
                   
                  </el-form>
                  <p class="gift-title"> ---------------设置奖品---------------</p>
                  <p class="gift-title">以下奖品必须全部选择，否则无法上架</p>
                  <div class="gift-table" >
                     <div class="table-th">
                       <div class="th-item" v-for="item in itemLIst" :key="item.index">{{item.name}}</div>
                     </div>
                     <div class="table-body" v-for="item in ruleForm.rules.shakes" :key="item.index">
                       <div class="body-gift-choice body-item">
                         <div class="item-choice" >
                          
                            <div class="choiced" v-if="item.coupon_code">以选中优惠券编号为{{item.coupon_code}}的优惠券</div>
                            <div class="choice-button" v-else  @click="choiceClick(item.index)">请选择</div>
                         </div>
                       </div>
                       <div class="body-gift-img body-item">
                         <div class="item-upload" >
                           
                            <el-upload
                              class="avatar-uploader"
                              action="/api/admin/fileupload/image"
                              :show-file-list="false"
                              :on-success="show_img.bind(null, {'data':item})" :data="item"
                              >
                            <img width="178px" v-if="item.gifts_img" :src="item.gifts_img" >
                              <div v-else  class="upload-img-icon"> 
                                <i class="el-icon-plus position-icon" style="font-size:48px"></i>
                              </div>       
                            </el-upload>
                         </div>
                       </div>
                       <div class="body-gift-number body-item">
                         <div class="item-number" >
                           <input type="text" v-model="item.gifts_num" class="number-input"/>
                         </div>
                       </div>
                       <div class="body-gift-text body-item">
                         <div class="item-text" >
                           <input type="text" v-model="item.gifts_probability" class="text-input"/>
                         </div>
                       </div>
                     </div>
                  </div>
                  <p class="gift-title"> ---------------设置安慰奖---------------</p>
                  <p class="gift-title">安慰奖必须选择，否则无法上架</p>
                  <div class="gift-table" >
                    <div class="table-th">
                       <div class="th-item">奖品</div>
                       <div class="th-item">奖品图</div>
                        
                     </div>
                     <div class="table-body">
                          <div class="comfort-left comfort-item">
                            <div class="choiced" v-if="ruleForm.rules.shake_default.coupon_code">以选中优惠券编号为{{ruleForm.rules.shake_default.coupon_code}}的优惠券</div>
                            
                            <div class="comfort-button" v-else @click="defaultChoice()">请选择</div>
                          </div>
                          <div class="comfort-right comfort-item">
                            <el-upload
                              class="avatar-uploader"
                              action="/api/admin/fileupload/image"
                              :show-file-list="false"
                              :on-success="show_default_img"
                              >
                            <img width="360px" v-if="ruleForm.rules.shake_default.gifts_img" :src="ruleForm.rules.shake_default.gifts_img" >
                              <div v-else  class="upload-img-icon"> 
                                <i class="el-icon-plus position-icon" style="font-size:48px"></i>
                              </div>       
                            </el-upload>
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
                      <div class="tab-overflow">

                
                <!-- 指定商品弹窗 -->
                    <el-dialog title="选择指定商品" :visible.sync="goodsVisible">
                       <el-form-item>
                            <div v-if="goodShow" class="good_show">
                                <el-radio v-model="checkedGoodsId" :label="checkedGoods.coupon_code">
                                  <div class="goods-div clearfix">
                                    <div class="goods-div-left">
                                      <p class="margin-top10"><span class="price">¥{{checkedGoods.rules.reduce_price}}</span><span>{{checkedGoods.coupon_title}}</span></p>
                                      <p class="margin-top10">满{{checkedGoods.rules.price}}元可用</p>
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
                                  <div class="goods-div clearfix">
                                    <div class="goods-div-left">
                                      <p class="margin-top10"><span class="price">¥{{item.rules.reduce_price}}</span><span>{{item.coupon_title}}</span></p>
                                      <p class="margin-top10">满{{item.rules.price}}元可用</p>
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

                    <!-- 安慰奖设置 -->
                    <el-dialog title="选择指定商品" :visible.sync="goodsDefaultVisible">
                       <el-form-item>
                            <div v-if="goodShow" class="good_show">
                                <el-radio v-model="checkedGoodsId" :label="checkedGoods.coupon_code">
                                  <div class="goods-div clearfix">
                                    <div class="goods-div-left">
                                      <p class="margin-top10"><span class="price">¥{{checkedGoods.rules.reduce_price}}</span><span>{{checkedGoods.coupon_title}}</span></p>
                                      <p class="margin-top10">满{{checkedGoods.rules.price}}元可用</p>
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
                                  <div class="goods-div clearfix">
                                    <div class="goods-div-left">
                                      <p class="margin-top10"><span class="price">¥{{item.rules.reduce_price}}</span><span>{{item.coupon_title}}</span></p>
                                      <p class="margin-top10">满{{item.rules.price}}元可用</p>
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
                            <el-button type="primary" @click="goodsDefaultSure">确 定</el-button>
                        </div> 
                    </el-dialog>
                    <!-- 安慰奖单独设置 -->

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
      // goods_name:"", //商品名字
      index:'',
      gitfNumber:"",
      radioGoodsId:"",
      goodShow:false,
      goodsVisible:false,
      goodsDefaultVisible:false,
      imageUrl:"",
      dialogImageUrl:"",
      limitsStatus:"",
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
      
    //   url: "",
    //   business_name:null,
    // //   CATEGORYOPTIONS,
    //   params:{},
    //   edit:false,
      breadcrumb: [
        //面包屑
        {
          name: "营销管理/营销应用", //名字
          url:'alliance'
        },
        {
          name: "摇一摇" //名字
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
    defaultChoice(){
      this.goodsDefaultVisible = true
    },
    // goodsSearch(){

    // },
    goodsDefaultSure(){
      if(this.checkedGoodsId==""){
              console.log(this.checkedGoodsId,'checkedGoodsId')
              this.$alert('必须选择商品')
          }else{
                this.ruleForm.rules.shake_default.coupon_code = this.checkedGoodsId
                this.goodsDefaultVisible = false;
             
          }
      
    },
    goodsSure(){
      // debugger;

          // //商品弹窗确定
          if(this.checkedGoodsId==""){
              console.log(this.checkedGoodsId,'checkedGoodsId')
              this.$alert('必须选择商品')
          }else{
                this.ruleForm.rules.shakes[this.index].coupon_code = this.checkedGoodsId 
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
       this.ruleForm.rules.shakes[obj.data.index].gifts_img = res.data.url
        // this.dialogImageUrl = res.data.url
      },
      show_default_img(res){
       this.ruleForm.rules.shake_default.gifts_img = res.data.url

      },
    uploadActivityImg(res){
      this.imageUrl = res.data.url
      
    },
   
    limitsChange(e){
      if(e==0){
        this.ruleForm.limits.limit_total_times = this.limit_total_times
        
        console.log('00000')
      }else{
        this.ruleForm.limits.limit_total_times = 0
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
    getGoodsList(){
          //获取通用券数据
        this.$axios.get("/api/admin/select/coupon?type=1").then(res =>{
          if(res.data.code ==0){
            this.goodsList = res.data.data
          }

        })
          
      },
    // querySearchAsync(queryString, callback) {
    //   var list = [{}];
    //   //调用的后台接口
    //   if(queryString==undefined){
    //     var url = "/api/admin/select/businessList" ;
    //   }else{
    //     var url = "/api/admin/select/businessList?business_id=" + queryString;
    //   }

    //   this.$axios.get(url).then(res =>{
    //       if(res.data.code ==0){
    //         //this.business_list = res.data.data;
    //         //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
    //         for(let i of res.data.data){
    //             i.value = i.business_name;  //将想要展示的数据作为value
                
    //         }
    //         list = res.data.data;
    //         callback(list);
    //       }
    //     })
    //   // //从后台获取到对象数组
    //   // this.$axios.get(url).then((response)=>{
        
          
    //   // }).catch((error)=>{
    //   // console.log(error);
    //   // });
    // },
    // handleSelect(event) {
    //   console.log(event,'event');
    //   this.ruleForm.business_id = event.business_id;
    //   //console.log(this.ruleForm.business_id,'this.ruleForm.business_id');
    //   //debugger;
    // },
    // handleChange(event){
    //   this.ruleForm.address_code = event[event.length-1];
    //   console.log(this.ruleForm.address_code,'this.ruleForm.address_code')
    // },
    //  handleRemove(file, fileList) {
    //    this.ruleForm.shop_environment.splice(file.url,1)
    //     console.log(this.ruleForm.shop_environment,'shop_environment')
    // },
    // handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //     this.dialogVisible = true;
    // },
    // resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   },
    // shop_pic(res){
    //   this.ruleForm.shop_pic = res.data.url
    // },
    // shop_licence_pic(res){
    //     this.ruleForm.shop_licence_pic = res.data.url
    //   },
    //   shop_environment(res){
    //     this.ruleForm.shop_environment.push(res.data.url)
    //   },
    //   shop_sfz_pic_z(res){
    //     this.ruleForm.shop_sfz_pic_z = res.data.url
    //   },
    //   shop_sfz_pic_f(res){
    //     this.ruleForm.shop_sfz_pic_f = res.data.url
    //   },

      // getBusinessList(){

      //   this.$axios.get("/api/admin/select/businessList").then(res =>{
      //     if(res.data.code ==0){
      //       this.business_list = res.data.data;
      //     }


      //   })

      // } ,
      
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
      //  getReviewData(id) {

      //       this.$axios({
      //           method: 'get',
      //           url: '/api/admin/shop/reviewDetail?id='+id,
                
      //       }).then((res) => {

      //           if(res.data.code ==0){
      //               Object.assign(this.ruleForm,res.data.data) 
      //           }else{
      //               this.$alert('接口返回错误')
      //           }
                
      //       }).catch((error) => {
      //           this.$alert('接口返回错误'+error)
      //       });
      //   }
      
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
            //判断当前是限制还是不限制
            if(res.data.data.limits.limit_total_times==0){
              this.limitsStatus = 0
            }else{
              this.limitsStatus =1
            }
        })
    }
     this.getGoodsList(); //获取优惠券列表  
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
.item-choice,.item-upload,.item-number,.item-text{
  width:100%;
  height: 100px;
  border-left:1px solid #ccc;
  border-bottom:1px solid #ccc;
  border-right:1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-number,.item-upload{
  border-left:0px;
}
.choice-button,.number-input,.text-input{
  width:100px;
  height: 40px;
  border:1px solid #000;
  color:#000;
  text-align: center;
  line-height: 40px;
  font-size: 12px; 
}
.choice-button{
  cursor:pointer;
  font-size:14px;
}

.item-upload{
  max-width:180px;
  width:180px;
  height: 100px;
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
 .item-upload .el-upload,.item-upload .el-upload--text{
    width:178px;
    height: 100px;
    overflow: hidden;
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
    border-left:1px solid #ccc;
    border-bottom:1px solid #ccc;
    border-right:1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .comfort-button{
    width:140px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border:1px solid #000;
    color:#000;
    text-align: center;
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
    background-color: #f73c3c
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
</style>


