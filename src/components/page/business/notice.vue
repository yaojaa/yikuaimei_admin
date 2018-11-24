<template>
    <div class="container mt-lg">
        <div class="notice-box">
            <div class="notice-line"></div>
            <div class="notice-head">2018</div>
            <div class="notice-item" v-for="(v,i) in 10" :key="i">
                <div class="date"><span>6-30</span><span>12:30</span></div>
                <div class="bd">凡是在本店购买超过1000元以上商品送精美礼品一份</div>
            </div>
            <div class="notice-head">2018</div>
            <div class="notice-item" v-for="(v,i) in 10" :key="'index'+i">
                <div class="date"><span>6-30</span><span>12:30</span></div>
                <div class="bd">凡是在本店购买超过1000元以上商品送精美礼品一份</div>
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
    },
    mounted() {
    },
    computed: {
    }
}
</script>
<style lang='less' scoped>
.notice-box{
    position: relative;
    overflow: hidden;
}
.notice-line{
    position: absolute;
    background: #7224d8;
    font-size: 0;
    width: 1px;
    top:0;
    bottom:0;
    left:50px;
}
.notice-head{
    padding: 10px 0 10px;
}
.notice-item{
    position: relative;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    padding: 8px 0;
    font-size: 14px;
    .date{
        width: 170px;
        color:#999;
        span{
            display: inline-block;
            width: 40%;
        }
    }
    .bd{
        -webkit-flex: 1;
        -moz-flex: 1;
        -ms-flex: 1;
        -o-flex: 1;
        flex: 1;
    }
    &:after{
        content: '';
        width: 8px;
        height: 8px;
        background: #7224d8;
        border-radius: 50%;
        position: absolute;
        left:46.2px;
        top:14px;
    }
}
</style>