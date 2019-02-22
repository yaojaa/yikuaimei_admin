<template>
    <div>
        <!-- 表单list -->
        <el-form ref="createdData" :model="createdData" :rules="rules" label-width="120px">
            <template v-if="active === 0">
                <el-form-item label="名称：" prop="good_name">
                    <el-input  v-model="createdData.good_name" placeholder="名称为2-30个字" />                                                    
                </el-form-item>
                <el-form-item :label="`${type}卖点：`" prop="good_explain">
                    <el-input type="textarea" v-model="createdData.good_explain" placeholder="长度为2-50个字" suffix-icon="el-icon-arrow-right" /> 
                </el-form-item>
                <el-form-item label="行业分类：" prop="category_id">
                    <el-select v-model="createdData.category_id" placeholder="请选择所属行业分类" >
                        <el-option v-for="item in CATEGORYOPTIONS" :label="item.category_name" :value="item.category_id" :key="`${item.category_id}category_id`" />
                    </el-select>                   
                </el-form-item>
                <el-form-item label="标签：" prop="tag_list">
                    <div class="el-input el-input--small el-input--suffix div__input"  @click="$_showLable">
                        <el-tag v-for="item in createdData.tag_list" :key="`${item.tag_name}`">
                            {{item.tag_name}}
                        </el-tag>
                        <span class="el-input__suffix">
                            <span class="el-input__suffix-inner">
                                <i class="el-input__icon el-icon-arrow-right" />
                            </span>
                        </span>
                    </div>
                    <p class="input__tabs">可设置多个标签</p>
                </el-form-item>
                <el-form-item label="规格" props="format" v-if="!goodType === GOODTYPE['serviceList']">
                    <el-radio-group v-model="singleButton" @change="this.$_showFormat">
                        <el-radio-button label="无规格" /><el-radio-button label="添加规格" />
                    </el-radio-group> 
                </el-form-item>

                <!-- 一期不做 -->
                <!-- <el-form-item label="库存：" prop="exist">
                    <el-input  v-model="createdData.exist" placeholder="10000" suffix-icon="el-icon-arrow-right" />                                                    
                </el-form-item> -->
                <el-form-item label="单位：" prop="unit">
                    <el-radio-group v-model="createdData.unit">
                        <el-radio v-for="item in UNIT" :label="item" :key="`${item}unit`" />
                    </el-radio-group>                                                                       
                </el-form-item>
                <!-- 产地只有商品有 -->
                <el-form-item label="产地：" prop="country">
                    <el-select v-model="createdData.country" placeholder="请选择活动区域">
                        <el-option v-for="item in COUNTRY" :label="item" :value="item" :key="`${item}country`" />
                    </el-select>                                                                      
                </el-form-item>
                 <!-- 单规格 -->
                <template  v-if="singleButton === '无规格'" >
                    <el-form-item :label="`${type}编码：`" prop="sku_code">
                        <el-input  v-model="sku_code" placeholder="支持14以内的数字+英文组合"  />                                                                              
                    </el-form-item>
                    <el-form-item label="售价：" prop="price_sale">
                        <el-input  v-model="price_sale" placeholder="请输入套餐在婚博会标价" />                                                                                                        
                        <span class="outText">元</span>
                    </el-form-item>
                    <el-form-item label="原价：" prop="price">
                        <el-input  v-model="price" placeholder="¥5000" />                                                                                                        
                        <span class="outText">元</span>
                    </el-form-item>
                    <el-form-item label="成本" prop="price_cost">
                        <el-input  v-model="price_cost" placeholder="¥5000" />                                                                                                        
                        <span class="outText">元</span>
                    </el-form-item>
                    <el-form-item label="总价" prop="price_total"  v-if="goodType === GOODTYPE['serviceList']">
                        <el-input  v-model="price_total" placeholder="¥5000" />                                                                                                        
                        <span class="outText">元</span>
                    </el-form-item>
                </template>
                <!-- 单规格 END -->
                <template v-else>
                    <el-row :gutter="20">
                        <el-col :span="4">名称:</el-col>
                        <el-col :span="12">选项: </el-col>
                    </el-row>
                    <el-row :gutter="20"  v-for="(item,idx) in goodSkuInfo" :key="`${item.name}${idx}`" class="goodSkuInfo_row">
                        <el-col :span="4"><el-button   v-if="item.name" plain>{{item.name}}</el-button></el-col>
                        <el-col :span="12"><el-button v-for="tag in item.list" :key="`${tag}tag`" plain>{{tag}}</el-button></el-col>
                        <el-col :span="2"> 
                            <el-button  v-if="idx === createdData.sku_type_arr.length-1"  @click="showFormat()">
                                编辑
                            </el-button>
                        </el-col>
                    </el-row>
                    
                    <el-table :data="createdData.good_sku" style="width: 100%" border :span-method="$_SpanMethod" class="table">
                        <!-- 功能列 -->
                        <el-table-column :label="createdData.sku_type_arr[0]" prop="sku_type_arr[0]" v-if="createdData.sku_type_arr[0]" /> 
                        <!-- 容量列 -->
                        <el-table-column :label="createdData.sku_type_arr[1]" prop="sku_type_arr[1]" v-if="createdData.sku_type_arr.length>1" />
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
                        <el-table-column label="总价" v-if="goodType === GOODTYPE['serviceList']">
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
                                    :on-preview="(res,file)=>{return $_onPreview(file,scope.row)}"
                                    :on-change="(res,file)=>{return $_change(res,file,scope.row)}"
                                    :on-error="$_error"
                                    action="/api/admin/fileupload/image"
                                    class="table_upload"
                                    :show-file-list="false"
                                    :class="{table_upload__disabled:scope.row.canAdd}"
                                    :before-upload="$_beforeUpload_img"
                                    >
                                    <img v-if="scope.row.url" :src="scope.row.url" class="avatar">
                                    <span class="table_icon_text" v-else><i class="el-icon-plus" />添加{{type}}图片</span>
                                </el-upload>
                            </template> 
                        </el-table-column>
                    </el-table>
                </template>
               
                <el-form-item :label="`${type}图片：`" prop="good_img_arr">
                    <div class="upload-title">
                        您可以上传3-6张图片及1个视频作为{{type}}展示图，<br />
                        展示{{type}}页顶部的图片，支持上传1-6张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为1242*1242，支持JPG、PNG等大部分格式图片，单张图片大小不超过5M 
                    </div>
                    <el-upload
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-preview="(res,file)=>{return $_onPreview(file,good_img_arr)}"
                        :on-change="(res,file)=>{return $_change(res,file,good_img_arr)}"
                        :on-error="$_error"
                        :on-exceed="$_exceed"
                        :before-upload="$_beforeUpload_img"
                        :file-list="createdData.good_img_arr"
                        :limit="good_img_arr.limit"
                        :multiple="true"
                        :class="{canAdd:good_img_arr.canAdd}"
                        >
                        <i class="el-icon-plus upload-placeholder">
                            <p>添加图片</p><span>还可以添加{{good_img_arr.over}}张</span>
                        </i>

                        <el-dialog :visible.sync="good_img_arr.imgVisible">
                            <img width="100%" :src="good_img_arr.url" alt="">
                        </el-dialog>
                    </el-upload>
                </el-form-item>
                <el-form-item :label="`${type}卖点图：`" prop="explain_img_arr">
                    <el-upload
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-preview="(res,file)=>{return $_onPreview(file,explain_img_arr)}"
                        :on-change="(res,file)=>{return $_change(res,file,explain_img_arr)}"
                        :on-error="$_error"
                        :on-exceed="$_exceed"
                        :before-upload="$_beforeUpload_img"
                        :file-list="createdData.explain_img_arr"
                        :limit="explain_img_arr.limit"
                        :multiple="true"
                        :class="{canAdd:explain_img_arr.canAdd}"
                        >
                        <i class="el-icon-plus upload-placeholder">
                            <p>添加图片</p><span>还可以添加{{explain_img_arr.over}}张</span>
                        </i>

                        <el-dialog :visible.sync="explain_img_arr.imgVisible">
                            <img width="100%" :src="explain_img_arr.url" alt="">
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
                            :on-change="(res,file)=>{return $_change_video(res,file,'good_video')}"
                            :on-error="$_error"
                            :before-upload="$_beforeUpload_viedo"
                            >
                            <video v-if="good_video" :src="good_video" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                            <i v-else class="el-icon-plus avatar-uploader-icon">
                                <p>添加视频</p>
                            </i>
                        </el-upload>
                        <el-upload
                            action="/api/admin/fileupload/image"
                            class="avatar-uploader"
                            :show-file-list="false"
                            :on-change="(res,file)=>{return $_change_one(res,file,'good_video_pic')}"
                            :on-error="$_error"
                            :before-upload="$_beforeUpload_img"
                            >
                            <img v-if="good_video_pic" :src="good_video_pic" class="avatar">
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
                        :on-change="(res,file)=>{return $_change_one(res,file,'good_ico')}"
                        :on-error="$_error"
                        :before-upload="$_beforeUpload_img"
                        >
                        <img v-if="good_ico" :src="good_ico" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon upload-placeholder">
                            <p>添加图片</p><span>只能上传一张</span>
                        </i>
                    </el-upload>
                </el-form-item>
            </template>
            <!-- 基础信息 -->


            <!-- 耗材 -->
            <template v-if="active === 1">
                <el-form-item class="goodFriend_header">
                    <el-button  type="primary" @click="$_showgoodFriend" plain>选择耗材</el-button>
                </el-form-item>
                <el-table :data="good_friends" style="width: 100%" v-if="good_friends.length">
                    <el-table-column
                        label="耗材"
                        width="284">
                        <template slot-scope="scope">
                            <productCard :goodName="scope.row.good_name" :price="scope.row.price_low"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="规格">
                        <template slot-scope="scope">
                            <el-checkbox-group v-model="scope.row.group_sku_str" size="small">
                                <el-checkbox :label="item.sku_str" v-for="item in scope.row.sku_list" :key="`${item.sku_str}${scope.row.good_id}`" border></el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- 耗材End -->

            <!--详情 -->
            <template v-if="active === 2">
                <el-form-item :label="`${type}展示图：`" prop="show_img_arr">
                    <div class="upload-title">
                        展示{{type}}的图片详情中的图片，至少上传1张，拖拽图片调整图片顺序，双击可预览大图，图片1242*1242px，单张图片不要超过5M，支持JPG、PNG等常见图片格式。
                    </div>
                    <el-upload
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-preview="(res,file)=>{return $_onPreview(file,show_img_arr)}"
                        :on-change="(res,file)=>{return $_change(res,file,show_img_arr)}"
                        :on-error="$_error"
                        :on-exceed="$_exceed"
                        :before-upload="$_beforeUpload_img"
                        :file-list="createdData.show_img_arr"
                        :limit="show_img_arr.limit"
                        :multiple="true"
                        :class="{canAdd:show_img_arr.canAdd}"
                        >
                        <i class="el-icon-plus upload-placeholder">
                            <p>添加图片</p><span>还可以添加{{show_img_arr.over}}张</span>
                        </i>

                        <el-dialog :visible.sync="show_img_arr.imgVisible">
                            <img width="100%" :src="show_img_arr.url" alt="">
                        </el-dialog>
                    </el-upload>
                </el-form-item>
                <el-form-item label="购买须知：" prop="good_notes">
                    <el-input type="textarea" v-model="createdData.good_notes" placeholder="请填写购买须知" rows="3" class="good_notes" />
                </el-form-item>
            </template>
            <!-- 详情end -->
            <el-form-item class="form-footer">
                <el-button type="primary" @click="$_changeTab(-1)">上一步</el-button>
                <el-button @click="$_changeTab(1)" v-if="goodType !== GOODTYPE['fictitiousList']">下一步</el-button>
                <el-button @click="$_createProduct" v-if="goodType === GOODTYPE['fictitiousList']">上架</el-button>
            </el-form-item>
        </el-form>
        <!-- 表单list End -->

        <!-- 添加标签弹框 -->
        <Lable ref="lable" @addLable="$_addLable" :tagList = "createdData.tag_list"/>
        <!-- 添加标签弹框 End -->

        <!-- 添加规格弹框 -->
        <Formate ref="formate" @addFormat="$_addFormat" @closeFormat="$_closeFormat" :goodSkuinfo = "goodSkuInfo"  @changeSingleButton="$_changeSingleButton"  />
        <!-- 添加规格弹框  End-->

        <!-- 添加耗材弹框 -->
        <!-- <GoodFriend ref="goodFriend" :goodFriends="good_friends"  @addFormat="$_addFormat" /> -->
        <!-- 添加规格弹框  End-->
    </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from "vuex";
