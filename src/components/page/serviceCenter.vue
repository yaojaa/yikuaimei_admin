<template>
    <div class="container">
        <div class="top">
            <span class="topleft"></span>
            <span class="topright"></span>
        </div>
        <div class="content">
            <ul class="customerlist">

            </ul>
            <div class="messagecontainer">
                <ul class="massagebox">
                    <li class="self"></li>
                    <li class="customer"></li>
                </ul>
            </div>
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

</style>