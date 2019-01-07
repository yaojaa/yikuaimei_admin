<template>
    <!-- 表单list -->
    <el-form ref="BasicInfo" :model="BasicInfo" :rules="rules" label-width="120px">
    <el-form-item label="名称：" prop="good_name">
        <el-input  v-model="BasicInfo.good_name" placeholder="名称为2-30个字" />                                                    
    </el-form-item>
    <el-form-item label="商品卖点：" prop="good_explain">
        <el-input type="textarea" v-model="BasicInfo.good_explain" placeholder="长度为2-50个字" suffix-icon="el-icon-arrow-right" />    
        <p class="input__tabs">在商品详情页标题下面展示卖点信息，建议50字以内</p>                                                
    </el-form-item>
    <el-form-item label="行业分类：" prop="category_id">
        <el-select v-model="BasicInfo.category_id" placeholder="请选择所属行业分类">
            <el-option v-for="item in categoryOptions" :label="item.category_name" :value="item.category_id" :key="item.category_name" />
        </el-select>                         
    </el-form-item>
    <el-form-item label="标签：" prop="tag_id_arr">
        <el-input  v-model="BasicInfo.tag_id_arr" placeholder="请添加商品分类"  suffix-icon="el-icon-arrow-right" @focus="$_showLable" readonly />
        <p class="input__tabs">可设置多个标签</p>
    </el-form-item>
    <el-form-item label="规格" props="format">
        <!-- format_none format_add -->
        <el-radio-group v-model="BasicInfo.singleButton" @change="this.$_showFormat">
        <el-radio-button label="无规格" />
        <el-radio-button label="添加规格" />
        </el-radio-group>
    </el-form-item>

    <el-form-item label="">
        <el-row :gutter="20">
            <el-col :span="4">名称:
                <el-input v-model="item.name" readOnly v-for="(item,idx) in formatInfo" /> 
            </el-col>
            <el-col :span="12">选项：
                <div  v-for="(item,idx) in formatInfo">
                    <el-tag v-for="(tag,idx) in item.list" :disable-transitions="false">
                        {{tag}}
                    </el-tag>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button>编辑</el-button>
            </el-col>
        </el-row>
    </el-form-item>
    <el-form-item>
        <el-table :data="good_sku" style="width: 100%" :span-method="$_SpanMethod" >
            <!-- <el-table-column v-for="(item,idx) in sku_head_arr" :key="item" :label="item" prop="sku_type_arr[idx]" /> -->
            <el-table-column :label="sku_head_arr[0]" prop="sku_type_arr[0]" />
            <el-table-column :label="sku_head_arr[1]" prop="sku_type_arr[1]" v-if="sku_head_arr[1]" />
            <el-table-column label="售价(元)" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.price_sale" placeholder="10000" /> 
                </template>
            </el-table-column>
            <el-table-column label="原价(元)" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.price" placeholder="10000" /> 
                </template>
            </el-table-column>
            <el-table-column label="成本(元)" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.price_cost" placeholder="10000" /> 
                </template>
            </el-table-column>
            <el-table-column label="编码" >
                <template slot-scope="scope">
                    <el-input  v-model="scope.row.sku_code" placeholder="10000" /> 
                </template>
            </el-table-column>
            <el-table-column label="图片" prop="ico_small" />
        </el-table>
    </el-form-item>
    <el-form-item label="库存：" prop="exist">
        <el-input  v-model="BasicInfo.exist" placeholder="10000" suffix-icon="el-icon-arrow-right" />                                                    
    </el-form-item>
    <el-form-item label="单位：" prop="unit">
        <el-input  v-model="BasicInfo.unit" placeholder="箱" suffix-icon="el-icon-arrow-right" />                                                                       
    </el-form-item>
    <el-form-item label="商品编码：" prop="productCode">
        <el-input  v-model="BasicInfo.productCode" placeholder="支持14以内的数字+英文组合"  />                                                                              
    </el-form-item>
    <el-form-item label="售价：" prop="sellPrice">
        <el-input  v-model="BasicInfo.sellPrice" placeholder="请输入套餐在婚博会标价" />                                                                                                        
        <span class="outText">元</span>
    </el-form-item>
    <el-form-item label="原价：" prop="price">
        <el-input  v-model="BasicInfo.price" placeholder="¥5000" />                                                                                                        
        <span class="outText">元</span>
    </el-form-item>
    <el-form-item label="商品图片：" prop="productPng">
        <div class="upload-title">
        您可以上传3-6张图片及1个视频作为商品展示图，<br />
        展示在商品页顶部的图片，支持上传1-6张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为1242*1242，支持JPG、PNG等大部分格式图片，单张图片大小不超过5M 
        </div>
        <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview(arguments[0],0)"
        :on-remove="handleRemove">
        <i class="el-icon-plus upload-placeholder">
            <p>添加图片</p><span>还可以添加6张</span>
        </i>
        </el-upload>
    </el-form-item>
    <el-form-item label="" prop="uploadArray">
        <div class="upload-title">
        展示在商品页顶部的视频，<a>最多可上传 1 个视频</a>，
        支持MP4视频格式，<a>视频大小不能超过20M</a>
        </div>
        <div class="uploadArray_content">
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview(arguments[0],0)"
            :on-remove="handleRemove">
            <i class="el-icon-plus upload-placeholder productView">
            <p>添加视频</p>
            </i>
        </el-upload>
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview(arguments[0],0)"
            :on-remove="handleRemove">
            <i class="el-icon-plus upload-placeholder productViewFirstPng">
            <p>添加视频首图</p>
            </i>
        </el-upload>
        </div>
    </el-form-item>
    <el-form-item label="商品展示图：" prop="showPng">
        <div class="upload-title">
        <p>展示在商品页顶部的图片，支持上传 1 张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为400*400，支持JPG、PNG等大部分格式图片，单张图片大小不超过2M</p>
        </div>
        <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview(arguments[0],0)"
        :on-remove="handleRemove">
        <i class="el-icon-plus upload-placeholder">
            <p>添加图片</p><span>只能上传一张</span>
        </i>
        </el-upload>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">表单提交</el-button>
        <el-button>下一步</el-button>
        <el-button>取消</el-button>
    </el-form-item>
    </el-form>
    <!-- 表单list End -->
