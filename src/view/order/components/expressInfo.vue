<template>
	<div>
		<p class="express_title">物流信息</p>
		<div class="express_list">
			<div class="flex_box">
				<div class="express_list_title">配送方式</div>
				<div class="express_list_title">物流公司名称</div>
				<div class="express_list_title">物流状态</div>
				<div class="express_list_title">运单号</div>
				<div class="express_list_title">发货时间</div>
			</div>
	
	
			<div v-if="orderExpress.package_list.length > 0" :key="index" v-for="(item,index) in orderExpress.package_list" class="package_item">
				<div class="package_info flex_box">
					<div class="package_info_col">
						<p>{{'快递 自取'.split(' ')[item.order_dis_package_type]}}</p>
					</div>
					<div class="package_info_col">
						<p>{{item.dis_name}}</p>
					</div>
					<div class="package_info_col">
						<p>{{'等待发货 配送中 配送完成 配送取消 异常'.split(' ')[item.order_dis_package_status]}}</p>
					</div>
					<div class="package_info_col">
						<p>{{item.dis_code}}</p>
					</div>
					<div class="package_info_col">
						<p>{{item.order_dis_package_ctime}}</p>
					</div>
	
					<span class="option">收起</span>
				</div>
				<div class="packge_list flex_box">
					<div class="packge_list_item good_list">
						<div :key="good_index" v-for="(good_item,good_index) in item.goods_list" class="flex_box good_item">
							<img :src="good_item.goods_img" class="good_item_col" alt="">
							<p class="good_item_col good_name">{{good_item.goods_name}}</p>
							<p class="good_item_col good_number">✖{{good_item.goods_num}}</p>
						</div>
					</div>
					<div class="packge_list_item">
						<p class="goods_total_price">总额： ¥{{formatPrice(item.total_price)}}</p>
						<p class="goods_total_num">{{item.total_num}}瓶</p>
						<p class="order_dis_type">{{'快递 自取'.split(' ')[item.order_dis_package_type]}}(¥{{formatPrice(orderExpress.order_dis_price)}})</p>
					</div>
					<div class="packge_list_item">
						<p class="send_num">{{item.dis_send_name}}</p>
						<p class="send_phone">{{item.dis_send_phone}}</p>
					</div>
					<div class="packge_list_item">
						<p class="package_num">包裹{{index + 1}}</p>
					</div>
				</div>
			</div>
			<p v-if="!orderExpress.package_list || orderExpress.package_list.length === 0" style="text-align: center;margin-top: 15px;">暂无物流信息</p>
		</div>
		<div class="dis_list">
			<el-tabs v-model="tabName">
				<el-tab-pane :label="`物流包裹${package_index + 1}`" :name="`package${package_index + 1}`" :key="package_index" v-for="(package_item,package_index) in orderExpress.package_list">
					<DirList
						:packageId="package_item.order_dis_package_id"
						:disInfo="disList ? disList[package_item.order_dis_package_id] : []"
					/>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import Config from "../config";
	import DirList from "./DirList";
	
	export default {
		data() {
			return {
				tabName: "package1", // tab标签默认定位
				orderCode: this.$route.params.order_code,
				orderExpress: {},
				disList: {},
			}
		},
	
		components: {
			DirList
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
					url: '/api/admin/order/disList',
					params: params
				}).then((res) => {
					const orderExpress = JSON.parse(JSON.stringify(res.data.data));
					const package_list = [];
					orderExpress.package_list.map((item) => {
						let total_price = 0;
						let total_num = 0;
						item.goods_list.map((good_item) => {
							total_price = total_price + good_item.goods_price;
							total_num = total_num + good_item.goods_num;
						});
						item.total_price = total_price;
						item.total_num = total_num;
						package_list.push(item);
					});
					orderExpress.package_list = package_list;
					this.orderExpress = orderExpress;
					this.disList = orderExpress.dis_list;
				}).catch((error) => {});
			},
	
			formatPrice(price) {
				return (price / 100).toFixed(2);
			}
		}
	}
</script>

<style scoped>
	.express_title {
		font-size: 18px;
		line-height: 18px;
		padding: 8px 25px 18px 25px;
		color: #333;
	}
	
	.express_list_title {
		flex: 1;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #B4A3F8;
		text-align: center;
		background: #F3F4FE 100%;
		line-height: 38px;
		font-size: 14px;
	}
	
	.package_info {
		background: #FBFBFF;
	}
	
	.package_info_col {
		padding: 16px;
		flex: 1;
		text-align: center;
		color: #666;
		font-size: 12px;
	}
	
	.package_info_col:nth-of-type(3),
	.package_info_col:nth-of-type(4) {
		color: #15151c;
	}
	
	.option {
		display: inline-block;
		line-height: 49px;
		font-size: 12px;
		color: #666;
	}
	
	.packge_list {
		margin: 0 19px 0 19px;
		border: 1px solid #EAEAEB;
		padding: 15px;
	}
	
	.packge_list_item {
		flex: 1;
		text-align: center;
		color: #666;
		font-size: 12px;
		padding-top: 10px;
	}
	
	.packge_list_item:first-of-type {
		padding-top: 0;
	}
	
	.good_item img {
		width: 90px;
		height: 99px;
	}
	
	.good_item_col {
		flex: 1;
		text-align: center;
		color: #666;
		font-size: 12px;
	}
	
	.good_name {
		font-size: 14px;
		color: #15151c;
		line-height: 99px;
	}
	
	.good_number {
		font-size: 12px;
		color: #999;
		line-height: 99px;
	}
	
	.goods_total_price,
	.send_name {
		color: #15151c;
		font-size: 14px;
	}
	
	.goods_total_num,
	.send_phone,
	.order_dis_type {
		margin-top: 13px;
		font-size: 12px;
		color: #999
	}
	
	.package_num {
		line-height: 99px;
		font-size: 14px;
		color: #15151c;
	}
	
	.dis_list {
		margin-top: 20px;
	}
</style>
