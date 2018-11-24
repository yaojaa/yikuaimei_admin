<template>
    <div class="container">
        <div class="customerlist">
            <el-tabs type="border-card">
                <el-tab-pane label="全部">
                    <ul>
                        <li v-for="(v,i) in 20" :key="i" @click="currentid='1231231'">
                            <img src="" alt="">
                            <span>{{v}}全部用户</span>
                            <p>2015-04-04  17:50:42</p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="标记">
                    <ul>
                        <li v-for="(v,i) in 20" :key="i">
                            <img src="" alt="">
                            <span>{{v}}标记用户</span>
                            <p>2015-04-04  17:50:42</p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="拉黑">
                    <ul>
                        <li v-for="(v,i) in 20" :key="i">
                            <img src="" alt="">
                            <span>{{v}}拉黑用户</span>
                            <p>2015-04-04  17:50:42</p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="转接">
                    <ul>
                        <li v-for="(v,i) in 20" :key="i">
                            <img src="" alt="">
                            <span>{{v}}转接用户</span>
                            <p>2015-04-04  17:50:42</p>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="messagecontainer">
            <ul class="massagebox">
                <li class="self">
                    <img src="" alt="">
                    <div>
                        <span>{{'客服：xxx'}} {{'2018-08-08'}} {{'15:04:08'}}</span>
                        <p class="contentp">{{'你好你好非常够啦够啦而过挨个阿尔够了国家而过gleam管廊个浪够了go拉尔钢结构件快递费是经过两个狼藉了如果看见了各界金融股'}}</p>
                    </div>
                </li>
                <li class="customer">
                    <div>
                        <span>{{'2016-10-01'}} {{'17:23:01'}} {{'A用户'}}</span>
                        <p class="contentp">{{'你好你好件快递费是经过两个狼藉了如果看见了各界金融股'}}</p>
                    </div>
                    <img src="" alt="">
                </li>
                <li class="self">
                    <img src="" alt="">
                    <div>
                        <span>{{'客服：xxx'}} {{'2018-08-08'}} {{'15:04:08'}}</span>
                        <p class="contentp">{{'你好你好非常够啦够啦而过挨个阿尔够了国家而过gleam管廊个浪够了go拉尔钢结构件快递费是经过两个狼藉了如果看见了各界金融股'}}</p>
                    </div>
                </li>
                <li class="customer">
                    <div>
                        <span>{{'2016-10-01'}} {{'17:23:01'}} {{'A用户'}}</span>
                        <p class="contentp">{{'你好你好件快递费是经过两个狼藉了如果看见了各界金融股'}}</p>
                    </div>
                    <img src="" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            data:[
                {
                    // 头像图片的地址
                    imgurl:'',
                    // 商户名称
                    name:'克里斯提娜',
                    currentid:''
                    
                }
            ]
        }
    },
    methods: {
        sendmssage(data){
            ws.send('是否可用'+data)
        }
    },
    mounted() {
        var ws = new WebSocket('ws://localhost:8080');
        //建立连接，连接成功，发送信息
        ws.onopen = function(){
            console.log('open');
            ws.send('这里传输的应该是客户的uid+token');
        };
        //服务器发送消息，接受消息，处理消息，渲染页面
        ws.onmessage = function(evt){
            console.log(evt.data)
        };
        //ws关闭的时候，如何处理
        ws.onclose = function(evt){
            console.log('WebSocketClosed!');
        };
        //ws关闭的时候如何处理
        ws.onerror = function(evt){
            console.log('WebSocketError!');
        };
    },
    computed: {

    }
}
</script>
<style lang='less' scoped>
li{
    list-style: none;
}
.container{
    display: flex;
    height: 300px;
}
.customerlist::-webkit-scrollbar {display:none}
.customerlist{
    flex: 1;
    overflow-y: auto;
    border: 1px solid #eee;
    li:hover{
        background-color: #eee;
    }
}
.messagecontainer::-webkit-scrollbar {display:none}
.messagecontainer{
    flex: 4;
    overflow-y: auto;
    border: 1px solid #eee;
    .self{
        display: flex;
        align-items: center;
        div{
            width: 60%;
        }
    }
    .customer{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        div{
            width: 60%;
            text-align: right;
            span{
                text-align: right;
            }
        }
    }
    img{
        display: block;
        width: 50px;
        height: 50px;
        background-color: #ddd;
        border-radius: 50%;
        margin: 0 10px; 
    }
    .contentp{
        display: inline-block;
        background-color: #eee;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .massagebox span{
        margin: 10px 0;
        display: block;
    }
}
</style>