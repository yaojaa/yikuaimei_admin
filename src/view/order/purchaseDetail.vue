<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">报货信息状态：{{purchase.purchase_status_name}}</h3>
                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">基本信息</h3>
                </div>
                <div class="panel-body">
                    <div class="purchase-info">
                        <p>采购人员：{{purchase.shop_user_name}}</p>
                        <p>联系电话{{purchase.shop_user_phone}}</p>
                        <p>提成归属:<span class="recipient-item" :key="recipientIndex" v-for="(recipientItem, recipientIndex) in purchase.recipients">{{recipientItem}}</span></p>
                        <p>采购时间：{{purchase.purchase_ctime}}</p>
                        <p>采购单号：{{purchase.business_id}}</p>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">采购商品</h3>
                </div>
                <div class="panel-body">
                    <div class="goods_list">
                        <div class="flex_box">
                            <div class="good_item_title">商品</div>
                            <div class="good_item_title">数量</div>
                            <div class="good_item_title">单价（原价）</div>
                            <div class="good_item_title">小计金额（原价）</div>
                        </div>
                        <div :key="index" v-for="(item,index) in purchase.goods_list" class="flex_box good_item">
                            <div class="good_item_col">
                                <img :src="item.goods_img" />
                                <p>{{item.goods_name}}</p><br>
                                <p class="sku-list"><span class="sku-item" :key="skuIndex" v-for="(skuItem, skuIndex) in item.sku_type">{{skuItem}}</span></p>
                            </div>
                            <div class="good_item_col">
                                <p style="color: #999;margin-top:5px;">✖️{{item.goods_num}}</p>
                            </div>
                            <div class="good_item_col">
                                <p>¥{{formatPrice(item.goods_original_price)}}</p>
                            </div>
                            <div class="good_item_col">
                                <p>¥{{formatPrice(item.goods_total_price)}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Config from "./config";
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
    name: 'orderPurchaseDetail',

    components: {
        BreadCrumb
    },

    data() {
        return {
            breadcrumb: [
                    //面包屑
                    {
                        name: "订单管理", //名字 
                    },
                    {
                        name: "采购品项", //名字
                        url: "/order/purchaseOrderList"
                    },
                    {
                        name: "报货信息", //名字
                        url: "/order/order_purchase_detail"
                    }
                ],
            purchaseId: this.$route.params.purchase_id,
            purchase: {},
            // order_status: { // 订单状态
            // 	1: '待处理',
            // 	2: '待发货',
            // 	3: '已发货',
            // 	4: '已完成',
            // 	5: '已评价',
            // 	8: '已取消'
            // },
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
                url: '/api/admin/purchase/info',
                params: params
            }).then((res) => {
                this.purchase = res.data.data;
                console.log(this.purchase);
            }).catch((error) => {});
        },

        formatPrice(price) {
            return (price / 100).toFixed(2);
        }
    }
}
</script>
<style scoped>
.purchase-info {
    font-size: 14px;
    color: #15151c;
}

.purchase-info .recipient-item {
    display: inline-block;
    margin-right: 3px;
}

.good_list {
    margin-bottom: 20px;
}

.good_item_title {
    flex: 1;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    text-align: center;
    background: #F9F9F9 100%;
    line-height: 38px;
    font-size: 14px;
}

.good_item_col {
    padding: 16px;
    flex: 1;
    border: 1px solid #ddd;
    border-top: 0px;
    text-align: center;
}

.good_item_col:nth-of-type(2),
.good_item_col:nth-of-type(3) {
    border-left: 0px;
}

.good_item_col:nth-of-type(3) {
    border-right: 0px;
}

.good_item_col:first-of-type>img {
    display: inline-block;
    width: 90px;
    float: left;
    margin-right: 12px;
}

.good_item_col:first-of-type>p {
    float: left;
    margin-top: 20px;
    font-size: 14px;
}

.good_item_col:nth-of-type(2),
.good_item_col:nth-of-type(3),
.good_item_col:last-of-type {
    font-size: 12px;
    line-height: 90px;
}

.good_item_col .sku-list {
    width: 109px;
    margin-top: 0 !important;
    text-align: left
}

.good_item_col .sku-item {
    font-size: 12px;
    color: #999;
}
</style>