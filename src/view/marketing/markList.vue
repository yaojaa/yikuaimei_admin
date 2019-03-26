<template>
    <div>
        <div class="sub-heading">
            <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">优惠劵管理</span></h3>
        </div>
        <div style="width: 100%;overflow: hidden;">
            <div class="coupon-box">
                <div class="coupon-item-a" @click="couponClick">
                    <span class="type">满减</span>
                    <div class="body">
                        <p class="title">满10000减1000</p>
                        <!-- <p class="date f12 mt-xs">2018.05.27-2018.05.30</p> -->
                    </div>
                    <img src="/static/img/coupon_bg1.png" width="100%">
                </div>
            </div>
        </div>
        <div class="sub-heading" style="margin-top: 0px;">
            <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">其他优惠价</span></h3>
        </div>
        <div style="width: 100%;overflow: hidden;">
            <div class="coupon-box">
                <div class="coupon-item-b" @click="shakeClick">
                    <span class="type">摇一摇</span>
                    <div class="body">
                        <p class="title">即刻下单</p>
                        <p class="date f12 mt-xs">领取优美礼品一份</p>
                    </div>
                    <img src="/static/img/coupon_bg2.png" width="100%">
                </div>
                <div class="coupon-item-b">
                    <span class="type">平台验票</span>
                    <div class="body">
                        <p class="title">即刻下单</p>
                        <p class="date f12 mt-xs">领取优美礼品一份</p>
                    </div>
                    <img src="/static/img/coupon_bg2.png" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {

        }
    },
    methods: {
        couponClick(){
            this.$router.push('/marketing/fullReducionCouponList')
        },
        shakeClick(){
            this.$router.push('/marketing/shake/list')
        }
    },
    mounted() {

    },
    computed: {

    }
}
</script>
<style lang='less' scoped>
.coupon-box {
    overflow: hidden;
    margin-right: -60px;
}

.coupon-item-a {
    width: 212px;
    position: relative;
    text-align: center;
    float: left;
    margin-bottom: 30px;
    margin-right: 60px;
    .type {
        position: absolute;
        width: 45px;
        top: 17px;
        left: 19px;
        font-size: 13px;
    }
    .body {
        position: absolute;
        top: 60px;
        left: 40px;
        right: 40px;
        font-size: 13px;
        color: #fff;
    }
}

.coupon-item-b {
    width: 212px;
    position: relative;
    text-align: center;
    float: left;
    margin-bottom: 30px;
    margin-right: 60px;
    .type {
        position: absolute;
        width: 60px;
        top: 10px;
        left: 19px;
        font-size: 13px;
        color: #fff;
    }
    .body {
        position: absolute;
        top: 40px;
        left: 40px;
        right: 40px;
        font-size: 13px;
        color: #fff;
    }
}
</style>