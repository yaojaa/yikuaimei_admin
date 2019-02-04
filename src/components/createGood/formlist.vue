<template>
    <div>
        <!-- 表单list -->
        <el-form ref="currentFormInfo" :model="currentFormInfo" :rules="rules" label-width="120px">
            <el-form-item label="名称：" prop="good_name">
                <el-input  v-model="currentFormInfo.good_name" placeholder="名称为2-30个字" />                                                    
            </el-form-item>
            <el-form-item label="商品卖点：" prop="good_explain">
                <el-input type="textarea" v-model="currentFormInfo.good_explain" placeholder="长度为2-50个字" suffix-icon="el-icon-arrow-right" /> 
            </el-form-item>
            <el-form-item label="行业分类：" prop="category_id">
                <el-select v-model="currentFormInfo.category_id" placeholder="请选择所属行业分类">
                    <el-option v-for="item in CATEGORYOPTIONS" :label="item.category_name" :value="item.category_id" :key="item.category_name" />
                </el-select>                         
            </el-form-item>
            <el-form-item label="标签：" prop="tag_list" >
                <div class="el-input el-input--small el-input--suffix div__input"  @click="$_showLable">
                    <el-tag v-for="item in currentFormInfo.tag_list" :key="item.tag_name">{{item.tag_name}}</el-tag>
                    <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                            <i class="el-input__icon el-icon-arrow-right"></i>
                        </span>
                    </span>
                </div>
                <p class="input__tabs">可设置多个标签</p>
            </el-form-item>
            <el-form-item label="规格" props="format">
                <!-- format_none format_add -->
                <el-radio-group v-model="currentFormInfo.singleButton" @change="this.$_showFormat">
                    <el-radio-button label="无规格" />
                    <el-radio-button label="添加规格" />
                </el-radio-group>
            </el-form-item>

            <el-form-item v-if="goodSkuInfo.length">
                <el-row :gutter="20">
                    <el-col :span="4">名称:</el-col>
                    <el-col :span="12">选项: </el-col>
                </el-row>
                <el-row :gutter="20"  v-for="(item,idx) in goodSkuInfo" :key="item.name" class="goodSkuInfo_row">
                    <el-col :span="4"><el-button plain>{{item.name}}</el-button></el-col>
                    <el-col :span="12"><el-button v-for="tag in item.list" :key="tag" plain>{{tag}}</el-button></el-col>
                    <el-col :span="2"> <el-button v-if="idx === goodSkuInfo.length-1" click="$_edit" @click="showFormat()">编辑</el-button></el-col>
                </el-row>
                <el-table :data="currentFormInfo.good_sku" style="width: 100%" border :span-method="$_SpanMethod" class="table">
                    <el-table-column :label="currentFormInfo.sku_type_arr[0]" prop="sku_type_arr[0]" />
                    <el-table-column :label="currentFormInfo.sku_type_arr[1]" prop="sku_type_arr[1]" v-if="currentFormInfo.sku_type_arr[1]" />
                    <el-table-column label="售价" >
                        <template slot-scope="scope">
                            <el-input  v-model="scope.row.price_sale" placeholder="10000" /> <span class="outText1">元</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="原价" >
                        <template slot-scope="scope">
                            <el-input  v-model="scope.row.price" placeholder="10000" /><span class="outText1"> 元</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="成本" >
                        <template slot-scope="scope">
                            <el-input  v-model="scope.row.price_cost" placeholder="10000" /> <span class="outText1">元</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="编码" >
                        <template slot-scope="scope">
                            <el-input  v-model="scope.row.sku_code" placeholder="10000" /> 
                        </template>
                    </el-table-column>
                    <el-table-column label="图片" prop="ico_small">
                        <template slot-scope="scope">
                            <el-upload
                                class="table_upload"
                                :show-file-list="false"
                                :class="{table_upload__disabled:scope.row.iconStatus}"
                                action="/api/admin/fileupload/image"
                                :on-error="$_error"
                                :on-preview="$_onPreview"
                                :before-upload="$_beforeUpload"
                                :on-success="(res,file)=>{return $_success__table_ico_small(res,file,scope.row)}"
                                >
                                <img v-if="scope.row.ico_small" :src="scope.row.ico_small" class="avatar">
                                <span class="table_icon_text" v-else><i class="el-icon-plus" />添加商品图片</span>
                            </el-upload>
                        </template> 
                    </el-table-column>
                </el-table>
            </el-form-item>
            <!-- 一期不做 -->
            <!-- <el-form-item label="库存：" prop="exist">
                <el-input  v-model="currentFormInfo.exist" placeholder="10000" suffix-icon="el-icon-arrow-right" />                                                    
            </el-form-item>
            <el-form-item label="单位：" prop="unit">
                <el-input  v-model="currentFormInfo.unit" placeholder="箱" suffix-icon="el-icon-arrow-right" />                                                                       
            </el-form-item> -->
            <el-form-item label="商品编码：" prop="productCode">
                <el-input  v-model="currentFormInfo.productCode" placeholder="支持14以内的数字+英文组合"  />                                                                              
            </el-form-item>
            <el-form-item label="售价：" prop="sellPrice">
                <el-input  v-model="currentFormInfo.sellPrice" placeholder="请输入套餐在婚博会标价" />                                                                                                        
                <span class="outText">元</span>
            </el-form-item>
            <el-form-item label="原价：" prop="price">
                <el-input  v-model="currentFormInfo.price" placeholder="¥5000" />                                                                                                        
                <span class="outText">元</span>
            </el-form-item>
            <el-form-item label="商品图片：" prop="good_img_arr">
                <div class="upload-title">
                您可以上传3-6张图片及1个视频作为商品展示图，<br />
                展示在商品页顶部的图片，支持上传1-6张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为1242*1242，支持JPG、PNG等大部分格式图片，单张图片大小不超过5M 
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
                    :file-list="currentFormInfo.good_img_arr"
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
            <el-form-item label="" prop="uploadArray">
                <div class="upload-title">
                展示在商品页顶部的视频，<a>最多可上传 1 个视频</a>，
                支持MP4视频格式，<a>视频大小不能超过20M</a>
                </div>
                <div class="uploadArray_content">
                    <el-upload
                        action="/api/admin/fileupload/image"
                        class="avatar-uploader"
                        :show-file-list="false"
                        :on-success="$_success_uploadArray_content"
                        :on-error="$_error"
                        :before-upload="$_beforeUpload_uploadArray_content"
                        >
                        <img v-if="currentFormInfo.good_video" :src="currentFormInfo.good_video" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon">
                            <p>添加视频</p>
                        </i>
                    </el-upload>
                    <el-upload
                        action="/api/admin/fileupload/image"
                        class="avatar-uploader"
                        :show-file-list="false"
                        :on-success="$_success__good_video_pic"
                        :on-error="$_error"
                        :before-upload="$_beforeUpload"
                        >
                        <img v-if="currentFormInfo.good_video_pic" :src="currentFormInfo.good_video_pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon upload-placeholder">
                            <p>添加视频首图</p>
                        </i>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="商品展示图：" prop="good_ico">
                <div class="upload-title">
                <p>展示在商品页顶部的图片，支持上传 1 张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为400*400，支持JPG、PNG等大部分格式图片，单张图片大小不超过2M</p>
                </div>
                <el-upload
                action="/api/admin/fileupload/image"
                class="avatar-uploader"
                :show-file-list="false"
                :on-success="$_success__good_ico"
                :on-error="$_error"
                :before-upload="$_beforeUpload"
                >
                <img v-if="currentFormInfo.good_ico" :src="currentFormInfo.good_ico" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon upload-placeholder">
                    <p>添加图片</p><span>只能上传一张</span>
                </i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="$_changeTabNext">下一步</el-button>
            </el-form-item>
        </el-form>
        <!-- 表单list End -->

        <!-- 添加标签弹框 -->
        <Lable ref="lable" @addLable="$_addLable"/>
        <!-- 添加标签弹框 End -->

        <!-- 添加规格弹框 -->
        <Formate  @addFormat="$_addFormat" ref="formate" />
        <!-- 添加规格弹框  End-->
    </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from "vuex";
