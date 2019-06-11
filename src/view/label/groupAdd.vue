<template>
   <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
<div class="page-content">

<div class="panel" id="labelGroup">

<div class="p-xl" >
                   <!--form start-->
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm ling-from">


  <el-form-item label="行业" prop="tag_name">
    <el-radio-group v-model="ruleForm.category_id">
    <el-radio v-for="(c,i) in CATEGORYOPTIONS " :label="c.category_id" :key="i">{{c.category_name}} </el-radio>
  </el-radio-group>
</el-form-item>

  <el-form-item label="分类" prop="tag_group_type">
    <el-radio-group v-model="ruleForm.tag_group_type">

      <el-radio label="1">商品</el-radio>
      <el-radio label="2">服务</el-radio>
      <el-radio label="3">品项</el-radio>
      <el-radio label="4">虚拟卡券</el-radio>
      <el-radio label="5">评价</el-radio>
      <el-radio label="6">用户</el-radio>

  </el-radio-group>
</el-form-item>


  <el-form-item label="名称" prop="tag_group_name">
    <el-input v-model="ruleForm.tag_group_name"></el-input>
  </el-form-item>
  <el-form-item label="标签组图片" >
              <el-upload
                class="avatar-uploader"
                action="/api/admin/fileupload/image"
                :show-file-list="false"
                :on-success="shop_pic1"
                >
                  <img width="30px" height="30px" v-if="ruleForm.tag_group_ico" :src="ruleForm.tag_group_ico" >
            
                  <div  v-else style="padding-top: 10%">
                    
                  <i class="el-icon-plus" style="font-size: 48px">
                    
                  </i>
                  <p> 标签组图片 尺寸30*30像素</p>
                  </div>

            </el-upload>

  
            </el-form-item>
  

    <el-form-item label="上级组" prop="tag_group_fid">
     <el-select  v-model="ruleForm.tag_group_fid" placeholder="请选择活动区域">
      <el-option v-for="(item, i) in groupList" :key="i" :label="item.tag_group_name" :value="item.tag_group_id"></el-option>
     </el-select>
   </el-form-item>

  <el-form-item label="备注" prop="tag_group_remark">
    <el-input v-model="ruleForm.tag_group_remark"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button size="large" type="primary" @click="submit" >提交</el-button>
  </el-form-item>
</el-form>

</div>

<!--form end-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import { CATEGORYOPTIONS } from "../../constans/createdGood";

export default {
  name: "tabletest",
  data() {
    return {
      CATEGORYOPTIONS,
      url: "",
      tag_group_id:"",
      breadcrumb: [
        //面包屑
        {
          name: "网站管理" //名字
        },
        {
          name: "标签组管理/标签列表", //名字
          url:"/manage/labelGroup"
        },
        {
          name: "添加标签组" //名字
        }
      ],

      groupList:[],
      tagList:[],

      ruleForm:
            {
            "category_id" : '',//行业id
            "tag_group_type" : '',//标签组类型：1商品 2服务 3虚拟券 4评价 5用户
            "tag_group_name" : "",//标签组名字
            "tag_group_remark" : "",//备注信息
            "tag_group_ico":"",//标签组图片
            "tag_group_fid" : ''//父级标签组id 只能有一个
            },

        rules: {
          tag_name: [
            { required: true, message: '请输入标签名字', trigger: 'blur' },
          ],
           tag_remark: [
            { required: true, message: '请输入备注', trigger: 'blur' },
          ]
         
        },

    };
  },
  methods:{
    getDetailInfo(id) {
        this.$axios({
          method: 'get',
          url: '/api/admin/tag/groupDetail',
          params: {id: id}
        }).then((res) => {
          this.ruleForm = res.data.data;
          // const tagInfo = res.data.data;
          // this.ruleForm.tag_name = tagInfo.tag_name;
          // this.ruleForm.tag_remark = tagInfo.tag_remark;
          // this.ruleForm.tag_fid = tagInfo.tag_fid;
          // this.ruleForm.tag_group_id = tagInfo.tag_group_id;
          this.ruleForm.tag_group_type = res.data.data.tag_group_type[0];
          console.log(this.ruleForm,'ruleforem')
        }).catch((error) => {});
      },
    shop_pic1(res){
        this.ruleForm.tag_group_ico = res.data.url
      },
    getGroupList(){
        this.$axios.get('/api/admin/tag/groupList')
      .then(res=>{
        this.groupList = res.data.data
        console.log(this.groupList)
      })

    },
     getTagList(){
        this.$axios.get('/api/admin/tag/tagList')
      .then(res=>{
        this.tagList = res.data.data
        console.log(this.groupList)
      })

    },
    submit(){
      if(this.$route.query.id){
		  this.$axios.post('/api/admin/tag/modifyGroup',this.ruleForm)
			.then(res=>{

				if(res.data.code == 0 ){


				this.$message({
				message: '恭喜你，添加成功！',
				type: 'success'
				})

				this.$router.push('/manage/labelGroup')


				}else{

				this.$message({
				message: res.data.msg,
				type: 'error'
				});
				}
				
			})
      }else{
		  this.$axios.post('/api/admin/tag/createGroup',this.ruleForm)
			.then(res=>{

				if(res.data.code == 0 ){


				this.$message({
				message: '恭喜你，添加成功！',
				type: 'success'
				})

				this.$router.push('/manage/labelGroup')


				}else{

				this.$message({
				message: res.data.msg,
				type: 'error'
				});
				}
				
			})
      }

    


    }
    
  },
  components: {
    BreadCrumb
  },
  created() {
    this.getGroupList()
    this.getTagList()
    this.tag_group_id = Number(this.$route.query.id);
      if (this.tag_group_id) {
        this.getDetailInfo(this.tag_group_id)
      }
  },
  computed: {}
};
</script>

<style scoped>

  .ling-from .el-input,.ling-from .el-input--small,.ling-from .el-input__inner{
     width:720px ;
  }
  /* #labelGroup .avatar-uploader{
	  width: 30px;
	  height: 30px;
  }
  #labelGroup .el-upload,#labelGroup .el-upload--text{
	  width: 30px;
	  height: 30px;
  } */
</style>
