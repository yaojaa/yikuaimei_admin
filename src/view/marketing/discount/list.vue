<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/marketing/addCoupon' })">添加</el-button>
            </div>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/marketing/fullReducionCouponList', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
            <el-dialog title="兑换码生成" :visible.sync="dialogCode" width=40% center>
                <el-form>
                    <el-form-item label="标题:" label-width=140px>
                        <el-input v-model="exchange_coupon_title" autocomplete="off" style="width:220px"></el-input>
                    </el-form-item>
                     <el-form-item label="开始时间:" label-width=140px>
                        <el-date-picker
                            v-model="codeStartTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间:" label-width=140px>
                        <el-date-picker
                            v-model="codeEndTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="兑换数量:" label-width=140px>
                        <el-input v-model="codeTotalNumber" placeholder="请输入数字" style="width:220px"></el-input>
                    </el-form-item>
                    <el-form-item label="每人兑换数量限制:" label-width=140px>
                        <el-input v-model="codeUserLimit" placeholder="请输入数字" style="width:220px"></el-input><span> 次</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogCodeClose">取 消</el-button>
                    <el-button type="primary" @click="dialogCodeSure">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog :title="coupon_status==2?'上架':'下架'" :visible.sync="dialog" width="30%">
                <p style="color:red">此操作会{{coupon_status==2?'上架':'下架'}}{{coupon_title}}优惠券</p>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="upperShelf">确 定</el-button>
                </span>
            </el-dialog>
            <!-- <el-dialog :title="is_use==0?'停用':'启用'" :visible.sync="dialog" width="30%">
                <p style="color:red">此操作会{{is_use==0?'停用':'启用'}}门店</p>
                <p>操作人:{{user.data.user_realname}}</p>
                <p>操作备注:</p>
                <p>
                    <el-input type="textarea" autosize placeholder="请输入操作备注" v-model="remark">
                    </el-input>
                </p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="doUpdateIsUse">确 定</el-button>
                </span>
            </el-dialog> -->
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'
import BreadCrumb from "@/components/common/BreadCrumb"


export default {
    data() {
        return {
            breadcrumb: [
                //面包屑
                {
                    name: "营销管理", //名字
                    url: '/marketing/markList'
                },
                {
                    name: "折扣券", //名字
                    url: '/marketing/discount/list'
                }
            ],
            user: JSON.parse(localStorage.user),
            dialogCode: false,
            coupon_code:"",
            coupon_title:"",
            coupon_status:null,
            dialog:false,
            exchange_coupon_title:"", //兑换码标题
            codeStartTime:"",// 开始时间
            codeEndTime:"",
            codeTotalNumber:"",
            codeUserLimit:"",
            business_id: '',
            is_use: '',
            remark: '无',
            currentItem: {},
            status_filter: "",
            tagsListGroup: {
                '活动状态:': [
                    { title: '全部', key: 'coupon_rule_type', value: 0 },
                    { title: '上架', key: 'coupon_rule_type', value: 1 },
                    { title: '下架', key: 'coupon_rule_type', value: 2 }
                ]
            },
            searchs: {
                "list": [
                    {
                        "type": "input-text", //输入文本
                        "label": "折扣券ID",
                        "name": "coupon_code",
                        "value": "",
                        "placeholder": "",

                    }
                    
                   
                ]
            },
            url: "/api/admin/activity/index?activity_rule_type=7",

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "折扣券ID",
                        "prop": "coupon_code",
                        "width": "120px",
                       
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "创建时间",
                        "prop": "coupon_ctime",
                        "width": "200",

                    },
                    
                    {
                        "type": "text",
                        "align": "center",
                        "label": "标题",
                        "prop": "coupon_title",
                        "width": "200px",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "面值",
                        "prop": "coupon_title",
                        "width": "200px",

                    },
                    
                    {
                        "type": "text",
                        "align": "center",
                        "label": "创建人",
                        "prop": "admin_user_name",
                        "width":"120px"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "有效期",
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
                        "prop": "coupon_status",
                        formatter(row) {
                            // console.log(row,'row');
                            return row.coupon_status == 1 ? `<p style='text-align: center'>未开始</p>` : `<p style='text-align: center'>进行中</p>`
                        }
                            	
                    },
                    {
                        "type": "switch_button",
                        "label": "上架/下架",
                        "align": "center",
                        "width": "100",
                        "prop": "coupon_status",
                        "value": ['上架','下架']
                    },
                    
                    {
							"type": "handle",
							"label": "操作",
							"align": "center",
							"width": "",
							"list": [
                                
                                {
									"label": "已用门店",
									"type": "edit",
									// "url": "", //优先执行url
									onClick(tablePage, self, row) {
                                        self.$router.push("/marketing/usedShop/" + row.coupon_code)
									}
								},
                                
                                {
									"label": "编辑",
									"type": "edit",
                                    // "url": "", //优先执行url
                                    onClick(tablePage, self, row) {
                                    self.$router.push("/marketing/addCoupon/" + row.coupon_code)
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
                                        self.$router.push("/marketing/couponInfo/" + row.coupon_code)
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
        TableSearch,
        BreadCrumb

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
                coupon_code:this.coupon_code
            }
            if(this.coupon_status==1){
                //下架
                this.$axios.post("/api/admin/coupon/close", params).then(res => {
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
            if(this.coupon_status==2){
                //上架
                this.$axios.post("/api/admin/coupon/publish", params).then(res => {
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
        dialogCodeClose(){
            this.dialogCode = false
        },
        dialogCodeSure(){
            // console.log(this.)
            const params = {
                "coupon_code":this.coupon_code,
                "exchange_coupon_title":this.exchange_coupon_title,
                "exchange_coupon_total":this.codeTotalNumber,
                "exchange_coupon_user_limit":this.codeUserLimit,
                "exchange_coupon_start_time":this.codeStartTime,
                "exchange_coupon_end_time":this.codeEndTime
            }
            this.$axios.post("/api/admin/couponExchange/add", params).then(res => {
                if(res.data.code == 0){
                    this.$alert('操作成功')
                    this.dialogCode = false
                }else{
                    this.$alert(res.data.msg)
                }
            }).catch((e)=>{

                this.$alert('操作失败'+e)

            })
        },
        // //生成兑换码
        // creatCode(params){
        //     this.dialogCode = true
        //     this.coupon_code = params.coupon_code
        //     this.coupon_status = params.coupon_status
        //     console.log(params,'params-------')
            

        // },
        //调用子组件的gatData方法
        //
        listenSwitchChange(data) {
           


            const { coupon_title, coupon_status,coupon_code } = data.value

            this.coupon_status = coupon_status == 2 ? 1 : 2
            this.coupon_title = coupon_title
            this.coupon_code = coupon_code
            console.log(this.coupon_status,'freeze')
            console.log(this.coupon_title,'coupon_title')
             this.dialog = true
        },
      
        getData(k, v) {
            this.$refs.table.getData({
                [k]: v
            })
        },
         formatPrice1(price) {
            return (price/100);
        }


    }
}
</script>
<style scoped>
</style>