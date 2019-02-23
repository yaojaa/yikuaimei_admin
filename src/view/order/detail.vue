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
                <el-tab-pane label="物流信息" name="ExpressInfo">
                    <ExpressInfo :order-code="orderCode"></ExpressInfo>
                </el-tab-pane>
                <!-- <el-tab-pane label="收益提成" name="ProfitRate">
                        我是收益提成
                    </el-tab-pane> -->
                <el-tab-pane label="退款/退货" name="OrderRefund">
                    <div class="refund-list">
                        <!-- {{refundList}} -->
                        <el-tabs v-model="refundTabName">
                            <el-tab-pane v-if="refundList.length > 0" :key="item.order_refund_id" v-for="(item,index) in refundList" :label="`订单`+(index+1)" :name="`refund_`+index">
                                <RefundInfo :key="`refund_`+item.order_refund_id" :refundInfo="item" :backUrl="backurl" from="0"></RefundInfo>
                            </el-tab-pane>
                            <p v-if="refundList.length === 0" style="text-align: center;">暂无退款退货信息</p>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Config from "./config";
    import BreadCrumb from "@/components/common/BreadCrumb";
    import ExpressInfo from "./components/expressInfo";
    import OrderDetail from "./components/orderDetail";
    import RefundInfo from "./components/refundInfo";
    
    export default {
        name: 'orderDetail',
    
        components: {
            BreadCrumb,
            ExpressInfo,
            OrderDetail,
            RefundInfo
        },
    
        data() {
            return {
                tabName: "OrderInfo", // tab标签默认定位
                breadcrumb: [
                    //面包屑
                    {
                        name: "订单管理", //名字 
                    },
                    {
                        name: "商品订单", //名字
                        url: "/order/list_goods"
                    },
                    {
                        name: "订单详情"
                    }
                ],
                refundTabName: "refund_0",
                orderCode: this.$route.params.order_code,
                order: {},
                refundList: [],
                order_status: { // 订单状态
                    1: '待处理',
                    2: '待发货',
                    3: '已发货',
                    4: '已完成',
                    5: '已评价',
                    8: '已取消'
                },
                backurl: location.pathname
            }
        },
    
        beforeRouteUpdate(to, from, next) {
    
        },
        created() {},
        computed: {
    
        },
        mounted() {
    
            // 获取订单信息
            this.getData(this.$route.params);
            // 获取退款单信息
            this.getRefundList(this.$route.params);
    
    
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
    
            getRefundList(params) {
    
                this.$axios({
                    method: 'get',
                    url: '/api/admin/order/refundList',
                    params: params
                }).then((res) => {
                    this.refundList = res.data.data
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