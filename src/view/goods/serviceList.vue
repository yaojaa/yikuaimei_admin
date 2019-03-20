<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/manage/label' })">管理标签</el-button>
                    <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/createGood?good_id=0&good_type=1' })">添加服务</el-button>
            </div>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag) in item" :key="tag.value" :to="{ path: '/serviceList', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table ref="table" :table-json="tableJson" :url="url" :query="{good_type: 1}">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
            <el-dialog :title="+currentItem.is_use === 2 ? '下架' : '上架'" :visible="visible" width="30%">
				<p>确定要{{+currentItem.is_use === 2 ? '下架' : '上架'}}{{currentItem.good_name}}吗?</p>
				<p>操作人:{{user.data.user_realname}}</p>
				<!-- <span>{{currentItem.name}}</span> -->
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
                user: JSON.parse(localStorage.user),
                visible: false,
                currentItem: {},
                tagsListGroup: {
                    "选择状态:": [{
                            title: "全部",
                            key: "is_use",
                            value: 0
                        },
                        {
                            title: "已上架",
                            key: "is_use",
                            value: 2
                        },
                        {
                            title: "未上架",
                            key: "is_use",
                            value: 1
                        }
                    ],
                    "行业分类:": [
                        {
							title: "全部",
							key: "category_id",
							value: 0
						},
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
                        },
                        {
                            type: "input-text", //标签名称筛选
                            label: "标签",
                            name: "tag_name",
                            value: "",
                            placeholder: "请输入标签名称"
                        },
                    ]
                },
                tableJson: {}
            };
        },
        components: {
            NomalTable,
            BreadCrumb,
            TableSearch
        },
        created() {
            this.tableJson = this.initColumn();
        },
        beforeRouteUpdate(to, from, next) {
            this.status_filter = Object.keys(to.query)[0] + Object.values(to.query)[0];
            this.$refs.table.getData(to.query);
            next();
        },
        computed: {},
        mounted() {},
        methods: {
            // 获取初始化tableJson
            initColumn() {
                const column = {
                    "column": [
                        //行
                        {
                            "type": "text",
                            "label": "商品",
                            "width": "200px",
                            formatter(row) {
                                let str = "<div style='background-color#fff;padding:8px;'>";
                                str +=
                                    "<div style='float:left;width:80px;height:80px;margin-right:8px;'><img style='width:100%; height:100%;' src='" +
                                    row.good_ico +
                                    "'></div>";
                                str += "<p class='list-good-name'>" + row.good_name + "</p>";
                                str += "<p class='list-good-price' style='margin-top:10px;'>¥" + (row.price_low / 100).toFixed(2) + "</p>";
                                str += "</div>";
                                return str;
                            }
                        },
                        {
                            "type": "text",
                            "label": "标签",
                            "prop": "label_name",
                            "align": "center",
                            formatter(row) {
                                let tag_name_arr = '';
                                if (row.tag_name_arr) {
                                    if (row.tag_name_arr.length > 2) {
                                        tag_name_arr = row.tag_name_arr[0] + ',' + row.tag_name_arr[1] + '...';
                                    } else if (row.tag_name_arr.length === 2) {
                                        tag_name_arr = row.tag_name_arr[0] + ',' + row.tag_name_arr[1];
                                    } else if (row.tag_name_arr.length === 1) {
                                        tag_name_arr = row.tag_name_arr[0];
                                    } else {
                                        tag_name_arr = '--';
                                    }
                                } else {
                                    tag_name_arr = '--';
                                }
                                return `<p style='text-align: center'>${tag_name_arr}</p>`;
                            }
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
                                                          ${Config.status[row.is_use]}
                                                        </p>`;
                            }
                        },
                        {
                            "type": "text",
                            "label": "总销量",
                            "align": "center",
                            "width": "",
                            "prop": "sell"
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
                                    "label": "上/下架",
                                    "type": "edit",
                                    // "url": "", //优先执行url
                                    onClick(tablePage, self, record) {
                                        // console.log(record);
                                        self.openModal(record)
                                    }
                                },
                                {
                                    "label": "编辑",
                                    "type": "edit",
                                    onClick(tablePage, self, record) {
                                        self.$router.push({
                                            path: '/createGood',
                                            query: {
                                                good_id: record.good_id,
                                                good_type: 1 // good_tpye: 1门店服务 2平台商品 3品项管理 4虚拟卡券
                                            }
                                        })
                                    }
                                },
                                {
									"label": "分享海报",
									"type": "edit",
									onClick(tablePage, self, record) {
										self.$router.push({
											path: '/shareAd',
											query: {
												good_id: record.good_id,
												good_type: 1 // good_tpye: 1门店服务 2平台商品 3品项管理 4虚拟卡券
											}
										})
									}
								}
                            ]
                        }
                    ]
                }
                return column;
            },
    
            //调用子组件的getData方法
            getData(k, v) {
                this.$refs.table.getData({
                    [k]: v
                })
            },
    
            // 打开上下架弹窗
            openModal(record) {
                this.currentItem = record;
                this.visible = true;
            },
    
            // 上下架接口调用
            doUpdateIsUse() {
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
                    this.visible = false;
                    this.$refs.table.getData({
                        good_type: 1
                    });
                    this.tableJson = this.initColumn();
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