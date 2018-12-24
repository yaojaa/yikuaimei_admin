<template>
 <div class="page">
        <div class="page-header">
         <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb> 
        </div> 



     <div class="tags" v-for="(item,key,index) in tagsListGroup">
        <ul>
            <li class="tags-li">
                  {{key}} 


  <span> v-for="(tag,i) in item" @click="getData(tag.key,tag.value)" size="small">{{tag.title}} </span>

               
            </li>
        </ul>
      </div>
     <nomal-table ref="table" :table-json="tableJson" :url="url">
      <table-search :searchs="searchs"></table-search>

     </nomal-table>


</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableSearch from '@/components/common/TableSearch'

    export default {
        data() {
            return {

                tagsListGroup:{
                	'订单类型：':[
			                {title:'全部',key:'business_type',value:''},
			                {title:'利润归门店',key:'business_type',value:1},
			                {title:'利润归平台',key:'business_type',value:2}
                             ]
                },
                searchs:{
                    "list": [
                        {
                            "type": "input-text",  //输入文本
                            "label": "用户名",
                            "name": "business_name",
                            "value": "",
                            "placeholder": "用户名",
                        },
                        {
                            "type": "input-text",  //输入文本
                            "label": "手机号",
                            "name": "city",
                            "value": "",
                            "placeholder": "",
                        },
                        {
                            "type": "input-text",  //选择器
                            "label": "订单号",
                            "name": "option",
                            "value": ""
                            
                        },
                         {
                            "type": "input-text",  //选择器
                            "label": "商品名称",
                            "name": "option",
                            "value": ""
                            
                        },
                        {
                            "type": "input-date",  //输入日期
                            "label":"日期",
                            "name": "date",
                            "value":"",

                        },
                    ]
                },
                url: "/api/admin/business/index",

                tableJson: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "加盟日期",
                            "prop": "business_ctime",
                            "width": ""
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "创建时间",
                            "prop": "business_ctime",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "店长",
                            "prop": "business_corporation",
                            "width": "",
                            
                        },
                          {
                            "type": "text",
                            "align": "center",
                            "label": "电话",
                            "prop": "business_phone",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "类别",
                            "prop": "category_id",
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
                                    "label":"启用",
                                    "type":"edit",
                                    "url":"/care/templateWeChat", //优先执行url

                                },
                                {
                                    "label":"停用",
                                    "type":"delete"
                                },
                            ]
                        }
                    ],
                }



            }
        },
        components: {
            NomalTable,
            TableSearch
        },
        created() {
            
        },
        computed: {
           
        },
        methods: {
        	//调用子组件的gatData方法
        	//
        	getData(k,v){
        	this.$refs.table.getData({[k]:v})
        	}


        }
    }

</script>

<style scoped>

</style>
