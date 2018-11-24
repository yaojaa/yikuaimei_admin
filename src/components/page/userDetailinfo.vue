<template>
    <div class="container">
        <div class="info">
            <div class="left">
                <div class="imgbox">
                    <img src="" alt="">
                    <p>Kevin</p>
                </div>
                <cd :showdata='showdata'></cd>
            </div>
            <div class="right">
                <cd :showdata='showdata2'></cd>
            </div>
        </div>
        <div class="note">
            <h3 class="f14 text-info">信息</h3>
            <div class="notebox">
                <nomal-table 
                    :breadcrumb="false"
                    :table-page="tablePage" >
                </nomal-table>
            </div>
        </div>
        <div class="message">
            <h3 class="f14 text-info">站内信</h3>
            <div class="messagebox">
                站内信模块
            </div>
        </div>
    </div>
</template>
<script>
    import NomalTable from './NomalTable';
    import cd from '../common/showdetail';
    export default {
        data(){
            return{
                tablePage:[
                    {
                        "type":"tableJson",
                        "url": "./static/vuetable2.json",
                        "column": [ //行
                            {
                                "type": "text",
                                "align": "center",
                                "label": "内容",
                                "prop": "address"
                                
                            },
                            {
                                "type": "text",
                                "align": "center",
                                "label": "发送时间",
                                "prop": "date",
                                "width": "200",
                                
                            }
                        ],
                    }
                ],
                showdata:[
                    {
                        type:7,
                        label:'用户编号',
                        title:'76937'
                    },
                    {
                        type:7,
                        label:'联系方式',
                        title:'18888888888'
                    },
                    {
                        type:7,
                        label:'性别',
                        title:'女'
                    },
                    {
                        type:7,
                        label:'生日',
                        title:'1992年2月2日'
                    },
                    {
                        type:7,
                        label:'城市',
                        title:'鄂尔多斯'
                    }
                ],
                showdata2:[
                    {
                        type:7,
                        label:'注册时间',
                        title:'2018-05-05 16:30:30'
                    },
                    {
                        type:7,
                        label:'用户来源',
                        title:'微信小程序'
                    }
                ]
            }
        },
        // 需要传入userid识别
        // props:[userid],
        beforeCreate(){
            // $axios('api/userinfo?userid=userid').then(this.)
        },
        mounted(){
            
        },
        components:{
            NomalTable,
            cd
        }
    }
</script>
<style lang="less" scoped>
.container{
    background-color: transparent;
    border: none;
}
.container>div{
    margin-top: 32px;
}
.container>div:nth-child(1){
    margin-top:0;
}
.container /deep/ .container.nomaltable{
    padding: 0;
    border: none;
}
.container /deep/ .pagination{
    display: none;
}
.container /deep/ .el-table__row{
    background-color: #fff !important;
    border-bottom: 2px solid #F3F0F0;
}
h3{
    margin-bottom: 20px;
}
.info{
    display: flex;
    .left{
        padding: 20px 0;
        background-color: #fff;
        margin-right: 10px;
        flex: 2;
        display: flex;
        .imgbox{
            flex: 1;
            text-align: center;
            img{
                display: inline-block;
                width: 100px;
                height: 100px;
                background-color: #eee;
                margin-bottom: 17px;
                border-radius: 50%;
            }
            p{
                color: #7224D8;
            }
        }
        div{
            flex: 1
        }
    }
    .right{
        padding: 20px 0;
        background-color: #fff;
        flex: 1;
    }
}
.message{
    .messagebox{
        height: 600px;
        background-color: #eee;
    }
}
</style>