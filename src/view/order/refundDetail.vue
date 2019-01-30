<template>
	<div class="page">
		<div class="page-header">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>订单管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	
		<div class="page-content">
		</div>
	
	</div>
</template>

<script>
	import Config from "./config";
	
	export default {
		name: 'RefundDetail',

		components: {
		},
		
		data() {
			return {
				refundId: this.$route.params.refund_id,
				refundInfo: {},
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
					url: '/api/admin/refund/info ',
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
