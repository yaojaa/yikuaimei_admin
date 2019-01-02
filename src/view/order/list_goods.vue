<template>
 <div class="page">
        <div class="page-header">
         <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb> 
        </div> 



     <div class="status_filter" v-for="(item,key,index) in tagsListGroup" :key="index">
        <ul>
            <li class="tags-li" >
                  {{key}} 
<router-link :class="tag.key+tag.value == status_filter?'active':'rrrr'" v-for="(tag) in item" :key="tag.value" :to="{ path: '/order/list_goods', query: {
[tag.key]: tag.value }}">{{tag.title}}</router-link>
 
            </li>
        </ul>
      </div>
     <nomal-table ref="table" :table-json="tableJson" :url="'/api/admin/order/index'">
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

                status_filter:'',

                tagsListGroup:{
                	'订单类型：':[
			                {title:'全部',key:'business_type',value:''},
			                {title:'利润归门店',key:'business_type',value:1},
			                {title:'利润归平台',key:'business_type',value:2}
                             ],
                     '订单状态：':[

                      {title:'全部',key:'status',value:0},
                      {title:'待处理',key:'status',value:1},
                      {title:'已付款',key:'status',value:2},
                      {title:'已发货',key:'status',value:3},
                      {title:'待评价',key:'status',value:4},
                      {title:'已评价',key:'status',value:5},
                      {title:'已取消',key:'status',value:8},

                     ]
                },
                //状态 0全部 1待处理 2已付款/待发货 3已发货 4已发货/待评价 5已评价 8已取消

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
                tableJson: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "商品名称",
                            "prop": "business_ctime",
                            "width": "",
                             formatter(row) {
                                let str = "<div style='display:flex; background-color#fff;'>";
                                str += "<div style='width:80px;height:80px;padding:8px; flex-shrink:0;'><img style='width:100%; height:100%;' src='/static/img/img.jpg'></div>";
                                
                                str += "</div>";
                                return str;
                            }
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "创建时间",
                            "prop": "order_ctime",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "姓名",
                            "prop": "order_user_name",
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
                                    "label":"查看详情",
                                    "url":"/order/order_detail",
                                    "query":"order_code"
                                }
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
        beforeRouteUpdate (to, from, next) {

            console.log(to.query)

            this.status_filter = Object.keys(to.query)[0]+Object.values(to.query)[0]

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
        	//
        	getData(k,v){
        	this.$refs.table.getData({[k]:v})
        	}


        }
    }

</script>

<style scoped>

</style>
