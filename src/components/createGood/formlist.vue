<template>
    <div>
        <!-- 表单list -->
        <el-form ref="currentFormInfo" :model="currentFormInfo" :rules="rules" label-width="120px">
            <el-form-item label="名称：" prop="good_name">
                <el-input  v-model="currentFormInfo.good_name" placeholder="名称为2-30个字" />                                                    
            </el-form-item>
            <el-form-item :label="`${type}卖点：`" prop="good_explain">
                <el-input type="textarea" v-model="currentFormInfo.good_explain" placeholder="长度为2-50个字" suffix-icon="el-icon-arrow-right" /> 
            </el-form-item>
            <el-form-item label="行业分类：" prop="category_id">
                <el-select v-model="currentFormInfo.category_id" placeholder="请选择所属行业分类" >
                    <el-option v-for="item in CATEGORYOPTIONS" :label="item.category_name" :value="item.category_id" :key="`${item.category_id}category_id`" />
                </el-select>                   
            </el-form-item>
            <el-form-item label="标签：" prop="tag_list">
                <div class="el-input el-input--small el-input--suffix div__input"  @click="$_showLable" :key="tagList__key">
                    <el-tag v-for="item in currentFormInfo.tag_list" :key="`${item.tag_name}`">
                        {{item.tag_name}}</el-tag>
                    <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                            <i class="el-input__icon el-icon-arrow-right"></i>
                        </span>
                    </span>
                </div>
                <p class="input__tabs">可设置多个标签</p>
            </el-form-item>
            <!-- 服务不用设置规格 -->
            <el-form-item label="规格" props="format" v-if="!isGoodFriend">
                <el-radio-group v-model="currentFormInfo.singleButton" @change="this.$_showFormat">
                    <el-radio-button label="无规格" />
                    <el-radio-button label="添加规格" />
                </el-radio-group> 
            </el-form-item>
            
            <el-form-item v-if="goodSkuStatus" :key="goodsku__key">
                <el-row :gutter="20">
                    <el-col :span="4">名称:</el-col>
                    <el-col :span="12">选项: </el-col>
                </el-row>
                <el-row :gutter="20"  v-for="(item,idx) in currentFormInfo.goodSkuInfo" :key="`${item.name}${idx}`" class="goodSkuInfo_row">
                    <el-col :span="4"><el-button   v-if="item.name" plain>{{item.name}}</el-button></el-col>
                    <el-col :span="12"><el-button v-for="tag in item.list" :key="`${tag}tag`" plain>{{tag}}</el-button></el-col>
                    <el-col :span="2"> 
                        <el-button  v-if="idx === currentFormInfo.sku_type_arr.length-1"  @click="showFormat()">
                            编辑
                        </el-button>
                    </el-col>
                </el-row>
                
                <el-table :data="currentFormInfo.good_sku" style="width: 100%" border :span-method="$_SpanMethod" class="table">
                    <!-- 功能列 -->
                    <el-table-column :label="currentFormInfo.sku_type_arr[0]" prop="sku_type_arr[0]" v-if="currentFormInfo.sku_type_arr[0]" /> 
                    <!-- 容量列 -->
                    <el-table-column :label="currentFormInfo.sku_type_arr[1]" prop="sku_type_arr[1]" v-if="currentFormInfo.sku_type_arr.length>1" />
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
                    <el-table-column label="总价" v-if="isGoodFriend">
                        <template slot-scope="scope">
                            <el-input  v-model="scope.row.price_total" placeholder="10000" /><span class="outText1"> 元</span>
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
                                <img v-if="scope.row.ico_small" :src="scope.row.ico_small__url" class="avatar">
                                <span class="table_icon_text" v-else><i class="el-icon-plus" />添加{{type}}图片</span>
                            </el-upload>
                        </template> 
                    </el-table-column>
                </el-table>
            </el-form-item>
            <!-- 一期不做 -->
            <!-- <el-form-item label="库存：" prop="exist">
                <el-input  v-model="currentFormInfo.exist" placeholder="10000" suffix-icon="el-icon-arrow-right" />                                                    
            </el-form-item> -->
            <el-form-item label="单位：" prop="unit">
                <el-input  v-model="currentFormInfo.unit" placeholder="箱" />                                                                       
            </el-form-item>
            <template v-if="currentFormInfo.singleButton === '无规格' || isGoodFriend">
                <el-form-item :label="`${type}编码：`" prop="sku_code">
                    <el-input  v-model="currentFormInfo.sku_code" placeholder="支持14以内的数字+英文组合"  />                                                                              
                </el-form-item>
                <el-form-item label="售价：" prop="price_sale">
                    <el-input  v-model="currentFormInfo.price_sale" placeholder="请输入套餐在婚博会标价" />                                                                                                        
                    <span class="outText">元</span>
                </el-form-item>
                <el-form-item label="原价：" prop="price">
                    <el-input  v-model="currentFormInfo.price" placeholder="¥5000" />                                                                                                        
                    <span class="outText">元</span>
                </el-form-item>
                <el-form-item label="成本" prop="price_cost">
                    <el-input  v-model="currentFormInfo.price_cost" placeholder="¥5000" />                                                                                                        
                    <span class="outText">元</span>
                </el-form-item>
                <el-form-item label="总价" prop="price_total"  v-if="isGoodFriend">
                    <el-input  v-model="currentFormInfo.price_total" placeholder="¥5000" />                                                                                                        
                    <span class="outText">元</span>
                </el-form-item>
            </template>
            

            <el-form-item :label="`${type}图片：`" prop="good_img_arr">
                <div class="upload-title">
                您可以上传3-6张图片及1个视频作为{{type}}展示图，<br />
                展示{{type}}页顶部的图片，支持上传1-6张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为1242*1242，支持JPG、PNG等大部分格式图片，单张图片大小不超过5M 
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
            <el-form-item :label="`${type}卖点图：`" prop="explain_img_arr">
                <el-upload
                    action="/api/admin/fileupload/image"
                    list-type="picture-card"
                    :on-preview="$_onPreview"
                    :on-success="$_success2"
                    :on-error="$_error"
                    :on-remove="$_remove2"
                    :on-exceed="$_exceed"
                    :before-upload="$_beforeUpload"
                    :file-list="currentFormInfo.explain_img_arr"
                    :limit="4"
                    :multiple="true"
                    :class="{canAdd__goodImg:canAdd__goodImg2}"
                    >
                    <i class="el-icon-plus upload-placeholder">
                        <p>添加图片</p><span>还可以添加{{limitNumber2}}张</span>
                    </i>

                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-upload>
            </el-form-item>
            <el-form-item label="" prop="uploadArray">
                <div class="upload-title">
                展示在{{type}}页顶部的视频，<a>最多可上传 1 个视频</a>，
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
                        :key="good_video__Key"
                        >
                        <video v-if="currentFormInfo.good_video__url" :src="currentFormInfo.good_video__url" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
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
                        :key="good_video_pic__Key"
                        >
                        <img v-if="currentFormInfo.good_video_pic__url" :src="currentFormInfo.good_video_pic__url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon upload-placeholder">
                            <p>添加视频首图</p>
                        </i>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item :label="`${type}展示图：`" prop="good_ico">
                <div class="upload-title">
                <p>展示在{{type}}页顶部的图片，支持上传 1 张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为400*400，支持JPG、PNG等大部分格式图片，单张图片大小不超过2M</p>
                </div>
                <el-upload
                action="/api/admin/fileupload/image"
                class="avatar-uploader"
                :show-file-list="false"
                :on-success="$_success__good_ico"
                :on-error="$_error"
                :before-upload="$_beforeUpload"
                :key="good_ico__Key"
                >
                <img v-if="currentFormInfo.good_ico__url" :src="currentFormInfo.good_ico__url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon upload-placeholder">
                    <p>添加图片</p><span>只能上传一张</span>
                </i>
                </el-upload>
            </el-form-item>
            <el-form-item class="form-footer">
                <el-button @click="$_changeTabNext" v-if="!isCoupon">下一步</el-button>
                <el-button @click="$_createProduct" v-if="isCoupon">上架</el-button>
            </el-form-item>
        </el-form>
        <!-- 表单list End -->

        <!-- 添加标签弹框 -->
        <Lable ref="lable" @addLable="$_addLable" :tagList = "currentFormInfo.tag_list"/>
        <!-- 添加标签弹框 End -->

        <!-- 添加规格弹框 -->
        <Formate  @addFormat="$_addFormat" @closeFormat="$_closeFormat" ref="formate" :goodSkuinfo = "currentFormInfo.goodSkuInfo"  @changeSingleButton="$_changeSingleButton"  />
        <!-- 添加规格弹框  End-->
    </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from "vuex";
