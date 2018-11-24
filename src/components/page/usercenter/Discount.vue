<template>
<div>
    <div class="table">
        <nomal-table :table-json="tableJson" :url="url">
            <table-tabs :page-tabs="pageTapsCard" @tabs-click="pageTapsClick"></table-tabs>
        </nomal-table>
    </div>
</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableTabs from '@/components/common/TableTabs'

    export default {
        name: 'userlist',
        data() {
            return {
                url:"",
                url0:"",
                url1:"",
                menus:{
                    "type":"menu",
                    "list":[
                        {
                            "label":"基本信息",
                            "name": "0",
                            "url":"",  //跳转路径（优先跳转路径）
                        },
                        {
                            "label":"订单信息",
                            "name": "1",
                            "url":"",  //跳转路径（优先跳转路径）
                        },
                        {
                            "label":"婚基金",
                            "name": "2",
                            "url":"/usermarry",  //跳转路径（优先跳转路径）
                        },
                        {
                            "label":"展会信息",
                            "name": "3",
                            "url":"",  //跳转路径（优先跳转路径）
                        },
                        {
                            "label":"优惠券",
                            "name": "4",
                            "url":"usercoupon1",  //跳转路径（优先跳转路径）
                        },
                        {
                            "label":"收藏/关注/对比",
                            "name": "5",
                            "url":"",  //跳转路径（优先跳转路径）
                        },
                    ],
                    "activeVal":"4" //初始值

                },
                pageTapsCard:{
                    "type":"card",
                    "list":[
                        {
                            "label":"优惠券",
                            "name": "0",
                        },
                        {
                            "label":"实物券",
                            "name": "1",
                        },
                    ],
                    "activeVal":"0" //初始值
                },
                tableJson:{},
                tableJson0:{
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "优惠券ID",
                            "prop": "date",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "范围",
                            "prop": "date",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "获取渠道",
                            "prop": "date",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "领取时间",
                            "prop": "date",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "金额",
                            "prop": "address",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "有效期",
                            "prop": "address",
                            "width": "",
                            
                        },
                    ],
                },
                tableJson1:{
                        "column": [ //行
                            {
                                "type": "text",
                                "align": "center",
                                "label": "优惠券ID",
                                "prop": "date",
                                "width": "",
                                
                            },
                            {
                                "type": "text",
                                "align": "center",
                                "label": "领取位置",
                                "prop": "address",
                                "width": "",
                                
                            },
                            {
                                "type": "text",
                                "align": "center",
                                "label": "领取物品",
                                "prop": "name",
                                "width": "",
                                
                            },
                            {
                                "type": "text",
                                "align": "center",
                                "label": "获取渠道",
                                "prop": "date",
                                "width": "",
                                
                            },
                            {
                                "type": "text",
                                "align": "center",
                                "label": "领取时间",
                                "prop": "id",
                                "width": "",
                                
                            },
                            {
                                "type": "text",
                                "align": "center",
                                "label": "有效期",
                                "prop": "address",
                                "width": "",
                                
                            },
                        ],
                    }


            }
        },
        components: {
            NomalTable,
            TableTabs
        },
        created() {
            this.tableJson = this.tableJson0;
        },
        computed: {
           
        },
        methods: {
            pageTapsClick(index, tabs) { //index 是tabs的下标
                this.tableJson = this["tableJson" + index];
                this.url = this["url" + index];
                let testJson = {
                    list:[
                        {
                            "date": "1997-11-11",
                            "name": "林丽fdg",
                            "address": "吉林省 辽源市 龙山区dfg",
                            "switch" : "0",
                            "id":"0"
                        }, {
                            "date": "1987-09-24",
                            "name": "文敏dfg",
                            "address": "江西省 萍乡市 芦溪县",
                            "switch" : "0",
                            "id":"1"
                        }, {
                            "date": "1996-08-08",
                            "name": "杨秀兰",
                            "address": "黑龙江省 黑河市 五大连池市",
                            "switch" : "1",
                            "id":"2"
                        }, {
                            "date": "1978-06-18",
                            "name": "魏强dfg",
                            "address": "广东省 韶关市 始兴县",
                            "switch" : "0",
                            "id":"3"
                        }, {
                            "date": "1977-07-09gg",
                            "name": "石秀兰",
                            "address": "江苏省 宿迁市 宿豫区",
                            "switch" : "1",
                            "id":"4"
                        }, {
                            "date": "1994-09-20",
                            "name": "朱洋",
                            "address": "海外 海外 -",
                            "switch" : "0",
                            "id":"5"
                        }, {
                            "date": "1980-01-22",
                            "name": "傅敏",
                            "address": "海外 海外 -dfgdfg",
                            "switch" : "0",
                            "id":"6"
                        }, {
                            "date": "1985-10-10",
                            "name": "毛明",
                            "address": "内蒙古自治区 包头市 九原区",
                            "switch" : "1",
                            "id":"7"
                        }, {
                            "date": "1975-09-08",
                            "name": "何静",
                            "address": "西藏自治区 阿里地区 普兰县",
                            "switch" : "0",
                            "id":"8"
                        }, {
                            "date": "1970-06-07",
                            "name": "郭秀英",
                            "address": "四川省 巴中市 恩阳区",
                            "switch" : "0",
                            "id":"9"
                        }
                    ],
                    page:{
                        currentPage:"3",//当前页
                        total:"1000",//总条数
                    }
                };
                tabs.$parent.testJson = testJson;
                tabs.$parent.getData();
            },





        }
    }

</script>

<style scoped>

</style>
