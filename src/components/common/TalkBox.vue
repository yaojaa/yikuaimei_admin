<template>
<div>
    <div class="msgtitle">
        <div>{{lefttitle}}</div>
        <div>聊天内容</div>
    </div>
    <div class="messagebox">
        <div class="msglist">
            <div class="msglisttable" v-if="table">
                <a href="javascript:void(0)" @click="liststatus='all'">全部</a>
                <a href="javascript:void(0)" @click="liststatus='mark'">标记</a>
                <a href="javascript:void(0)" @click="liststatus='blacklist'">拉黑</a>
                <a href="javascript:void(0)" @click="liststatus='transfer'">转接</a>
            </div>
            <ul>
                <li v-for="(v,i) in listdata" :key="i" @click="listkey=i" :class="{current:listkey===i}">
                    <img src="/static/img/img.jpg" alt="">
                    <p>法国兰斐婚纱摄影</p>
                    <span>10:01</span>
                </li>
            </ul>
        </div>
        <div  id="admui-pageContent" ref='contentbox'>
            <div class="page-content" ref='scrollbox'>
                <div class="chat-box">
                    <!-- <div class="chat-time">10:10</div>时间预留 -->
                    <div class="chats">
                        <div class="chat" v-for="(v,i) in data" :class="{'chat-left':v.right}" :key="i">
                            <div class="chat-avatar">
                                <a class="avatar" data-toggle="tooltip" href="#" title="">
                                    <img src="http://cdn.admui.com/demo/pjax/1.3.0/images/portraits/4.jpg">
                                </a>
                            </div>
                            <div class="chat-body">
                                <div class="chat-title">
                                    <span class="name">{{v.name}}</span>
                                </div>
                                <div class="chat-content">
                                    <p>{{v.content}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    </div> 
    <div v-if="talk">
        <el-input id='txt1' v-model="inputdata"></el-input>
        <el-button @click="sendClick(inputdata)">发送</el-button>
    </div>    
</div>

</template>
<script>
import socket from '@/assets/js/socket.js'
    export default{
        data(){
            return{
                listkey:1,
                liststatus:"all",
                inputdata:'',
                data:[
                    {
                        name:'客户',
                        right:true,
                        content:'你好客服，请问在吗'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'您好，在呢，请问有什么可以帮您的吗？'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'我在咱家定了一款99999元的婚纱套餐，有一些问题想问一下'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'好的，您的套餐名称，或者链接方便发给我一下吗？'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'好的，套餐名称是 马代七日游旅拍'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'好的，知道了，那您对这个套餐有什么具体的问题想要问呢？'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'这个到时候是需要我们自己办理护照呢，还是说套餐里就全部包括了代办所有手续呢？还有就是是全包各种费用，还是说到了当地出行坐车吃饭什么的还需要另外消费价钱呢？'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'好的，您稍等，我现在帮您问一下套餐具体的负责人怎么说'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'好的，谢谢'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'问好了，您还在吗？'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'在呢'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'感谢您的等待，已经问好了，是包括所有旅行费用的，跟套餐上注明的一样的。您可以放心'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'好的，谢谢'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'帮到您很高兴'
                    },

                ]
            }
        },
        props:['table','url','talk','lefttitle'],
        computed:{
            listdata(data){
                return 10
            },
            chatdata(data){
                return [
                    {
                        name:'客户',
                        right:true,
                        content:'你好客服，请问在吗'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'您好，在呢，请问有什么可以帮您的吗？'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'我在咱家定了一款99999元的婚纱套餐，有一些问题想问一下'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'好的，您的套餐名称，或者链接方便发给我一下吗？'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'好的，套餐名称是 马代七日游旅拍'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'好的，知道了，那您对这个套餐有什么具体的问题想要问呢？'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'这个到时候是需要我们自己办理护照呢，还是说套餐里就全部包括了代办所有手续呢？还有就是是全包各种费用，还是说到了当地出行坐车吃饭什么的还需要另外消费价钱呢？'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'好的，您稍等，我现在帮您问一下套餐具体的负责人怎么说'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'好的，谢谢'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'问好了，您还在吗？'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'在呢'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'感谢您的等待，已经问好了，是包括所有旅行费用的，跟套餐上注明的一样的。您可以放心'
                    },
                    {
                        name:'客户',
                        right:true,
                        content:'好的，谢谢'
                    },
                    {
                        name:'客服',
                        right:false,
                        content:'帮到您很高兴'
                    },

                ]
            }

        },
        methods:{
            sendClick(info){
                socket.sendClick(info);
                this.data.push(
                    {
                        name:'客服',
                        right:false,
                        content:this.inputdata
                    }
                );
                // console.dir(this.$refs.scrollbox.offsetHeight)
                this.$nextTick(function(){
                    this.$refs.contentbox.scrollTop = this.$refs.scrollbox.offsetHeight
                })
                
            }
        },
        created(){
            var _this=this;
            socket.openClick(this.url);
            socket.ws.onmessage = function (e) {
                console.info('接受到数据：' + e.data);
                var data = JSON.parse(e.data)
                if(data.code===0 && data.type==='chat'){
                    _this.data.push(
                        {
                            name:'顾客',
                            right:true,
                            content:data.msg
                        }
                    );
                    _this.$nextTick(function(){
                        _this.$refs.contentbox.scrollTop = _this.$refs.scrollbox.offsetHeight
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.messagebox{
    margin-bottom: 30px;
    // box-shadow: 1px 1px 1px #eee;
    height: 600px;
    background-color: #FBFDFF;
    overflow: hidden;
    // overflow-y: auto;
    #admui-pageContent{
        flex:1;
        overflow: hidden;
        overflow-y: auto;
        padding: 0 30px 0 10px;
        // border: 20px solid transparent;
    }
}
.msglisttable{
    display: flex;
    justify-content: space-between;
    a{
        flex: 1;
        margin:3px;
    }
}
// .page-container{
    // flex:1;
    // height: 600px;
//     background-color: #FBFDFF;
//     overflow: hidden;
//     overflow-y: auto;
// }
.panel{
    box-shadow: none;
}
.panel-body{
    border:none;
    background-color: #FBFDFF !important;
}
.msgtitle{
    display: flex;
    background-color: #F3F4FE;
    height: 36px;
    line-height: 36px;
    color: #666;
    div:nth-child(1){
        width: 196px;
        text-align: center;
    }
    div:nth-child(2){
        flex: 3;
        text-align: center
    }
}
.messagebox{
    display: flex;
    box-shadow: 1px 1px 1px #eee
}
p{
    word-break: break-all;
    font-size: 14px;
    color:#666;
}
div::-webkit-scrollbar {display:none}
.msglist{
    width: 196px;
    height: 600px;
    // flex: 0;
    background-color: #FBFDFF;
    padding-top: 15px;
    padding-bottom: 15px;
    // overflow: hidden;
    ul{
        height: 570px;
        width: 196px;
        overflow: auto;
    }
    ul::-webkit-scrollbar{display:none}
    li{
        display: flex;
        align-items: center;
        width: 190px;
        height: 58px;
        background-color: #fff;
        margin-top: 6px;
        margin-bottom: 6px;
        position: relative;
        border-radius: 5px;
        cursor: pointer;
    }
    li.current{
        background-color: #F3F4FE;
    }
    li.current::before{
        position: absolute;
        top: 26px;
        right: -10px;
        width: 0;
        height: 0;
        content: "";
        border: 5px solid transparent;
        border-left-color: #F3F4FE;
        z-index: 3;
    }
    img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-left: 8px;
        margin-right: 8px;
    }
    p{
        font-size: 12px;
        color: #999
    }
    span{
        font-size: 12px;
        color: #999;
        position: absolute;
        top: 8px;
        right: 8px;
    }
}
.msgcontent{
    flex: 3
}
html{
scrollbar-3dlight-color:transparent; /*- 最外左 -*/
scrollbar-highlight-color:transparent; /*- 左二 -*/
scrollbar-face-color:transparent; /*- 面子 -*/
scrollbar-arrow-color:transparent; /*- 箭头 -*/
scrollbar-shadow-color:transparent; /*- 右二 -*/
scrollbar-darkshadow-color:transparent; /*- 右一 -*/
scrollbar-base-color:transparent; /*- 基色 -*/
scrollbar-track-color:transparent;/*- 滑道 -*/
}
.chat-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.chats {
    background-color: #FBFDFF;
    // padding: 30px 80px
}
.chat-avatar {
		float: right
	}

.chat-avatar .avatar {
    width: 30px
}
.chat-title{
    float: right;
    span{
        font-size: 12px;
        color: #999;
        margin-right: 20px;
    }
}
.chat-body {
    display: block;
    margin: 10px 30px 0 0;
    overflow: hidden
}

.chat-body:first-child {
    margin-top: 0
}

.chat-content {
    position: relative;
    display: block;
    float: right;
    padding: 5px 10px;
    margin: 0 20px 10px 0;
    clear: both;
    color: #666;
    background-color: #F3F4FE;
    border-radius: 4px
}

.chat-content:before {
    position: absolute;
    top: 10px;
    right: -10px;
    width: 0;
    height: 0;
    content: "";
    border: 5px solid transparent;
    border-left-color: #F3F4FE
}

.chat-content>p {
    margin: 0
}

.chat-content+.chat-content:before {
    border-color: transparent
}

.chat-time {
    display: block;
    font-size: 8px;
    color: rgba(255, 255, 255, .6)
}

.chat-left .chat-avatar {
    float: left
}
.chat-left .chat-title{
    float: left;
    span{
        font-size: 12px;
        color: #999;
        margin-left: 20px;
    }
}
.chat-left .chat-body {
    margin-right: 0;
    margin-left: 30px
}

.chat-left .chat-content {
    float: left;
    margin: 0 0 10px 20px;
    color: #76838f;
    background-color: #dfe9ef
}

.chat-left .chat-content:before {
    right: auto;
    left: -10px;
    border-right-color: #dfe9ef;
    border-left-color: transparent
}

.chat-left .chat-content+.chat-content:before {
    border-color: transparent
}

.chat-left .chat-time {
    color: #a3afb7
}
.avatar {
    position: relative;
    display: inline-block;
    width: 40px;
    white-space: nowrap;
    vertical-align: bottom;
    border-radius: 1000px;
    top: 20px;
}

.avatar i {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    border: 2px solid #fff;
    border-radius: 100%
}

.avatar img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border: 0 none;
    border-radius: 1000px
}

.avatar-online i {
    background-color: #46be8a
}

.avatar-off i {
    background-color: #526069
}

.avatar-busy i {
    background-color: #f2a654
}

.avatar-away i {
    background-color: #f96868
}

.avatar-100 {
    width: 100px
}

.avatar-100 i {
    width: 20px;
    height: 20px
}

.avatar-lg {
    width: 50px
}

.avatar-lg i {
    width: 12px;
    height: 12px
}

.avatar-sm {
    width: 30px
}

.avatar-sm i {
    width: 8px;
    height: 8px
}

.avatar-xs {
    width: 20px
}

.avatar-xs i {
    width: 7px;
    height: 7px
}

</style>
