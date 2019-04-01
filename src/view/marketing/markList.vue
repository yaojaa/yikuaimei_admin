<template>
    <div>
        <div class="sub-heading">
            <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">优惠劵管理</span></h3>
        </div>
        <div style="width: 100%;overflow: hidden; margin-left:10px">
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
            <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">活动</span></h3>
        </div>
        <div style="width: 100%;overflow: hidden;margin-left:10px">
            <div class="coupon-box">
                
                <div class="coupon-item-b" @click="personClick">
                    <span class="type">多人同行</span>
                    <div class="body">
                        <p class="title">拉闺蜜一起参加活动</p>
                        <p class="date f12 mt-xs">和闺蜜一起“偷偷美”</p>
                    </div>
                    <img src="/static/img/coupon_bg3.png" width="100%">
                </div>
                <div class="coupon-item-b" @click="personClick">
                    <span class="type">帮砍</span>
                    <div class="body">
                        <p class="title">给门店引流</p>
                        <p class="date f12 mt-xs">来一起“砍一刀”</p>
                    </div>
                    <img src="/static/img/coupon_bg4.png" width="100%">
                </div>
                <div class="coupon-item-b" @click="shakeClick">
                    <span class="type">摇一摇</span>
                    <div class="body">
                        <p class="title">即刻下单</p>
                        <p class="date f12 mt-xs">领取优美礼品一份</p>
                    </div>
                    <img src="/static/img/coupon_bg2.png" width="100%">
                </div>
                <div class="coupon-item-b" @click="newPersonClick">
                    <span class="type">新人红包</span>
                    <div class="body">
                        <p class="title">注册有礼</p>
                        <p class="date f12 mt-xs">领取优美礼品一份</p>
                    </div>
                    <img src="/static/img/coupon_bg2.png" width="100%">
                </div>
                <div class="coupon-item-b" @click="inviteClick">
                    <span class="type">邀请好友</span>
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
        //跳转满减优惠券
        couponClick(){
            this.$router.push('/marketing/fullReducionCouponList')
        },
        //跳转摇一摇
        shakeClick(){
            this.$router.push('/marketing/shake/list')
        },
        //跳转多人同行
        personClick(){
            this.$router.push('/marketing/person/list')
        },
        //新人红包
        newPersonClick(){
            this.$router.push('/marketing/newPerson/list')
        },
        // 邀请好友
        inviteClick(){
            this.$router.push('/marketing/invite/list')
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
    cursor: pointer;
    .type {
        position: absolute;
        width: 45px;
        top: 17px;
        left: 19px;
        font-size: 13px;
        color:#fff;
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
    cursor: pointer;
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