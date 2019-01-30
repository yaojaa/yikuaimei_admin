<template>
    <div class="refund_info">
        我是退货退款
    </div>
</template>

<script>
    import Config from "../config";
    export default {
        name: 'OrderRefundInfo',
    
        components: {
    
        },
    
        data() {
            return {
                refundList: []
            }
        },
    
        props: {
            orderCode: {
                type: String,
                default: () => ''
            }
        },
    
        computed: {},
    
        beforeRouteUpdate(to, from, next) {
    
        },
    
        created() {
        },
    
        mounted() {
            this.getData(this.$route.params);
        },
    
        methods: {
            getData(params) {
				this.$axios({
					method: 'get',
					url: '/api/admin/order/refundList',
					params: params
				}).then((res) => {
                    console.log(res.data);
                    this.refundList = res.data.data;
				}).catch((error) => {});
            }
        }
    }
</script>

<style scoped>
    
</style>
