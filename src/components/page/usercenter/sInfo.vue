<template>
    <div>
        <div class="top">
            <el-row class="topbox panel">
                <el-col :span="12">
                    <div class=" info mb-n">
                        <div class="panel-body">
                            <div class="imgbox">
                                <img :src="axiosdata.user_head_img" alt="">
                                <p>{{axiosdata.user_real_name}}</p>
                            </div>
                            <cd :showdata='showdata'></cd>
                            <cd :showdata='showdata2'></cd>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class=" info mb-n">
                        <div class="panel-body">
                            <div class="imgbox">
                                <img :src="axiosdata.user_mate_info.user_head_img" alt="">
                                <p>{{axiosdata.user_mate_info.user_real_name}}</p>
                            </div>
                            <cd :showdata='showdata3'></cd>
                            <cd :showdata='showdata4'></cd>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <table-tabs :page-tabs="pageTapsCard">
            <div class="message" slot="first">
                <msg :table='false' :talk='false' :url='"ws://172.16.1.250:9502?from=front&token="+token' :lefttitle='"商家列表"'></msg>
            </div>
            <nomal-table slot="second" :table-json="tablePagesecond" :url="urlnote"></nomal-table> 

            <nomal-table slot="third" :table-json="tablePagethird" :url="urladress"></nomal-table> 
        </table-tabs>



    </div>

</template>
<script>
import NomalTable from '../../common/NomalTable';
import TableTabs from '@/components/common/TableTabs'
import cd from '../../common/showdetail';
import msg from '../../common/TalkBox'
export default {
    data() {
        return {
            token:'',
            uid:'',
            axiosdata:{},
            activeName:'first',
            url: "",
            pageTapsCard: {
                "type":"card",
                "list":[
                    {
                        "label":"站内信",
                        "name": "first",
                    },
                    {
                        "label":"短信",
                        "name": "second",
                    },
                    {
                        "label":"收货地址",
                        "name": "third",
                    },
                ],
                "activeVal":"first" //初始值
            },
            tablePagesecond: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "内容",
                        "prop": "sms_content"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "发送时间",
                        "prop": "create_time"

                    }
                ]
            },
            tablePagethird: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "姓名",
                        "prop": "user_address_name"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "手机号码",
                        "prop": "user_address_phone"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "详细地址",
                        "prop": "user_address_detail_address"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "邮政编码",
                        "prop": "user_address_zcode"

                    }
                ],
                // formatter: function(data) { //表格数据处理
                //     // return data
                //     return data.splice(2, 8);
                // },
            }
        }
    },
    // 需要传入userid识别
    beforeCreate() {
        
    },
    created(){
        this.userid = this.$route.params.id;
        this.$axios.get('/api/admin/user/Info?id='+this.userid).then(data=>{
            this.axiosdata = data.data.data
            console.log('返回的数据：',this.axiosdata)
        });
        this.token = this.$store.state.user.sid;
    },
    mounted() {
        
    },
    components: {
        NomalTable,
        TableTabs,
        cd,
        msg
    },
    methods: {
    },
    computed:{
        
        urladress(){
            return `/api/admin/user/UserAddress?user_id=${this.userid}`
        },
        urlnote(){
            return `/api/admin/user/sms?id=${this.userid}&page=${1}&pagesize=${10}`
        },
        showdata(){
            return [{
                type: 7,
                label: '用户编号',
                title: this.axiosdata.user_id + ''
            },
            {
                type: 7,
                label: '联系方式',
                title: this.axiosdata.user_phone
            },
            {
                type: 7,
                label: '性别',
                title: this.axiosdata.user_sex ? '男':'女',
            },
            {
                type: 7,
                label: '生日',
                title: this.axiosdata.user_birthday
            },
            {
                type: 7,
                label: '城市',
                title: this.axiosdata.city_text
            }
        ]},
        showdata2(){
            return [{
                type: 7,
                label: '注册时间',
                title: this.axiosdata.user_ctime
            },
            {
                type: 7,
                label: '用户来源',
                title: this.axiosdata.user_source + ''
            }
        ]},
        showdata3(){
            return [{
                type: 7,
                label: '用户编号',
                title: this.axiosdata.user_mate_info.user_id + ''
            },
            {
                type: 7,
                label: '联系方式',
                title: this.axiosdata.user_mate_info.user_phone
            },
            {
                type: 7,
                label: '性别',
                title: this.axiosdata.user_mate_info.user_sex ? '男':'女',
            },
            {
                type: 7,
                label: '生日',
                title: this.axiosdata.user_mate_info.user_birthday
            },
            {
                type: 7,
                label: '城市',
                title: this.axiosdata.user_mate_info.city_text
            }
        ]},
        showdata4(){
            return [{
                type: 7,
                label: '注册时间',
                title: this.axiosdata.user_mate_info.user_ctime
            },
            {
                type: 7,
                label: '用户来源',
                title: this.axiosdata.user_mate_info.user_source + ''
            }
        ]}
    }
}
</script>
<style lang="less" scoped>
.page-content /deep/ .labeltext{
    margin: 0;
}
.message {
    .messagebox {
        height: 600px; // background-color: #eee;
    }
}
.topbox{
    background-image: url('/static/img/link.png');
    background-repeat: no-repeat;
    background-position: 50%;
}
.top {
    .info {
        .imgbox {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            img {
                border-radius: 50%;
                height: 80px;
                width: 80px;
                margin-right: 20px;
                // margin-top: 30px
            }
            p {
                color: #7224D8;
                font-size: 18px;
            }
        }
    }
    .note {}
}

.top /deep/ .pbox {
    flex: 1!important
}

</style>