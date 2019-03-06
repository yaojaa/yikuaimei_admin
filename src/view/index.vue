<template>
    <div class="page">
        <div class="page-content">
            <img src="/static/img/banner@2x.png" width="100%">
            <div class="panel">
                <div class="panel-body">
                    <!-- <div class="sub-heading mt-sm">
                        <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">消息通知</span></h3>
                        <div class="sub-actions"><a href="">更多</a></div>
                    </div> -->
                    <!-- <div class="panel">
                        <div class="panel-body chartbox">
                            <ul>
                                <li>.....</li>
                            </ul>
                        </div>
                    </div> -->
                    <!-- 常用功能部分 -->
                    <div class="sub-heading">
                        <h3 class="sub-title"><span class="sub-icon"><img src="/static/img/sub_icon.png"  width="100%"></span><span class="title">常用功能</span></h3>
                        <div class="sub-actions"></div>
                    </div>
                    <div class="commonusebtn">
                        <div class="fn-col" @click="orderClick" style="background:#1660FD url('/static/img/copy1.png') no-repeat right bottom">
                            <img src="/static/img/fn_icon1.png" width="52">
                            <span>{{'今日订单'}}</span>
                        </div>
                        <div class="fn-col" @click="goodsClick" style="background:#1660FD url('/static/img/copy1.png') no-repeat right bottom">
                            <img src="/static/img/fn_icon1.png" width="52">
                            <span>{{'商品管理'}}</span>
                        </div>
                        <div class="fn-col" @click="userClick" style="background:#BD10E0 url('/static/img/copy2.png') no-repeat right bottom">
                            <img src="/static/img/fn_icon2.png" width="52">
                            <span>{{'用户管理'}}</span>
                        </div>
                        <div class="fn-col" @click="allianceClick" style="background:#FC507A url('/static/img/copy3.png') no-repeat right bottom">
                            <img src="/static/img/fn_icon3.png" width="52">
                            <span>{{'加盟商管理'}}</span>
                        </div>
                        <!--  <div class="fn-col" style="background:#9164F6 url('/static/img/copy4.png') no-repeat right bottom">
                    <img src="/static/img/fn_icon4.png" width="52">
                    <span>{{'优惠券模板'}}</span>
                </div> -->
                        <!-- 
                <div class="fn-col" style="background:#6476F6 url('/static/img/copy5.png') no-repeat right bottom">
                    <img src="/static/img/fn_icon5.png" width="52">
                    <span>{{'添加常用功能'}}</span>
                </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            charttype: 'newuser',
            getdaynum: 30,
            data: [{
                    title: '今日注册人数（人）',
                    num: 600,
                    label: '总会员1990人',
                    lefttitle: '昨日新增会员数（人）',
                    lfetnum: 65,
                    righttitle: '环比新增会员数',
                    rightnum: 70,
                },
                {
                    title: '今日销售额（元）',
                    num: 19400,
                    label: '总销售额 65,725 万元',
                    lefttitle: '昨日销售额（元）',
                    lfetnum: 6555,
                    righttitle: '环比销售额',
                    rightnum: 70,
                },
                {
                    title: '今日订单量（笔）',
                    num: 300,
                    label: '总订单量 1356 万单',
                    lefttitle: '昨日订单量（元）',
                    lfetnum: 65,
                    righttitle: '环比订单量',
                    rightnum: 70,
                }
            ]
        }
    },

    methods: {
        orderClick(){
            this.$router.push({path: '/order/list_goods'})
        },
        goodsClick(){
            this.$router.push({path: '/goodList'})
        },
        userClick(){
            this.$router.push({path: '/user/userList'})
        },
        allianceClick(){
            this.$router.push({path: '/business/alliance'})
        }

    },
    mounted() {},
    computed: {

    }
}
</script>
<style lang='less' scoped>
@import '../assets/z.less';

