<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <el-tabs v-model="tabName">
                <el-tab-pane label="基本信息" name="OrderInfo">
                    <OrderDetail :order="order"></OrderDetail>
                </el-tab-pane>
                <!-- <el-tab-pane label="收益提成" name="ProfitRate">
                        我是收益提成
                    </el-tab-pane> -->
                <el-tab-pane label="美丽日记" name="BeautiRecord">
                    <BeautiRecord :orderCode="orderCode"></BeautiRecord>
                </el-tab-pane>
                <el-tab-pane label="退款" name="OrderRefund">
                    我是退款退货
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Config from "./config";
    import BreadCrumb from "@/components/common/BreadCrumb";
    import OrderDetail from "./components/orderDetail";
    import BeautiRecord from "./components/beautiRecord";
    
    export default {
        name: 'orderServiceDetail',
    
        components: {
            BreadCrumb,
            OrderDetail,
            BeautiRecord
        },
    
        data() {
            return {
                tabName: "OrderInfo", // tab标签默认定位
                orderCode: this.$route.params.order_code,
                breadcrumb: [
                    //面包屑
                    {
                        name: "订单管理", //名字 
                    },
                    {
                        name: "服务订单", //名字
                        url: "/order/serviceOrderList"
                    },
                    {
                        name: "订单详情"
                    }
                ],
                order: {},
                order_status: { // 订单状态
                    1: '待处理',
                    2: '待发货',
                    3: '已发货',
                    4: '已完成',
                    5: '已评价',
                    8: '已取消'
                },
            }
        },
    
        beforeRouteUpdate(to, from, next) {
    
        },
        created() {},
        computed: {
    
        },
        mounted() {
    
    
            this.getData(this.$route.params)
    
    
    
        },
        methods: {
    
            getData(params) {
    
                this.$axios({
                    method: 'get',
                    url: '/api/admin/order/info',
                    params: params
                }).then((res) => {
                    this.order = res.data.data
                }).catch((error) => {});
            },
    
            formatPrice(price) {
                return (price / 100).toFixed(2);
            }
        }
    }
</script>

<style scoped>
    
</style>