<template>
    <!-- 表单list -->
    <el-form ref="currentFormInfo" :model="currentFormInfo" :rules="rules" label-width="120px">
      <el-form-item label="商品展示图：" prop="show_img_arr">
          <div class="upload-title">
            展示在商品的图片详情中的图片，至少上传1张，拖拽图片调整图片顺序，双击可预览大图，图片1242*1242px，单张图片不要超过5M，支持JPG、PNG等常见图片格式。
          </div>
          <el-upload
            action="/api/admin/fileupload/image"
            list-type="picture-card"
            :on-preview="$_onPreview"
            :on-success="$_success"
            :on-error="$_error"
            :on-remove="$_remove"
            :on-exceed="$_exceed"
            :before-upload="$_beforeUpload"
            :file-list="currentFormInfo.show_img_arr"
            :limit="6"
            :multiple="true"
            :class="{canAdd__goodImg:canAdd__goodImg}"
            >
            <i class="el-icon-plus upload-placeholder">
                <p>添加图片</p><span>还可以添加{{limitNumber}}张</span>
            </i>

            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-upload>
      </el-form-item>
      <el-form-item label="补充说明：" prop="good_notes">
          <el-input type="textarea" v-model="currentFormInfo.good_notes" placeholder="请填写购买须知" suffix-icon="el-icon-arrow-right" />
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="$_changeTabPre">上一步</el-button>
          <el-button @click="$_createProduct">上架</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单list End -->
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "createGood-formlist",

  data() {
    return {
      currentFormInfo: {
        show_img_arr:[
            {
                name: 'explain_img_arr0',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            },
            {
                name: 'explain_img_arr1',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }
        ] , // 商品展示图
        good_notes: ''
      },
      canAdd__goodImg: false,
      dialogImageUrl: '',
      dialogVisible: false,
      limitNumber:6,
  
      rules: {
        // show_img_arr: [{ required: true, message: "请选择商品展示图", trigger: "change" }], // @TODO limitNumber判断是为6
        good_notes: [{ required: true, message: "请填写购买须知", trigger: "blur" }],
      }
    }
  },

  computed: {
    ...mapState('createdGoode',['formInfo']) // 可选标签数据
  },

  methods: {
      /** *
     * 创建，调用创建接口
     */
    $_createProduct() {
      // @TODO 先做校验，校验成功在请求接口
      this.$refs.currentFormInfo.validate((valid) => {
        if (valid) {
            this.$store.commit('createdGoode/setFormInfo',this.currentFormInfo)
            this.$store.dispatch('createdGoode/fetchFormInfoCreate',this.formInfo).then((res)=>{
                if(res.code === 0){
                    this.$message.success(res.msg);
                    let good_type = this.$route.query.good_type
                    switch (good_type) {
                        case '1':
                            this.$router.push('/serviceList')
                            break;
                        case '2':
                            this.$router.push('/goodList')
                            break;
                        case '3':
                            this.$router.push('/purchaseList')
                            break;
                        case '4':
                            this.$router.push('/fictitiousList')
                            break;
                    
                        default:
                            break;
                    }
                    
                }else{
                    this.$message.error(res.msg);
                }
            })
        }
      })
    },

    /** *
     * 切换tab
     */
    $_changeTabPre() {
      this.$emit("changeTabPre");
    },

    /** 
     * 选择图片限制数量作出提示
    */
    $_exceed(files, fileList){
        this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    /** 
     * 添加商品图片之前，对类型和大小做判断
    */
    $_beforeUpload(file){
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
    },

    /** 
     * 图片上传成功
    */
    $_success(response, file, fileList){
        if(fileList.length >= 6){
            this.canAdd__goodImg = true
        }
        this.limitNumber = 6 - (+fileList.length)
        this.currentFormInfo.show_img_arr = fileList
    },

    /** 
     * 图片上传失败
    */
    $_error(err, file, fileList){
        this.$message.error('图片上传失败');
    },

    /** 
     * 上传成功后照片预览
    */
    $_onPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },

    /** 
     * 删除图片对相关状态作出处理
    */
    $_remove(file, fileList){
        this.limitNumber = 6 - (+fileList.length)
        this.canAdd__goodImg = false
        this.currentFormInfo.show_img_arr = fileList
    }
  }
};
</script>
<style>
.canAdd__goodImg .el-upload--picture-card{
    display: none
}
</style>


