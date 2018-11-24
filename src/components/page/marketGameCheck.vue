<template>
<div>
    <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
    <nomal-table :table-json="tableJson" :url="url">
        <table-tabs :page-tabs="pageTapsCard" @tabs-click="pageTapsClick"></table-tabs>
    </nomal-table>
</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableTabs from '@/components/common/TableTabs'
    import BreadCrumb from '@/components/common/BreadCrumb'

    export default {
        name: 'userlist',
        data() {
            return {
                url:"",
                url0:"",
                url1:"",
                breadcrumb: [  //面包屑
                    {
                        "name" :"营销管理", //名字
                    },
                    {
                        "name" :"游戏",
                    },
                    {
                        "name" :"参与商家/分公司",
                    }
                ],
                pageTapsCard:{
                    "type":"card",
                    "list":[
                        {
                            "label":"分公司",
                            "name": "0",
                        },
                        {
                            "label":"商家",
                            "name": "1",
                        },
                    ],
                    "activeVal":"1" //初始值
                },
                tableJson:{
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "商家名称",
                            "prop": "name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "参加时间",
                            "prop": "date",
                            "width": "",
                            
                        },
                    ],
                },


            }
        },
        components: {
            NomalTable,
            TableTabs,
            BreadCrumb
        },
        created() {
        },
        computed: {
           
        },
        methods: {
            pageTapsClick(index, tabs) { //index 是tabs的下标
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
