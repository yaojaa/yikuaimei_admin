<template>
<div class="marketGame">    
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <table-tabs :page-tabs="menus"></table-tabs>
            <nomal-table :table-json="tableJson" :url="url" v-if="$route.name === 'business'"></nomal-table>
            <nomal-table :table-json="tableJson1" :url="url" v-if="$route.name === 'zigongsi'"></nomal-table>
        </div>
</div>
</template>

<script>
import NomalTable from "@/components/common/NomalTable";
import BreadCrumb from "@/components/common/BreadCrumb";
import TableTabs from "@/components/common/TableTabs";

export default {
  name: "tabletest",
  data() {
    let activeIndex = this.$route.path;
    return {
      url: "",
      breadcrumb: [
        //面包屑
        {
          name: "营销管理" //名字
        },
        {
          name: "游戏", //名字
          url: "/marketgame"
        },
        {
          name: ["商家", "分公司"][
            ["/gameBusiness", "/gameZigongsi"].indexOf(activeIndex)
          ]
        }
      ],

      menus: {
        type: "menu",
        list: [
          {
            label: "商家",
            index: "/gameBusiness"
          },
          {
            label: "分公司",
            index: "/gameZigongsi"
          }
        ],
        activeIndex //初始值
      },

      searchs: {
        list: [
          {
            type: "input-text", //输入文本
            label: "游戏模版名称",
            name: "couponName",
            value: "",
            placeholder: "模版名称"
          }
        ]
      },
      addButton: {
        title: "数据列表",
        name: "添加模版",
        url: ""
      },
      tableJson: {
        column: [
          //行
          {
            type: "text",
            label: "商家名称",
            prop: "name",
            width: "",
            align: "center"
          },
          {
            type: "text",
            label: "参加时间",
            prop: "date",
            width: "",
            align: "center"
          }
        ]
      },
      tableJson1: {
        column: [
          //行
          {
            type: "text",
            label: "分公司名称",
            prop: "name",
            width: "",
            align: "center"
          },
          {
            type: "text",
            label: "参加时间",
            prop: "date",
            width: "",
            align: "center"
          }
        ]
      }
    };
  },
  components: {
    NomalTable,
    BreadCrumb,
    TableTabs
  },
  created() {
    console.log(this.$route);
  },
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
