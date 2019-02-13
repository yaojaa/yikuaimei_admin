<template>
 <div class="page">
        <div class="page-header">
         <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb> 
        </div> 

        <div class="page-content">

        	<div class="panel">
        		<div  class="panel-heading">
        			<h3  class="panel-title">买家信息</h3>
        		</div> 
        		<div class="panel-body">

        			<div class="info_p">
        			用户昵称：{{d.order_user_name}}<br/>
					支付方式：{{ '微信支付 银联支付 现金支付 '.split(' ')[d.pay_type]}}<br/>
					收货地址：{{d.order_user_address}}
        			</div>
				
        		</div>
        	</div>


        	<div class="panel">
        		<div  class="panel-heading">
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

</template>

<script>
	import Config from "./config";
	import ExpressInfo from "./components/expressInfo";
	import OrderDetail from "./components/orderDetail";
	import RefundInfo from "./components/refundInfo";
	
	export default {
		name: 'orderDetail',

		components: {
			ExpressInfo,
			OrderDetail,
			RefundInfo
		},
		
		data() {
			return {
				tabName: "OrderInfo", // tab标签默认定位
				orderCode: this.$route.params.order_code,
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
		created() {
		},
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
				}).catch((error) => {
				});
			},

			formatPrice(price) {
				return (price/100).toFixed(2);
			}
		}
	}
</script>

<style scoped>
	
</style>
