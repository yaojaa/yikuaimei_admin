<template>
    <div>
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title" style="line-height: 28px;background: #FBFBFF 100%;">
                    状态：{{refundInfo.refund_status_name}}
                    <div v-if="+refundInfo.order_refund_review_status === 1 && +from" class="text-right">
                        <el-button size="mini" plain @click="refuceRefund">拒绝退款</el-button>
                        <el-button size="mini" type="primary" @click="acceptRefund">同意退款</el-button>
                    </div>
                </h3>
            </div>
    
        </div>
        <div class="panel">
            <!-- <div class="panel-heading">
                    <h3 class="panel-title">平台审核通过</h3>
                </div> -->
            <div class="panel-body">
    
                <div class="info_p">
                    退款编号：{{refundInfo.order_refund_id}}<br/> 申请时间：{{refundInfo.order_refund_ctime}}
                    <br/> 订单编号：{{refundInfo.order_code}}
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
                    <div :key="index" v-for="(item,index) in refundInfo.goods_list" class="flex_box good_item">
                        <div class="good_item_col">
                            <img :src="item.goods_img" />
                            <p>{{item.goods_name}}</p>
                        </div>
                        <div class="good_item_col">
                            <p>¥{{formatPrice(item.goods_original_price)}}</p>
                        </div>
                        <div class="good_item_col">
                            <p>¥{{formatPrice(item.goods_price)}}</p>
                        </div>
                        <div class="good_item_col">
                            <p>{{item.goods_num}}</p>
                        </div>
                    </div>
                    <p class="goods_total_refund_price">退款原价：¥{{formatPrice(totalOriginalPrice)}}</p>
                    <p class="goods_total_refund_price">退款总价：¥{{formatPrice(totalPrice)}}</p>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="panel-body">
                <div class="info_p">
                    退款原因：{{refundInfo.refund_reason ? refundInfo.refund_reason : '--'}}
                    <br/> 备注：{{refundInfo.refund_remark ? refundInfo.refund_remark : '--'}}
                    <br/> 凭证：
                    <img :key="index" v-for="(item,index) in refundInfo.refund_images" :src="item" alt="" class="refund_img">
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="panel-heading">
                <h3 class="panel-title">审核记录</h3>
            </div>
            <div class="panel-body">
                <div class="log-list">
                    <div class="log-item" :key="logIndex" v-for="(logItem,logIndex) in refundInfo.logs_list">
                        <span class="log-title">{{logItem.order_refund_log_title}}</span><br/>
                        <span>处理人：{{logItem.admin_user_name || '--'}}</span><br/>
                        <span>处理时间：{{logItem.order_refund_log_ctime || '--'}}</span><br/>
                        <span>备注信息：{{logItem.order_refund_log_content || '--'}}</span>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="doRefundType ? '同意退款' : '拒绝退款'" :visible.sync="refundModel" width="40%">
            <p>确定要给{{refundInfo.order_user_name || '用户'}}退款吗?</p>
            <p>操作人：{{user.data.user_realname}}</p>
            <p>
                操作备注：
                <el-input type="textarea" v-model="refundRemark" placeholder="请填写操作备注" rows="3" class="refund-remark" />
            </p>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="refundModel = false">取 消</el-button>
                    <el-button type="primary" @click="doRefund">确定</el-button>
                </span>
        </el-dialog>
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
                totalPrice: 0,
                totalOriginalPrice: 0,
                user: JSON.parse(localStorage.user),
                refundModel: false,
                doRefundType: 0,
                refundRemark: '',
            }
        },
        props: {
            refundInfo: {
                type: Object,
                default: () => {}
            },
            backUrl: {
                type: String,
                default: () => ''
            },
            from: {
                type: String,
                default: () => '' // 0:订单来源   1:退款初审
            }
        },
        computed: {
    
        },
        created() {
    
        },
        mounted() {
            this.getTotalPrice()
        },
    
        methods: {
            formatPrice(price) {
                return (price / 100).toFixed(2);
            },
            getTotalPrice() {
                const goods_list = this.refundInfo.goods_list
                console.log(goods_list)
                let totalOriginalPrice = 0;
                let totalPrice = 0;
                if (goods_list) {
                    for (let i = 0; i < goods_list.length; i++) {
                        totalPrice = totalPrice + goods_list[i].goods_price;
                        totalOriginalPrice = totalOriginalPrice + goods_list[i].goods_original_price;
                    }
                    this.totalPrice = totalPrice;
                    this.totalOriginalPrice = totalOriginalPrice;
                }
            },
            acceptRefund() {
                this.refundModel = true;
                this.doRefundType = 1;
            },
            refuceRefund() {
                this.refundModel = true;
                this.doRefundType = 0;
            },
            doRefund() {
                const url = this.doRefundType ? '/api/admin/refund/pass' : '/api/admin/refund/reject'
                const params = {
                    refund_id: this.refundInfo.order_refund_id,
                    remark: this.refundRemark
                }
                this.$axios({
                    method: 'post',
                    url: url,
                    params: params
                }).then((res) => {
                    if (+res.data.code === 0) {
                        this.refundModel = false
                        this.$alert('操作成功')
                        console.log(this.backUrl)
                        this.$router.push(this.backUrl)
                    } else {
                        this.$alert(res.data.msg);
                    }
    
    
                }).catch((error) => {});
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
    
    .good_item_col:nth-of-type(2),
    .good_item_col:nth-of-type(3),
    .good_item_col:nth-of-type(4) {
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
    
    .goods_total_refund_price {
        text-align: right;
        font-size: 14px;
        color: #666;
        margin-top: 11px;
    }
    
    .goods_total_refund_price:last-of-type {
        color: #333;
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
    
    .log-item {
        margin-bottom: 10px;
        font-size: 14px;
        color: #15151c;
    }
    
    .log-item span {
        display: inline-block;
        padding-left: 20px;
    }
    
    .log-title {
        font-weight: bold;
        padding-left: 0px !important;
    }
</style>
