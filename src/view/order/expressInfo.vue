<template>
	<div>
		我是物流信息
	</div>
</template>

<script>
	import Config from "./config";
	
	export default {
		data() {
			return {
				orderCode: this.$route.params.order_code,
				orderExpress: {},
			}
		},

		components: {
            
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
					url: '/api/admin/order/disList',
					params: params
				}).then((res) => {
					this.orderExpress = res.data.data
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
