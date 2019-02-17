<template>
    <div>
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title" style="line-height: 28px;background: #FBFBFF 100%;">
                    状态：{{refundInfo.refund_status_name}}
                </h3>
            </div>
    
        </div>
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">平台审核通过</h3>
            </div>
            <div class="panel-body">
    
                <div class="info_p">
                    退货单号：{{refundInfo.order_refund_id}}<br/> 申请时间：{{refundInfo.order_refund_ctime}}
                    <br/> 订单号：{{refundInfo.order_code}}
                </div>
    
            </div>
        </div>
    
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">退货申请内容</h3>
            </div>
            <div class="panel-body">
                <div class="info_p">
                    申请类型：{{refundType[refundInfo.order_refund_type]}}
                    <br/>
                </div>
                <div class="good_list">
                    <div class="flex_box">
                        <div class="good_item_title">商品</div>
                        <div class="good_item_title">原价（元）</div>
                        <div class="good_item_title">申请退款金额（元）</div>
                        <div class="good_item_title">数量</div>
                    </div>
                    <div :key="index" v-for="(item,index) in refundInfo.goods_info" class="flex_box good_item">
                        <div class="good_item_col">
                            <img :src="item.goods_img" />
                            <p>{{item.goods_name}}</p>
                        </div>
                        <div class="good_item_col">
                            <p>¥{{formatPrice(item.goods_original_price)}}</p>
                        </div>
                        <div class="good_item_col">
                            <p>¥{{formatPrice(item.goods_refund_price)}}</p>
                        </div>
                        <div class="good_item_col">
                            <p>{{item.goods_num}}</p>
                        </div>
                    </div>
                    <p class="goods_total_price"></p>
                    <p class="goods_total_refund_price"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OrderRefundInfo',
        components: {
    
        },
        data() {
            return {
                refundType: {
                    1: '退款',
                    2: '退货',
                    3: '换货',
                },
            }
        },
        props: {
            refundInfo: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
    
        },
        created() {
            console.log(this.refundInfo);
        },
        mounted() {},
    
        methods: {
             formatPrice(price) {
				return (price/100).toFixed(2);
			}
        }
    }
</script>

<style scoped>
    .good_list {
		margin-bottom: 20px;
	}
	.good_item_title {
		flex: 1;
		border-top: 1px solid #ddd;
		text-align: center;
		background: #F9F9F9 100%;
		line-height: 38px;
		font-size: 14px;
	}
	.good_item_col {
		padding: 16px;
		flex: 1;
		border: 1px solid #ddd;
		text-align: center;
        font-size: 14px;
        color: #333;
	}
	.good_item_col:nth-of-type(2), .good_item_col:nth-of-type(3), .good_item_col:nth-of-type(4) {
		border-left: 0px;
	}
	.good_item_col:first-of-type>img {
		display: inline-block;
		width: 90px;
		float: left;
		margin-right: 12px;
	}
	.good_item_col:first-of-type>p {
		float: left;
		margin-top: 20px;
		font-size: 14px;
	}

	/* .good_item_col:nth-of-type(2), .good_item_col:last-of-type {
		padding-top: 36px;
		font-size: 12px;
	} */
	
	.order_tit {
		background-color: #F8F9FA 100%;
		padding: 12px 0;
	}
	
	.order_tit span {
		display: inline-block;
		margin-right: 20px;
		font-size: 12px;
		color: #15151c;
	}

	.info_p {
		font-size: 14px;
		color: #15151c;
	}
	.order_gifts {
		font-size: 14px;
		color: #666;
	}
	.total {
		float: right;
		padding-top: 40px;
		font-size: 14px; 
		color: #666;
	}
	.total label {
		display: inline-block;
		width: 70px;
		text-align: left;
	}
	.total span {
		display: inline-block;
		width: 100px;
		text-align: right;
	}
</style>
