<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>营销管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>
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
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/marketing/fullReducionList', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
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

export default {
    data() {
        return {
            user: JSON.parse(localStorage.user),
            dialog: false,
            business_id: '',
            is_use: '',
            remark: '无',
            currentItem: {},
            status_filter: "",
            tagsListGroup: {
                '优惠券类型:': [
                    { title: '满减', key: 'coupon_rule_type', value: 1 },
                    { title: '立减', key: 'coupon_rule_type', value: 2 }
                ]
            },
            searchs: {
                "list": [
                    {
                        "type": "input-text", //输入文本
                        "label": "优惠券ID",
                        "name": "coupon_code",
                        "value": "",
                        "placeholder": "",
                    },
                    
                    {
                        "type": "input-date", //输入日期
                        "label": "有效期",
                        "name": "date",
                        "value": "",

                    },
                ]
            },
            url: "/api/admin/coupon/index?coupon_rule_type="+"1",

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "优惠券ID",
                        "prop": "coupon_code",
                        "width": "120px"
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
                        "label": "类型",
                        "prop": "coupon_rule_type",
                        "width": "60px",
                        formatter(row) {
                            return row.coupon_rule_type == 1 ? `<p style='text-align: center'>满减</p>` : `<p style='text-align: center'>立减</p>`
                        }
                        // formatter(row) {
                        //     if(row.coupon_rule_type==1){
                        //         return `<p style='text-align: center'>满减</p>`;
                        //     }
                        //     if(row.coupon_rule_type==2){
                        //         return `<p style='text-align: center'>立减</p>`;
                        //     }
                        // }
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
                        "label": "满减(元)",
                        "prop": "shop_name",
                        "width": "150px",
                        formatter(row) {
                            if(row.rules){
                                return `<p style='text-align: center'>
                                满${row.rules.price}</br>
                                减${row.rules.reduce_price}</p>`;
                            }
                        }

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
                        "label": "有效时间",
                        "prop": "coupon_expire",
                        "width": "",
                        formatter(row) {
                            if(row.coupon_expire){
                                return `<p style='text-align: center'>
                                ${row.coupon_expire.coupon_expire_start_time||""}<br/>至
                                ${row.coupon_expire.coupon_expire_end_time||""}</p>`;
                            }
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
							"type": "handle",
							"label": "操作",
							"align": "center",
							"width": "",
							"list": [
                                {
									"label": "生成兑换券",
									"type": "edit",
									// "url": "", //优先执行url
									onClick(tablePage, self, record) {
										// console.log(record);
										//self.openModal(record)
									}
                                },
                                {
									"label": "已用门店",
									"type": "edit",
									// "url": "", //优先执行url
									onClick(tablePage, self, record) {
										self.$router.push({
											path: '/createGood',
											query: {
												good_id: record.good_id,
												good_type: 2 // good_tpye: 1门店服务 2平台商品 3品项管理 4虚拟卡券
											}
										})
									}
								},
                                
                                {
									"label": "下线",
									"type": "edit",
									// "url": "", //优先执行url
									onClick(tablePage, self, record) {
										// console.log(record);
										//self.openModal(record)
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
								}
								
								
							]
						},


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
        listenSwitchChange(data) {
            console.log(data,'data')


            const { shop_id, shop_is_use } = data.value
            console.log(data.value,'data.value')

            this.shop_id = shop_id
            this.is_use = shop_is_use == 1 ? 0 : 1
            console.log(this.is_use)

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