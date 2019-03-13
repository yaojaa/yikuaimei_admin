<template>
    <div>
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title" style="line-height: 28px;background: #FBFBFF 100%;">
                    订单状态：{{ order_status[order.order_status_all]}}
                </h3>
            </div>
            <!-- <div class="panel-body">
    								<div class="info_p">
    									{{order.order_cancel_reason}}
    								</div>
    							</div> -->
        </div>
    
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">买家信息</h3>
            </div>
            <div class="panel-body">
    
                <div class="info_p">
                    用户昵称：{{order.order_user_name}}<br/> 支付方式：{{ '微信支付 银联支付 现金支付 '.split(' ')[order.pay_type]}}<br/> 收货地址：{{order.order_user_address}}
                </div>
    
            </div>
        </div>
    
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">订单信息</h3>
            </div>
            <div class="panel-body">
    
                <div class="order_item">
                    <div class="order_tit">
                        <span>下单时间：{{order.order_pay_time}}</span>
                        <span>订单编号:{{order.order_code}}</span>
                    </div>
                    <div class="good_list">
                        <div class="flex_box">
                            <div class="good_item_title">商品</div>
                            <div class="good_item_title">单价（元）/数量</div>
                            <div class="good_item_title">商品总价（元）</div>
                        </div>
                        <div :key="index" v-for="(item,index) in order.goods_list" class="flex_box good_item">
                            <div class="good_item_col">
                                <img :src="item.goods_img" />
                                <p>{{item.goods_name}}</p>
                            </div>
                            <div class="good_item_col">
                                <p>¥{{item.goods_price/100}}</p>
                                <p style="color: #999;margin-top:5px;">{{item.goods_num}}瓶</p>
                            </div>
                            <div class="good_item_col">
                                <p>¥{{formatPrice(item.goods_price*item.goods_num)}}</p>
                            </div>
                        </div>
                    </div>
                    <p>{{order.order_gifts}}</p>
                    <!-- <p class="order_gifts">我是一份特殊的赠礼</p> -->
                    <div class="total">
                        <p>
                            <label for="">商品金额:</label>
                            <span>¥{{formatPrice(order.order_total_price)}}</span>
                        </p>
                        <p>
                            <label for="">优惠金额:</label>
                            <span>-¥{{formatPrice(order.order_reduce_price)}}</span>
                        </p>
                        <p>
                            <label for="">配送费:</label>
                            <span>¥{{formatPrice(order.order_dis_price)}}</span>
                        </p>
                        <p>
                            <label for="">实收款:</label>
                            <span>¥{{formatPrice(order.order_online_price)}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Config from "../config";
    export default {
        name: 'OrderDetail',
    
        components: {
    
        },
    
        data() {
            return {
                orderCode: this.$route.params.order_code,
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
    
        props: {
            order: {
                type: Object,
                default: () => {}
            }
        },
    
        computed: {},
    
        beforeRouteUpdate(to, from, next) {
    
        },
    
        created() {
            console.log(this.order)
        },
    
        mounted() {
    
        },
    
        methods: {
            formatPrice(price) {
				return (price/100).toFixed(2);
			}
        }
    }
</script>

<style scoped>
    .good_list {
		margin-bottom: 20px;
	}
	.good_item_title {
		flex: 1;
		border-top: 1px solid #ddd;
		text-align: center;
		background: #F9F9F9 100%;
		line-height: 38px;
		font-size: 14px;
	}
	.good_item_col {
		padding: 16px;
		flex: 1;
		border: 1px solid #ddd;
		text-align: center;
	}
	.good_item_col:nth-of-type(2) {
		border-left: 0px;
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

	.good_item_col:nth-of-type(2), .good_item_col:last-of-type {
		padding-top: 36px;
		font-size: 12px;
	}
	
	.order_tit {
		background-color: #F8F9FA 100%;
		padding: 12px 0;
	}
	
	.order_tit span {
		display: inline-block;
		margin-right: 20px;
		font-size: 12px;
		color: #15151c;
	}

	.info_p {
		font-size: 14px;
		color: #15151c;
	}
	.order_gifts {
		font-size: 14px;
		color: #666;
	}
	.total {
		float: right;
		padding-top: 40px;
		font-size: 14px; 
		color: #666;
	}
	.total label {
		display: inline-block;
		width: 70px;
		text-align: left;
	}
	.total span {
		display: inline-block;
		width: 100px;
		text-align: right;
	}
</style>
