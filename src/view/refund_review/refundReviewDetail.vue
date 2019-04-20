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
import RefundInfo from "../order/components/refundReviewInfo";
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
                    name: "审核管理"
                },
                {
                    name: "退款复审",
                    url: "/refundReview/list"
                },
                {
                    name: "复审详情",
                    url: "/refundReview/refundReviewDetail"
                }
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
                url: '/api/admin/refundReview/info',
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