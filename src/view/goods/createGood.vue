<template>
   <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
          <template>
            <el-tabs v-model="editName" @tab-click="handleClick">
              <el-tab-pane label="编辑基本信息" name="BasicInfo">
                <div class="panel">
                    <div class="form-panel p-xl">
                        <formlist :formdata="options" :labelWidth="'200px'"></formlist>
                    </div>
                    
                </div>
              </el-tab-pane>
              <el-tab-pane label="编辑商品详情" name="ProductDetails">配置管理</el-tab-pane>
            </el-tabs>
          </template>
            
        </div>
    </div>
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import formlist from "@/components/formlist";

export default {
  name: "tabletest",
  data() {
    return {
      editName: 'BasicInfo', // tab标签默认定位
      url: "",
      breadcrumb: [
        //面包屑
        {
          name: "商品管理" //名字
        },
        {
          name: "平台商品", //名字
          url: '/goodList'
        },
        {
          name: "添加商品" //名字
        }
      ],
      options: [
        {
          name: "name",
          type: "input",
          label: "名称：",
          placeholder: '名称为2-30个字',
          rules: [
            {
              required: true,
              message: "请输入活动名称",
              trigger: "blur"
            },
            {
              min: 2,
              max: 50,
              message: "长度在2-30个字符",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "sellingPoint",
          type: "textarea",
          label: "商品卖点：",
          placeholder: "长度为2-50个字",
          remarks: '在商品详情页标题下面展示卖点信息，建议50字以内',
          rules: [
            {
              required: true,
              message: "请填写商品卖点",
              trigger: "blur"
            },
            {
              min: 2,
              max: 50,
              message: "长度在2-50个字符",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "businesSort",
          type: "input",
          label: "行业分类：",
          suffix_icon:"el-icon-arrow-right",
          placeholder: "请选择所属行业分类",
          rules: [
            // @TODO type 是个弹窗吧？ 
            {
              required: true,
              message: "请选择所属行业分类",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "lable",
          type: "input",
          label: "标签：",
          inline:true,
          placeholder: '选择所属行业类目',
          suffix_icon:"el-icon-arrow-right",
          remarks: '可设置多个标签',
          value: ""
        },
        // @TODO 可以新写一个
        {
          name: "format",
          type: "singleButton",
          label: "规格",
          rules: [],
          options: [
            {label: '无规格', name: 'none'},
            {label: '添加规格', name: 'add'},
          ],
          value: "none"
        },
        // @TODO 默认多少
        {
          name: "exist",
          type: "selector",
          label: "库存：",
          placeholder: '10000',
          // @TODO 可设置多个标签
          options: [
            {
              label: '满2000减1000',
              value: '001'
            }
          ],
          value: ""
        },
        {
          name: "coupon",
          type: "selector",
          label: "单位：",
          placeholder: '箱',
          // @TODO 可设置多个标签
          options: [
            {
              label: '满2000减1000',
              value: '001'
            }
          ],
          value: ""
        },
        {
          name: "productCode",
          type: "input",
          label: "商品编码：",
          placeholder: "支持14位以内的数字+英文组合",
          rules: [
            // @TODO type 是个弹窗吧？ 
            {
              required: true,
              message: "请选择所属行业分类",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "sellPrice",
          type: "input",
          label: "售价",
          outText: '元',
          rules: [
            {
              required: true,
              message: "请填写售价",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "price",
          type: "input",
          label: "原价",
          outText: '元',
          rules: [
            {
              required: true,
              message: "请填写原价",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "productPng",
          type: "upload",
          label: "商品图片：",
          title: "您可以上传3-6张图片及1个视频作为商品展示图，<br />展示在商品页顶部的图片，支持上传1-6张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为1242*1242，支持JPG、PNG等大部分格式图片，单张图片大小不超过5M ",
          placeholder: "<p>添加图片</p><span>还可以添加6张</span>",
          value: ""
        },
        // @TODO 文字有高亮 && 添加图片，还可以添加6张 & 添加视频 & 添加视频首图
        {
          name: "uploadArray",
          type: "uploadArray",
          title:'展示在商品页顶部的视频，<a>最多可上传 1 个视频</a>，支持MP4视频格式，<a>视频大小不能超过20M</a>',
          content:[{
            name: "productView",
            label: "",
            placeholder: "<p>添加视频</p>",
          },
          {
            name: "productViewFirstPng",
            label: "",
            placeholder: "<p>添加视频首图</p>",
          }]
        },
        {
          name: "showPng",
          type: "upload",
          label: "商品展示图：",
          title:'<p>展示在商品页顶部的图片，支持上传 1 张图片，你可以拖拽图片调整图片的现实顺序，图片宽高比为400*400，支持JPG、PNG等大部分格式图片，单张图片大小不超过2M</p>',          
          placeholder: "<p>添加图片</p><span>只能上传一张</span>",
          value: ""
        },
        {
          name: "next",
          type: "button",
          value: "下一步"
        }
      ]
    };
  },
  components: {
    BreadCrumb,
    formlist
  },
  created() {},
  computed: {},
  methods: {
    /** *
     * tab标签切换事件
     */
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
</style>
