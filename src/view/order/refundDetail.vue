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
                    <el-button size="mini" plain @click="">拒绝退款</el-button>
                    <el-button size="mini" type="primary" @click="">同意退款</el-button>
                </div>
            </div>
            <div class="page-column">
                <div class="page-main">
                    <div class="panel">
                        <div class="panel-body">
                            <div class="item-list f14 four-text">
                                <div class="item">
                                    <div class="hd">退货单号：</div>
                                    <div class="bd">3948500237</div>
                                </div>
                                <div class="item">
                                    <div class="hd">申请时间：</div>
                                    <div class="bd">2018-11-12 12:27:53</div>
                                </div>
                                <div class="item">
                                    <div class="hd">订单号：</div>
                                    <div class="bd">958537049990-4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-heading">
                            <h3 class="panel-title bold">退货申请内容</h3>
                        </div>
                        <div class="panel-body">
                        	<div class="item-list f14 four-text">
                                <div class="item">
                                    <div class="hd">申请类型：</div>
                                    <div class="bd">退货</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-body">
                        	<div class="item-list f14 four-text">
                                <div class="item">
                                    <div class="hd">退货原因：</div>
                                    <div class="bd">物流问题</div>
                                </div>
                                <div class="item">
                                    <div class="hd">备注：</div>
                                    <div class="bd">物流问题，打开包装，好几件瓶子都裂了，全部洒出来，都分不清哪些还是好的，那些被损坏的。	</div>
                                </div>
                                <div class="item">
                                    <div class="hd">凭证：</div>
                                    <div class="bd">
                                      	<el-row :gutter="10">
                                      		  <el-col :span="6">
                                      		  	<img src="https://fakeimg.pl/200x200/" class="w-full">
                                      		  </el-col>
                                      	</el-row>
                                    </div>
                                </div>
                            </div>
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
            tab: 'goods',
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