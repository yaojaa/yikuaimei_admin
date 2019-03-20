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
<router-link :class="tag.key+tag.value == status_filter?'active':'rrrr'" v-for="(tag) in item" :key="tag.value" :to="{ path: '/order/product_phase', query: {
[tag.key]: tag.value }}">{{tag.title}}</router-link>
 
            </li>
        </ul>
      </div>
     <nomal-table ref="table" :table-json="tableJson" :url="'/api/admin/purchase/index'">
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
                	'订单类型:':[
			                {title:'全部',key:'business_type',value:''},
			                {title:'利润归门店',key:'business_type',value:1},
			                {title:'利润归平台',key:'business_type',value:2}
                             ],
                     '订单状态:':[
                      {title:'全部',key:'status',value:0},
                      {title:'待审核',key:'status',value:1},
                      {title:'已同意',key:'status',value:2},
                      {title:'已修改',key:'status',value:3},
                      {title:'已拒绝',key:'status',value:4}
                     ]
                },
                //状态 0全部 1待处理 2已付款/待发货 3已发货 4已发货/待评价 5已评价 8已取消

                searchs:{
                    "list": [
                        {
                            "type": "input-text",  //输入文本
                            "label": "采购单号",
                            "name": "purchase_id",
                            "value": "",
                            "placeholder": "采购单号"
                        }
                    ]
                },
                tableJson: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "采购时间",
                            "prop": "purchase_ctime",
                            "width": "300"
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "采购门店",
                            "prop": "shop_name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "采购人员",
                            "prop": "shop_user_name",
                            "width": ""
                        },
                          {
                            "type": "text",
                            "align": "center",
                            "label": "采购单号",
                            "prop": "purchase_id",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "采购金额",
                            "prop": "purchase_price",
                            "width": ""
                        },
                          {
                            "type": "text",
                            "align": "center",
                            "label": "提成归属",
                            "prop": "recipients",
                            "width": ""
                        },
                          {
                            "type": "text",
                            "align": "center",
                            "label": "审核状态",
                            "prop": "purchase_status_name",
                            "width": ""
                        },
                        {
                            "type": "text",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            formatter:function(row){

                                let str = '<div>'
                                str +='<a href="/order/product_phase/'+row.purchase_id+'" class="el-button reset el-button--default el-button--small is-plain" >报货信息</a>'

                                 // str +='<a href="/order/product_phase'+row.order_code+'" class="el-button reset el-button--default el-button--small is-plain" >回执单</a>'

                                str += '</div>'

                                return str
                                


                            }
                           
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
        	},

            //获取订单提成利润时间
            //
            getAliceData(){
                ///api/admin/orderService/profit 
            }
            


        }
    }

</script>

<style scoped>

</style>
