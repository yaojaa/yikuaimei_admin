<template>
  <div class="page">
    <div class="page-header">
      <div class="crumbs">
        <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
      </div>
    </div>
    <div class="page-content">
  
      <div class="panel" id="labelAdd">
  
        <div class="form-panel p-xl">
          <!--form start-->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
  
  
            <el-form-item label="名称" prop="tag_name">
              <el-input v-model="ruleForm.tag_name"></el-input>
            </el-form-item>
  
            <el-form-item label="所在组" prop="tag_group_id">
              <el-select v-model="ruleForm.tag_group_id" placeholder="请选择活动区域">
                <el-option v-for="item in groupList" :key="item.tag_group_id" :label="item.tag_group_name" :value="item.tag_group_id"></el-option>
              </el-select>
  
            </el-form-item>
            
            <el-form-item label="上级标签" prop="tag_fid">
              <el-select v-model="ruleForm.tag_fid" placeholder="请选择关联标签">
                <el-option v-for="item in tagList" :key="item.tag_id" :label="item.tag_name" :value="item.tag_id"></el-option>
              </el-select>
  
            </el-form-item>
            <el-form-item label="标签图片" >
              <el-upload
                class="avatar-uploader"
                action="/api/admin/fileupload/image"
                :show-file-list="false"
                :on-success="shop_pic"
                >
                  <img width="30px" height="30px" class="uploader-img" v-if="ruleForm.tag_ico" :src="ruleForm.tag_ico" >
            
                  <div  v-else style="padding-top: 10%">
                    
                  <i class="el-icon-plus" style="font-size: 48px">
                    
                  </i>
                  <p>标签图片 尺寸30*30像素</p>
                  </div>

            </el-upload>

  
            </el-form-item>
  
            <el-form-item label="关联标签" prop="name">
  
  
              <el-select v-model="tag_selected" multiple placeholder="请选择关联标签" @change="tagChange">
                <el-option v-for="item in tagList" :key="item.tag_id" :label="item.tag_name" :value="item.tag_id"></el-option>
              </el-select>
  
            </el-form-item>
  
  
  
            <el-form-item label="备注" prop="tag_remark">
              <el-input v-model="ruleForm.tag_remark"></el-input>
            </el-form-item>
  
            <el-form-item>
              <el-button size="large" type="primary" @click="submit">提交</el-button>
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
  
  export default {
    name: "tabletest",
    data() {
      return {
        url: "",
        tag_id: 0,
        selected:[],
        tag_selected:[],
        breadcrumb: [
          //面包屑
          {
            name: "网站管理" //名字
          },
          {
            name: "标签管理/标签列表", //名字
            url: "/manage/label"
          },
          {
            name: "添加标签", //名字
            url:"/manage/label/add?id=0"
          }
        ],
  
        groupList: [],
        tagList: [],
  
        ruleForm: {
          id:"",
          tag_name: "", //标签名字
          tag_remark: "", //备注信息
          tag_fid: "", //父级标签id 只能有一个
          tag_group_id: "", //标签组id 只能有一个
          tag_friends: [], //关联标签id数组 可以有多个
          tag_ico:"",//标签图片
         
          // tag_friends_l:[]
         
        },
  
        rules: {
          tag_name: [{
            required: true,
            message: "请输入标签名字",
            trigger: "blur"
          }],
          tag_remark: [{
            required: true,
            message: "请输入备注",
            trigger: "blur"
          }]
        }
      };
    },
    methods: {
      tagChange(e){
        this.selected = e
        
      },
      // shop_pic1(res){
      //   this.ruleForm.tag_group_ico = res.data.url
      // },
      shop_pic(res){
      this.ruleForm.tag_ico = res.data.url
    },
      getDetailInfo(id) {
        var _this = this;
        this.$axios({
          method: 'get',
          url: '/api/admin/tag/tagDetail',
          params: {id: id}
        }).then((res) => {
          this.ruleForm = res.data.data;
          this.ruleForm.id = res.data.data.tag_id
          
         
          this.tag_selected = res.data.data.tag_friends_name.split(',');
          
          
          
        }).catch((error) => {});
      },
      getGroupList() {
        this.$axios.get("/api/admin/tag/groupList").then(res => {
          this.groupList = res.data.data;
          console.log(this.groupList);
        });
      },
      getTagList() {
        this.$axios.get("/api/admin/tag/tagList").then(res => {
          this.tagList = res.data.data;
          console.log(this.groupList);
        });
      },
      submit() {
        console.log(this.$route.query.id,'this.$route.query.length')
        var obj=JSON.parse(JSON.stringify(this.ruleForm));
        obj.tag_friends = this.selected
        if(this.$route.query.id){

          this.$axios.post("/api/admin/tag/modifyTag", obj).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: "恭喜你，编辑成功！",
                type: "success"
              });
    
              this.$router.push("/manage/label");
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
             
        }else{
            this.$axios.post("/api/admin/tag/createTag", obj).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: "恭喜你，添加成功！",
                type: "success"
              });
    
              this.$router.push("/manage/label");
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        }
        
      }
    },
    components: {
      BreadCrumb
    },
    created() {
      this.getGroupList();
      this.getTagList();
      this.tag_id = Number(this.$route.query.id);
      if (this.tag_id) {
        
        this.getDetailInfo(this.tag_id)
      }
    },
    computed: {}
  };
</script>

<style scoped>
  /* #labelAdd .avatar-uploader{
    width: 30px;
    height: 30px;
  }
  #labelAdd .el-upload,#labelAdd .el-upload--text{
	  width: 30px;
	  height: 30px;
  } */
  #labelAdd .uploader-img{
    margin-top: 20%;
  }
</style>
