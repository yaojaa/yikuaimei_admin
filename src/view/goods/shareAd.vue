<template>
   <div class="page" id="createGood">
        <!-- 面包屑 -->
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <!-- 面包屑 End -->

        <!-- tab 内容 -->
        <div class="page-content">
          <el-form   label-width="100px" class="small-form share-form">
              <el-form-item label="分享海报文字:">
                <el-input v-model="shareGetInfo.share_model_content"></el-input>
              </el-form-item>
              <el-form-item label="分享海报标题:">
                <el-input v-model="shareGetInfo.share_model_title"></el-input>
              </el-form-item>
              
          </el-form>
          <el-row>
            <!-- <el-col :span="8" v-for="item in cardList" :key="`${item.type_name}cardList`">
              <el-button type="success">{{item.type_name}}</el-button>
              <el-upload
                class="avatar-uploader"
                action="/api/admin/fileupload/image"
                :show-file-list="false"
                :on-change="(res,file)=>{return $_change(res,file, item)}"
                :before-upload="$_beforeUpload"
                >
                <img v-if="item.img_url" :src="item.img_url" class="avatar">
                <i class="el-icon-error error_deleted " v-if="item.img_url" @click.stop="$_clearFiles(item)"/>
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-col> -->
            <el-col :span="8">
              <el-button type="change">{{card.type_name}}</el-button>
              <el-upload
                class="avatar-uploader"
                action="/api/admin/fileupload/image"
                :show-file-list="false"
                :on-change="(res,file)=>{return $_change(res,file, card)}"
                :before-upload="$_beforeUpload">
                <img v-if="card.img_url" :src="card.img_url" class="avatar" width="360px" height="180px">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
                <div slot="tip" class="el-upload__tip">支持上传1张图片，图片框高逼为3:1，支持JPG,PNG等格式图片，单张图片大小不超过5M</div>
              </el-upload>
            </el-col>
          </el-row>
        <el-form  label-width="80px" class="bottom-form">
          <el-form-item>
            <el-button type="primary" @click="shareSure">确定</el-button>
          </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
  name: "tabletest",
  components: {
    BreadCrumb
  },

  data() {
    return {
      shareGetInfo:{
        // "share_model_content":"", //分享海报文字
        // "share_model_title":"", //分享海报标题
      },
      
      breadcrumb: [{
            name: "商品管理" //名字
            
        },
        {
            name: "分享海报"
        }], //面包屑
      // cardList: [
      //   {
      //     type_name: '经典版',
      //     img_url: ''

      //   },
      //   {
      //     type_name: '定制版',
      //     img_url: ''
      //   },
      //   {
      //     type_name: '节日版',
      //     img_url: ''
      //   }
      // ],
      card: {
        type_name: '分享卡片',
        img_url: ''
      },
    }
  },

  computed: {
    goodId(){
      return Number(this.$route.query.good_id)
    }
  },

  async created() {
    console.log(this.goodId,'goodId')
    // debugger;
    // let list = await this.$store.dispatch('share/fetchGetShareList',{
    //     id: this.goodId,
    //     type_name:'经典版',  // 分享卡片
    //     img_url: '',
    //   })
    // if(list && list.length){
    //   this.cardList = list
    // }
    let cardUrl = await this.$store.dispatch('share/fetchGetCard',{
      id: this.goodId
    })
    this.card.img_url = cardUrl;

    this.getShareSet();
    
  },

  methods: {
    $_change(res,file, target){
      let url = 'share/fetchCreateCard'
      if(res.status === 'success'){
        //debugger
        target.img_url = URL.createObjectURL(res.raw)
        this.$store.dispatch(url,{
          id : this.goodId ,
          type_name : target.type_name,
          img_url : file[0].response.data.url
        })
        // fetchCreateCard
      }
    },
    shareSure(){
      //确定按钮
      let parms = {
        "id":this.goodId,
        "share_model_content":this.shareGetInfo.share_model_content,
        "share_model_title": this.shareGetInfo.share_model_title
      }
      this.$axios.post("/api/admin/shopgoods/createShareSet",parms).then(res => {
        if (res.data.code == 0) {
            
            this.$alert('提交成功');
            //this.shareGetInfo = {};
            // console.log(this,'this');
            this.$router.go(-1);
            //this.$router.push('/goodList')

        } else {
            this.$alert('操作失败' + res.data.msg)

        }

    }).catch((e) => {

        this.$alert('操作失败' + e)

    })
      

      
    },
    getShareSet(){
      //获取分享内容和分享标题
      let params = {
        id:this.goodId
      }
      console.log(params,'params');
        this.$axios.post("/api/admin/shopgoods/getShareSet", params).then(res => {
                if (res.data.code == 0) {
                    this.shareGetInfo = res.data.data;
                    console.log(this.shareGetInfo,'share')
                } else {
                    this.$alert('操作失败' + res.data.msg)

                }

            }).catch((e) => {

                this.$alert('操作失败' + e)

            })
    },

    /** 
     * 添加商品图片之前，对类型和大小做判断
    */
    $_beforeUpload(file){
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
    },

    $_clearFiles(item){
      let url =  'share/fetchCreateCard'  
      item.imageUrl = ''
      item.img_url = ''
      this.$store.dispatch(url ,{
        id : this.goodId ,
        type_name : item.type_name,
        img_url : '',
      })
    }
  }
}
</script>

<style scope>
.error_deleted{
  color: #F00;
    POSITION: ABSOLUTE;
    right: 0;
    TOP: 0;
}

.small-form .el-input__inner{
  width:720px;
}
.bottom-form{
  margin-top:50px;
  margin-left: 40px;
}
/* .small-form .el-form-item__content{
  margin-left:20px;
  
} */
</style>
