<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">

            <div class="panel invite-box">

                <div class="form-panel p-xl  width620">
                    <!--form start-->
                    <el-form :model="ruleForm"  ref="ruleForm1" label-width="140px" class="demo-ruleForm" >
                    <el-form-item label="管理端是否接收：">
                      <el-radio-group v-model="ruleForm.business_on" @change="radioChange">
                        <el-radio  :label="1">是</el-radio>
                        <el-radio  :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="POS端是否接收：">
                      <el-radio-group v-model="ruleForm.pos_on" >
                        <el-radio  :label="1">是</el-radio>
                        <el-radio  :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="通知类型：">
                      <el-radio-group v-model="ruleForm.type">
                        <el-radio  :label="1">重要通知</el-radio>
                        <el-radio  :label="2">新品</el-radio>
                        <el-radio  :label="3">优惠活动通知</el-radio>
                        <el-radio  :label="4">公告</el-radio>
                        <el-radio  :label="5">动态</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="标题：" >
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="视频：" >
                        <el-upload 
                          accept='.mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb'
                          action="/api/admin/fileupload/image"
                          :show-file-list=false 
                          :before-upload="beforeUploadVideo"               
                          :on-success="handleVideoSuccess"                   
                          :on-progress="uploadVideoProcess"
                        >
                          <video
                            v-if="ruleForm.video !='' && videoFlag == false"
                            :src="ruleForm.video"
                            width="350"
                            height="180"
                            controls="controls"
                          >您的浏览器不支持视频播放</video>   
                                   
                        <el-progress
                          v-if="videoFlag == true"
                          type="circle"
                          :percentage="videoUploadPercent"
                          style="margin-top:30px"
                        ></el-progress>
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size:48px;margin-top:15%"></i> 
                         
                        </el-upload>
                        
                    </el-form-item>
                    

                    <el-form-item label="图片：" >

                      <el-upload
                        class="avatar-uploader"
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-success="uploadActivityImg"
                        :on-remove="handleRemove"
                        >
                       
                       <img   :src="item"  v-for="item in ruleForm.pic" :key="item" class="avatar invite-upload-img">
                       <i  class="el-icon-plus avatar-uploader-icon" style="font-size:48px;margin-top:15%"></i>
                      </el-upload>
                      <div class="upload-title">
                          <p class="upload-title-red">支持上传多张图片，图片宽高比为1242*1242，支持JPEG、PNG 等大部分图片格式</p>
                      </div>

                    </el-form-item>

                    <el-form-item label="活动规则：" >
                        <!-- <quill-editor 
                            v-model="ruleForm.content"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                        </quill-editor> -->
                         <el-input type="textarea" v-model="ruleForm.content"></el-input>
                    </el-form-item>

                    <el-form-item label="是否查看详情页：">
                      <el-radio-group v-model="ruleForm.link_type">
                        <el-radio  :label="1">可查看</el-radio>
                        <el-radio  :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    
                    

                    <el-form-item>
                        <el-button size="large" type="primary" @click="cancal" >取消</el-button>
                        <el-button size="large" type="primary" @click="submit" >确定</el-button>
                    </el-form-item>
                    
                    </el-form>

                </div>

                
            </div>
        </div>
    </div>
   
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
  name: "tabletest",

  data() {
    return {
      videoUploadPercent:"0%",
      videoFlag:false,
        // editorOption:{

        // },
     
       breadcrumb: [
                //面包屑
                {
                    name: "平台管理" //名字
                  
                },
                {
                    name: "消息推送", //名字
                    url: '/admin/news/list'
                },
                
                {
                    name: "添加消息" //名字
                }
            ],
      
      ruleForm:{
        "title" : "",//标题
        "pic" : [],//图片
        "content" : "", // 内容
        "type" : 1,//
        "video":"",
        "pos_on":1, //C端是否接收 1接收 0否
        "business_on": 1, //店POS是否接收 1接收 0否
        "link_type":1, //是否可查看详情 0否 1可查看
        
      }

    };
  },
  methods:{
      onEditorReady(editor) { // 准备编辑器
  },
  // onEditorBlur(){}, // 失去焦点事件
  // onEditorFocus(){}, // 获得焦点事件
  // onEditorChange(){}, // 内容改变事件
 
  handleUploadSuccess_data_contrast(res){
    this.ruleForm.video=res.data.url
  },
  beforeUploadVideo(file) {          //视频上传之前判断他的大小
      const isLt10M = file.size / 1024 / 1024  < 50;
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过50MB哦!');
        return false;
      }
    },
    uploadVideoProcess(event, file, fileList){    //视频上传的时候获取上传进度传给进度条
      this.videoFlag = true;
      this.videoUploadPercent = parseInt(file.percentage);
      console.log(this.videoUploadPercent)
    },
    handleVideoSuccess(res, file) {           //视频上传成功之后返回视频地址
      debugger
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      console.log(res)
      this.ruleForm.video = res.data[0];
    },
    uploadActivityImg(res){
      this.ruleForm.pic.push(res.data.url)
    },
    handleRemove(file, fileList) {
       this.ruleForm.pic.splice(file.url,1)
        console.log(this.ruleForm.pic,'pic')
    },
    cancal(){

    },
    radioChange(e){
      this.ruleForm.pos_on = e
      
    },
         
    submit(){
    let params = this.$route.params;
    this.ruleForm.id = params.id
    
    //如果是编辑
    if (Object.keys(params).length) {
                    this.$axios.post("/api/admin/news/modify", this.ruleForm).then(res => {

                    if(res.data.code == 0){

                        this.$alert('操作成功')
                        this.$router.push('/admin/news/list')
                        

                    }else{
                        this.$alert(res.data.msg)
                    }


                }).catch((e)=>{

                this.$alert('操作失败'+e)

                })
    }else{
        
        this.$axios.post("/api/admin/news/create", this.ruleForm).then(res => {

                    if(res.data.code == 0){

                        this.$alert('操作成功')
                        this.$router.push('/admin/news/list')
                        

                    }else{
                        this.$alert(res.data.msg)
                    }


                }).catch((e)=>{

                this.$alert('操作失败'+e)

                })
    }
    

    },
      
      
    },
    


  mounted() {
   
    

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
       
        this.$axios.post("/api/admin/news/detail",params).then(res => {
          console.log(res.data.data,'data----data')
          //this.ruleForm.activity_status = res.data.data.activity_status
            this.ruleForm = res.data.data;
            debugger
  
        })
    }
     
  },
  computed: {
    editor() {
        return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>

<style scoped>
.width620{
    width:620px
}
.invite-upload-img{
  max-width: 360px;
  width: 358px;
  height: 176px;
  max-height: 176px
}
</style>


