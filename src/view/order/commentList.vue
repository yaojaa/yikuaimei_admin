<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/order/commentList', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table ref="table" :table-json="tableJson" :url="'/api/admin/comment/index'">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'
import Config from "./config";

export default {
    data() {
        return {

            status_filter: '',

            tagsListGroup: {
                '评价类型:': [{
                        title: '订单评价',
                        key: 'comment_type',
                        value: 1
                    },
                    {
                        title: '服务评价',
                        key: 'comment_type',
                        value: 2
                    },
                ],
                '商品类型:': [{
                        title: '商品',
                        key: 'good_type',
                        value: 2
                    },
                    {
                        title: '服务',
                        key: 'good_type',
                        value: 1
                    },
                ],
                '评分:': [{
                        title: '全部',
                        key: 'goods_score',
                        value: 0
                    },
                    {
                        title: '五星',
                        key: 'goods_score',
                        value: 5
                    },
                    {
                        title: '四星',
                        key: 'goods_score',
                        value: 4
                    },
                    {
                        title: '三星',
                        key: 'goods_score',
                        value: 3
                    },
                    {
                        title: '二星',
                        key: 'goods_score',
                        value: 2
                    },
                    {
                        title: '一星',
                        key: 'goods_score',
                        value: 1
                    },
                ],
                


                // '采购状态：':[

                //   {title:'全部',key:'status',value:0},
                //   {title:'待审核',key:'status',value:1},
                //   {title:'不同意',key:'status',value:2},
                //   {title:'同意',key:'status',value:3},
                //   {title:'已修改',key:'status',value:4},

                //  ]
            },
            //状态 0全部 1待处理 2已付款/待发货 3已发货 4已发货/待评价 5已评价 8已取消

            searchs: {
                "list": [{
                        "type": "input-text", //输入文本
                        "label": "门店名字",
                        "name": "shop_name",
                        "value": "",
                        "placeholder": "门店名字",
                    },
                   
                    {
                        "type": "input-text", //选择器
                        "label": "手机号",
                        "name": "user_phone",
                        "value": ""

                    },
                    {
                        "type": "input-text", //选择器
                        "label": "商品/服务名称",
                        "name": "goods_name",
                        "value": ""

                    },
                    {
                        "type": "input-text", //标签名称筛选
                        "label": "标签id",
                        "name": "tag_id",
                        "value": "",
                        "placeholder": "请输入标签id"
                    },
                    {
                        "type": "input-singal-date", //输入日期
                        "label": "开始时间",
                        "name": "start_time",
                        "value": "",
                    },
                    {
                        "type": "input-singal-date", //输入日期
                        "label": "结束时间",
                        "name": "end_time",
                        "value": "",
                    },

                ]
            },
            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "商品/服务",
                        "prop": "purchase_ctime",
                        "width": "",
                        formatter(row) {
                            let good;
                            if (row.goods_info.length) {
                                good = row.goods_info[0];
                            }
                            console.log(good,'good');

                            let str = "<div style='background-color#fff;padding:8px;'>";
                            if (row.goods_info.length) {
                                str +=
                                    "<div style='float:left;width:80px;height:80px;margin-right:8px;'><img style='width:100%; height:100%;' src='" +
                                    good.goods_img +
                                    "'></div>";
                                str += "<p class='list-good-name'>" + good.goods_name + "</p>";
                                str += "</div>";
                            }
                            return str;
                        }
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "门店",
                        "prop": "shop_info_business_name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "评分",
                        "prop": "",
                        "width": "",
                        formatter(row) {
                            return `<p style='text-align: center'>
                                                      ${Config.goods_score[row.goods_score]}
                                                    </p>`;
                        }

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "评价内容",
                        "prop": "comment_content",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "评价时间",
                        "prop": "create_time",
                        "width": "",

                    }
                ],
            }



        }
    },
    components: {
        NomalTable,
        TableSearch
    },
    beforeRouteUpdate(to, from, next) {

        console.log(to.query)

        this.status_filter = Object.keys(to.query)[0] + Object.values(to.query)[0]

        console.log(this.status_filter)

        this.$refs.table.getData(to.query)
        next()
    },
    created() {

        console.log('created')

    },
    computed: {

    },
    methods: {
        //调用子组件的gatData方法
        //
        getData(k, v) {
            this.$refs.table.getData({
                [k]: v
            })
        }


    }
}
</script>
<style scoped>
</style>