<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/manage/label/groupAdd' })">添加标签组</el-button>
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/manage/label/add?id=0' })">添加标签</el-button>
            </div>
        </div>
        <div class="page-content">
            <nomal-table ref="table" :table-json="tableJson" :url="url">
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
    name: "labelList",
    components: {
        NomalTable,
        BreadCrumb,
        TableSearch
    },
    data() {
        return {
            url: "/api/admin/tag/tagList",
            breadcrumb: [
                //面包屑
                {
                    name: "网站管理"
                },
                {
                    name: "标签管理/标签列表",
                    url: "/manage/label"
                }
            ],
            status_filter: '',
            tagsListGroup: {
                "行业分类:": [{
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
            searchs: {
                list: [{
                        type: "input-text", //标签名称筛选
                        label: "标签名称",
                        name: "tag_name",
                        value: "",
                        placeholder: "请输入名称"
                    },
                    {
                        type: "input-text", //标签组名称筛选
                        label: "标签组名称",
                        name: "tag_group_name",
                        value: "",
                        placeholder: "请输入标签组名称"
                    },
                    {
                        type: "input-text", //上级标签筛选
                        label: "上级标签",
                        name: "tag_fname",
                        value: "",
                        placeholder: "请输入上级标签名称"
                    },
                    {
                        type: "input-text", //添加人员筛选
                        label: "添加人员",
                        name: "tag_create_name",
                        value: "",
                        placeholder: "请输入添加人员"
                    }
                ]
            },
            tableJson: {
                column: [
                    //行
                    {
                        type: "text",
                        label: "标签名称",
                        prop: "tag_name",
                        align: "center"
                    },
                    {
                        type: "text",
                        label: "标签组名称",
                        prop: "tag_group_name",
                        align: "center"
                    },
                    {
                        type: "text",
                        label: "上级标签",
                        prop: "tag_fname",
                        align: "center"
                    },
                    {
                        type: "text",
                        label: "行业",
                        prop: "category_name",
                        align: "center"
                    },
                    {
                        type: "text",
                        label: "添加时间",
                        prop: "tag_ctime",
                        align: "center"
                    },
                    {
                        type: "text",
                        label: "添加人员",
                        prop: "tag_create_name",
                        align: "center"
                    },
                    {
                        "type": "text",
                        "label": "关联标签",
                        "prop": "tag_friends_name",
                        "align": "center",
                        formatter(row) {
                            let tag_name_arr = '';
                            const tag_arr = row.tag_friends_name.split(',');
                            if (tag_arr.length > 2) {
                                tag_name_arr = tag_arr[0] + ',' + tag_arr[1] + '...';
                            } else if (tag_arr.length === 2) {
                                tag_name_arr = tag_arr[0] + ',' + tag_arr[1];
                            } else if (tag_arr.length === 1) {
                                tag_name_arr = tag_arr[0];
                            } else {
                                tag_name_arr = '--';
                            }
                            return `<p style='text-align: center'>${tag_name_arr}</p>`;
                        }
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
                                    data: "tag_id"
                                },
                                axiosUrl: "/api/admin/tag/removeTag",
                                axiosType: "post",
                                callback(tablePage, self, row) {
                                    console.log(row,'!!!!!!');
                                    //console.log(params,'params')
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
                                        path: '/manage/label/add',
                                        query: {
                                            id: row.tag_id
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

    beforeRouteUpdate(to, from, next) {

        console.log(to.query)

        this.status_filter = Object.keys(to.query)[0] + Object.values(to.query)[0]

        console.log(this.status_filter)

        this.$refs.table.getData(to.query)
        next()
    },
    created() {},
    computed: {},
    methods: {
        //调用子组件的gatData方法
        //
        getData(k, v) {
            this.$refs.table.getData({
                [k]: v
            })
        }
    }
};
</script>
<style scoped>
* {
    list-style: none;
}

.search {
    background-color: #fff;
    padding: 20px 20px 4px 10px;
}
</style>