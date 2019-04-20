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
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag) in item" :key="tag.value" :to="{ path: '/user/beautifulLIst', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" url="/api/admin/beautydiary/index">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
            <el-dialog :title="freeze==2?'冻结':'解冻'" :visible.sync="dialog" width="30%">
                <p style="color:red">此操作会{{freeze==2?'冻结':'解冻'}}门店</p>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="doUpdateIsUse">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableSearch from '@/components/common/TableSearch'
    import BreadCrumb from "@/components/common/BreadCrumb";

    
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
                    name: "美丽档案",
                    url: "/user/beautifulList"
                }
            ],
                status_filter: '',
                freeze:null,
                dialog:false,
                beauty_id:"",
                tagsListGroup: {
                    
                    "选择状态:": [
                        
                        {
							title: "未冻结",
							key: "freeze",
							value: 1
                        },
                        {
							title: "已冻结",
							key: "freeze",
							value: 2
						},
                    ]
                },
                //状态 0全部 1待处理 2已付款/待发货 3已发货 4已发货/待评价 5已评价 8已取消
                searchs: {
                    list: [{
                            type: "input-text", //输入文本
                            label: "用户名",
                            name: "user_name",
                            value: "",
                            placeholder: "用户名",
                        },
                        {
                            type: "input-text", //输入文本
                            label: "手机号",
                            name: "user_phone",
                            value: "",
                            placeholder: "手机号",
                        },
                        {
                            type: "input-text", //选择器
                            label: "档案ID",
                            name: "id",
                            value: "",
                            placeholder: "档案ID",
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
                        }
                    ]
                },
                tableJson: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "档案ID",
                            "prop":"_id",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "创建时间",
                            "prop": "create_time",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "内容",
                            "prop": "content",
                            "width": "",
                           
    
                        },
                        {
                        "type": "text",
                        "align": "center",
                        "label": "用户/手机号",
                        "width": "",
                        formatter(row) {
                            let str = "<div>";
                            str += "<p>" + row.order_detail_order_user_name + "</p>";
                            str += "<p>" + row.order_detail_order_user_phone + "</p>";
                            str += "</div>";
                            return str;
                            }

                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "状态",
                            "prop": "",
                            "width": "",
                            // formatter(row) {
                            //     return row.freeze==1?"未冻结":"已冻结"
                            // }
                            formatter(row) {
                            return `<div style="color:red">
                                ${row.freeze==1?'未冻结':'已冻结'}
                                </div>`
                            }
                        },
                        {
                            "type": "switch_button",
                            "label": "操作",
                            "align": "center",
                            "width": "50",
                            "prop": "freeze",
                            "value": ['冻结','解冻']
                        },

                        {
                            "type": "handle",
                            "label": "查看",
                            "align": "center",
                            "width": "200",
                            "list": [
                                {
                                    "label": "查看详情",
                                    "url": "/user/beautifulDetail",
                                    "query": "beauty_id"
                                }
                            ]
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
            listenSwitchChange(data) {
             

            const { beauty_id, freeze } = data.value

            this.freeze = freeze == 1 ? 2 : 1
             this.dialog = true
             this.beauty_id = beauty_id

            
            
        },
        doUpdateIsUse() {
            const params ={
                id:this.beauty_id,
                freeze:this.freeze
            }
           
            this.$axios.post("/api/admin/beautydiary/freeze", params).then(res => {
                this.dialog = false;
                
                console.log(res)

                if (res.data.code == 0) {
                    //this.freeze = 0
                    this.$refs.table.getData({
                        is_page: 1,
                        page: 1
                    });

                    this.$alert(res.data.data)

                } else {
                    this.$alert(res.data.msg)

                }


            }).catch((e) => {

                this.$alert('操作失败' + e)

            })

        },
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