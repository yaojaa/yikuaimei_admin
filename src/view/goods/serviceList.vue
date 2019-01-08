<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
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
                        <router-link :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag) in item" :key="tag.value" :to="{ path: '/serviceList', query: {
                                                          [tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
    
                    </li>
                </ul>
            </div>
            <nomal-table ref="table" :table-json="tableJson" :url="url" :query="{good_type: 1}">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
    
            <el-dialog title="提示" :visible.sync="visible" width="30%">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="doUpdateIsUse">确 定</el-button>
                </span>
            </el-dialog>
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
                category: [
    
                ],
                visiable: false,
                currentItem: {},
                tagsListGroup: {
                    "选择状态": [{
                            title: "全部",
                            key: "is_use",
                            value: 0
                        },
                        {
                            title: "已上架",
                            key: "is_use",
                            value: 1
                        },
                        {
                            title: "未上架",
                            key: "is_use",
                            value: 2
                        }
                    ],
                    "行业分类": [
                        {
                            title: "美容",
                            key: "category_id",
                            value: 1
                        },
                        {
                            title: "美甲美瞳",
                            key: "category_id",
                            value: 2
                        },
                        {
                            title: "美发",
                            key: "category_id",
                            value: 3
                        },
                        {
                            title: "美体",
                            key: "category_id",
                            value: 4
                        },
                        {
                            title: "轻医美",
                            key: "category_id",
                            value: 5
                        },
                    ]
                },
                url: "/api/admin/shopgoods/index",
                breadcrumb: [
                    //面包屑
                    {
                        name: "商品管理"
                    },
                    {
                        name: "门店服务",
                        url: "/serviceList"
                    }
                ],
                searchs: {
                    list: [{
                        type: "input-text", //名称筛选
                        label: "门店名称",
                        name: "good_name",
                        value: "",
                        placeholder: "请输入名称"
                    }]
                },
                tableJson: {
                    "column": [
                        //行
                        {
                            "type": "text",
                            "label": "商品",
                            "width": "200px",
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
                            "type": "text",
                            "label": "标签",
                            "prop": "label_name",
                            "align": "center"
                        },
                        {
                            "type": "text",
                            "label": "分类",
                            "prop": "category_name",
                            "width": "",
                            "align": "center"
                        },
                        {
                            "type": "text",
                            "label": "状态",
                            "prop": "status",
                            "width": "",
                            "align": "center",
                            formatter(row) {
                                return `<p style='text-align: center'>
                                          ${Config.status[row.status]}
                                        </p>`;
                            }
                        },
                        {
                            "type": "text",
                            "label": "总销量",
                            "align": "center",
                            "width": "",
                            "prop": "switch"
                        },
                        // {
                        //   type: "text",
                        //   label: "库存",
                        //   prop: "shop_category_name",
                        //   align: "center",
                        //   width: ""
                        // },
                        {
                            "type": "handle",
                            "label": "操作",
                            "align": "center",
                            "width": "",
                            "list": [{
                                    "label": "下架",
                                    "type": "edit",
                                    "url": "", //优先执行url
                                    onClick(tablePage, self, record) {
                                        // console.log(record);
                                        self.openModal(record)
                                        // self.nomal = !self.nomal;
                                        // tablePage.isShow = !tablePage.isShow;
                                    }
                                },
                                {
                                    "label": "编辑",
                                    "type": "edit",
                                    "url": "", //优先执行url
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
        beforeRouteUpdate(to, from, next) {
            this.status_filter = Object.keys(to.query)[0] + Object.values(to.query)[0];
            this.$refs.table.getData(to.query);
            next();
        },
        computed: {},
        mounted() {
        },
        methods: {
            
            //调用子组件的getData方法
            getData(k, v) {
                this.$refs.table.getData({
                    [k]: v
                })
            },
    
            // 打开上下架弹窗
            openModal(record) {
                console.log(1);
                this.currentItem = record;
                this.visiable = true;
            },
    
            // 上下架接口调用
            doUpdateIsUse() {
                debugger
                const currentItem = this.currentItem;
                const {
                    good_id,
                    is_use
                } = currentItem;
                let newUse;
                if (is_use === 1) {
                    newUse = 2
                } else if (is_use === 2) {
                    newUse = 1;
                }
                const params = {
                    id: good_id,
                    is_use: newUse
                }
                this.$axios.post("/api/admin/shopgoods/isUse", params).then(res => {
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
