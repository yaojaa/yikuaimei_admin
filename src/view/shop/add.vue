<template>
   <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">



<el-steps :active="step" simple>
  <el-step  @click.native="goNextStep(1)" title="基本信息" icon="el-icon-edit"></el-step>
  <el-step  @click.native="goNextStep(2)" title="加盟商信息" icon="el-icon-edit"></el-step>
</el-steps>



<div class="panel">

<div class="form-panel p-xl"  v-if="step==1">
                   <!--form start-->
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm" >

  <el-form-item label="公司名称" prop="shop_name">
    <el-input v-model="ruleForm.shop_name"></el-input>
  </el-form-item>

 <!-- 地图如下 -->
  <el-form-item label="地图" >
     <div id="atlas"></div>
     <p style="margin:5px">
      <input style="width:200px;padding:3px 4px;" type="text" id="place" /> <span class='shop-add-city-message'>输入地址，回车确认</span>
    </p>
  </el-form-item>
  
  <el-form-item label="城市" class="shop-add-city">
    <area-cascader v-model="ruleForm.address_code2" :level='1' :data="pcaa" @change="handleChange"></area-cascader>
  </el-form-item>

    <el-form-item label="公司地址" prop="shop_address">
    <el-input v-model="ruleForm.shop_address"></el-input>
  </el-form-item>


  <el-form-item label="法人姓名" prop="shop_corporation">
    <el-input v-model="ruleForm.shop_corporation"></el-input>
  </el-form-item>

  <el-form-item label="手机号" prop="shop_phone">
    <el-input v-model="ruleForm.shop_phone"></el-input>
  </el-form-item>

     <el-form-item label="法人身份证">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="shop_sfz_pic_z"
           >

        <img width="100%" v-if="ruleForm.shop_sfz_pic_z" :src="ruleForm.shop_sfz_pic_z" >
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>上传正面</p>
        </div> 

    </el-upload>


  </el-form-item>

     <el-form-item label="法人身份证">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="shop_sfz_pic_f"
           >
  <img width="100%" v-if="ruleForm.shop_sfz_pic_f" :src="ruleForm.shop_sfz_pic_f" >
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>上传背面</p>
        </div>       </el-upload>

  </el-form-item>

  <el-form-item label="营业执照号" prop="shop_licence_num">
    <el-input v-model="ruleForm.shop_licence_num"></el-input>
  </el-form-item>

   <el-form-item label="营业执照">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="shop_licence_pic"
           >
       <img width="360px" height="180px" v-if="ruleForm.shop_licence_pic" :src="ruleForm.shop_licence_pic" >
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>上传营业执照</p>
        </div>

       </el-upload>

  </el-form-item>



   <el-form-item label="门店封面图">


         <el-upload
          class="avatar-uploader"
          action="/api/admin/fileupload/image"
          :show-file-list="false"
          :on-success="shop_pic"
           >
       <img width="360px" height="180px" v-if="ruleForm.shop_pic" :src="ruleForm.shop_pic" >
        
        <div  v-else style="padding-top: 10%">
          
        <i class="el-icon-plus" style="font-size: 48px">
          
        </i>
        <p>门店封面图 尺寸320*320像素</p>
        </div>

       </el-upload>

  </el-form-item>

     <el-form-item label="门店环境图">
        
       <!-- <img width="120" v-for="(img,i) in ruleForm.shop_environment" :src="img"> -->

          <el-upload
            action="/api/admin/fileupload/image"
            list-type="picture-card"
            :on-success="shopEenvironment"
            :on-remove="handleRemove">
            
            <i class="el-icon-plus" ></i>
          </el-upload>
          <template v-if="dialogVisible">
            <img  :src="item" @click="handleRemove" v-for="item in ruleForm.shop_environment" :key="item" alt="" width="146px" height="146px" class="remove-img">
          </template>
          <div class="upload-title">
              <p class="upload-title-red">支持上传多张图片，图片宽高比为1242*1242，支持JPEG、PNG 等大部分图片格式</p>
          </div>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        
        <div v-if="edit">
            <img width="148px" height="148px" :src="item" alt="" v-for="item in ruleForm.shop_environment" :key="item">
        </div> -->

  </el-form-item>





  <el-form-item>
    <el-button size="large" type="primary" @click="goNextStep(2)" >下一步</el-button>
  </el-form-item>
</el-form>

</div>



<!--步骤2-->

 <div class="form-panel p-xl" v-if="step==2">

   <el-form :model="ruleForm" :rules="rules" ref="ruleForm3" label-width="100px" class="demo-ruleForm">


   

  <el-form-item label="门店类别">
      <el-radio-group v-model="ruleForm.shop_type">
        <el-radio :label="1">母店</el-radio>
        <el-radio :label="2">子店</el-radio>
      </el-radio-group>
  </el-form-item>

  <el-form-item label="行业">
    <el-select v-model="ruleForm.category_name" placeholder="请选择所属行业分类" @change="categoryChange">
        <el-option v-for="item in CATEGORYOPTIONS" :label="item.category_name" :value="item.category_id" :key="`${item.category_id}category_id`" />
    </el-select>                   
  </el-form-item>

    <el-form-item label="归属加盟商" >
    <el-autocomplete
      v-model="ruleForm.business_name"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect">

    </el-autocomplete>
    <!-- <el-select v-model="ruleForm.business_id" placeholder="请选择">
    <el-option
      v-for="item in business_list"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :key="item.business_id"
      :label="item.business_name"
      :value="item.business_id">
    </el-option>
  </el-select> -->

  </el-form-item>




  <el-form-item>
    <el-button size="large" type="primary" @click="submit()" >提交</el-button>
  </el-form-item>
