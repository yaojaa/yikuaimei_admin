<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content">
            <el-tabs v-model="tab" @tab-click="handleClick" class="primary-tab">
                <el-tab-pane label="商品" name="goods"></el-tab-pane>
                <el-tab-pane label="服务" name="service"></el-tab-pane>
            </el-tabs>
            <div class="panel-status text-justify">
                <div><span>状态：</span><span class="f18 bold">待审核</span></div>
                <div>
                    <el-button size="mini"  plain @click="">拒绝退款</el-button>
                    <el-button size="mini" type="primary" @click="">同意退款</el-button>
                </div>
            </div>
            <div class="page-column">
                <div class="page-main">
                    <div class="panel">
                    	<div class="panel-body">
                    		111
                    	</div>
                    </div>
                </div>
                <div class="page-side">
                    2
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Config from "./config";
export default {
    name: 'RefundDetail',

    components: {},

    data() {
        return {
        	  tab:'goods',
            refundId: this.$route.params.refund_id,
            refundInfo: {},
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
                this.order = res.data.data
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