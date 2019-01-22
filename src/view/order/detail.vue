<template>
	<div class="page">
		<div class="page-header">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>订单管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	
		<div class="page-content">
			<el-tabs v-model="tabName">
				<el-tab-pane label="基本信息" name="OrderInfo">
					<div class="panel">
						<div class="panel-heading">
							<h3 class="panel-title" style="line-height: 28px;background: #FBFBFF 100%;">
								订单状态：{{ order_status[order.order_status_all]}}
								<el-button 
									v-if="+order.order_status_all === 8" 
									icon="el-icon-plus" size="mini" 
									type="primary" 
									@click="$router.push({ path: '/categorylist' })"
									style="float:right"
								>
									去发货
								</el-button>
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
	
								<div class="flex_box cell">
	
									<div class="good_list">
										<div :key="index" v-for="(item,index) in order.goods_list" class="good_item">
											<div>
												<img :src="item.goods_img" />
												<p>{{item.goods_name}}</p>
											</div>
											<div>
												<p>¥{{item.goods_price/100}}</p>
												<p>{{item.goods_num}}</p>
											</div>
											<div>
												<p>¥{{(item.goods_price*item.goods_num)/100}}</p>
											</div>
										</div>
									</div>
	
									<div class="cell_item">
										
									</div>
									<div class="cell_item">
										{{ order_status[order.order_status_all]}}
									</div>
	
									<div class="cell_item">等接口（满1000减200）</div>
	
								</div>
								<div class="total">
									订单商品金额：{{order.order_price}}元 订单总配送费：+{{order.order_dis_price}}元 订单优惠金额：{{order.order_reduce_price}}元 实收款： {{order.order_pay_price}}元
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="物流信息" name="ExpressInfo"></el-tab-pane>
			</el-tabs>
	
		</div>
	
	</div>
</template>

<script>
	import Config from "./config";
	
	export default {
		data() {
			return {
				tabName: "OrderInfo", // tab标签默认定位
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
	
			console.log('created')
			console.log(Config);
	
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
					console.log('this', this)
					console.log(res.data)
					this.order = res.data.data
				}).catch((error) => {
					console.log(error);
				});
	
	
			}
	
	
		}
	}
</script>

<style scoped>
	.cell_item {
		flex: 1;
		border: 1px solid #ddd
	}
	.order_tit {
		background-color: #F8F9FA 100%;
		padding: 12px 0;
	}
	.order_tit span{
		display: inline-block;
		margin-right: 20px;
	}
</style>
