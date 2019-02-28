<template>
    <div>
        <!-- 表单list -->
        <el-form ref="createdData" :model="createdData" :rules="rules" label-width="120px">
            <template v-if="currentActive === 0">
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
                <!-- 一期不做 -->
                <!-- <el-form-item label="库存：" prop="exist">
                    <el-input  v-model="createdData.exist" placeholder="10000" suffix-icon="el-icon-arrow-right" />                                                    
                </el-form-item> -->
                <el-form-item label="单位：" prop="unit">
                    <el-radio-group v-model="createdData.unit">
                        <el-radio v-for="item in UNIT" :label="item" :key="`${item}unit`" />
                    </el-radio-group>                                                                       
                </el-form-item>
                <el-form-item label="产地：" prop="country" v-if="goodType === GOODTYPE['goodList']">
                    <el-select v-model="createdData.country" placeholder="请选择活动区域">
                        <el-option v-for="item in COUNTRY" :label="item" :value="item" :key="`${item}country`" />
                    </el-select>                                                                      
                </el-form-item>
                <el-form-item label="规格" props="format" v-if="goodType !== GOODTYPE['serviceList']">
                    <el-radio-group v-model="singleButton" @change="this.$_showFormat">
                        <el-radio-button label="无规格" /><el-radio-button label="添加规格" />
                    </el-radio-group> 
                </el-form-item>
                 <!-- 单规格 -->
                <template  v-if="singleButton === '无规格'" >
                    <el-form-item :label="`${type}编码：`" prop="sku_code">
                        <el-input  v-model="createdData.good_sku[0].sku_code" placeholder="支持14以内的数字+英文组合"  />                                                                              
                    </el-form-item>
                    <el-form-item label="售价：" prop="price_sale">
                        <el-input  v-model="createdData.good_sku[0].price_sale" placeholder="请输入套餐在婚博会标价" />                                                                                                        
                        <span class="outText">元</span>
                    </el-form-item>
                    <el-form-item label="原价：" prop="price">
                        <el-input  v-model="createdData.good_sku[0].price" placeholder="¥5000" />                                                                                                        
                        <span class="outText">元</span>
                    </el-form-item>
                    <el-form-item label="成本" prop="price_cost">
                        <el-input  v-model="createdData.good_sku[0].price_cost" placeholder="¥5000" />                                                                                                        
                        <span class="outText">元</span>
                    </el-form-item>
                    <el-form-item label="总价" prop="price_total"  v-if="goodType === GOODTYPE['serviceList']">
                        <el-input  v-model="createdData.good_sku[0].price_total" placeholder="¥5000" />                                                                                                        
                        <span class="outText">元</span>
                    </el-form-item>
                </template>
                <!-- 单规格 END -->
                <template v-else>
                    <div  class="hahah">
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
                                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, 1)}"      
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
                    </div>
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
                        :on-change="(res,file)=>{return $_change(res,file,'good_img_arr')}"
                        :on-error="$_error"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, good_img_arr.limit)}"
                        :before-upload="$_beforeUpload_img"
                        :file-list="good_img_arr.url"
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
                        :on-change="(res,file)=>{return $_change(res,file,'explain_img_arr')}"
                        :on-error="$_error"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, good_img_arr.limit)}"
                        :before-upload="$_beforeUpload_img"
                        :file-list="explain_img_arr.url"
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
                            :on-change="(res,file)=>{return $_change(res,file,'good_video', 1)}"
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
                            :on-change="(res,file)=>{return $_change(res,file,'good_video_pic', 1)}"
                            :show-file-list="false"
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
                        :on-change="(res,file)=>{return $_change(res,file,'good_ico',1)}"
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
            <template v-if="goodType === GOODTYPE['serviceList'] && currentActive === 1">
                <el-form-item class="goodFriend_header">
                    <el-button  type="primary" @click="$_showgoodFriend" plain>选择耗材</el-button>
                </el-form-item>
                <div class="hahah">
                    <el-table :data="createdData.good_friends" style="width: 100%" v-if="createdData.good_friends.length">
                        <el-table-column label="耗材" width="284">
                            <template slot-scope="scope">
                                <product-card :goodName="scope.row.good_name" :price="scope.row.price_low"/>
                            </template>
                        </el-table-column>
                        <el-table-column label="规格">
                            <template slot-scope="scope">
                                <el-checkbox-group v-model="scope.row.group_sku_str">
                                    <el-checkbox :label="item.sku_str" v-for="item in scope.row.sku_list" :key="`${item.sku_str}${scope.row.good_id}`" border></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
            <!-- 耗材End -->

            <!--详情 -->
            <template v-if="goodType !== GOODTYPE['serviceList'] && currentActive === 1 || currentActive === 2">
                <el-form-item :label="`${type}展示图：`" prop="show_img_arr">
                    <div class="upload-title">
                        展示{{type}}的图片详情中的图片，至少上传1张，拖拽图片调整图片顺序，双击可预览大图，图片1242*1242px，单张图片不要超过5M，支持JPG、PNG等常见图片格式。
                    </div>
                    <el-upload
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-preview="(res,file)=>{return $_onPreview(file,show_img_arr)}"
                        :on-change="(res,file)=>{return $_change(res,file,'show_img_arr')}"
                        :on-error="$_error"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, good_img_arr.limit)}"
                        :before-upload="$_beforeUpload_img"
                        :file-list="show_img_arr.url"
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
                <el-button type="primary" @click="$_changeTab(-1)" v-if="currentActive !== 0">上一步</el-button>
                <el-button @click="$_createProduct" v-if="goodType === GOODTYPE['fictitiousList'] || ((goodType === GOODTYPE['serviceList'] && currentActive === 2)  || (goodType !== GOODTYPE['serviceList'] &&  currentActive === 1))">上架</el-button>
                <el-button @click="$_changeTab(1)"  v-else>下一步</el-button>             
            </el-form-item>
        </el-form>
        <!-- 表单list End -->

        <!-- 添加标签弹框 -->
        <dialog-lable ref="lable" @addLable="$_addLable" :tagList = "createdData.tag_list"/>
        <!-- 添加标签弹框 End -->

        <!-- 添加规格弹框 -->
        <dialog-formate ref="formate" @addFormat="$_addFormat" :goodSkuinfo = "goodSkuInfo"  @changeSingleButton="$_changeSingleButton"  />
        <!-- 添加规格弹框  End-->

        <!-- 添加耗材弹框 -->
        <dialog-goodFriend ref="goodFriend" :goodFriends="createdData.good_friends"  @addFormat="$_addFormat" />
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
import ProductCard from "./product_card";

