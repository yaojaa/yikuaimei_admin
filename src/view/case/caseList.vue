<template>
 <div class="page">
        <div class="page-header">
         <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>案例</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb> 
        </div> 

     <div class="tags" v-for="(item,key,index) in tagsListGroup">
        <ul>
            <li class="tags-li">
                  {{key}} <span v-for="(tag,i) in item"> 
                 <a :href="'?tag='+tag.key"> {{tag.title}} </a>
              </span>
            </li>
        </ul>
      </div>

        <nomal-table :table-json="tableJson" :url="url"></nomal-table>
</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'

    export default {
        data() {
            return {
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
        computed: {
           
        },
        methods: {


        }
    }

</script>

<style scoped>

</style>
