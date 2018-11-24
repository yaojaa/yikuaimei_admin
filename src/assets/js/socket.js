// var url = 'ws://172.16.1.209:9502?from=front&token=81dc9bdb52d04dc20036dbd8313ed055';
var socket={};
socket.ws = null;
var token = JSON.parse(window.localStorage.user).sid
socket.newmsg = '';
//打开链接
function openClick(url) {
    socket.ws = new WebSocket(url);
    socket.ws.onopen = function (e) {
        console.log('链接打开');
        socket.ws.send(JSON.stringify({
            token: token,
            from: 'backend',
            content: '',
            shop_id: 0,
            type: 'chat',
            user_id:1,
            group: 1
        }));
    }
    socket.ws.onmessage = function (e) {
        console.info('接受到数据：' + e.data);
        var data = JSON.parse(e.data)
    }
    socket.ws.onclose = function (e) {
        //e  CloseEvent对象
        //e.code 关闭代码编号标识
        //e.reason 关闭原因
        console.info(e);
        console.log('链接已经关闭');
    }
    socket.ws.onerror = function (e) {
        console.info(e);
        console.log('发生异常:'+e.message);
    }
}
//发送
function sendClick(info) {
    //如果发送缓冲区没有数据才继续发送
    if (socket.ws.bufferedAmount <= 0) {
        socket.ws.send(JSON.stringify({
            token: token,
            from: 'backend',
            content: info,
            shop_id: 0,
            type: 'chat',
            user_id:1,
            group: 1
        }));
    }
}
//关闭
/*
* 关闭链接说明，在IE浏览器下还会触发 onerror事件
*  WebSocket Error: Network Error 12030, 与服务器的连接意外终止
*/
function closeClick() {
    //默认关闭代码 1006
    socket.ws.close();
    socket.ws = null;
    //Uncaught InvalidAccessError: Failed to execute 'close' on 'WebSocket': The code must be either 1000, or between 3000 and 4999. 1006 is neither.
    //ws.close(3000,'客户端主动关闭')
}
socket.openClick=openClick
socket.sendClick=sendClick
socket.closeClick=closeClick
export default socket
    
