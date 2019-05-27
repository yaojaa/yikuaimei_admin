<template>
    <div class="mark-wrap">
        <div class="sub-heading">
            <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">优惠劵管理</span></h3>
        </div>
        <div style="width: 100%;overflow: hidden; margin-left:10px">
            <div class="coupon-box">
                <div class="coupon-item-a" @click="couponClick">
                     <span class="type">满减&nbsp;|&nbsp;立减优惠券</span>
                     <p class="title ld_title">有固定消费门槛，提升客单价</p>
                     <!-- <p class="title-right">满减</p> -->
                    <img src="/static/img/full_reduction.png" width="100%">
                </div>
                <!-- <div class="coupon-item-a" @click="discountClick">
                     <span class="type">折扣券</span>
                     <p class="title ld_title">大家一起来抢折扣</p>
                    
                    <img src="/static/img/full_reduction.png" width="100%">
                </div> -->
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
                        <p class="title">引导客户邀请好友一起购买，为你带来源源不断的订单和客户</p>
                        <!-- <p class="date f12 mt-xs">和闺蜜一起“偷偷美”</p> -->
                    </div>
                    <img src="/static/img/muilt_person.png" width="100%">
                </div>
                <div class="coupon-item-b" @click="helpClick">
                    <span class="type">一起来砍价</span>
                    <div class="body">
                        <p class="title">刺激用户邀请好友参与砍价，获取新客，提升活跃</p>
                        <!-- <p class="date f12 mt-xs">来一起“砍一刀”</p> -->
                    </div>
                    <img src="/static/img/help_cut.png" width="100%">
                </div>
                <div class="coupon-item-b" @click="shakeClick">
                    <span class="type">摇一摇</span>
                    <div class="body">
                        <p class="title">摇一摇抽奖获赠优惠券</p>
                        <!-- <p class="date f12 mt-xs">摇一摇抽奖获赠优惠券</p> -->
                    </div>
                    <img src="/static/img/shake.png" width="100%">
                </div>
                <div class="coupon-item-b" @click="newPersonClick">
                    <span class="type">新人红包</span>
                    <div class="body">
                        <p class="title">投放新人专享红包，吸粉转化两不误</p>
                        <!-- <p class="date f12 mt-xs">领取优美礼品一份</p> -->
                    </div>
                    <img src="/static/img/newcomer.png" width="100%">
                </div>
                <div class="coupon-item-b" @click="inviteClick">
                    <span class="type">邀请好友得返现</span>
                    <div class="body">
                        <p class="title">激励客户分享，吸引客户传播，带来更多新客</p>
                        <!-- <p class="date f12 mt-xs">领取优美礼品一份</p> -->
                    </div>
                    <img src="/static/img/invite_friend.png" width="100%">
                </div>

                <div class="coupon-item-b" @click="fullClick">
                    <span class="type">会员赠送（满赠）</span>
                    <div class="body">
                        <p class="title">赠品回馈，维系客群关系，轻松提升增购复购！</p>
                        <!-- <p class="date f12 mt-xs">来一起变美</p> -->
                    </div>
                    <p class="title"></p>
                    
                    <img src="/static/img/full_gift.png" width="100%">
                </div>

                 <div class="coupon-item-b" @click="payClick">
                    <span class="type">你变美我买单</span>
                    <div class="body">
                        <p class="title">设置案例分享场景，轻松拉新获客</p>
                        <!-- <p class="date f12 mt-xs">来一起变美</p> -->
                    </div>
                    <img src="/static/img/beautifl.png" width="100%">
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
        // //跳转折扣券
        // discountClick(){
        //     this.$router.push('/marketing/discount/list')
        // },
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
        },

        //满赠活动
        fullClick(){
            this.$router.push('/marketing/full/list')
        },
        //帮砍
        helpClick(){
            this.$router.push('/marketing/helpCut/list')
        },

        //你变美我买单
        payClick(){
            this.$router.push('/marketing/pay_bill/list')
        }
    },
    mounted() {

    },
    computed: {

    }
}
</script>
<style lang='less' scoped>
.mark-wrap{
    padding-left: 10px;
}
.sub-heading{
    padding-left:20px
}
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
        // width: 45px;
        top: 10px;
        left: 14px;
        font-size: 16px;
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
        // width: 60px;
        top: 10px;
        left: 14px;
        font-size: 16px;
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
.ld_title{
    position: absolute;
    left: 0px;
    top: 42%;
    text-align: left;
    text-indent:15px;
    width: 100%;
    color: #fff;
    font-size:12px ;
}
.title-right{
    position: absolute;
    right: 14px;
    top: 36%;
    color: #fff;
    font-size: 20px;
}
</style>