import { CATEGORYOPTIONS,type,GOODTYPE,COUNTRY, UNIT } from "../../constans/createdGood";
import Lable from "./dialog_lable";
import Formate from "./dialog_formate";
import GoodFriend from "./dialog_goodFriend";

export default {
  name: "createGood-formlist",

  components: {
    Formate,
    Lable,
    GoodFriend
  },

  props:{
      goodType:{
        type: Number,
        default: 1
      },
      goodId:{
        type: Number,
        default: 0
      },
      active:{
        type: Number,
        default: 0
      }
  },

  data() {
    return {
        CATEGORYOPTIONS, // 所属行业分类
        GOODTYPE,
        COUNTRY,
        UNIT,
        createdData:{
            good_type: 1, //商品类型：1服务 2实物 3采购品项 4虚拟商品
            good_name: '', // 商品名字
            good_explain: '', // 商品卖点
            category_id: '', // 行业分类id
            
            tag_id_arr: [], // [8,18,32]标签id数组
            tag_list: [], // 已选标签展示数据
            unit: '', // 单位 例如盒，箱
            country: '' , // 产地

            sku_type_arr: [], // ["颜色","尺寸","材质"] 规格数组，单规格商品不要提交该字段
            good_sku: [
                {
                    sku_type_arr : ['黑色1','12寸','棉麻1'],//规格值数组，单规格商品不要提交该字段
                    sku_code : 23344545654654621,//商品编码
                    price_cost : 2321,//成本
                    price : 2888,//原价(只用于展示商品原价信息)
                    price_sale : 2666,//售价(商品实际需要支付价值，线下补交时要用到)
                    price_plate : 500,// 平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
                    ico_small : '' // 单规格商品不要提交该字段
                }
            ], // 规格sku数组，单规格商品也要按该数组格式提交

            
            good_img_arr: [], // 商品图片数组
            explain_img_arr: [], // 卖点图
            good_video: '', // 商品视频
            good_video_pic: '', // 商品视频封面图
            good_ico: '', // 商品展示图

            /** 
             * 商品详情
            */
            show_img_arr: [], // 详情页商品展示图数组
            good_notes : '' ,// 补充说明 购买须知

            /** 
             * 服务添加耗材列表
             */ 
            good_friends: [
                {
                    good_id : 1,//耗材id
                    sku_id : [1,2,3]//耗材sku_id列表
                }
            ],
        },

        singleButton:'无规格', // 规格
        sku_code: '', // 编码
        price_sale: '', // 售价
        price: '', // 原价
        price_cost: '', // 成本
        price_total: '', // 总价
        goodSkuInfo: [{
                name: '',
                list: [],
                inputValue: ''
            },
            {
                name: '',
                list: [],
                inputValue: ''
            }], // 多规格展示信息

        // 上传图片控制对象
        good_img_arr: {
            canAdd: false , // 是否可添加商品图
            limit: 6,
            imgVisible : false ,
            url : '',
            over: 6
        },
        explain_img_arr: {
            canAdd: false , // 是否可添加商品图
            limit: 4,
            imgVisible : false ,
            url : '',
            over: 4
        },
        show_img_arr: {
            canAdd: false , // 是否可添加商品图
            limit: 4,
            imgVisible : false ,
            url : '',
            over: 4
        },
        good_video:'' , // 上传视频链接
        good_video_pic: '' , // 视频首图链接
        good_ico: '' , // 商品展示图
        type:'',
        rules:{},
    };
  },

  created() {
    this.type = type[this.goodType]
  },

  computed: {
    ...mapState('createdGoode',['formInfo'])
  },

  watch: {
    formInfo: {
      handler: function (newVal, oldVal) {
        // this.createdData = _.cloneDeep(newVal)
        // this.good_friends.forEach(good => {
        //     let sku_id = good.group_sku_id || good.sku_id
        //     let sku_list = good.sku_list
        //     good.group_sku_str = []
        //     sku_id.forEach(id => {
        //         let obj = sku_list.find(item => item.sku_id === id)
        //         good.group_sku_str.push(obj.sku_str)
        //     })
        // })
      },
      deep: true
    }
  },

  methods: {
    /** 
     * 上传成功后照片预览
    */
    $_onPreview(file, target){
        target.url = file.url;
        target.imgVisible = true;
    },

    /** 
     * 选择图片限制数量作出提示
    */
    $_exceed(files, fileList, limit){
        this.$message.warning(`当前限制选择 ${limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    // 上传文件，上传数组，目标对象，剩余上传个数， 
    $_change(file, fileList, targe){
        targe.ico_small = file.response.data.file_name
        targe.ico_small__url = file.url
        
        let len = targe.limit - fileList.length
        targe.over = len
        targe.canAdd = len >= limit
        targe.url = file.url
        this.createdData[currentName] = fileList
    },

    /** 
     * 图片上传失败
    */
    $_error(){this.$message.error('图片上传失败')},

    /** 
     * 添加商品图片之前，对类型和大小做判断
    */
    $_beforeUpload_img(file){
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

    $_beforeUpload_viedo(file){
        // @TODO 限制视频的格式和大小
        const isVideo = file.type === 'video/mp4';
        const isLt2M = file.size / 1024 / 1024 < 20;

        if (!isVideo) {
          this.$message.error('上传视频只能是 mp4 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 20MB!');
        }
        return isVideo && isLt2M;
    },

    $_goOut(goodType){
        switch (goodType) {
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
     * 打开耗材
     */
    $_showgoodFriend(){
        this.$ref.goodFriend.computedRightData(1,'美容')
        this.$ref.goodFriend.goodFriend_show = true
    },

    /** *
     * 展示规格
     */
    $_showFormat() {
      if (this.singleButton === "添加规格") {
        this.showFormat()
      }else if(!this.goodType === GOODTYPE['serviceList']){
        // @TOdO 取消显示 单规格 初始化数据
        this.goodSkuInfo = []
        this.createdData.sku_type_arr = []
        this.createdData.good_sku = []
        this.createdData.sku_list = []
      }
    },
    
    showFormat() {
        this.$refs.formate.format_show = true
    },

     /** *
     * 切换tab
     */
    $_changeTab(num) {
      if(active === 1 && this.good_friends.length === 0){
        this.$emit("changeTab",num);
        return
      }else{
        this.$emit("changeTab",num);
      }
        //   let canNext = true
        //   this.good_friends.forEach(good => {
        //     let group_sku_str = good.group_sku_str
        //     let sku_list = good.sku_list
        //     good.group_sku_id = []
        //     if(!group_sku_str.length){
        //         canNext = false
        //     }
        //     group_sku_str.forEach(str => {
        //         let obj = sku_list.find(item => item.sku_str === str)
        //         good.group_sku_id.push(obj.sku_id)
        //     })
        //   })

        //   if(!canNext){
        //       this.$message({
        //       message: '规格至少选一个',
        //       type: 'warning'
        //     });
        //   }else{
        //   }
   
        // this.$refs.createdData.validate((valid) => {
        //     if (valid) {
        //         this.$store.commit('createdGoode/setFormInfo',createdData)
        //     }
        // })
        
    },

    // 耗材切换end
    
    $_changeSingleButton(){
        this.singleButton  = "无规格"
    },
    /** *
     * 展示标签
     */
    $_showLable() {
        // 获取标签信息
        if(!this.createdData.category_id){
            alert('请先选择行业id')
            return 
        }
        let tag_group_type;
        const goodType = this.goodType;
        if (+goodType === 1 || +goodType === 3) {
            tag_group_type = 2
        } else if (+goodType === 2) {
            tag_group_type = 1
        } else if (+goodType === 4) {
            tag_group_type = 4
        }
        this.$store.dispatch('createdGoode/fetchLableList', {
            // tag_group_type: this.goodType, // 标签组类型 1商品 2服务 3虚拟券 4评价 5用户
            tag_group_type: tag_group_type, 
            category_id: this.createdData.category_id || 1, // 行业id @TODO 默认是1 ，变量
            get_tag_list: 1 // 是否获取标签列表 1获取 0不获取
        }).then(()=>{
            this.$refs.lable.initSons()
            this.$refs.lable.lable_show = true
        })
    },

    /** *
     * 创建，调用创建接口
     */
    $_createProduct() {
        // if(this.singleButton === '无规格' || this.goodType === GOODTYPE['serviceList']){
        //     this.createdData.good_sku = []
        //     let obj = {
        //         'sku_code' : this.sku_code,
        //         'price_cost' : this.price_cost,
        //         'price_sale' : this.price_sale,
        //         'price' : this.price,
        //         'price_total' : this.price_total
        //     }
        //     this.createdData.good_sku.push(obj)
        //     delete this.createdData.sku_type_arr
        // }
        // let ico_small = ''
        // params.good_img_arr = params.good_img_arr.map(item => item.response.data.file_name)
        // params.explain_img_arr = params.explain_img_arr.map(item => item.response.data.file_name)
        // params.show_img_arr = params.show_img_arr.map(item => item.response.data.file_name)
        // params.price = (+params.price)*100
        // params.sellPrice = (+params.sellPrice)*100
        // params.good_sku = params.good_sku.map(item=>{
        //     if (item.ico_small) {
        //         ico_small = item.ico_small
        //     }
        //     item.ico_small = ico_small;
        //     item.price_cost = (+item.price_cost)*100
        //     item.price = (+item.price)*100
        //     item.price_sale = (+item.price_sale)*100
        //     if(item.price_total) {
        //         item.price_total = (+item.price_total)*100 
        //     }
        //     return item
        // })
        // if(params.singleButton === '无规格' || this.goodType == '1'){
        //     delete params.sku_type_arr
        //     delete params.good_sku
        //     delete params.sku_list
        // }

        // let ico_small = ''
        // params.good_img_arr = params.good_img_arr.map(item => item.url)
        // params.show_img_arr = params.show_img_arr.map(item => item.url)
        // params.explain_img_arr = params.explain_img_arr.map(item => item.url)

        // params.sellPrice = params.sellPrice * 100
        // params.price = params.price * 100
        // params.good_sku = params.good_sku.map(item=>{
        //     if (item.ico_small) {
        //         ico_small = item.ico_small;
        //     }
        //     item.ico_small = ico_small;
        //     item.price_cost = (+item.price_cost)*100
        //     item.price = (+item.price)*100
        //     item.price_sale = (+item.price_sale)*100
        //     if(item.price_total) {
        //         item.price_total = (+item.price_total)*100 
        //     }
        //     return item
        // })
        // if(this.singleButton === '无规格'){
        //     delete params.sku_type_arr
        // }
        // this.$refs.createdData.validate((valid) => {
        //     let str = goodId === 0 ? 'createdGoode/fetchFormInfoCreate' : 'createdGoode/fetchFormInfoModify'
        //     that.$store.dispatch(str,params).then((res)=>{
        //         if(res.code === 0){
        //             that.$alert('操作成功');
        //             that.$_goOut(goodType)
        //         }else{
        //             that.$message.error(res.msg);
        //         }
        //     })
        // })                                      
    },

    /** 
     * 添加标签
    */
    $_addLable(tag_list){
        this.createdData.tag_list = tag_list, // 已选标签展示数据
        this.createdData.tag_id_arr = tag_list.map(item => item.tag_id) 
    },

    $_change_video(res, file,name){
        this[name] = file.response.data.url
        this.createdData[name] = file.response.data.file_name
    },

    $_change_one(res, file){
        this[name] = URL.createObjectURL(file.raw)
        this.createdData[name] = file.response.data.file_name
    },
      
    /** *
     * 合并列
     */
    $_SpanMethod({ row, column, rowIndex, columnIndex }) {
      const columnIndexNum = this.goodType === GOODTYPE['serviceList'] ? 7 : 6;
      if (columnIndex === 0 || columnIndex === 6) {
        let len = 0
        if(this.goodSkuInfo && this.goodSkuInfo.length>1){
            len = this.goodSkuInfo[1].list.length
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
      this.goodSkuInfo = goodSku
      let sku_type_arr_key = goodSku[0].list  // 功能  list :[美白，保湿]
      let sku_type_arr_val = goodSku[1].list  // 容量  list :[50ml,100ml,15ml]
      let good_sku_arr = []
      if(sku_type_arr_val.length){
        for(var i=0;i<sku_type_arr_key.length;i++){
            for(var j=0;j<sku_type_arr_val.length;j++){
                good_sku_arr.push({
                    sku_type_arr: [sku_type_arr_key[i], sku_type_arr_val[j]],
                    sku_code:'',
                    price_total:'',
                    price_cost: '',
                    price: '',
                    price_sale: '', 
                    price_plate: '',
                    ico_small: '',
                    canAdd: false , // 是否可添加商品图
                    limit: 1,
                    imgVisible : false ,
                    url : '',
                    over: 1
                })
            }
        }
      }else{
        for(var i=0;i<sku_type_arr_key.length;i++){
            good_sku_arr.push({
                sku_type_arr:[sku_type_arr_key[i]],
                sku_code:'',
                price_total:'',
                price_cost: '',
                price: '',
                price_sale: '', 
                price_plate: '',
                ico_small: '',
                canAdd: false , // 是否可添加商品图
                limit: 1,
                imgVisible : false ,
                url : '',
                over: 1
            })
        }
      }
      let arr = []
      goodSku.forEach(function(item){
          if(item.name){
              arr.push(item.name)
          }
      }) // 功能容量
      this.createdData.sku_type_arr = arr
      this.createdData.good_sku = good_sku_arr
    },

    $_closeFormat() {
        this.singleButton = '无规格'
    }

    
  }
}
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
.canAdd .el-upload--picture-card{
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

.canAdd .el-upload--picture-card{
    display: none
}
#createGood .el-form-item--small .el-form-item__content .good_notes .el-textarea__inner{
    max-width: 400px;
    width: 310px
}
</style>


