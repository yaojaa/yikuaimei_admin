<template>
   <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <nomal-table :table-json="tableJson" :url="url"  :query="{good_type: 2}">
                <div class="sub-heading">
                    <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">常用功能</span></h3>
                    <div class="sub-actions">
                        <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/createGood' })">添加商品</el-button>
                        <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/categorylist' })">管理分类</el-button>
                        <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/labellist' })">管理标签</el-button>
                    </div>
                </div>
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
        </div>
    </div>
</template>

<script>
import NomalTable from "@/components/common/NomalTable";
import BreadCrumb from "@/components/common/BreadCrumb";
import TableSearch from "@/components/common/TableSearch";

export default {
  name: "tabletest",
  data() {
    return {
      url: "/api/admin/shopgoods/index",
      breadcrumb: [
        //面包屑
        {
          name: "商品管理"
        },
        {
          name: "平台商品",
          url: "/goodList"
        }
      ],
      searchs: {
        list: [
          {
            type: "input-select", //选择器
            label: "选择状态",
            name: "is_use",
            value: "",
            options: [
              {
                name: '全部',
                value: ''
              },
              {
                name: '已上架',
                value: '2'
              },
              {
                name: '未上架',
                value: '1'
              }

            ]
          },
          {
            type: "input-text", //名称筛选
            label: "商品名称",
            name: "good_name",
            value: "",
            placeholder: "请输入名称"
          }
        ]
      },
      tableJson: {
        column: [
          //行
          {
            type: "text",
            label: "商品",
            prop: "good_name",
            width: "80px",
            align: "center"
          },
          {
            type: "text",
            label: "标签",
            prop: "shop_name",
            minWidth: "200px",
            align: "center"
          },
          {
            type: "text",
            label: "分类",
            prop: "company_name",
            width: "",
            align: "center"
          },
          {
            type: "text",
            label: "状态",
            prop: "shop_phone",
            width: "",
            align: "center"
          },
          {
            type: "switch",
            label: "总销量",
            align: "center",
            width: "",
            prop: "switch"
          },
          {
            type: "text",
            label: "库存",
            prop: "shop_category_name",
            align: "center",
            width: ""
          },
          {
            type: "handle",
            label: "操作",
            align: "center",
            width: "",
            list: [
              {
                label: "下架",
                type: "edit",
                url: "", //优先执行url
                onClick(tablePage, self) {
                  console.log(self.vue);
                  console.log(tablePage.isShow);
                  self.nomal = !self.nomal;
                  tablePage.isShow = !tablePage.isShow;
                }
              },
              {
                label: "编辑",
                type: "edit",
                url: "", //优先执行url
                onClick(tablePage, self, row) {
                  self.$router.push("/createGood" + row.shop_id);
                }
              }
            ]
          }
        ]
      }
    };
  },
  components: {
    NomalTable,
    BreadCrumb,
    TableSearch
  },
  created() {},
  computed: {},
  methods: {
    
  }
};
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
</style>