import { CATEGORYOPTIONS } from "../../constans/createdGood";
import Lable from "@/components/createGood/lable";
import Formate from "@/components/createGood/formate";

export default {
  name: "createGood-formlist",

  components: {
    Formate,
    Lable,
  },

  props: ['oldFormInfo'],

  data() {
    return {
      CATEGORYOPTIONS, // 所属行业分类
      canAdd__goodImg: false, // 是否可添加状态 __ 商品图片
      dialogImageUrl: '',
      dialogVisible: false,
//       currentFormInfo:{
//         good_name: '' , // 商品名字
//         good_explain: '' , // 商品卖点
//         category_id: '' , // 行业id
//         tag_id_arr: [], // 标签id数组
//         tag_list: [], // 已选标签展示数据
//         good_video: '', // 商品视频
//         good_video_pic: '', // 商品视频封面图
//         good_img_arr: [], // 商品图片数组
//         good_ico: '', // 商品展示图
//         unit: '', // 单位 例如盒，箱
//         show_img_arr: [], // 详情页商品展示图数组       
//         explain_img_arr : [],// 卖点图数组   
//         sku_type_arr: [], // 规格数组，单规格商品不要提交该字段
//         good_sku: [] , // 规格sku数组，单规格商品也要按该数组格式提交
//         good_friends : [] // //服务添加耗材列表 不是服务不需要提交
//       },

      limitNumber:6,
      goodSkuInfo:[],

      rules: {
        good_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在2-30个字符", trigger: "blur" }
        ],
        good_explain: [
          { required: true, message: "在商品详情页标题下面展示卖点信息，建议50字以内", trigger: "blur" },
          { min: 2, max: 50, message: "在商品详情页标题下面展示卖点信息，建议50字以内", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "请选择所属行业分类", trigger: "blur" }
        ],
        //@TODO
        tag_list: [
          { required: true, message: "请添加标签", trigger: "blur" }
        ],
        format: [{ required: true, message: "请选择规格", trigger: "change" }],
        productCode: [
          { required: true, message: "请填写商品编码", trigger: "blur" }
        ],
        sellPrice: [{ required: true, message: "请填写售价", trigger: "blur" }],
        price: [{ required: true, message: "请填写原价", trigger: "blur" }]
      }
    };
  },

  computed: {
    good_type(){
        return this.$route.query.good_type
    },

    currentFormInfo(){
        const obj = {
            good_name: '' , // 商品名字
            good_explain: '' , // 商品卖点
            category_id: '' , // 行业id
            tag_id_arr: [], // 标签id数组
            tag_list: [], // 已选标签展示数据
            good_video: '', // 商品视频
            good_video_pic: '', // 商品视频封面图
            good_img_arr: [], // 商品图片数组
            good_ico: '', // 商品展示图
            unit: '', // 单位 例如盒，箱
            show_img_arr: [], // 详情页商品展示图数组       
            explain_img_arr : [],// 卖点图数组   
            sku_type_arr: [], // 规格数组，单规格商品不要提交该字段
            good_sku: [] , // 规格sku数组，单规格商品也要按该数组格式提交
            good_friends : [] // //服务添加耗材列表 不是服务不需要提交
        }
        return this.oldFormInfo || obj
    }
  },

  created() {
      console.log(this.oldFormInfo)
      console.log(this.currentFormInfo)
  },

  methods: {
    /** *
     * 展示标签
     */
    $_showLable() {
        // 获取标签信息
        if(!this.currentFormInfo.category_id){
            alert('请先选择行业id')
            return 
        }
        this.$store.dispatch('createdGoode/fetchLableList', {
            tag_group_type: this.good_type, // 标签组类型 1商品 2服务 3虚拟券 4评价 5用户
            category_id: this.currentFormInfo.category_id || 1, // 行业id @TODO 默认是1 ，变量
            get_tag_list: 1 // 是否获取标签列表 1获取 0不获取
        }).then(()=>{
            this.$refs.lable.lable_show = true
            this.$refs.lable.initSons()
        })
    },

    /** 
     * 添加标签
    */
    $_addLable(tag_list){
        this.currentFormInfo.tag_list = tag_list, // 已选标签展示数据
        this.currentFormInfo.tag_id_arr = tag_list.map(item => item.tag_id) 
    },

    /** 
     * 选择图片限制数量作出提示
    */
    $_exceed(files, fileList){
        this.$message.warning(`当前限制选择6个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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

    $_beforeUpload_uploadArray_content(file){
        // @TODO 限制视频的格式和大小
        const isJPG = file.type === 'video/mp4';
        const isLt2M = file.size / 1024 / 1024 < 20;

        if (!isJPG) {
          this.$message.error('上传视频只能是 mp4 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 20MB!');
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
        this.currentFormInfo.good_img_arr = fileList
    },

    $_success_uploadArray_content(res, file){
        this.currentFormInfo.good_video = URL.createObjectURL(file.raw)
    },

    $_success__good_video_pic(res, file){
        this.currentFormInfo.good_video_pic = URL.createObjectURL(file.raw);
    },

    $_success__table_ico_small(res, file, targe){
        targe.iconStatus = true
        targe.ico_small = file.url
    },

    $_success__good_ico(res, file){
        this.currentFormInfo.good_ico = URL.createObjectURL(file.raw);
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
        this.currentFormInfo.good_img_arr = fileList
    },

    /** *
     * 展示规格
     */
    $_showFormat() {
      if (this.currentFormInfo.singleButton === "添加规格") {
        this.showFormat()
      }
    },
    
    showFormat() {
        this.$refs.formate.format_show = true;
    },

    /** *
     * 合并列
     */
    $_SpanMethod({ row, column, rowIndex, columnIndex }) {
      const columnIndexNum = this.currentFormInfo.sku_type_arr.length === 2 ? 6 : 5;

      if (columnIndex === 0 || columnIndex === 6) {
        if (rowIndex % (this.currentFormInfo.good_sku.length/this.currentFormInfo.sku_type_arr.length) === 0) {
          return {
            rowspan: this.currentFormInfo.good_sku.length/this.currentFormInfo.sku_type_arr.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    /** *
     * @TODO 添加规格 currentFormInfo 应该是个数组
     */
    $_addFormat(goodSkuInfo) {
      this.goodSkuInfo = goodSkuInfo
      let sku_type_arr_key = goodSkuInfo[0].list
      let sku_type_arr_val = goodSkuInfo[1].list
      let good_sku_arr = []
      
      for(var i=0;i<sku_type_arr_key.length;i++){
        for(var j=0;j<sku_type_arr_val.length;j++){
          good_sku_arr.push({sku_type_arr:[sku_type_arr_key[i],sku_type_arr_val[j]],sku_code:'',price_cost: '',price: '',price_sale: '', price_plate: '',ico_small: ''})
        }
      }

      this.currentFormInfo.sku_type_arr = goodSkuInfo.map(item=>item.name) // 规格数组，单规格商品不要提交该字段 
      this.currentFormInfo.good_sku = good_sku_arr
    },

    /** *
     * 切换tab
     */
    $_changeTabNext() {
        this.$refs.currentFormInfo.validate((valid) => {
            if (valid) {
                this.$store.commit('createdGoode/setFormInfo',this.currentFormInfo)
                this.$emit("changeTabNext");
            }
        })
    }
  },
};
</script>
<style>
.div__input {
  border: 1px solid #dcdfe6; /** 默认 */
  border: 1px solid #67c23a; /** 失去焦点 */
  border: 1px solid #f56c6c; /** 报错 */
  border: 1px solid #7224d8; /** :focus 获得焦点 */
  padding-right: 30px;
}
.avatar-uploader .el-upload--text{
    width:180px;
    height: 180px;
    font-size: 28px;
    color: #8c939d;
}

.avatar-uploader  .avatar-uploader-icon{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.avatar-uploader  .avatar-uploader-icon p{
    color: rgba(102, 102, 102, 1);
    font-size: 15px;
    text-align: left;
    margin-bottom: 10px;
}

#createGood .el-input--small{
    min-height:30px
}
.canAdd__goodImg .el-upload--picture-card{
    display: none
}

#createGood  .avatar{
    width: 100%
}
#createGood  .outText{
    position: absolute;
    top: 0;
    left: 270px;
}

#createGood  .outText1{
    position: absolute;
    top: 12px;
    left: 95px;
}

.goodSkuInfo_row{
    margin:10px
}

#createGood .table .el-input{
    width:80px;
}
#createGood .el-input input{
    padding:5px
}
.table_icon_text{
    color:#999999
}
.table_icon_text i{
    margin-right: 5px
}
.table_upload div{
    border: 0;
    width:auto;
    height: auto;
}
.table_upload__disabled .el-upload--picture{
    display: none
}

</style>


