<template>
  <div class="page">
    <div class="page-header">
      <div class="crumbs">
        <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
      </div>
    </div>
    <div class="page-content">
  
      <div class="panel">
  
        <div class="form-panel p-xl">
          <!--form start-->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
  
  
            <el-form-item label="名称" prop="tag_name">
              <el-input v-model="ruleForm.tag_name"></el-input>
            </el-form-item>
  
            <el-form-item label="所在组" prop="tag_group_id">
              <el-select v-model="ruleForm.tag_group_id" placeholder="请选择活动区域">
                <el-option v-for="(item, i) in groupList" :key="item.tag_group_id" :label="item.tag_group_name" :value="item.tag_group_id"></el-option>
              </el-select>
  
            </el-form-item>
  
  
            <el-form-item label="上级标签" prop="tag_fid">
              <el-select v-model="ruleForm.tag_fid" placeholder="请选择关联标签">
                <el-option v-for="(item, i) in tagList" :key="item.tag_id" :label="item.tag_name" :value="item.tag_id"></el-option>
              </el-select>
  
            </el-form-item>
  
            <el-form-item label="关联标签" prop="name">
  
  
              <el-select v-model="ruleForm.tag_friends" multiple placeholder="请选择关联标签">
                <el-option v-for="(item, i) in tagList" :key="item.tag_id" :label="item.tag_name" :value="item.tag_id"></el-option>
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
          tag_name: "", //标签名字
          tag_remark: "", //备注信息
          tag_fid: "", //父级标签id 只能有一个
          tag_group_id: "", //标签组id 只能有一个
          tag_friends: [] //关联标签id数组 可以有多个
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
      getDetailInfo(id) {
        this.$axios({
          method: 'get',
          url: '/api/admin/tag/tagDetail',
          params: {id: id}
        }).then((res) => {
          const tagInfo = res.data.data;
          this.ruleForm.tag_name = tagInfo.tag_name;
          this.ruleForm.tag_remark = tagInfo.tag_remark;
          this.ruleForm.tag_fid = tagInfo.tag_fid;
          this.ruleForm.tag_group_id = tagInfo.tag_group_id;
          this.ruleForm.tag_friends = tagInfo.tag_friends_name.split(',');
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
        this.$axios.post("/api/admin/tag/createTag", this.ruleForm).then(res => {
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
  
</style>
