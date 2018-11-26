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
      url: "/api/shopgood/index",
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
          }
        ]
      },
      tableJson: {
        column: [
          //行
          {
            type: "text",
            label: "商家编号",
            prop: "shop_id",
            width: "80px",
            align: "center"
          },
          {
            type: "text",
            label: "商家名称",
            prop: "shop_name",
            minWidth: "200px",
            align: "center"
          },
          {
            type: "text",
            label: "所属分公司",
            prop: "company_name",
            width: "",
            align: "center"
          },
          {
            type: "text",
            label: "联系",
            prop: "shop_phone",
            width: "",
            align: "center"
          },
          {
            type: "switch",
            label: "显示/不显示",
            align: "center",
            width: "",
            prop: "switch",
            config: {
              activeColor: "green",
              inactiveColor: "gray",
              value: ["0", "1"]
            }
          },
          {
            type: "text",
            label: "经营类别",
            prop: "shop_category_name",
            align: "center",
            width: ""
          },
          {
            type: "text",
            label: "保证金",
            prop: "shop_deposit",
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
                label: "代为操作",
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
                label: "查看",
                type: "detail",
                url: "", //优先执行url
                onClick(tablePage, self, row) {
                  self.$router.push("/businessManage/BasicInfo/" + row.shop_id);
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
  methods: {}
};
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
</style>
