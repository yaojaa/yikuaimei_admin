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
<router-link :class="tag.key+tag.value == status_filter?'active':'rrrr'" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/case', query: {
[tag.key]: tag.value }}">{{tag.title}}</router-link>
 
            </li>
        </ul>
      </div>

        <nomal-table ref="table" :table-json="tableJson" :url="url"></nomal-table>
</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'

    export default {
        data() {
            return {
                status_filter:'',
                tagsListGroup:{
                	'选择状态:':[
			                {title:'全部',key:'all'},
			                {title:'已审核',key:'all'},
			                {title:'全部',key:'未审核'}
                             ],

                    '选择分类:':[
			                {title:'全部',key:'all'},
			                {title:'已审核',key:'all'},
			                {title:'全部',key:'未审核'}
                             ],
                    '选择标签:':[
			                {title:'全部',key:'all'},
			                {title:'已审核',key:'all'},
			                {title:'全部',key:'未审核'}
                             ]
                },
                url: "./static/vuetable.json",
                tableJson: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "ID",
                            "prop": "name",
                            "width": ""
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "创建时间",
                            "prop": "name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "内容",
                            "prop": "address",
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
                            "prop": "date",
                            "width": "",
                            
                        },
                         {
                            "type": "text",
                            "align": "center",
                            "label": "状态",
                            "prop": "date",
                            "width": "",
                            
                        },
                        {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            "list": [
                                {
                                    "label":"查看",
                                    "type":"detail",
                                    "url":"/care/templateWeChat", //优先执行url

                                },
                                {
                                    "label":"编辑",
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

            console.log(to.query)

            this.status_filter = Object.keys(to.query)[0]+Object.values(to.query)[0]

            console.log(this.status_filter)

            this.$refs.table.getData(to.query)
            next()
        },
        computed: {
           
        },
        methods: {


        }
    }

</script>

<style scoped>

</style>
