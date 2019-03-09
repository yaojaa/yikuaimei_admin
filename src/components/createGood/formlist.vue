<template>
    <div>
        <!-- 表单list -->
        <el-form ref="createdData" :model="createdData" :rules="rules" label-width="120px" class="form-width-small">
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
                    <el-input  v-model="createdData.unit" placeholder="请填写单位" />
                    <!-- <el-radio-group v-model="createdData.unit">
                        <el-radio v-for="item in UNIT" :label="item" :key="`${item}unit`" />
                    </el-radio-group>                                                                        -->
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
                <template  v-if="singleButton === '无规格' && createdData.good_sku && createdData.good_sku.length" >
                    <el-form ref="createdData_goodSku" :model="createdData.good_sku[0]" :rules="rules" label-width="120px">
                        <el-form-item :label="`${type}编码：`" prop="sku_code">
                            <el-input  v-model="createdData.good_sku[0].sku_code" placeholder="支持14以内的数字+英文组合"  />                                                                              
                        </el-form-item>
                        <el-form-item label="售价：" prop="price_sale">
                            <el-input  v-model="createdData.good_sku[0].price_sale" placeholder="请输入售价" />                                                                                                        
                            <span class="outText">元</span>
                        </el-form-item>
                        <el-form-item label="原价：" prop="price">
                            <el-input  v-model="createdData.good_sku[0].price" placeholder="请输入原价" />                                                                                                        
                            <span class="outText">元</span>
                        </el-form-item>
                        <el-form-item label="成本" prop="price_cost">
                            <el-input  v-model="createdData.good_sku[0].price_cost" placeholder="请输入成本" />                                                                                                        
                            <span class="outText">元</span>
                        </el-form-item>
                        <el-form-item label="总价" prop="price_total"  v-if="goodType === GOODTYPE['serviceList']">
                            <el-input  v-model="createdData.good_sku[0].price_total" placeholder="请输入总价" />                                                                                                        
                            <span class="outText">元</span>
                        </el-form-item>
                    </el-form>
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
                                        action="/api/admin/fileupload/image"
                                        class="table_upload"
                                        :on-preview="$_onPreview"
                                        :on-change="(res,file)=>{return $_change(res,file,scope.row)}"
                                        :on-remove="(res,file)=>{return $_change(res,file,scope.row)}"
                                        :on-error="$_error"
                                        :before-upload="$_beforeUpload_img"
                                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, 1)}" 
                                        :class="{table_upload__disabled:scope.row.ico_small__url}"
                                        :key="img_url__key"
                                        >
                                        <img v-if="scope.row.ico_small__url" :src="scope.row.ico_small__url" class="avatar">
                                        <span class="table_icon_text" v-else><i class="el-icon-plus" />添加{{type}}图片</span>
                                    </el-upload>
                                </template> 
                            </el-table-column>
                        </el-table>
                    </div>
                </template>

                <el-form-item :label="`${type}海报图：`" prop="poster_img" v-if="goodType !== GOODTYPE['fictitiousList']">
                    <div class="upload-title">
                    <p>支持上传1张图片，图片宽高比为1020*1500，支持JPG、PNG等格式图片，单张图片大小不超过5M</p>
                    </div>
                    <el-upload
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-preview="$_onPreview"
                        :on-change="(res,file)=>{return $_change(res,file,'poster_img',1)}"
                        :on-remove="(res,file)=>{return $_change(res,file,'poster_img',1)}"
                        :on-error="$_error"
                        :before-upload="$_beforeUpload_img"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, 1)}"  
                        :file-list="poster_img.url" 
                        :limit="1"
                        :class="{canAdd:!poster_img.over}"
                        >
                        <i class="el-icon-plus upload-placeholder">
                            <p>添加图片</p><span>只能上传一张</span>
                        </i>
                    </el-upload>
                </el-form-item>
               
                <el-form-item :label="`${type}图片：`" prop="good_img_arr">
                    <div class="upload-title">
                        支持上传1-6张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为1125*1125，支持JPG、PNG等格式图片，单张图片大小不超过5M
                    </div>
                    <el-upload
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-preview="$_onPreview"
                        :on-change="(res,file)=>{return $_change(res,file,'good_img_arr')}"
                        :on-remove="(res,file)=>{return $_change(res,file,'good_img_arr')}"
                        :on-error="$_error"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, good_img_arr.limit)}"
                        :before-upload="$_beforeUpload_img"
                        :file-list="good_img_arr.url"
                        :limit="good_img_arr.limit"
                        :multiple="true"
                        :class="{canAdd:good_img_arr.over === 0}"
                        >
                        <i class="el-icon-plus upload-placeholder">
                            <p>添加图片</p><span>还可以添加{{good_img_arr.over}}张</span>
                        </i>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="">
                    <div class="upload-title">
                        视频支持上传1个视频，高宽1:1，最好是大于等于800*800，大小不超过20M，支持MP4格式视频格式<br />
                        封面图支持上传1张图片，图片宽高比为1125*1125，支持JPG、PNG等格式图片，单张图片大小不超过5M
                    </div>
                </el-form-item>
                <el-form-item label="" prop="good_video"  class="good_video">
                    <el-upload
                        action="/api/admin/fileupload/image"
                        :show-file-list="false"
                        class="avatar-uploader"
                        :on-preview="$_onPreview"
                        :on-change="(res,file)=>{return $_change(res,file,'good_video', 1)}"
                        :on-remove="(res,file)=>{return $_change(res,file,'good_video', 1)}"
                        :on-error="$_error"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, good_img_arr.limit)}"
                        :before-upload="$_beforeUpload_viedo"
                        >
                        <ul class="el-upload-list el-upload-list--picture-card el-upload--picture-card"  v-if="good_video" >
                            <li tabindex="0" class="el-upload-list__item is-success">
                                <video :src="good_video" class="avatar" controls="controls" height="100%">您的浏览器不支持视频播放</video>
                                <a class="el-upload-list__item-name" >
                                    <i class="el-icon-document" />
                                    "Wiedergeburt 2019-01-01 03.09.22.mp4"
                                </a>
                                <label class="el-upload-list__item-status-label" @click.stop="ss">
                                    <i class="el-icon-close" />
                                </label>
                            </li>
                        </ul>
                        
                        <i v-else class="el-icon-plus upload-placeholder">
                            <p>添加视频</p>
                        </i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="" prop="good_ico"  class="good_video">
                    <el-upload
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-preview="$_onPreview"
                        :on-change="(res,file)=>{return $_change(res,file,'good_video_pic', 1)}"
                        :on-remove="(res,file)=>{return $_change(res,file,'good_video_pic', 1)}"
                        :on-error="$_error"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, good_img_arr.limit)}"
                        :before-upload="$_beforeUpload_img"
                        :file-list="good_video_pic.url"
                        :limit="1"
                        :class="{canAdd:good_video_pic.over === 0}"
                        >
                        <i class="el-icon-plus upload-placeholder">
                            <p>添加视频首图</p>
                        </i>
                    </el-upload>
                </el-form-item>
                <p  class="clearfix"></p>
                <el-form-item :label="`${type}展示图：`" prop="good_ico" >
                    <div class="upload-title">
                        <p>支持上传1张图片，图片宽高比为400*400，支持JPG、PNG等格式图片，单张图片大小不超过5M</p>
                    </div>
                    <el-upload
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-change="(res,file)=>{return $_change(res,file,'good_ico', 1)}"
                        :on-remove="(res,file)=>{return $_change(res,file,'good_ico', 1)}"
                        :on-error="$_error"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, 1)}"
                        :before-upload="$_beforeUpload_img"
                        :file-list="good_ico.url"
                        :limit="1"
                        :class="{canAdd:good_ico.over === 0}"
                        >
                        <i class="el-icon-plus upload-placeholder">
                             <p>添加图片</p><span>只能上传一张</span>
                        </i>
                    </el-upload>
                </el-form-item>
                <el-form-item :label="`${type}卖点图：`" prop="explain_img_arr">
                    <div class="upload-title">
                        支持上传2-4张图片，图片宽高比为450*540，支持JPG、PNG等格式图片，单张图片大小不超过5M
                    </div>
                    <el-upload
                        action="/api/admin/fileupload/image"
                        list-type="picture-card"
                        :on-preview="$_onPreview"
                        :on-change="(res,file)=>{return $_change(res,file,'explain_img_arr')}"
                        :on-remove="(res,file)=>{return $_change(res,file,'explain_img_arr')}"
                        :on-error="$_error"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, good_img_arr.limit)}"
                        :before-upload="$_beforeUpload_img"
                        :file-list="explain_img_arr.url"
                        :limit="explain_img_arr.limit"
                        :multiple="true"
                        :class="{canAdd:explain_img_arr.over === 0}"
                        >
                        <i class="el-icon-plus upload-placeholder">
                            <p>添加图片</p><span>还可以添加{{explain_img_arr.over}}张</span>
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
                                <el-checkbox-group v-model="scope.row.sku_id">
                                    <el-checkbox :label="item.sku_id" v-for="item in scope.row.sku_list" :key="`${item.sku_str}${scope.row.good_id}`" border>{{item.sku_str}}{{item.sku_id}}</el-checkbox>
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
                        :on-preview="$_onPreview"
                        :on-change="(res,file)=>{return $_change(res,file,'show_img_arr')}"
                        :on-remove="(res,file)=>{return $_change(res,file,'show_img_arr')}"
                        :on-error="$_error"
                        :on-exceed="(files, fileList)=>{return $_exceed(files, fileList, good_img_arr.limit)}"
                        :before-upload="$_beforeUpload_img"
                        :file-list="show_img_arr.url"
                        :limit="show_img_arr.limit"
                        :multiple="true"
                        :class="{canAdd:show_img_arr.over === 0}"
                        >
                        <i class="el-icon-plus upload-placeholder">
                            <p>添加图片</p><span>还可以添加{{show_img_arr.over}}张</span>
                        </i>
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

        <el-dialog :visible.sync="imgVisible">
            <img width="100%" :src="imgUrl" alt="">
        </el-dialog>

        <!-- 添加标签弹框 -->
        <dialog-lable ref="lable" @addLable="$_addLable" :tagList = "createdData.tag_list"/>
        <!-- 添加标签弹框 End -->

        <!-- 添加规格弹框 -->
        <dialog-formate ref="formate" @addFormat="$_addFormat" :goodSkuinfo = "goodSkuInfo"  @changeSingleButton="$_changeSingleButton"  />
        <!-- 添加规格弹框  End-->

        <!-- 添加耗材弹框 -->
        <dialog-goodFriend ref="goodFriend" :goodFriList="createdData.good_friends"  @addFriend="$_addFriend" />
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
        imgVisible: false,
        imgUrl: '',
        img_url__key: new Date(),
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
            poster_img: '', // 海报图

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
            url : [],
            over: 6
        },
        explain_img_arr: {
            limit: 4,
            url : [],
            over: 4
        },
        show_img_arr: {
            limit: 6,
            url : [],
            over: 6
        },
        poster_img: { // 商品海报图
            limit: 1,
            url : [],
            over: 1
        },
        good_video:'', // 上传视频链接
        good_video_pic: { // 视频首图链接
            limit: 1,
            url : [],
            over: 1
        },
        good_ico: { // 商品展示图
            limit: 1,
            url : [],
            over: 1
        },
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
        if (!info.sku_list) {
            alert('数据接口缺少 sku_list字段')
            return
        }
        let createdData = {...this.createdData, ...info}
        createdData.id = createdData.good_id
        createdData.good_sku = createdData.sku_list.map(item => {
            item.ico_small__url = item.ico_small
            item.price_cost = (+item.price_cost) / 100
            item.price = (+item.price) / 100
            item.price_sale = (+item.price_sale) / 100
            item.price_total = (+item.price_total) / 100
            return item
        });

        // 图片处理
        let {good_video_pic,good_ico,good_video,poster_img} = createdData 
        this.$_transformImgAry('good_img_arr')
        this.$_transformImgAry('show_img_arr')
        this.$_transformImgAry('explain_img_arr')
        this.$_transformImgAry('good_video_pic',1)
        this.$_transformImgAry('good_ico',1)
        this.$_transformImgAry('poster_img',1)
        this.good_video = good_video

        // 单规格，多规格处理 sku_type_arr 规格数组 多规格
        if(createdData.sku_type_arr && createdData.sku_type_arr.length ){
            this.singleButton = "添加规格"
            this.goodSkuInfo = [];
            let arr = [];
            arr[0] = Array.from(new Set(createdData.sku_list.map((item) => item.sku_type_arr[0])));
            arr[1] = Array.from(new Set(createdData.sku_list.map((item) => item.sku_type_arr[1])));
            arr[2] = Array.from(new Set(createdData.sku_list.map((item) => item.sku_type_arr[2])));
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
            good.sku_id = good.group_sku_id || good.sku_id // 耗材sku_id列表
            good.sku_list = good.group_sku_list || good.sku_list
        })
        this.createdData = createdData
    }
    this.currentActive = this.active
    this.type = type[this.goodType]
    this.rules = {
        good_name: [{
            required: true,
            min: 2,
            max: 30,
            message: "请输入活动名称,长度在2-30个字符",
            trigger: "blur"
        }],
        good_explain: [{
            required: true,
            min: 2,
            max: 50,
            message: `在${this.type}详情页标题下面展示卖点信息，建议50字以内`,
            trigger: "blur"
        }],
        category_id: [{
            required: true,
            message: "请选择所属行业分类",
            trigger: "change"
        }],
        tag_list: [{
            required: true,
            message: "请添加标签",
            trigger: "blur"
        }],
        unit: [{
            required: true,
            message: "请选择单位",
            trigger: "change"
        }],
        country: [{
            required: true,
            message: "请选择产地",
            trigger: "change"
        }],
        format: [{
            required: true,
            message: "请选择规格",
            trigger: "change"
        }],
        sku_code: [{
            required: true,
            message: `请填写${this.type}编码`,
            trigger: "blur"
        }],
        price_sale: [{
            required: true,
            message: "请填写售价",
            trigger: "blur"
        }],
        price: [{
            required: true,
            message: "请填写原价",
            trigger: "blur"
        }],
        price_cost: [{
            required: true,
            message: "请填写成本",
            trigger: "blur"
        }],
        price_total: [{
            required: true,
            message: "请填写总价",
            trigger: "blur"
        }],
        poster_img: [{
            required: true,
            message: `请选择${this.type}海报图`,
            trigger: "blur"
        }],
        good_img_arr: [{
            required: true,
            message: `请选择${this.type}图片`,
            trigger: "change"
        }],
        // good_video: [{
        //     required: true,
        //     message: `请添加视频`,
        //     trigger: "change"
        // }],
        // good_ico: [{
        //     required: true,
        //     message: `请添加}视频首图图`,
        //     trigger: "change"
        // }],
        show_img_arr: [{
            required: true,
            message: `请选择${this.type}展示图`,
            trigger: "change"
        }],
        good_notes: [{
            required: true,
            message: "请填写购买须知",
            trigger: "blur"
        }],
    }
  },

  computed: {
    ...mapState('createdGoode',['formInfo'])
  },

  methods: {
    /** 
     * 添加耗材
    */
    $_addFriend(good_friends){
      this.createdData.good_friends = good_friends 
    },
    /** 
     * 转换图片数组
     */
    $_transformImgAry(name,num){
        if(num === 1){
            let len = this.formInfo[name] ? 0 : 1
            this[name].url = [{name,url:this.formInfo[name]}]
            this[name].over = len
        }else{
            this[name].url = this.formInfo[name].map((item, idx) => {
                let obj = {};
                obj.name = 'name' + idx;
                obj.url = item;
                return obj;
            });
            this[name].over = this[name].limit - this.formInfo[name].length
        }
        
    },

    //上传成功后照片预览 
    $_onPreview(file){
        this.imgUrl = file.url;
        this.imgVisible = true;
    },

    // 选择图片限制数量作出提示
    $_exceed(files, fileList, limit){
        this.$message.warning(`当前限制选择 ${limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },


    ss(file){
        this.createdData.good_video = ''
        this.good_video = ''
    },

    // 上传文件，上传数组，目标对象,上传单张
    $_change(file, fileList, targeName, num){
        if(file.status === 'success'){
            if(targeName === 'good_video'){
                this.createdData.good_video = file.response.data.file_name
                this.good_video = file.url 
                return  
            } 
            if(typeof(targeName) === 'string'){
                let len = this[targeName].limit - fileList.length
                this[targeName].over = len
                this[targeName].url = fileList
                if(num === 1){
                    this.createdData[targeName] = fileList[0].response.data.file_name
                }else{
                    this.createdData[targeName] = fileList.map(item => {
                        if(item.status === 'success'){
                            return item.response.data.file_name   
                        }
                    })
                }
            }else{
                targeName.ico_small = file.response.data.file_name
                targeName.ico_small__url = file.url
                this.img_url__key = `img_url__key${new Date()}`
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
        this.$refs.goodFriend.computedRightData(1,'美容')
        this.$refs.goodFriend.goodFriend_show = true
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
        let that = this
        debugger
        if(num > 0){
            this.$refs.createdData.validate((valid) => {
                if(valid){
                    if (this.singleButton === "无规格") {
                        this.$refs.createdData_goodSku.validate((valid) => {
                            if(valid){
                                that.currentActive = that.currentActive + num
                                that.$emit("changeTab",that.currentActive);
                            }
                        })
                    } else {
                        that.currentActive = that.currentActive + num
                        that.$emit("changeTab",that.currentActive);
                    }
                }
            })
        }else{
            that.currentActive = that.currentActive + num
            that.$emit("changeTab",that.currentActive); 
        }
        
        
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
        let tag_group_type = 0
        if (this.goodType === 2) {
            tag_group_type = 1
        } else if (this.goodType === 1) {
            tag_group_type = 2
        } else {
            tag_group_type = this.goodType
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
        let that = this
        that.$refs.createdData.validate((valid) => {
            let params = _.cloneDeep(that.createdData)
            if (this.singleButton === "无规格") {
                // console.log(this.$refs.createdData_goodSku)
                // this.$refs.createdData_goodSku.validate((valid) => {
                //     if(valid){
                params.good_sku = params.good_sku.map(item => {
                    item.price_cost = (+item.price_cost || 0) * 100
                    item.price = (+item.price || 0) * 100
                    item.price_sale = (+item.price_sale || 0) * 100
                    item.price_total = (+item.price_total || 0) * 100
                    return item
                });
                delete params.sku_type_arr
                //     }
                // })
            } else {
                let ico_small
                let ico_small__url
                params.good_sku = params.good_sku.map(item => {
                    if (item.ico_small) {
                        ico_small = item.ico_small
                    }
                    if (item.ico_small__url) {
                        ico_small__url = item.ico_small__url
                    }
                    item.ico_small = ico_small
                    item.ico_small__url = ico_small__url
                    return item
                });
            }
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
    }
  }
}
</script>

<style>
</style>


