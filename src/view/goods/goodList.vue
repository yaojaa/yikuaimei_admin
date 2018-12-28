<template>
  <div class="page">
    <div class="page-header">
      <div class="crumbs">
        <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
      </div>
    </div>
    <div class="page-content">
  
      <nomal-table :table-json="tableJson" :url="url" :query="{good_type: 2}">
        <div class="sub-heading">
          <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">常用功能</span></h3>
          <div class="sub-actions">
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/categorylist' })">管理分类</el-button>
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/labellist' })">管理标签</el-button>
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/createGood' })">添加商品</el-button>
          </div>
        </div>
        <div class="status_filter" v-for="(item,key,index) in tagsListGroup" :key="index">
          <ul>
            <li class="tags-li">
              {{key}}
              <router-link :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag) in item" :key="tag.value" :to="{ path: '/goodList', query: {
                                  [tag.key]: tag.value }}">
                {{tag.title}}</router-link>
  
            </li>
          </ul>
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
  import Config from "./config";
  
  export default {
    name: "tabletest",
    data() {
      return {
        status_filter: "",
        category: [],
        tagsListGroup: {
          "选择状态:": [{
              title: "全部",
              key: "0"
            },
            {
              title: "已上架",
              key: "1"
            },
            {
              title: "未上架",
              key: "2"
            }
          ]
        },
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
          list: [{
            type: "input-text", //名称筛选
            label: "商品名称",
            name: "good_name",
            value: "",
            placeholder: "请输入名称"
          }]
        }
      };
    },
    components: {
      NomalTable,
      BreadCrumb,
      TableSearch
    },
    created() {},
    beforeRouteUpdate(to, from, next) {
      console.log(to.query);
  
      this.status_filter = Object.keys(to.query)[0] + Object.values(to.query)[0];
  
      console.log(this.status_filter);
  
      this.$refs.table.getData(to.query);
      next();
    },
    computed: {
      tableJson() {
        return {
          column: [
            //行
            {
              type: "text",
              label: "商品",
              width: "200px",
              formatter(row) {
                let str = "<div style='display:flex; background-color#fff;'>";
                str +=
                  "<div style='width:80px;height:80px;padding:8px; flex-shrink:0;'><img style='width:100%; height:100%;' src='" +
                  row.good_ico +
                  "'></div>";
                str +=
                  "<span class='list-good-name'>" + row.good_name + "</span>";
                str += "</div>";
                return str;
              }
            },
            {
              type: "text",
              label: "标签",
              prop: "shop_name",
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
              prop: "status",
              width: "",
              align: "center",
              formatter(row) {
                return `<p style='text-align: center'>
                      ${Config.status[row.status]}
                      </p>`;
              }
            },
            {
              type: "text",
              label: "总销量",
              align: "center",
              width: "",
              prop: "switch"
            },
            // {
            //   type: "text",
            //   label: "库存",
            //   prop: "shop_category_name",
            //   align: "center",
            //   width: ""
            // },
            {
              type: "handle",
              label: "操作",
              align: "center",
              width: "",
              list: [{
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
        };
      }
    },
    mounted() {
      this.getcategoryList();
    },
    methods: {
      //获取行业分类列表
      getcategoryList() {
        this.$axios.get("/api/admin/select/categoryList").then(res => {
          const categoryData = res.data.data.map(item => {
            return {
              title: item.category_name,
              key: "category_id",
              value: item.category_id
            };
          });
  
          this.tagsListGroup["行业分类"] = categoryData;
          this.$forceUpdate();
        });
      }
    }
  };
</script>

<style scoped>
  li {
    list-style: none;
  }
  
  .search {
    background-color: #fff;
    padding: 20px 20px 4px 10px;
  }
  
  .list-good-name {
    vertical-align: top;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    white-space: inherit;
  }
</style>