export default {
  name: "createGood-formlist",

  components: {
    'dialog-formate' : Formate,   // 添加规格弹框
    'dialog-lable' : Lable,     // 添加标签弹框
    'dialog-goodFriend' : GoodFriend, // 添加服务弹框
    'product-card' : ProductCard  // 卡片组件
  },

  props:{
      /** 
       * 添加商品类型
      */
      goodType:{
        type: Number,
        default: 1
      },
      /** 
       * 操作类型 0 添加 other 编辑
      */
      goodId:{
        type: Number,
        default: 0
      },

      /** 
       * tab切换索引
      */
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
        currentActive: 0,
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
            good_sku: [{}], // 规格sku数组，单规格商品也要按该数组格式提交 
            good_video: '', // 商品视频
            good_video_pic: '', // 商品视频封面图
            good_ico: '', // 商品展示图

            good_img_arr: [], // 商品图片数组
            explain_img_arr: [], // 卖点图

            /** 
             * 商品详情
            */
            show_img_arr: [], // 详情页商品展示图数组
            good_notes : '' ,// 补充说明 购买须知

            /** 
             * 服务添加耗材列表
             */ 
            good_friends: [],
        },
        goodSkuInfo: [], // 多规格展示信息

        // 上传图片控制对象
        good_img_arr: {
            canAdd: false , // 是否可添加商品图
            limit: 6,
            imgVisible : false ,
            url : [],
            over: 6
        },
        explain_img_arr: {
            canAdd: false , // 是否可添加商品图
            limit: 4,
            imgVisible : false ,
            url : [],
            over: 4
        },
        show_img_arr: {
            canAdd: false , // 是否可添加商品图
            limit: 6,
            imgVisible : false ,
            url : [],
            over: 6
        },
        good_video:'' , // 上传视频链接
        good_video_pic: '' , // 视频首图链接
        good_ico: '' , // 商品展示图
        singleButton: "无规格", 
        type:'',
        rules:{},
    };
  },

  async created() {
    this.createdData.good_type = this.goodType
    /** 
     * good_id [0：添加，1:编辑] map不改变元数组，返回新数组
     */
    if(this.goodId){
        let result = await this.$store.dispatch('createdGoode/fetchFormInfo', {id:this.goodId})
        let info = _.cloneDeep(result)
        if (typeof info.sku_list == 'undefined') {
            alert('数据接口缺少 sku_list字段')
            return
        }
        let createdData = {...this.createdData, ...info}
        createdData.good_sku = createdData.sku_list.map(item => {
            item.ico_small__url = item.ico_small
            item.price_cost = (+item.price_cost) / 100
            item.price = (+item.price) / 100
            item.price_sale = (+item.price_sale) / 100
            item.price_total = (+item.price_total) / 100
            return item
        });

        // 图片处理
        let {good_video_pic,good_ico,good_video} = createdData  
        this.good_video = good_video ,
        this.good_video_pic = good_video_pic, 
        this.good_ico = good_ico ,
        this.$_transformImgAry('good_img_arr')
        this.$_transformImgAry('show_img_arr')
        this.$_transformImgAry('explain_img_arr')

        // 单规格，多规格处理 sku_type_arr 规格数组 多规格
        if(createdData.sku_type_arr && createdData.sku_type_arr.length ){
            this.singleButton = "添加规格"
            this.goodSkuInfo = [];
            let arr = [];
            arr[0] = Array.from(new Set(sku_list.map((item) => item.sku_type_arr[0])));
            arr[1] = Array.from(new Set(sku_list.map((item) => item.sku_type_arr[1])));
            arr[2] = Array.from(new Set(sku_list.map((item) => item.sku_type_arr[2])));
            for (var i = 0; i < createdData.sku_type_arr.length; i++) {
                let goodSkuInfoitem = {
                    inputValue: '',
                    list: arr[i],
                    name: createdData.sku_type_arr[i]
                };
                this.goodSkuInfo.push(goodSkuInfoitem);
            }
        }else{
            this.singleButton = "无规格"
        }
        createdData.good_friends.forEach(good => {
            let sku_id = good.group_sku_id || good.sku_id // 耗材sku_id列表
            let sku_list = good.sku_list || []
            good.group_sku_str = []
            sku_id.forEach(id => {
                let obj = sku_list.find(item => item.sku_id === id)
                good.group_sku_str.push(obj.sku_str)
            })
        })
        this.createdData = createdData
    }
    this.currentActive = this.active
    this.type = type[this.goodType]
  },

  computed: {
    ...mapState('createdGoode',['formInfo'])
  },

  methods: {
    /** 
     * 转换图片数组
     */
    $_transformImgAry(name){
        this[name].url = this.formInfo[name].map((item, idx) => {
            let obj = {};
            obj.name = 'name' + idx;
            obj.url = item;
            return obj;
        });
        this[name].over = this[name].limit - this.formInfo[name].length
    },

    //上传成功后照片预览 
    $_onPreview(file, target){
        target.url = file.url;
        target.imgVisible = true;
    },

    // 选择图片限制数量作出提示
    $_exceed(files, fileList, limit){
        this.$message.warning(`当前限制选择 ${limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    // 上传文件，上传数组，目标对象,上传单张
    $_change(file, fileList, targeName, num){
        if(file.status === 'success'){
            if(typeof(targeName) === 'string' && !num){
                let len =  this[targeName].limit - fileList.length
                this[targeName].over = len
                this[targeName].canAdd = len >= this[targeName].limit
                this[targeName].url = fileList
                this.createdData[targeName] = fileList.map(item => {
                    if(item.status === 'success'){
                        return item.response.data.file_name   
                    }
                })
            }else if(typeof(targeName) === 'string' && num === 1 ){
                this[targeName] = file.response.data.url  // URL.createObjectURL(file.raw)
                this.createdData[targeName] = file.response.data.file_name
            }else{
                targeName.ico_small = file.response.data.file_name
                targeName.ico_small__url = file.url
            }
            
        }
        
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
        // this.$ref.goodFriend.computedRightData(1,'美容')
        // this.$ref.goodFriend.goodFriend_show = true
    },

    /** *
     * 展示规格
     */
    $_showFormat() {
      if (this.singleButton === "添加规格") {
        this.showFormat()
      }else{
        // @TOdO !this.goodType === GOODTYPE['serviceList'] 取消显示 单规格 初始化数据
        this.goodSkuInfo = []
        this.createdData.sku_type_arr = []
        this.createdData.good_sku = [{}]
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
        this.currentActive = this.currentActive + num
        this.$emit("changeTab",num);
        //  && this.createdData.good_friends.length === 0
    //   if(this.currentActive === 1){
    //     this.$emit("changeTab",num);
    //     return
    //   }else{
    //     this.$emit("changeTab",num);
    //     return
    //   }
        //   let canNext = true
        //   this.createdData.good_friends.forEach(good => {
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

    // 无规格选择有规格后，点击取消，依然显示无规格
    $_changeSingleButton(){
        this.singleButton  = "无规格"
    },
    /** *
     * 展示标签
     */
    $_showLable() {
        if(!this.createdData.category_id){
            alert('请先选择行业id')
            return 
        }
        let tag_group_type = 2 ;
        if (this.goodType === 2) {
            tag_group_type = 1
        } else if (this.goodType === 4) {
            tag_group_type = 4
        }
        // tip: goodType, 1 服务 2 商品 3 评价 4 虚拟卡券 tag_group_type 1商品 2服务 3虚拟券 4评价 5用户 
        // 品相是暂时没有标签儿的，和服务统一
        this.$store.dispatch('createdGoode/fetchLableList', {
            tag_group_type: tag_group_type, 
            category_id: this.createdData.category_id || 1,
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
        let params = _.cloneDeep(this.createdData)
        params.good_sku = params.good_sku.map(item => {
            item.ico_small__url = item.ico_small
            item.price_cost = (+item.price_cost || 0) * 100
            item.price = (+item.price || 0) * 100
            item.price_sale = (+item.price_sale || 0) * 100
            item.price_total = (+item.price_total || 0) * 100
            return item
        });
        if(this.singleButton === '无规格' && params.sku_type_arr){
            delete params.sku_type_arr
        }
        let that = this
        this.$refs.createdData.validate((valid) => {
            let str = that.goodId === 0 ? 'createdGoode/fetchFormInfoCreate' : 'createdGoode/fetchFormInfoModify'
            that.$store.dispatch(str,params).then((res)=>{
                if(res.code === 0){
                    that.$alert('操作成功');
                    that.$_goOut(that.goodType)
                }else{
                    that.$message.error(res.msg);
                }
            })
        })                                      
    },

    /** 
     * 添加标签
    */
    $_addLable(tag_list){
        this.createdData.tag_list = tag_list, // 已选标签展示数据
        this.createdData.tag_id_arr = tag_list.map(item => item.tag_id)  // [8,18,32]标签id数组
    },
      
    /** *
     * 合并列
     */
    $_SpanMethod({ row, column, rowIndex, columnIndex }) {
      const columnIndexNum = this.goodType === GOODTYPE['serviceList'] ? 7 : 6;
      if (columnIndex === 0 || columnIndex === 6) {
        let len = 0
        if(this.goodSkuInfo.length>1){
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
    for(var i=0;i<sku_type_arr_key.length;i++){
        let obj = {
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
        }
        if(sku_type_arr_val.length){
            for(var j=0;j<sku_type_arr_val.length;j++){
                good_sku_arr.push({...obj,sku_type_arr:[sku_type_arr_key[i],sku_type_arr_val[j]]})
            }
        }else{
            good_sku_arr.push(obj)
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
        // params.good_img_arr = params.good_img_arr.map(item => item.response.data.file_name)
        // params.explain_img_arr = params.explain_img_arr.map(item => item.response.data.file_name)
        // params.show_img_arr = params.show_img_arr.map(item => item.response.data.file_name)
    
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
.hahah{
    padding:40px
}
</style>


