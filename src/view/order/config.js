const config = {
    purchase_status: {  // 采购状态
        1: '未审核',
        2: '已拒绝',
        3: '已同意',
        4: '已修改',
        5: '已删除',
    },
    goods_score: {  // 评分
        1: '一星',
        2: '二星',
        3: '三星',
        4: '四星',
        5: '五星',
    },
    order_status: { // 订单状态
        1: '待处理',
        2: '待发货',
        3: '已发货',
        4: '已完成',
        5: '已评价',
        8: '已取消'
    },
    option: {
        1: '下架',
        2: '上架'
    },
    refundType: {
        1: '退款',
        2: '退货',
        3: '换货',
    },
    payType: {
        0: '--',
        1: '支付宝',
        2: '微信',
        3: '银联',
    },
    refundStatus: {
        1: '待审核',
        2: '初级审核失败',
        3: '等待收获',
        4: '收获失败',
        5: '审核通过',
    }

}

export default config;