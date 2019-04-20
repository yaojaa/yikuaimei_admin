<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag) in item" :key="tag.value" :to="{ path: '/user/userList', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table ref="table" :table-json="tableJson" url="/api/admin/user/index">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
        </div>
    </div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableSearch from '@/components/common/TableSearch'
    import BreadCrumb from "@/components/common/BreadCrumb";
    import Config from "./config";
    
    export default {
        name: 'userList',
        components: {
            NomalTable,
            TableSearch,
            BreadCrumb
        },
        data() {
            return {
                breadcrumb: [
                //面包屑
                {
                    name: "用户管理"
                },
                {
                    name: "用户列表",
                    url: "/user/userList?is_black=0"
                }
            ],
                status_filter: '',
                tagsListGroup: {
                    '注册渠道:': [
                        {
							title: "安卓平台",
							key: "channel",
							value: 1
						},
                        {
							title: "ios平台",
							key: "channel",
							value: 2
						},
                        {
							title: "微信小程序",
							key: "channel",
							value: 3
						},
                        {
							title: "微信服务号",
							key: "channel",
							value: 4
						},
                        {
							title: "PC网页",
							key: "channel",
							value: 5
						},
                        {
							title: "移动平台网页",
							key: "channel",
							value: 6
						},
                        {
							title: "未知注册渠道",
							key: "channel",
							value: 0
                        },
                        {
							title: "其他",
							key: "channel",
							value: 7
						},
                    ],
                    "选择状态:": [
                        {
							title: "未拉黑",
							key: "is_black",
							value: 0
                        },
                        {
							title: "已拉黑",
							key: "is_black",
							value: 1
						},
                    ]
                },
                //状态 0全部 1待处理 2已付款/待发货 3已发货 4已发货/待评价 5已评价 8已取消
                searchs: {
                    list: [{
                            type: "input-text", //输入文本
                            label: "用户名",
                            name: "real_name",
                            value: "",
                            placeholder: "用户名",
                        },
                        {
                            type: "input-text", //输入文本
                            label: "手机号",
                            name: "bind_phone",
                            value: "",
                            placeholder: "手机号",
                        },
                        {
                            type: "input-text", //选择器
                            label: "推荐人/门店",
                            name: "recommend_name",
                            value: "",
                            placeholder: "推荐人/门店",
                        },
                        {
                        "type": "input-singal-date", //输入日期
                        "label": "开始时间",
                        "name": "start_time",
                        "value": "",
                        },
                        {
                            "type": "input-singal-date", //输入日期
                            "label": "结束时间",
                            "name": "end_time",
                            "value": "",
                        },
                    ]
                },
                tableJson: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "用户/手机号",
                            "width": "250",
                            formatter(row) {
                                let str = "<div style='background-color#fff;padding:8px;'>";
                                str += "<div style='float:left;width:80px;height:80px;margin-right:8px;'><img style='width:100%; height:100%;' src='" +row.user_info_head_img + "'></div>";
                                str += "<p class='list-good-name'>" + row.user_info_nick_name + "</p>";
                                str += "<p class='list-good-price' style='margin-top:10px;'>" + row.user_bind_phone + "</p>";
                                str += "</div>";
                                return str;
                            }
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "注册时间",
                            "prop": "user_info_ctime",
                            "width": "",
                            formatter(row) {
								return `<p style='text-align: center'>
		                                    ${row.user_info_ctime || '--'}
		                                </p>`;
							}
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "注册渠道",
                            "prop": "",
                            "width": "",
                            formatter(row) {
								return `<p style='text-align: center'>
		                                    ${Config.user_from[row.user_from] || '--'}
		                                </p>`;
							}
    
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "推荐人门店",
                            "prop": "my_superior",
                            "width": "",
                            formatter(row) {
								return `<p style='text-align: center'>
		                                    ${row.my_superior || '--'}
		                                </p>`;
							}
    
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "状态",
                            "prop": "",
                            "width": "",
                            formatter(row) {
								return `<p style='text-align: center'>
		                                    ${Config.is_black[row.is_black] || '--'}
		                                </p>`;
							}
                        },
                        {
                            "type": "handle",
                            "label": "操作",
                            "align": "center",
                            "width": "200",
                            "list": [{
                                "label": "查看详情",
                                "url": "/user/detail",
                                "query": "user_id"
                            }]
                        }
                    ],
                }
    
    
    
            }
        },
        beforeRouteUpdate(to, from, next) {
            console.log(to.query)
            this.status_filter = Object.keys(to.query)[0] + Object.values(to.query)[0]
            console.log(this.status_filter)
            this.$refs.table.getData(to.query)
            next()
        },
        created() {
            console.log('created')
        },
        computed: {
        },
        methods: {
            //调用子组件的gatData方法
            getData(k, v) {
                this.$refs.table.getData({
                    [k]: v
                })
            }
        }
    }
</script>

<style scoped>
    
</style>