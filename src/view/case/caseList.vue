<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/manage/case/add' })">添加案例</el-button>
            </div>
        </div>
        <div class="page-content">
            <div class="filter-tag-box mb-lg">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/manage/case', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table ref="table" :table-json="tableJson" :url="'/api/admin/cases/index'"></nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
    data() {
        return {
            breadcrumb: [
                //面包屑
                {
                    name: "网站管理"
                },
                {
                    name: "案例管理/案例列表",
                    url: "/manage/case"
                }
            ],
            status_filter: '',
            category: [],
            tagsListGroup: {
                '审核状态:': [
                    { title: '全部', key: 'review_status', value: 'all' },
                    { title: '已审核', key: 'review_status', value: '1' },
                    { title: '全部', key: 'review_status', value: '2' }
                ],
                '选择标签:': [
                    { title: '全部', key: '2' },
                    { title: '已审核', key: '1' },
                    { title: '全部', key: '未审核' }
                ]
            },
            url: "./static/vuetable.json",
            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "案例编号",
                        "prop": "_id",
                        "width": ""
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "创建时间",
                        "prop": "create_time",
                        "width": "",

                    },
                    // {
                    //     "type": "text",
                    //     "align": "center",
                    //     "label": "内容",
                    //     "prop": "expert_analysis_content",
                    //     "width": "",

                    // },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "顾客姓名",
                        "prop": "create_user_shop_account_name",
                        "width": ""
                    },
                    //
                    {
                        "type": "text",
                        "align": "center",
                        "label": "门店/技师",
                        "prop": "create_user_shop_account_name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "城市",
                        "prop": "create_user_city_name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "状态",
                        "prop": "review_status",
                        "width": "",
                        formatter(row) { //格式数据
                            console.log(row.review_status)
                            var str = '<div class=' + (row.review_status == 3 ? 'text-red' : 'text-default') + '>' + ['', '待审核', '审核通过', '审核不通过'][row.review_status] + '</div>';
                            return str;
                        }

                    },
                    {
                        "type": "handle",
                        "label": "操作",
                        "align": "center",
                        "width": "200",
                        "list": [{
                                "label": "详情",
                                "type": "detail",
                                onClick(tablePage, self, row) {
                                    self.$router.push("/manage/case/case_detail/" + row.cases_id)
                                }

                            },
                            {
                                "label": "修改",
                                "type": "edit",
                                onClick(tablePage, self, row) {
                                    self.$router.push("/manage/case/add/" + row.cases_id)
                                }


                            },
                            {
                                "label": "删除",
                                "axiosUrl": "/api/admin/cases/remove",
                                "params": {
                                    name: "id",
                                    data: "cases_id"
                                },
                                "type": "delete"
                            },
                        ]
                    }
                ],
            }



        }
    },
    components: {
        NomalTable,
        BreadCrumb
    },
    created() {

    },
    beforeRouteUpdate(to, from, next) {

        this.status_filter = Object.keys(to.query)[0] + Object.values(to.query)[0]
        console.log(this.status_filter)
        this.$refs.table.getData(to.query)
        next()
    },
    computed: {


    },
    mounted() {
        this.getcategoryList()
    },
    methods: {
        //获取行业分类列表
        getcategoryList() {
            this.$axios.get('/api/admin/select/categoryList')
                .then((res) => {
                    const categoryData = res.data.data.map((item) => {
                        return {
                            title: item.category_name,
                            key: 'category_id',
                            value: item.category_id
                        }
                    })

                    this.tagsListGroup['行业分类:'] = categoryData
                    this.$forceUpdate()
                })
        }

    }
}
</script>
<style scoped>
</style>