.textboxcontainer {
    background-color: transparent;
    position: relative;
    width: 100%; // height: 170px;
    display: flex;
    justify-content: space-between;

    .textbox {
        background-color: #fff;
        flex: 1;
        margin-right: 20px;
    }

    div:nth-last-child(1) {
        margin: 0;
    }

    .text-b {
        // margin-top: 21px;
        // position: absolute;
        // bottom: 0;
        // left: 0;
        // margin-bottom: -5px ;
        padding-top: 19px;

        /deep/ .el-progress-bar {
            margin-bottom: -12px;
        }

        /deep/ .el-progress-bar__outer {
            background-color: #CDCFE8;
        }
    }
}

;

.text-t {
    padding-top: 16px;
    text-align: center;

    p {
        line-height: 17px;
    }

    ;

    h3 {
        margin-top: 10px;
        line-height: 29px;
    }

    ;

    span {
        line-height: 14px;
    }

    ;
}

.text-c {
    margin-top: 27px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
        flex: 1;
        white-space: nowrap;
        text-align: center;
    }

    ;

    div:nth-child(1) {
        padding-left: 11px;
    }

    .line {
        flex: 0 0 1px;
        height: 34px;
        background-color: #f5ecff;
    }

    ;

    p {
        line-height: 18px;
        margin: 5px;
    }
}

.text-b /deep/ .el-progress-bar__outer {
    overflow: visible;
}

.text-b /deep/ .el-progress-bar__innerText {
    color: #999;
    margin: 0 -16px;
    margin-top: -37px;
}

.text-info {
    line-height: 18px;
}

.chartbox {
    .btn {
        display: inline-block; // width: 60px;
        padding: 0 15px;
        margin-right: 8px;
        height: 30px;
        line-height: 32px;
        text-align: center;
        background-color: #f4ecff;
        border: none;
        color: #333;
        border-radius: 15px;
        cursor: pointer;
    }

    h2 {
        padding-left: 31px;
    }

    .btnbox {
        padding-right: 12px;
        display: flex;
        justify-content: space-between;
    }

    .cbtn {
        display: inline-block;
        width: 35px;
        height: 32px;
        margin-left: 8px;
        line-height: 32px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #999;
        background-color: #fff;
        cursor: pointer;
    }

    .currentbtn {
        background-color: #7224d8;
        color: #fff;
        border: none;
    }
}

.cfunction {
    h2 {
        margin-top: 40px;
        margin-bottom: 30px;
    }

    ul {
        display: flex;
        flex-wrap: wrap;

        li {
            -webkit-flex: 1;
            -moz-flex: 1;
            -ms-flex: 1;
            -o-flex: 1;
            flex: 1;
            list-style: none; // background-color: #fff;
            height: 85px;
            line-height: 85px;
            text-align: center;
            margin-right: 20px;
            border-radius: 4px;
            cursor: pointer;
            color: #fff;
            margin-bottom: 15px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 53px;
                height: 53px;
                margin-right: 25px;
                border-radius: 50%;
            }
        }

        li:nth-last-child(1) {
            margin-right: 0;
        }
    }
}

.fn-col {
    padding: 16px 10px;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    img {
        // vertical-align: middle;
        // margin-right: 10px;
        position: absolute;
    }

    span {
        line-height: 52px;
        display: block;
        text-align: center;
        padding-left: 52px;
    }

    &:hover {
        opacity: 0.9;
    }
}

.commonusebtn {
    display: flex;

    div {
        flex: 1;
        margin-right: 20px;
    }

    div:nth-last-child(1) {
        margin-right: 0;
    }
}

div /deep/ .el-progress-bar__inner {
    animation: progress-bar-stripes 5s linear infinite;
    background-image: linear-gradient(15deg, rgba(255, 255, 255, 0.25) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.25) 75%, transparent 75%, rgba(255, 255, 255, 0.25) 100%);
}

@keyframes progress-bar-stripes {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 580px 0;
    }
}
</style>