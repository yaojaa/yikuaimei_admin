<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
            <RefundInfo :refundInfo="refundInfo" :backUrl="backurl" from="1"></RefundInfo>
        </div>
    </div>
</template>
<script>
import Config from "./config";
import RefundInfo from "./components/refundInfo";
import BreadCrumb from "@/components/common/BreadCrumb";
export default {
    name: 'RefundDetail',

    components: {
        RefundInfo,
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
                        name: "退款初审", //名字
                        url: "/order/refundAuditList"
                    },
                    {
                        name: "退款初审详情", //名字
                        url: "/order/refundDetail"
                    },

                    
                ],
            refundId: this.$route.params.refund_id,
            refundInfo: {},
            backurl: location.pathname,
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
                url: '/api/admin/refund/info',
                params: params
            }).then((res) => {
                this.refundInfo = res.data.data
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