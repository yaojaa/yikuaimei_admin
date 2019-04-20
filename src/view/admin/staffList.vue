<template>
    <div class="page">
        <div class="page-header">
             <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            <div class="page-header-actions">
				<el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/admin/addStaff' })">添加成员</el-button>
			</div>
        </div>
        <div class="page-content">
            <nomal-table ref="table" :table-json="tableJson" url="/api/admin/adminUser/list">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
        </div>
    </div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableSearch from '@/components/common/TableSearch'
    import BreadCrumb from "@/components/common/BreadCrumb";
    
    export default {
        name: 'staffList',
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
                    name: "平台管理"
                },
                {
                    name: "成员管理",
                    url: "/admin/staffList"
                }
            ],
                status_filter: '',
                searchs: {
                    list: [{
                            type: "input-text", //输入文本
                            label: "用户名",
                            name: "user_name",
                            value: "",
                            placeholder: "例：张三",
                        },
                        {
                            type: "input-text", //输入文本
                            label: "真实姓名",
                            name: "user_realname",
                            value: "",
                            placeholder: "例：客服",
                        }
                        
                    ]
                },
                tableJson: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "序号",
                            "prop": "user_id",
                            "width": "50"
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "成员姓名",
                            "prop": "user_realname",
                            "width": "",
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "角色名称",
                            "prop": "role_name",
                            "width": "",
    
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "登录账号",
                            "prop": "user_name",
                            "width": "",
    
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "创建时间",
                            "prop": "",
                            "width": "",
                            formatter(row) {
								return `<p style='text-align: center'>
		                                    ${row.user_ctime || '--'}
		                                </p>`;
							}
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "最后登录",
                            "prop": "user_last_logintime",
                            "width": "",
                            formatter(row) {
								return `<p style='text-align: center'>
		                                    ${row.user_last_logintime || '--'}
		                                </p>`;
							}
                        },
                        {
                            "type": "handle",
                            "label": "操作",
                            "align": "center",
                            "width": "200",
                            "list": [{
                                "label": "编辑",
                                onClick(tablePage, self, row) {
                                   
                                    self.$router.push("/admin/addStaff/" + row.user_id)
                                }
                            }, {
                                "label": "删除",
                                 onClick(tablePage, self, row) {
                                     self.removeUser(row.user_id)
                                }
                                
                            },


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
            removeUser(data){
                const params = {
                    "user_id":data
                }
                this.$axios.post("/api/admin/adminUser/delete", params).then(res => {
                if (res.data.code == 0) {
                    this.$alert('操作成功')
                    this.$refs.table.getData({
                        is_page: 1,
                        page: 1
                    });
                } else {
                    this.$alert('操作失败' + res.data.msg)
                }

                }).catch((e) => {
                    this.$alert('操作失败' + e)
                })
            },
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