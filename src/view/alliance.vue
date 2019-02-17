<template>
 <div class="page">
        <div class="page-header">
         <el-breadcrumb separator-class="el-icon-arrow-right" >
                <el-breadcrumb-item>加盟商</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb> 

            <div class="sub-heading">
            <h3  class="sub-title">
                <span  class="title">加盟商列表</span></h3> 
                <div class="sub-actions">
<el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/alliance_add' })">添加加盟商</el-button>
                </div>
        </div>
        </div> 

    <div class="status_filter" v-for="(item,key,index) in tagsListGroup" :key="index">
                <ul>
                    <li class="tags-li">
                        {{key}}
                        <router-link :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag) in item" :key="tag.value" :to="{ path: '/goodList', query: {
                                                            [tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
    
                    </li>
                </ul>
            </div>

     <nomal-table ref="table" :table-json="tableJson" :url="url">
      <table-search :searchs="searchs"></table-search>

     </nomal-table>


     <el-dialog title="启停" :visible="visible" width="30%">
                <p>确定要下架{{currentItem.good_name}}吗?</p>
                <p>操作人:{{user.data.user_realname}}</p>
                 <p>操作备注:</p>
                 <p><textarea>324343434</textarea></p>

                <!-- <span>{{currentItem.name}}</span> -->
                <span slot="footer" class="dialog-footer">
                                      <el-button @click="visible = false">取 消</el-button>
                                      <el-button type="primary" @click="doUpdateIsUse">确 定</el-button>
                                  </span>
            </el-dialog>


</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableSearch from '@/components/common/TableSearch'

    export default {
        data() {
            return {
                status_filter: "",
                tagsListGroup:{
                	'选择类型:':[
			                {title:'全部',key:'business_type',value:''},
			                {title:'加盟',key:'business_type',value:1},
			                {title:'非加盟',key:'business_type',value:2}
                             ],

                    '选择状态:':[
			                {title:'全部',key:'business_is_use',value:''},
			                {title:'停用',key:'business_is_use',value:0},
			                {title:'启用',key:'business_is_use',value:1}
                             ]
                },
                searchs:{
                    "list": [
                        {
                            "type": "input-text",  //输入文本
                            "label": "加盟商名称",
                            "name": "business_name",
                            "value": "",
                            "placeholder": "加盟商名称",
                        },
                        {
                            "type": "input-text",  //输入文本
                            "label": "店长",
                            "name": "city",
                            "value": "",
                            "placeholder": "",
                        },
                        {
                            "type": "input-text",  //选择器
                            "label": "城市",
                            "name": "option",
                            "value": "all",
                            "options": [
                                {
                                    "name":"全部",
                                    "value":"all",
                                },
                                {
                                    "name":"option2",
                                    "value":"option2",
                                },
                                {
                                    "name":"option3",
                                    "value":"option3",
                                },
                            ],
                        },
                        {
                            "type": "input-date",  //输入日期
                            "label":"加盟日期",
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
                            "label": "加盟商门店",
                            "prop": "business_name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "法人姓名/手机号",
                            "prop": "business_corporation",
                            "width": "",
                            formatter(row) {
                                return `<p style='text-align: center'>
                                ${row.business_corporation}<br/>
                                ${row.business_phone}
                                                    </p>`;
                            }
                            
                        },
                      
                        {
                            "type": "text",
                            "align": "center",
                            "label": "类型",
                            "width": "",
                            formatter(row){
                                return row.business_type==1?'加盟':'非加盟'
                            }
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "城市",
                            "prop": "city_name",
                            "width": "",
                            
                        },
                        {
                            "type": "switch",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            "prop": "business_is_use",
                            "config":{
                                value:['停用','启用'],
                                activeColoe:'#7224D8'
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
        created() {
            
        },
        computed: {
           
        },
        methods: {
        	//调用子组件的gatData方法
        	//
            openModal(){

                console.log('openModal')
            },
        	getData(k,v){
        	this.$refs.table.getData({[k]:v})
        	}


        }
    }

</script>

<style scoped>

</style>
