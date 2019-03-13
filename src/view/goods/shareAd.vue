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
          <el-row>
            <el-col :span="8" v-for="item in cardList" :key="`${item.type_name}cardList`">
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
            </el-col>
            <el-col :span="8">
              <el-button type="change">{{card.type_name}}</el-button>
              <el-upload
                class="avatar-uploader"
                action="/api/admin/fileupload/image"
                :show-file-list="false"
                :on-change="(res,file)=>{return $_change(res,file, card)}"
                :before-upload="$_beforeUpload">
                <img v-if="card.img_url" :src="card.img_url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
                <div slot="tip" class="el-upload__tip">支持上传1张图片，图片框高逼为3:1，支持JPG,PNG等格式图片，单张图片大小不超过5M</div>
              </el-upload>
            </el-col>
          </el-row>
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
      breadcrumb: [{
            name: "商品管理", //名字
            url:'./goodList'
        },
        {
            name: "分享海报"
        }], //面包屑
      cardList: [
        {
          type_name: '经典版',
          img_url: ''

        },
        {
          type_name: '定制版',
          img_url: ''
        },
        {
          type_name: '节日版',
          img_url: ''
        }
      ],
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
    let list = await this.$store.dispatch('share/fetchGetShareList',{
        id: this.goodId,
        type_name:'经典版',  // 分享卡片
        img_url: '',
      })
    if(list && list.length){
      this.cardList = list
    }
    let cardUrl = await this.$store.dispatch('share/fetchGetCard',{
      id: this.goodId
    })
    this.card.img_url = cardUrl
  },

  methods: {
    $_change(res,file, target){
      let url = target.type_name === '分享卡片' ? 'share/fetchCreateCard' : 'share/fetchCreateShareList'
      if(res.status === 'success'){
        debugger
        target.img_url = URL.createObjectURL(res.raw)
        this.$store.dispatch(url,{
          id : this.goodId ,
          type_name : target.type_name,
          img_url : file[0].response.data.url ,
        })
        // fetchCreateCard
      }
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
      let url = item.type_name === '分享卡片' ? 'share/fetchCreateCard' : 'share/fetchCreateShareList'      
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
</style>
