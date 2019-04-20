<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag) in item" :key="tag.value" :to="{ path: '/order/serviceOrderList', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table ref="table" :table-json="tableJson" :url="'/api/admin/orderService/index'">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'
import BreadCrumb from "@/components/common/BreadCrumb";
export default {
    data() {
        return {
            breadcrumb: [
                    //面包屑
                    {
                        name: "订单管理", //名字 
                    },
                    {
                        name: "平台服务", //名字
                        url: "/order/serviceOrderList"
                    }
                    
                ],

            status_filter: '',

            tagsListGroup: {
                '订单类型:': [
                    { title: '全部', key: 'profit', value: '' },
                    { title: '利润归门店', key: 'profit', value: 1 },
                    { title: '利润归平台', key: 'profit', value: 2 }
                ],
                '订单状态:': [

                    { title: '全部', key: 'status', value: 0 },
                    { title: '待付款', key: 'status', value: 1 },
                    { title: '未核销', key: 'status', value: 2 },
                    { title: '已核销', key: 'status', value: 3 },
                    { title: '已取消', key: 'status', value: 4 }
                    

                ]
            },
            //状态 0全部 1待付款 2未核销 3已核销 4已取消

            searchs: {
                "list": [{
                        "type": "input-text", //输入文本
                        "label": "用户名",
                        "name": "user_name",
                        "value": "",
                        "placeholder": "用户名",
                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "手机号",
                        "name": "phone",
                        "value": "",
                        "placeholder": "",
                    },
                    // {
                    //     "type": "input-text", //选择器
                    //     "label": "订单号",
                    //     "name": "order_code",
                    //     "value": ""

                    // },
                    {
                        "type": "input-text", //选择器
                        "label": "商品名称",
                        "name": "goods_name",
                        "value": ""

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
                        "label": "商品名称",
                        "prop": "goods_name",
                        "width": "300",
                        formatter(row) {
                            let str = '';
                            if(row.goods_list){
                                row.goods_list.forEach(item => {
                                    str += '<div class="flex_box"><div class="flex_item">' +
                                        '<img width="30" height="30" src="' + item.goods_img + '"/></div>' +
                                        '<div class="flex_item">' + item.goods_name + '</div>' +
                                        '<div class="flex_item">' +
                                        '¥' + item.goods_price + '✖️ ' + item.goods_num +
                                        '</div></div>'
                                })

                                str += "</div>";
                                return str;
                            }
                            
                        }
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "创建时间",
                        "prop": "order_goods_ctime",
                        "width": "",
                        formatter(row) {
                            let str = '';
                            if(row.goods_list){
                                row.goods_list.forEach(item => {
                                    str += '<div class="flex_box"><div class="flex_item">' + item.order_goods_ctime + '</div>' +'</div>'
                                })

                                str += "</div>";
                                return str;
                            }
                            
                        }

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "用户/手机号",
                        "prop": "order_user_name",
                        "width": "",
                        formatter(row) {
                            let str = row.order_user_name + '<br/>' + row.order_user_phone;
                            return str;
                        }

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "实付金额",
                        "prop": "order_online_price",
                        "width": "",
                        formatter(row) {
                            let str = row.order_online_price/100;
                            return str;
                        }

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "订单状态",
                        "prop": "order_status_name",
                        "width": ""
                    },
                    {
                        "type": "text",
                        "label": "操作",
                        "align": "center",
                        "width": "200",
                        formatter: function(row) {

                            let str = '<div>'
                            str += '<a href="/order/order_service_detail/' + row.order_code + '" class="el-button reset el-button--default el-button--small is-plain" >详情</a>'

                            str += '</div>'

                            return str



                        }

                    }
                ],
            }



        }
    },
    components: {
        NomalTable,
        TableSearch,
         BreadCrumb
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
                [k]: v })
        },

        //获取订单提成利润时间
        //
        getAliceData() {
            ///api/admin/orderService/profit 
        }



    }
}
</script>
<style scoped>
</style>