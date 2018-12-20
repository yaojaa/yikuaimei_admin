<template>
 <div class="page">
        <div class="page-header">
         <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>案例</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb> 
        </div> 

       <div class="status_filter" v-for="(item,key,index) in tagsListGroup">
        <ul>
            <li class="tags-li" >
                  {{key}} 
<router-link :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/case', query: {
[tag.key]: tag.value }}">
{{tag.title}}</router-link>
 
            </li>
        </ul>
      </div>

        <nomal-table ref="table" :table-json="tableJson" :url="'/api/admin/cases/index'"></nomal-table>
</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'

    export default {
        data() {
            return {
                status_filter:'',
                category:[],
                tagsListGroup:{
                	'审核状态:':[
			                {title:'全部',key:'review_status',value:'all'},
			                {title:'已审核',key:'review_status',value:'1'},
			                {title:'全部',key:'review_status',value:'2'}
                             ],
                    '选择标签:':[
			                {title:'全部',key:'2'},
			                {title:'已审核',key:'1'},
			                {title:'全部',key:'未审核'}
                             ]
                },
                url: "./static/vuetable.json",
                tableJson: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "案例编号",
                            "prop": "_id",
                            "width": ""
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
                            "prop": "user_info.user_name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "门店/技师",
                            "prop": "address",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "城市",
                            "prop": "create_user['city_name']",
                            "width": "",
                            
                        },
                         {
                            "type": "text",
                            "align": "center",
                            "label": "状态",
                            "prop": "review_status",
                            "width": "",
                            
                        },
                        {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            "list": [
                                {
                                    "label":"查看详情",
                                    "type":"detail",
                                    "url":"/care/templateWeChat", //优先执行url

                                },
                                {
                                    "label":"查看评论",
                                    "type":"edit",
                                    "url":"/care/templateWeChat", //优先执行url

                                },
                                {
                                    "label":"删除",
                                    "type":"delete"
                                },
                            ]
                        }
                    ],
                }



            }
        },
        components: {
            NomalTable
        },
        created() {
            
        },
        beforeRouteUpdate (to, from, next) {

            this.status_filter = Object.keys(to.query)[0]+Object.values(to.query)[0]
            console.log(this.status_filter)
            this.$refs.table.getData(to.query)
            next()
        },
        computed: {

           
        },
        mounted(){
            this.getcategoryList()
        },
        methods: {
            //获取行业分类列表
            getcategoryList(){
                this.$axios.get('/api/admin/select/categoryList')
                .then((res)=>{
                    const categoryData = res.data.data.map((item)=>{
                        return   {
                            title:item.category_name,
                            key:'category_id',
                            value:item.category_id
                        }
                    })

                    this.tagsListGroup['行业分类'] = categoryData
                    this.$forceUpdate()
                })
            }

        }
    }

</script>

<style scoped>

</style>
