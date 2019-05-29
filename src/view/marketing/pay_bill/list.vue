<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
               <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/marketing/pay_bill/add' })">添加</el-button>
            </div>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/marketing/invite/list', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
            
            <el-dialog :title="activity_status==2?'上线':'下线'" :visible.sync="dialog" width="30%">
                <p style="color:red">此操作会{{activity_status==2?'上线':'下线'}}{{activity_title}}活动</p>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="upperShelf">确 定</el-button>
                </span>
            </el-dialog>
            
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable' 
import BreadCrumb from "@/components/common/BreadCrumb";
import TableSearch from '@/components/common/TableSearch'


export default {
    data() {
        return {
             breadcrumb: [
                //面包屑
                {
                    name: "营销管理/营销应用", //名字
                    url: '/marketing/markList'
                },
                {
                    name: "你变美我买单", //名字
                    url: '/marketing/pay_bill/list'
                }
            ],
            dialog:false,
            status_filter: "",
            activity_status:null,
            activity_title:"",
            activity_code:"",

            tagsListGroup: {
                '活动状态:': [
                    { title: '下架', key: 'activity_status', value: 1 },
                    { title: '上架', key: 'activity_status', value: 2 }
                ],
                 '活动分类:': [
                    { title: '商品', key: 'activity_goods_type', value: 1 },
                    { title: '服务', key: 'activity_goods_type', value: 2 }
                ]
            },
            searchs: {
                "list": [
                    {
                        "type": "input-text", //输入文本
                        "label": "活动ID",
                        "name": "activity_code",
                        "value": "",
                        "placeholder": "",

                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "标题",
                        "name": "activity_title",
                        "value": "",
                        "placeholder": "",

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

            url: "/api/admin/activity/index?activity_rule_type=25",

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "活动ID",
                        "prop": "activity_code",
                        "width": "120px",
                       
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "创建时间",
                        "prop": "activity_ctime",
                        "width": "200px",

                    },
                    
                    {
                        "type": "text",
                        "align": "center",
                        "label": "活动标题",
                        "prop": "activity_title",
                        "width": "",

                    },
                    
                    
                    // {
                    //     "type": "text",
                    //     "align": "center",
                    //     "label": "创建人",
                    //     "prop": "admin_user_name",
                    //     "width":"120px"

                    // },
                   
                    {
                        "type": "text",
                        "align": "center",
                        "label": "活动时间",
                        "prop": "coupon_expire",
                        "width": "",
                        formatter(row) {
                            return `<p style='text-align: center'>
                            ${row.activity_start_time||""}<br/>至<br/>
                            ${row.activity_end_time||""}</p>`;
                           
                        }

                    },
                    
                    {
                        "type": "text",
                        "label": "状态",
                        "align": "center",
                        "width": "",
                        "prop": "activity_status",
                        formatter(row) {
                            // console.log(row,'row');
                            return row.activity_status == 1 ? `<p style='text-align: center'>未发布</p>` : `<p style='text-align: center'>已发布</p>`
                        }
                            	
                    },
                    {
                        "type": "switch_button",
                        "label": "上线/下线",
                        "align": "center",
                        "width": "100",
                        "prop": "activity_status",
                        "value": ['上线','下线']
                    },
                    
                    {
							"type": "handle",
							"label": "操作",
							"align": "center",
							"width": "260",
							"list": [
                    
                                
                                {
									"label": "编辑",
									"type": "edit",
                                    // "url": "", //优先执行url
                                    onClick(tablePage, self, row) {
                                        console.log(self,'self')
                                         console.log(row,'row')
                                        self.$router.push("/marketing/pay_bill/add/" + row.activity_code)
                                    }
									// onClick(tablePage, self, record) {
                                        
                                    //     console.log(record,'record')
									// 	self.$router.push({
									// 		path: '/marketing/addCoupon',
									// 		query: {
                                    //             coupon_code:record.coupon_code
                                    //             }
									// 	})
									// }
                                },
                                {
                                    "label": "详情",
                                    "type": "detail",
                                    onClick(tablePage, self, row) {
                                        self.$router.push("/marketing/pay_bill/Info/" + row.activity_code)
                                    }

                                },
                                  {
                                    "label": "参与用户",
                                    "type": "detail",
                                    onClick(tablePage, self, row) {
                                        self.$router.push("/marketing/pay_bill/users/" + row.activity_code)
                                    }

                                },
                                {
                                    "label": "中奖名单",
                                    "type": "detail",
                                    onClick(tablePage, self, row) {
                                        self.$router.push("/marketing/pay_bill/name_list/" + row.activity_code)
                                    }

                                }
                                
								
								
							]
						},


                ],
            }



        }
    },
    components: {
        NomalTable,
        BreadCrumb,
        TableSearch
    },
    beforeRouteUpdate(to, from, next) {
			console.log(to.query);
	
			this.status_filter = Object.keys(to.query)[0] + Object.values(to.query)[0];
	
			// console.log(this.status_filter);
			this.$refs.table.getData(to.query);
			next();
		},
    created() {

    },
    computed: {

    },
    methods: {
        upperShelf(){
            const params ={
                activity_code:this.activity_code
            }
            if(this.activity_status==1){
                console.log(11111)
                //下架
                this.$axios.post("/api/admin/activity/close", params).then(res => {
                    if(res.data.code == 0){
                        this.$alert('操作成功')
                        this.dialog = false
                        this.$refs.table.getData({
                            is_page: 1,
                            page: 1
                        });
                    }else{
                        this.$alert(res.data.msg)
                    }
                }).catch((e)=>{

                    this.$alert('操作失败'+e)

                })
                
            }
            if(this.activity_status==2){
                //上架
                this.$axios.post("/api/admin/activity/publish", params).then(res => {
                    if(res.data.code == 0){
                        this.$alert('操作成功')
                        this.dialog = false
                        this.$refs.table.getData({
                            is_page: 1,
                            page: 1
                        });
                    }else{
                        this.$alert(res.data.msg)
                    }
                }).catch((e)=>{

                    this.$alert('操作失败'+e)

                })
                
             }
            
        },
        
        //调用子组件的gatData方法
        //
        listenSwitchChange(data) {
           


            const { activity_title, activity_status,activity_code } = data.value

            this.activity_status = activity_status == 2 ? 1 : 2
            this.activity_title = activity_title
            this.activity_code = activity_code
             this.dialog = true
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