</el-form>


 </div>




<!--form end-->
                </div>
            </div>
        </div>
   
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import formlist from "@/components/formlist";
import { CATEGORYOPTIONS } from "../../constans/createdGood";
import { pca, pcaa } from 'area-data'; // v5 or higher
import {TMap} from "../../../static/js/TMap"
export default {
  name: "tabletest",

  data() {
    return {
      shopFlag:true,
      pcaa,
      dialogImageUrl: '',
      dialogVisible: false,
      step: 1,
      url: "",
      business_name:null,
      CATEGORYOPTIONS,
      params:{},
      breadcrumb: [
        //面包屑
        {
          name: "加盟商管理" //名字
         
        },
       {
          name: "门店列表",
          url: "/shop/list"
        },
        {
          name: "添加门店",
          url: "/shop/add"
        },

      ],

      ruleForm:{
        "id":"",
        "shop_name" : "",//公司名称
        "shop_brand_name" : "no",//品牌名称
        "shop_pic" : "",//门店封面图
        "shop_address" : "公司地址",//公司地址
        "category_id" : [],//行业分类id数组
        "shop_type" : 1,//商铺类型 0:母店 1:子店
        "shop_corporation" : "",//法人
        "shop_sfz_num" : "",//身份证号
        "shop_sfz_pic_z" : "",//身份证正面照片
        "shop_sfz_pic_f" : "",//身份证反面照片
        "shop_licence_num" : "",//营业执照号
        "shop_licence_pic" : "",//营业执照照片
        "shop_phone" : "18668991178",//手机号
        "address_code" : "",//地址编码
        "shop_longitude" : "",//门店经度
        "shop_latitude" : "",//门店纬度
        shop_environment : [],//门店环境图片数组
        "business_id" : null,//加盟商审核信息的business_id
        // "shop_environment":[],
        address_code2:[]
      },

        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
      options: [
        {
          name: 'coupon_template_type',
          value: '1'
        },
        {
          name: "coupon_template_name",
          type: "input",
          label: "模板名称",
          placeholder: '优惠券名称',
          rules: [
            {
              required: true,
              message: "请输入优惠券模板名称",
                            trigger: "blur"

            }
          ],
          value: ""
        },
        
      ]
    };
  },
  methods:{
    //选择加盟商change事件
    businessChange(e){
      this.ruleForm.business_id = e.business_id;
     
    },
    //选择行业change事件
    categoryChange(e){
      this.ruleForm.category_id = e;
     
      //行业区别
    },
    handleFaceUploadSuccess(){},
     goNextStep(n){
       if(n==1){
         this.mapTX();
       }
       this.step = n;
      
    },
    querySearchAsync(queryString, callback) {
      var list = [{}];
      //调用的后台接口
      if(queryString==undefined){
        var url = "/api/admin/select/businessList" ;
      }else{
        var url = "/api/admin/select/businessList?business_id=" + queryString;
      }

      this.$axios.get(url).then(res =>{
          if(res.data.code ==0){
            //this.business_list = res.data.data;
            //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
            for(let i of res.data.data){
                i.value = i.business_name;  //将想要展示的数据作为value
                
            }
            list = res.data.data;
            callback(list);
          }
        })
      // //从后台获取到对象数组
      // this.$axios.get(url).then((response)=>{
        
          
      // }).catch((error)=>{
      // console.log(error);
      // });
    },
    handleSelect(event) {
      console.log(event,'event');
      this.ruleForm.business_id = event.business_id;
      //console.log(this.ruleForm.business_id,'this.ruleForm.business_id');
      //debugger;
    },
    handleChange(event){
      this.ruleForm.address_code = event[event.length-1];
      console.log(this.ruleForm.address_code,'this.ruleForm.address_code')
    },
     handleRemove(file, fileList) {
       this.ruleForm.shop_environment.splice(file.url,1)
        console.log(this.ruleForm.shop_environment,'shop_environment')
    },


    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    shop_pic(res){
      this.ruleForm.shop_pic = res.data.url
    },
    shop_licence_pic(res){
        this.ruleForm.shop_licence_pic = res.data.url
      },
      shopEenvironment(res){
        this.ruleForm.shop_environment.push(res.data.url)
      },
      shop_sfz_pic_z(res){
        this.ruleForm.shop_sfz_pic_z = res.data.url
      },
      shop_sfz_pic_f(res){
        this.ruleForm.shop_sfz_pic_f = res.data.url
      },

      // getBusinessList(){

      //   this.$axios.get("/api/admin/select/businessList").then(res =>{
      //     if(res.data.code ==0){
      //       this.business_list = res.data.data;
      //     }


      //   })

      // } ,
      
      submit(){
        let params = this.$route.params;
        this.ruleForm.id = params.id
        if (Object.keys(params).length) {
                      this.$axios.post("/api/admin/shop/modify", this.ruleForm).then(res => {

                      if(res.data.code == 0){

                          this.$alert('编辑门店成功！')

                          this.$router.push('/shop/list')

                      }else{
                          this.$alert(res.data.msg)
                      }


                  }).catch((e)=>{

                    this.$alert('操作失败'+e)

                  })
        }else{
            console.log(this.ruleForm,'this.ruleForm');
            this.$axios.post("/api/admin/shop/create", this.ruleForm).then(res => {

                      if(res.data.code == 0){

                          this.$alert('添加门店成功！')

                          this.$router.push('/shop/list')

                      }else{
                          this.$alert(res.data.msg)
                      }


                  }).catch((e)=>{

                    this.$alert('操作失败'+e)

                  })
        }
        
      },
      mapTX(lat,lng) {
        var that = this;
        TMap().then(qq => {
          var map = new qq.maps.Map(document.getElementById("atlas"),{
            center: new qq.maps.LatLng(lat||39.916527,lng||116.397128),
            zoom: 10
          });
            qq.maps.event.addListener(map, 'click', function(event) {
              var marker=new qq.maps.Marker({
                        position:event.latLng, 
                        map:map
              });    
              qq.maps.event.addListener(map, 'click', function(e) {
                marker.setMap(null);
                info.close();
                return
              });

              var info = new qq.maps.InfoWindow({
                map: map
              });
              
              //经度
              that.ruleForm.shop_longitude = event.latLng.lng;
              //维度
              that.ruleForm.shop_latitude = event.latLng.lat; 
            });
           
            //实例化自动完成
            var ap = new qq.maps.place.Autocomplete(document.getElementById('place'), {
              offset: new qq.maps.Size(0, 5),
              location: '北京市'
            });
            var keyword = "";
            //调用Poi检索类。用于进行本地检索、周边检索等服务。
            var searchService = new qq.maps.SearchService({
                complete : function(results){
                  console.log(results,'result')
                  if(results.type === "CITY_LIST") {
                        searchService.setLocation(results.detail.cities[0].cityName);
                        searchService.search(keyword);
                        return;
                    }
                  
                    var pois = results.detail.pois;
                    var latlngBounds = new qq.maps.LatLngBounds();
                    for(var i = 0,l = pois.length;i < l; i++){
                        var poi = pois[i];
                        latlngBounds.extend(poi.latLng);  
                    }
                    map.fitBounds(latlngBounds);
                }
            });
            //添加监听事件
            qq.maps.event.addListener(ap, "confirm", function(res){
                keyword = res.value;
                searchService.search(keyword);
            });
          })
        },
       getReviewData(id) {

            this.$axios({
                method: 'get',
                url: '/api/admin/shop/reviewDetail?id='+id,
                
            }).then((res) => {

                if(res.data.code ==0){
                    Object.assign(this.ruleForm,res.data.data) 
                }else{
                    this.$alert('接口返回错误')
                }
                
            }).catch((error) => {
                this.$alert('接口返回错误'+error)
            });
        }
      
    },


  mounted() {
    //this.getBusinessList();

    //如果是从审核门店中过来
    if(this.$route.query.review){
      this.getReviewData(this.$route.query.review)
    }
    if(this.ruleForm.shop_environment.length!=0){
      this.shopFlag = false;
    }
    

  },
  components: {
    BreadCrumb,
    formlist
  },

  created() {
    let params = this.$route.params;
    //如果是编辑门店
    if (Object.keys(params).length) {
        
        this.dialogVisible = true;
        this.params = params;
        console.log(params,'params')
        this.$axios.get("/api/admin/shop/detail", { params: params }).then(res => {
          console.log(res.data.data,'data----data')
            this.ruleForm = res.data.data;
            this.mapTX(this.ruleForm.position.latitude,this.ruleForm.position.longitude)
            // this.form1.category_id = res.data.data.category_id
            // this.getshopAccout(this.form1.create_user.shop_id)
            // this.loadMechanic();


        })
    }else{
      this.mapTX()
    }

      
  },
  computed: {}
};
</script>

<style scoped>
.area-select .area-selected-trigger{
  padding: 0px 20px 7px 12px
}
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
.el-upload--picture-card {
  width: 120px;
  height: 120px;
  display: inline-block;
}
#atlas {
  width:100%;
  height:300px;
}
.avatar-uploader .el-upload--text {
  /* width: 146px;
  height: 146px; */
  font-size: 12px;
}
.shop-add-city-message{
  color:#606266;
  font-size:12px;
}
.remove-img{
  cursor: pointer;
}
</style>
<style>
  .shop-add-city .el-form-item__content .area-selected-trigger{
   padding-top:2px;
 }
</style>

