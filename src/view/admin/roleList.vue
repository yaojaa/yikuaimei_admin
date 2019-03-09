<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content">
            <nomal-table ref="table" :table-json="tableJson" url="/api/admin/adminRole/list">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
        </div>
    </div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableSearch from '@/components/common/TableSearch'
    
    export default {
        name: 'roleList',
        components: {
            NomalTable,
            TableSearch
        },
        data() {
            return {
                status_filter: '',
                
                searchs: {
                    list: [{
                            type: "input-text", //输入文本
                            label: "角色名称",
                            name: "role_name",
                            value: "",
                            placeholder: "角色名称",
                        }
                    ]
                },
                tableJson: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "用户/手机号",
                            "prop": "role_name",
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "注册时间",
                            "prop": "role_ctime",
                            "width": "",
                            formatter(row) {
								return `<p style='text-align: center'>
		                                    ${row.user_info_ctime || '--'}
		                                </p>`;
							}
                        },
                        {
                            "type": "handle",
                            "label": "操作",
                            "align": "center",
                            "width": "200",
                            "list": [{
                                "label": "权限设置",
                                "url": "/admin/addRole",
                                "query": "role_id"
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