import { CATEGORYOPTIONS,type } from "../../constans/createdGood";
import Lable from "@/components/createGood/lable";
import Formate from "@/components/createGood/formate";

export default {
  name: "createGood-formlist",

  components: {
    Formate,
    Lable,
  },

  data() {
    return {
      good_ico__Key: String(new Date() + 1) ,
      good_video_pic__Key: String(new Date() + 2),
      good_video__Key: String(new Date() + 3),
      tagList__key: String(new Date() + 4),
      goodsku__key:String(new Date() + 'goodsku__key'),
      CATEGORYOPTIONS, // 所属行业分类
      canAdd__goodImg: false, // 是否可添加状态 __ 商品图片
      canAdd__goodImg2: false, // 是否可添加状态 __ 商品图片
      dialogImageUrl: '',
      dialogVisible: false,
      limitNumber:6,
      limitNumber2:4,
      currentFormInfo:{},
      goodSkuStatus:false, // 展示规格状态
      type:'',
      rules: {
        good_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在2-30个字符", trigger: "blur" }
        ],
        good_explain: [
          { required: true, message: `${type[this.$route.query.good_type]}在详情页标题下面展示卖点信息，建议50字以内`, trigger: "blur" },
          { min: 2, max: 50, message: `在${type[this.$route.query.good_type]}详情页标题下面展示卖点信息，建议50字以内`, trigger: "blur" }
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
          { required: true, message: `请填写${type[this.$route.query.good_type]}编码`, trigger: "blur" }
        ],
        price_sale: [{ required: true, message: "请填写售价", trigger: "blur" }],
        sku_code: [{ required: true, message: `请填写${type[this.$route.query.good_type]}编码`, trigger: "blur" }],
        price: [{ required: true, message: "请填写原价", trigger: "blur" }],
        price_cost: [{ required: true, message: "请填写成本", trigger: "blur" }],
        price_total: [{ required: true, message: "请填写总价", trigger: "blur" }]
      }
    };
  },

  created() {
    this.type = type[this.$route.query.good_type]
  },

  computed: {
    ...mapState('createdGoode',['formInfo']),

    /** 
     * 是否是耗材，门店服务
    */
    isGoodFriend(){
      return this.$route.query.good_type == '1'  //1门店服务 2平台商品 3品项管理 4虚拟卡券
    },

    /** 
     * isCard
    */
    isCoupon(){
      return this.$route.query.good_type == '4'?true:false  //1门店服务 2平台商品 3品项管理 4虚拟卡券
    }
  },

  watch: {
    formInfo: {
      handler: function (newVal, oldVal) {
        this.currentFormInfo = _.cloneDeep(newVal)
        if(newVal.singleButton  === "添加规格" && !this.isGoodFriend){
            this.goodSkuStatus = true
        }
      },
      deep: true
    }
  },

  methods: {
    $_changeSingleButton(){
        debugger
        this.currentFormInfo.singleButton  = "无规格"
    },
    /** *
     * 展示标签
     */
    $_showLable() {
        // 获取标签信息
        if(!this.currentFormInfo.category_id){
            alert('请先选择行业id')
            return 
        }
        let tag_group_type;
        const good_type = this.formInfo.good_type;
        if (+good_type === 1 || +good_type === 3) {
            tag_group_type = 2
        } else if (+good_type === 2) {
            tag_group_type = 1
        } else if (+good_type === 4) {
            tag_group_type = 4
        }
        this.$store.dispatch('createdGoode/fetchLableList', {
            // tag_group_type: this.formInfo.good_type, // 标签组类型 1商品 2服务 3虚拟券 4评价 5用户
            tag_group_type: tag_group_type, 
            category_id: this.currentFormInfo.category_id || 1, // 行业id @TODO 默认是1 ，变量
            get_tag_list: 1 // 是否获取标签列表 1获取 0不获取
        }).then(()=>{
            this.$refs.lable.initSons()
            this.$refs.lable.lable_show = true
        })
    },

    $_closed(){

    },

      /** *
     * 创建，调用创建接口
     */
    $_createProduct() {
        if(this.currentFormInfo.singleButton === '无规格' || this.isGoodFriend){
            this.currentFormInfo.good_sku = []
            let obj = {
                'sku_code' : this.currentFormInfo.sku_code,
                'price_cost' : this.currentFormInfo.price_cost,
                'price_sale' : this.currentFormInfo.price_sale,
                'price' : this.currentFormInfo.price,
                'price_total' : this.currentFormInfo.price_total
            }
            this.currentFormInfo.good_sku.push(obj)
            delete this.currentFormInfo.sku_type_arr
        }
        let currentFormInfo = this.currentFormInfo
        let {good_id,good_type} = this.$route.query
        
        this.$refs.currentFormInfo.validate((valid) => {
            this.$store.commit('createdGoode/setFormInfo',currentFormInfo)
            let formInfo = this.formInfo
            let that = this
            if(good_id === '0'){
                let ico_small = ''
                let params = _.cloneDeep(formInfo)
                params.good_img_arr = params.good_img_arr.map(item => item.response.data.file_name)
                params.explain_img_arr = params.explain_img_arr.map(item => item.response.data.file_name)
                params.show_img_arr = params.show_img_arr.map(item => item.response.data.file_name)
                params.price = (+params.price)*100
                params.sellPrice = (+params.sellPrice)*100
                params.good_sku = params.good_sku.map(item=>{
                    if (item.ico_small) {
                       ico_small = item.ico_small
                    }
                    item.ico_small = ico_small;
                    item.price_cost = (+item.price_cost)*100
                    item.price = (+item.price)*100
                    item.price_sale = (+item.price_sale)*100
                    if(item.price_total) {
                       item.price_total = (+item.price_total)*100 
                    }
                    return item
                })
                that.$store.dispatch('createdGoode/fetchFormInfoCreate',params).then((res)=>{
                    if(res.code === 0){
                        that.$alert('添加成功');
                        that.$_goOut(good_type)
                    }else{
                        that.$message.error(res.msg);
                    }
                })
            }else{
                let params = _.cloneDeep(formInfo)
                let ico_small = ''
                params.good_img_arr = params.good_img_arr.map(item => item.url)
                params.show_img_arr = params.show_img_arr.map(item => item.url)
                params.explain_img_arr = params.explain_img_arr.map(item => item.url)

                params.sellPrice = params.sellPrice * 100
                params.price = params.price * 100
                params.good_sku = params.good_sku.map(item=>{
                    if (item.ico_small) {
                       ico_small = item.ico_small;
                    }
                    item.ico_small = ico_small;
                    item.price_cost = (+item.price_cost)*100
                    item.price = (+item.price)*100
                    item.price_sale = (+item.price_sale)*100
                    if(item.price_total) {
                       item.price_total = (+item.price_total)*100 
                    }
                    return item
                })

                // if(params.singleButton === '无规格' || this.$route.query.good_type == '1'){
                //     delete params.sku_type_arr
                //     delete params.good_sku
                //     delete params.sku_list
                // }

                if(params.singleButton === '无规格'){
                    delete params.sku_type_arr
                }
                    
                that.$store.dispatch('createdGoode/fetchFormInfoModify',params).then((res)=>{
                    if(res.code === 0){
                        that.$_goOut(good_type)
                        that.$alert('编辑成功');
                    }else{
                        that.$message.error(res.msg);
                        return false
                    }
                })
            }
        })
    },

    $_goOut(good_type){
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
            case 1:
                this.$router.push('/serviceList')
                break;
            case 2:
                this.$router.push('/goodList')
                break;
            case 3:
                this.$router.push('/purchaseList')
                break;
            case 4:
                this.$router.push('/fictitiousList')
                break;
        
            default:
                break;
        }
    },

    /** 
     * 添加标签
    */
    $_addLable(tag_list){
        this.currentFormInfo.tag_list = tag_list, // 已选标签展示数据
        this.currentFormInfo.tag_id_arr = tag_list.map(item => item.tag_id) 
        this.tagList__key = String(new Date()+14)
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

    $_success2(response, file, fileList){
        if(fileList.length >= 4){
            this.canAdd__goodImg2 = true
        }
        this.limitNumber2 = 4 - (+fileList.length)
        this.currentFormInfo.explain_img_arr = fileList
    },

    $_success_uploadArray_content(res, file){
        this.currentFormInfo.good_video__url = file.response.data.url
        this.currentFormInfo.good_video = file.response.data.file_name
        this.good_video__Key = String(new Date()+11)
    },

    $_success__good_video_pic(res, file){
        this.currentFormInfo.good_video_pic__url = URL.createObjectURL(file.raw)
        this.currentFormInfo.good_video_pic = file.response.data.file_name
        this.good_video_pic__Key = String(new Date()+12)        
    },

    $_success__table_ico_small(res, file, targe){
        targe.iconStatus = true
        targe.ico_small = file.response.data.file_name
        targe.ico_small__url = file.url
    },

    $_success__good_ico(res, file){
        this.currentFormInfo.good_ico__url = URL.createObjectURL(file.raw);
        this.currentFormInfo.good_ico = file.response.data.file_name
        this.good_ico__Key = String(new Date()+13)        
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
    $_remove2(file, fileList){
        this.limitNumber2 = 4 - (+fileList.length)
        this.canAdd__goodImg2 = false
        this.currentFormInfo.explain_img_arr = fileList
    },

    /** *
     * 展示规格
     */
    $_showFormat() {
      if (this.currentFormInfo.singleButton === "添加规格") {
          this.currentFormInfo.goodSkuInfo = [
            {
                name: '',
                list: [],
                inputValue: ''
            },
            {
                name: '',
                list: [],
                inputValue: ''
            }
        ]
        this.showFormat()
      }else if(!this.isGoodFriend){
        // @TOdO 取消显示
        this.currentFormInfo.goodSkuInfo = [
            {
                name: '',
                list: [],
                inputValue: ''
            },
            {
                name: '',
                list: [],
                inputValue: ''
            }
        ]
        delete this.currentFormInfo.sku_type_arr
        delete this.currentFormInfo.good_sku
        this.goodSkuStatus = false
        delete this.currentFormInfo.sku_list
      }
    },
    
    showFormat() {
        this.$refs.formate.format_show = true;
    },

    /** *
     * 合并列
     */
    $_SpanMethod({ row, column, rowIndex, columnIndex }) {
      const columnIndexNum = this.isGoodFriend ? 7 : 6;
      if (columnIndex === 0 || columnIndex === 6) {
        let len = 0
        if(this.currentFormInfo.goodSkuInfo && this.currentFormInfo.goodSkuInfo.length>1){
            len = this.currentFormInfo.goodSkuInfo[1].list.length
        }
        if(!len || len === 1){
            return {
                rowspan: 1,
                colspan: 1
            };
        }else {
            if (rowIndex % len === 0){
                return {
                    rowspan: len,
                    colspan: 1
                };
            } else {
                return {
                    rowspan: 0,
                    colspan: 0
                };
            }
        }
      }
    },

    /** *
     * 添加规格
     */
    $_addFormat(goodSku) {
      this.currentFormInfo.goodSkuInfo = goodSku
      let sku_type_arr_key = goodSku[0].list  // 功能  list :[美白，保湿]
      let sku_type_arr_val = goodSku[1].list  // 容量  list :[50ml,100ml,15ml]
      let good_sku_arr = []
      if(sku_type_arr_val.length){
        for(var i=0;i<sku_type_arr_key.length;i++){
            for(var j=0;j<sku_type_arr_val.length;j++){
                good_sku_arr.push({sku_type_arr:[sku_type_arr_key[i],sku_type_arr_val[j]],sku_code:'',price_total:'',price_cost: '',price: '',price_sale: '', price_plate: '',ico_small: '',ico_small__url: ''})
            }
        }
      }else{
        for(var i=0;i<sku_type_arr_key.length;i++){
            good_sku_arr.push({sku_type_arr:[sku_type_arr_key[i]],sku_code:'',price_total:'',price_cost: '',price: '',price_sale: '', price_plate: '',ico_small: '',ico_small__url: ''})
        }
      }
      let arr = []
      goodSku.forEach(function(item){
          if(item.name){
              arr.push(item.name)
          }
      }) // 功能容量
      this.currentFormInfo.sku_type_arr = arr

      this.currentFormInfo.good_sku = good_sku_arr
      if(this.currentFormInfo.goodSkuInfo && this.currentFormInfo.goodSkuInfo.length){
        this.goodSkuStatus = true
      }else{
          this.goodSkuStatus = false
      }
      this.goodsku__key = String(new Date() + 'goodsku__key')
    },

    $_closeFormat() {
        this.currentFormInfo.singleButton = '无规格'
    },

    /** *
     * 切换tab
     */
    $_changeTabNext() {
        if(this.currentFormInfo.singleButton === '无规格' || this.isGoodFriend){
            this.currentFormInfo.good_sku = []
            let obj = {
                'sku_code' : this.currentFormInfo.sku_code,
                'price_cost' : this.currentFormInfo.price_cost,
                'price_sale' : this.currentFormInfo.price_sale,
                'price' : this.currentFormInfo.price,
                'price_total' : this.currentFormInfo.price_total
            }
            this.currentFormInfo.good_sku.push(obj)
            delete this.currentFormInfo.sku_type_arr
        }
        let currentFormInfo = this.currentFormInfo
        this.$refs.currentFormInfo.validate((valid) => {
            if (valid) {
                this.$store.commit('createdGoode/setFormInfo',currentFormInfo)
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
.form-footer{
    text-align: center
}
#createGood  .el-table__row .cell{
    position: relative;
}



#createGood  .el-table__row .cell .outText1{
    position: absolute;
    top: 6px;
    left: 95px;
}

#createGood .el-tag--small {
    margin: 0 5px;
}
</style>


