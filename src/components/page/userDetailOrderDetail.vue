<template>
    <div class="page">
        <h3>订单状态：{{'服务中'}}<i class="iconfont"></i></h3>
        <div class="flexbox">
            <div class="left">
                <ul class="leftbox">
                    <div>
                        <li class="stepbox">
                            <el-steps :active="3" finish-status="success" :align-center='true'>
                                <el-step title="确定拍摄时间"></el-step>
                                <el-step title="到店签合同"></el-step>
                                <el-step title="上传相关票据"></el-step>
                                <el-step title="预约拍摄时间/地点"></el-step>
                                <el-step title="提醒注意事项"></el-step>
                                <el-step title="安排拍摄"></el-step>
                            </el-steps>
                        </li>
                        <li style="width:190px;margin:0 auto;marginTop:19px">
                            <el-progress :percentage="70" color='#99B7EE'></el-progress>
                        </li>
                        <li style="backgroundColor:#FCF9FF;border:1px solid #E1CAFF;margin:30px 10px 12px 10px;">
                            <ul class="text" style="padding:19px">
                                <li>
                                    <p><span>提醒时间：</span>{{'2017-05-08'}}</p>
                                </li>
                                <li>
                                    <p><span>注意事项：</span>1、循环嵌套p标签</p>
                                </li>
                                <li class="server">
                                    <span>人员安排：</span>
                                    <div>
                                        <img src="" alt="">
                                        <p>循环图片</p>
                                        <i>孙晓娜</i>
                                    </div>
                                    <div>
                                        <img src="" alt="">
                                        <p>循环图片</p>
                                        <i>孙晓娜</i>
                                    </div>
                                    <div>
                                        <img src="" alt="">
                                        <p>循环图片</p>
                                        <i>孙晓娜</i>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </div>

                    <li class="paystatebox">
                        <h4>支付状态</h4>
                        <div class="flexbox">
                            <ul>
                                <li><span>浮动金额：</span>
                                    <p>+¥20000</p>
                                </li>
                                <li><span>浮动金额：</span>
                                    <p>+¥20000</p>
                                </li>
                                <li><span>asd浮动金额：</span>
                                    <p>+¥20000</p>
                                </li>
                                <li><span>浮动金额：</span>
                                    <p>+¥20000</p>
                                </li>
                            </ul>
                            <i class="line"></i>
                            <div class="paystate">
                                <el-steps direction="vertical" :active="1">
                                    <el-step title="步骤 3">
                                        <div slot='description'>ads</div>
                                    </el-step>
                                    <el-step title="步骤 3">
                                        <div slot='description'>ads</div>
                                    </el-step>
                                    <el-step title="步骤 3">
                                        <div slot='description'>ads</div>
                                    </el-step>
                                </el-steps>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="right">
                <ul>
                    <li>
                        <h4>基本信息</h4>
                        <span>用户姓名：</span>
                        <p>erin</p>
                        <br>
                        <span>手机号码：</span>
                        <p>13888888888</p>
                    </li>
                    <li>
                        <h4>基本信息</h4>
                        <span>用户姓名：</span>
                        <p>erin</p>
                        <br>
                        <span>手机号码：</span>
                        <p>13888888888</p>
                    </li>
                    <li>
                        <h4>订单信息</h4>
                        <span>订单时间：</span>
                        <p>2017-05-05 16:30</p>
                        <br>
                        <span>订单编号：</span>
                        <p>fadgfhgkhakghaleghg</p>
                        <br>
                        <span>服务时间：</span>
                        <p>2018-05-05</p>
                    </li>
                    <li v-if="true">
                        <h4>返现记录</h4>
                        <span>订单完成返现：</span>
                        <p>¥10000.00</p>
                        <br>
                        <span>订单评价返现：</span>
                        <p>¥5.00</p>
                        <br>
                        <span>一站式返现：</span>
                        <p>¥2500.00</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="appraise" v-if="true">
            <h4>顾客评价<span>此评价被商家评为优质评价</span></h4>
            <p>拍摄完了非常棒拍摄完了非常棒拍摄完了非常棒拍摄完了非常棒拍摄完了非常棒拍摄完了非常棒拍摄完了非常棒拍摄完了非常棒拍摄完了非常棒</p>
            <div>
                <img src="" alt="">循环图片
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {

            }
        },
        methods: {

        },
        mounted() {

        },
        computed:{

        }
    }
</script>

<style lang='less' scoped>
h3{
    height: 48px;
    background-color: #FCF9FF;
    font-size: 22px;
    line-height: 48px;
    padding-left: 10px;
}
.container{
    background-color: transparent;
    border: none;
    li{
        list-style: none;
    }
}
.flexbox{
    display: flex;
    .left{
        flex: 4;
        margin-right: 10px;
        .stepbox{
            padding-top: 30px;
        }
    }
    .leftbox>li{
        background-color: #fff;
    }
    .leftbox>div{
        background-color: #fff;
        padding-bottom: 30px;
        margin-bottom: 12px;
    }
    .leftbox .text{
        li{
            position: relative;
            padding-left: 90px;
            margin-top: 11px;
            font-size: 12px;
        }
        span{
            position: absolute;
            left: 10px;
            line-height: 17px;
            color: #666;
        }
        p{
            line-height: 17px;
            color: #333;
        }
        .server{
            display: flex;
            div{
                margin-right: 50px;
                p{
                    color: #333;
                }
                i{
                    color: #999;
                    
                }
            }
        }
    }
    .right{
        flex: 1;
        background-color: #fff;

    }
}
.paystatebox{
    padding: 20px;
    h4{
        font-size: 18px;
        line-height: 25px;
        color: #999;
    }
    ul{
        flex: 1;
        text-align: center;
        li{
            display: flex;
            justify-content: center;
            line-height: 17px;
            margin-top: 14px;
        }
        p{
            color: #333;
        }
        span{
            text-align: right;
            width: 120px;
            color: #666;

        }
    }
    .line{
        width: 0;
        height: 183px;
        border: 1px dashed #D0D0D0;
    }
    .paystate{
        flex: 1;
        text-align: center;
    }
    .paystate /deep/ .el-steps,.el-steps--vertical{
        width: 200px;
        margin: 0 auto;
    }
}
.right{
    ul{
        padding: 0 8px 0 8px;
    }
    li{
        font-size: 12px;
        line-height: 17px;
        color: #666;
        h4{
            font-size: 14px;
            line-height: 20px;
            color: #333;
            margin-top: 30px;
        }
        span{
            display: inline-block;
            width: 85px;
            text-align: right;
        }
        p{
            display: inline-block
        }
    }
}
.appraise{
    background-color: #fff;
    margin-top: 30px;
}
</style>