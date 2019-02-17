<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tab-content">
            <el-tabs class="box" v-model="activeTab" type="card" @tab-click="handletabClick">
                <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
                <el-tab-pane label="收益提成" name="second">收益提成</el-tab-pane>
                <el-tab-pane label="美丽档案" name="third">美丽档案</el-tab-pane>
                <el-tab-pane label="退款/退货" name="fourth">退款/退货</el-tab-pane>
            </el-tabs>
        </div>
        <div class="page-content">
            <!--收益提成-->
            <div class="panel" v-if="activeTab == 'second'">
                <div class="panel-heading">
                    <h3 class="panel-title">收益提成</h3>
                </div>
                <div class="sale-content" v-if="a.order_reduce">
                    原价: {{a.order_reduce.order_total_price}}
                    优惠券优惠金额: {{a.order_sale_price}}
                </div>
            </div>
            <!--收益提成-->
            <!--美丽档案-->
            <div class="panel" v-if="activeTab == 'third'">
                <div class="panel-heading">
                    <h3 class="panel-title">美丽档案</h3>
                </div>
                <div class="daily-content">
                    <div class="daily-item" v-for="(el,index) in daily" :key="el._id">
                        <h3>{{el.create_time}}</h3>
                        <div class="text">
                            {{el.content}}
                        </div>
                        <div class="img_list">
                            <img v-for="(img,idx) in el.beauty_img" :src="img" width="200" height="300" :key="index" />
                        </div>
                            <div class="replay">
                                商家回复：<text v-if="el.reply_status ==1"> 未恢复</text> <text v-if="el.reply_status==2">{{el.reply_info_reply}} </text>
                            </div>
                        </div>
                    </div>
                </div>
                <!--美丽档案end-->
                <!--退换货-->
                <div class="panel" v-if="activeTab == 'fourth'">
                    <div class="daily-content">
                        <el-tabs v-model="activeOrder" @tab-click="handleOrderClick">
                            <el-tab-pane v-for="(order,idx) in refundList" :label="'退货单'+(idx+1)" :name="'refundOrder'+(idx+1)" :key="index">
                                <div class="status success">
                                    <strong>{{order.refund_status_name}}</strong>
                                </div>
                                退货单号：292929929299292
                                申请时间:{{order.order_refund_ctime}}
                                订单号：28288282828828222
                                <h3>退款申请内容</h3>
                                <p>申请类型：退款（线下还没核销）</p>
                                <div class="flex_box">
                                    <div class="flex_item"><img width="200" :src="order.goods_info.goods_img"/></div>
                                        <div class="flex_item">{{order.goods_info.goods_name}}</div>
                                        <div class="flex_item">售价：¥{{order.goods_info.goods_sale_price}}</div>
                                        <div class="flex_item">实付：
                                            {{order.goods_info.goods_price}}</div>
                                        <div class="flex_item">数量：{{order.goods_info.goods_num}}</div>
                                    </div>
                                    <div>申请退款额：¥{{order.refund_price}}</div>
                                    <div>退货原因：{{order.refund_reason}}</div>
                                    <h3>• 审核纪录</h3>
                                    <ul v-for="(log,index) in order.logs_list" :key="index">
                                        <li>
                                            <p>{{log.order_refund_log_title}}</p>
                                            <p>处理人姓名:{{log.admin_user_name}}</p>
                                            <p>内容:{{log.order_refund_log_content}}</p>
                                            <p>操作时间:{{log.order_refund_log_ctime}}</p>
                                        </li>
                                    </ul>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <!--退换货end-->
                <div class="panel" v-if="activeTab == 'first'">
                    <div class="panel-heading">
                        <h3  class="panel-title">买家信息</h3>
                    </div>
                    <div class="panel-body">
                        <div class="info_p">
                            用户昵称：{{d.order_user_name}}<br />
                            支付方式：{{ '微信支付 银联支付 现金支付 '.split(' ')[d.pay_type]}}<br />
                            收货地址：{{d.order_user_address}}
                        </div>
                        <div class="panel">
                            <div class="panel-heading">
                                <h3  class="panel-title">订单信息</h3>
                            </div>
                            <div class="panel-body">
                                <div class="order_item">
                                    <div class="order_tit">
                                        订单编号:{{d.order_code}} 下单时间：{{d.order_pay_time}}
                                    </div>
                                    <div class="flex_box cell">
                                        <div class="cell_item">
                                            <div :key="index" v-for="(item,index) in d.goods_list">
                                                <img :src="item.goods_img" />
                                                <p>{{item.goods_name}}</p>
                                                <p>¥{{item.goods_price}}</p>
                                                <p>×{{item.goods_num}}</p>
                                            </div>
                                        </div>
                                        <div class="cell_item">韩雪儿 13783838333</div>
                                        <div class="cell_item">
                                            {{ '未知 待处理 已付款/待发货 已发货 已发货/待评价 已评价 已取消'.split(' ')[d.status]}}
                                        </div>
                                        <div class="cell_item">等接口（满1000减200）</div>
                                    </div>
                                    <div class="total">
                                        订单商品金额：{{d.order_price}}元
                                        订单总配送费：+{{d.order_dis_price}}元
                                        订单优惠金额：{{d.order_reduce_price}}元
                                        实收款： {{d.order_pay_price}}元
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    data() {
        return {
            activeTab: 'first',
            activeOrder: 'refundOrder1',

            d: {},
            a: {},
            refundList: [] //退款信息
        }
    },

    beforeRouteUpdate(to, from, next) {

    },
    created() {

        console.log('created')

    },
    computed: {

    },
    mounted() {


        this.getData(this.$route.params)
        this.getAlidata(this.$route.params)
        this.getDaily(this.$route.params)
        this.getRefund(this.$route.params)



    },
    methods: {

        handletabClick(tab, event) {

            this.activeTab = tab.name

        },
        handleOrderClick(tab, event) {

            this.activeOrder = tab.name


        },
        //获取退款单信息
        //


        getRefund(params) {

            this.$axios({
                method: 'get',
                url: '/api/admin/orderService/refundList',
                params: params
            }).then((res) => {
                this.refundList = res.data.data
            }).catch((error) => {
                console.log(error);
            });

        },
        //获取美丽档案
        getDaily(params) {
            this.$axios({
                method: 'get',
                url: '/api/admin/beautydiary/index',
                params: params
            }).then((res) => {


                this.daily = res.data.data
            }).catch((error) => {
                console.log(error);
            });

        },
        //获取优惠信息
        getAlidata(params) {

            this.$axios({
                method: 'get',
                url: '/api/admin/orderService/profit',
                params: params
            }).then((res) => {

                this.a = res.data.data
            }).catch((error) => {
                console.log(error);
            });
        },

        getData(params) {

            this.$axios({
                method: 'get',
                url: '/api/admin/order/info',
                params: params
            }).then((res) => {
                console.log('this', this)
                console.log(res.data)
                this.d = res.data.data
            }).catch((error) => {
                console.log(error);
            });


        }


    }
}
</script>
<style scoped>
.tab-content {
    padding: 10px 30px
}

.cell_item {
    flex: 1;
    border: 1px solid #ddd
}
</style>