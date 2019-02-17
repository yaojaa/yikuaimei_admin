<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/createCategory' })">添加分类</el-button>
            </div>
        </div>
        <div class="page-content">
            <nomal-table :table-json="tableJson" :url="url" :query="{good_type: 2}">
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
            url: "/api/admin/category/index",
            breadcrumb: [
                //面包屑
                {
                    name: "商品管理"
                },
                {
                    name: "平台商品",
                    url: "/goodList"
                },
                {
                    name: "分类管理"
                }
            ],
            searchs: {
                list: [{
                        type: "input-text", //名称筛选
                        label: "分类名称",
                        name: "category_name",
                        value: "",
                        placeholder: "请输入名称"
                    },
                    {
                        type: "input-text", //ID筛选
                        label: "分类ID",
                        name: "category_id",
                        value: "",
                        placeholder: "请输入ID"
                    },
                    {
                        type: "input-text", //创建人筛选
                        label: "创建人",
                        name: "creater",
                        value: "",
                        placeholder: "请输入创建人"
                    }
                ]
            },
            tableJson: {
                column: [
                    //行
                    {
                        type: "text",
                        label: "分类名称",
                        prop: "category_name",
                        align: "center"
                    },
                    {
                        type: "text",
                        label: "创建时间",
                        prop: "category_ctime",
                        minWidth: "200px",
                        align: "center"
                    },
                    {
                        type: "text",
                        label: "修改时间",
                        prop: "category_utime",
                        width: "",
                        align: "center"
                    },
                    {
                        type: "handle",
                        label: "操作",
                        align: "center",
                        width: "",
                        list: [{
                                label: "删除",
                                type: "delete",
                                url: "", //优先执行url
                                params: {
                                    name: "id",
                                    data: "category_id"
                                },
                                axiosUrl: "/api/admin/category/remove",
                                axiosType: "post",
                                callback(tablePage, self, row) {
                                    console.log(self, row);
                                    self.nomal = !self.nomal;
                                    tablePage.isShow = !tablePage.isShow;
                                }
                            },
                            {
                                label: "编辑",
                                type: "edit",
                                url: "", //优先执行url
                                onClick(tablePage, self, row) {
                                    self.$router.push({
                                        name: "createCategory",
                                        query: {
                                            id: row.category_id
                                        }
                                    });
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