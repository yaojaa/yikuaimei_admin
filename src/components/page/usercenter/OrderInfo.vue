<template>
    <div class="container">
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
                                    <span>提醒时间：</span>
                                    <p>{{'2017-05-08'}}</p>
                                </li>
                                <li>
                                    <span>注意事项：</span>
                                    <div>
                                        <p>1、请尽快确定拍摄时间，方便为您预约摄影师</p>
                                        <p>2、请您带上您的护照</p>                                        
                                    </div>

                                </li>
                                <li class="server">
                                    <span>人员安排：</span>
                                    <div>
                                        <div>
                                            <img src="../../../../static/img/1.png" alt="">
                                            <p>首席化妆师</p>
                                            <span>孙晓娜</span>
                                        </div>
                                        <div>
                                            <img src="../../../../static/img/1.png" alt="">
                                            <p>首席化妆师</p>
                                            <span>孙晓娜</span>
                                        </div>
                                        <div>
                                            <img src="../../../../static/img/1.png" alt="">
                                            <p>高级摄影师</p>
                                            <span>孙晓娜</span>
                                        </div>                                        
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
                                <li><span>优惠券：</span>
                                    <p>-¥1000.00</p>
                                </li>
                                <li><span>APP下单优惠：</span>
                                    <p>-¥1500.00</p>
                                </li>
                                <li><span>应收金额：</span>
                                    <p style="color:#7224D8">+¥6998.00</p>
                                </li>
                                <li><span>支付分期：</span>
                                    <p style="color:#7224D8">分期付款</p>
                                </li>
                            </ul>
                            <i class="line"></i>
                            <div class="paystate">
                                <el-steps direction="vertical" :active="1">
                                    <el-step title="一期款 ¥1600.00">
                                        <div slot='description'>2018-05-30    16:30:28</div>
                                    </el-step>
                                    <el-step title="二期款 ¥2000.00">
                                        <div slot='description'  style="color:#7224D8">（截至到开始拍摄之前）</div>
                                    </el-step>
                                    <el-step title="二期款 ¥2000.00">
                                        <div slot='description'  style="color:#7224D8">（截至到开始拍摄之前）</div>
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
                        
                        <p><span>用户姓名：</span>erin</p>
                        <br>
                        
                        <p><span>手机号码：</span>13888888888</p>
                    </li>
                    <li class="orderinfo">
                        <h4>套餐信息</h4>
                        
                        <div>
                            <img src="../../../../static/img/1.png" alt="" style="width:90px;height:80px;">
                            <div>
                                <p>德国淡粉色手工刺绣长裙婚纱</p>
                                <span style="color:#C20F0C">¥ 11980.00</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <h4>订单信息</h4>
                        
                        <p><span>订单时间：</span>2017-05-05 16:30</p>
                        <br>
                        
                        <p><span>订单编号：</span>XC217071945739</p>
                        <br>
                        
                        <p><span>服务时间：</span>2018-05-05</p>
                    </li>
                    <li v-if="true">
                        <h4>返现记录</h4>
                        
                        <p><span>订单完成返现：</span>¥10000.00</p>
                        <br>
                        
                        <p><span>订单评价返现：</span>¥5.00</p>
                        <br>
                        
                        <p><span>一站式返现：</span>¥2500.00</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="appraise" v-if="true">
            <h4>顾客评价<span>此评价被商家评为优质评价</span></h4>
            <p>刚拍完婚纱照，化妆师是雪莲美女，温柔可亲，心灵手巧，非常赞！摄影师是何婷老师，很幽默，拍摄水准也非常高，拍摄过程很愉快！放几张给大家参考。</p>
            <div>
                <img src="../../../../static/img/1.png" alt="" v-for="(v,i) in 4" :key="i">
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
        display: flex;
        flex-wrap: wrap;
        li{
            width: 100%;
            margin-top: 11px;
            font-size: 12px;
            display: flex;
            color: #999;
        }
        p{
            span{
                position: absolute;
                left: 10px;
                line-height: 17px;
                color: #666;
            }
        }

        p{
            line-height: 17px;
            color: #333;
        }
        .server{
            display: flex;
            div{
                position: relative;
                margin-right: 50px;
                text-align: center;
                img{
                    display: inline-block;
                    background-color: #eee;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    margin: 3px;
                }
                p{
                    color: #333;
                }
                span{
                    color: #999;
                    display: block;
                    
                }
            }
        }
        .server>div{
            display: flex;
        }
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
            color: #666;
        }
        span{
            text-align: right;
            width: 120px;
            color: #999;

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
    background-color: #fff;
    ul{
        padding: 0 8px 0 12px;
        width: 220px;
    }
    li{
        width: 220px;
        font-size: 12px;
        line-height: 17px;
        color: #666;
        h4{
            font-size: 14px;
            line-height: 20px;
            color: #666;
            margin-top: 20px;
            margin-bottom: 14px;
        }
        span{
            font-size: 14px;
            display: inline-block;
            // width: 85px;
            text-align: left;
            color: #999;
            // min-width: 100px;;
        }
        p{
            font-size: 14px;
            display: inline-block;
            margin: 6px 0;
            color: #666;
        }
    }
    .orderinfo{
        img{
            background-color: #eee;
            margin-right: 7px;
            border-radius: 3px;
        }
    }
    .orderinfo>div{
        display: flex;
        div{
            word-break: break-all;
            word-wrap:break-word;
            flex: 1;
            p{
                word-break: break-all;
            }
            span{
                text-align: left;
                margin-top: 10px;
            }
        }
    }
}
.appraise{
    padding: 20px;
    background-color: #fff;
    margin-top: 30px;
    h4{
        font-size: 18px;
        line-height: 22px;
        color: #999;
        span{
            font-size: 16px;
            color: #C20F0C;
            padding-left: 10px;
        }
        margin-bottom: 20px;
    }
    div{
        display: flex;
        margin-top: 10px;
        img{
            width: 177px;
            display: inline-block;
            height: 106px;
            background-color: #eee;
            margin: 5px;
        }
        img:nth-child(1){
            margin-left: 0;
        }
    }
}
</style>