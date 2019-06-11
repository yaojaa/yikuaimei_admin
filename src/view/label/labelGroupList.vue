<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/manage/label/groupAdd' })">添加标签组</el-button>
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
            url: "/api/admin/tag/groupList",
            breadcrumb: [
                //面包屑
                {
                    name: "网站管理"
                },
                {
                    name: "标签组管理/标签列表",
                    url: "/manage/labelGroup"
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
                list: [
                    {
                        type: "input-text", //标签组名称筛选
                        label: "标签组名称",
                        name: "tag_group_name",
                        value: "",
                        placeholder: "请输入标签组名称"
                    },
                    {
                        type: "input-text", //上级标签筛选
                        label: "上级标签组",
                        name: "tag_group_fname",
                        value: "",
                        placeholder: "请输入上级标签组名称"
                    }
                    
                ]
            },
            tableJson: {
                column: [
                    //行
                    
                    {
                        type: "text",
                        label: "标签组名称",
                        prop: "tag_group_name",
                        align: "center"
                    },
                    {
                        type: "text",
                        label: "上级标签组",
                        prop: "tag_group_fname",
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
                        prop: "tag_group_ctime",
                        align: "center"
                    },
                    
                    {
                        "type": "text",
                        "label": "标签组类型",
                        "prop": "tag_group_type",
                        "align": "center",
                        formatter(row) {
                            if(row.tag_group_type==1){
                                return "商品"
                            }
                            if(row.tag_group_type==2){
                                return "服务"
                            }
                            if(row.tag_group_type==3){
                                return "虚拟券"
                            }
                            if(row.tag_group_type==4){
                                return "评价"
                            }
                            if(row.tag_group_type==5){
                                return "用户"
                            }
                            
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
                                    data: "tag_group_id"
                                },
                                axiosUrl: "/api/admin/tag/removeGroup",
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
                                        path: '/manage/labelGroup/add/',
                                        query: {
                                            id: row.tag_group_id
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