</template>

<script>
export default {
  name: "createGood-formlist",

  data() {
    return {
      BasicInfo: {},
      showLable: false, // 展示标签
      // 所属行业分类
      categoryOptions: [
        {
          category_id: 1,
          category_name: "美容"
        },
        {
          category_id: 2,
          category_name: "美甲美睫"
        },
        {
          category_id: 3,
          category_name: "美发"
        },
        {
          category_id: 4,
          category_name: "美体"
        },
        {
          category_id: 5,
          category_name: "轻医美"
        }
      ],
      sku_head_arr: ["功效", "容量"], //规格数组，单规格商品不要提交该字段
      good_sku: [
        //规格sku数组，单规格商品也要按该数组格式提交
        {
          sku_type_arr: ["美白保湿1", "150ml"], //规格值数组，单规格商品不要提交该字段
          sku_code: "23344545654654621", //商品编码 不提交该字段，则认定本条规格信息不存在
          price_cost: 2321, //成本
          price: 2888, //原价(只用于展示商品原价信息)
          price_sale: 2666, //售价(商品实际需要支付价值，线下补交时要用到)
          price_plate: 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
          ico_small: "/small.jpg" //规格图标，单规格商品不要提交该字段
        },
        {
          sku_type_arr: ["美白保湿2", "25ml"], //规格值数组，单规格商品不要提交该字段
          sku_code: "23344545654654621", //商品编码
          price_cost: 2321, //成本
          price: 2888, //原价(只用于展示商品原价信息)
          price_sale: 2666, //售价(商品实际需要支付价值，线下补交时要用到)
          price_plate: 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
          ico_small: "/small.jpg" //规格图标，单规格商品不要提交该字段
        },
        {
          sku_type_arr: ["美白保湿3", "50ml"], //规格值数组，单规格商品不要提交该字段
          sku_code: "23344545654654621", //商品编码
          price_cost: 2321, //成本
          price: 2888, //原价(只用于展示商品原价信息)
          price_sale: 2666, //售价(商品实际需要支付价值，线下补交时要用到)
          price_plate: 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
          ico_small: "/small.jpg" //规格图标，单规格商品不要提交该字段
        },
        {
          sku_type_arr: ["美白保湿4", "100ml"], //规格值数组，单规格商品不要提交该字段
          sku_code: "23344545654654621", //商品编码
          price_cost: 2321, //成本
          price: 2888, //原价(只用于展示商品原价信息)
          price_sale: 2666, //售价(商品实际需要支付价值，线下补交时要用到)
          price_plate: 500, //平台需实际支付价格（平台下单实际支付价格）编辑服务时必须填写
          ico_small: "/small.jpg" //规格图标，单规格商品不要提交该字段
        }
      ],
      rules: {
        good_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在2-30个字符", trigger: "blur" }
        ],
        good_explain: [
          { required: true, message: "请填写商品卖点", trigger: "blur" },
          { min: 2, max: 50, message: "请填写商品卖点", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "请选择所属行业分类", trigger: "blur" }
        ],
        tag_id_arr: [
          { required: true, message: "请添加标签", trigger: "blur" }
        ],
        format: [{ required: true, message: "请选择规格", trigger: "change" }],
        exist: [{ required: true, message: "请选择库存", trigger: "blur" }],
        unit: [{ required: true, message: "请选择单位", trigger: "blur" }],
        productCode: [
          { required: true, message: "请填写商品编码", trigger: "blur" }
        ],
        sellPrice: [{ required: true, message: "请填写售价", trigger: "blur" }],
        price: [{ required: true, message: "请填写原价", trigger: "blur" }]
      }
    };
  },
  props: {
    showFormatInfo: {
      type: Boolean,
      default: false
    },
    // 规格展示数据
    formatInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {
    $_deleted() {
      console.log("deleted");
    },
    /** *
     * 展示标签
     */
    $_showLable() {
      console.log(111);
      this.$emit("changeLableStatus");
    },

    /** *
     * 展示规格
     */
    $_showFormat() {
      if (this.BasicInfo.singleButton === "添加规格") {
        this.$emit("changeFormatStatus");
      }
    },

    handlePictureCardPreview(file, index) {
      // let { name } = this.formdata[index];
      // this.form[name] = file.url;
      // this.dialogVisible = true;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    /** *
     * 合并列
     */
    $_SpanMethod({ row, column, rowIndex, columnIndex }) {
      const columnIndexNum = this.sku_head_arr.length === 2 ? 6 : 5;

      if (columnIndex === 0 || columnIndex === columnIndexNum) {
        if (rowIndex % this.good_sku.length === 0) {
          return {
            rowspan: this.good_sku.length,
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
  created() {}
};
</script>
<style>
</style>


