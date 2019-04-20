<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/training/add' })">添加干货培训</el-button>
            </div>
        </div>
        <div class="page-content">
            <nomal-table v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
            <!-- <el-dialog :title="+currentItem.is_use === 2 ? '下架' : '上架'" :visible="visible" width="30%">
				<p>确定要{{+currentItem.is_use === 2 ? '下架' : '上架'}}{{currentItem.good_name}}吗?</p>
				<p>操作人:{{user.data.user_realname}}</p>
				
				<span slot="footer" class="dialog-footer">
		            <el-button @click="visible = false">取 消</el-button>
		            <el-button type="primary" @click="doUpdateIsUse">确 定</el-button>
		        </span>
			</el-dialog> -->
        </div>
    </div>
</template>
<script>
	import NomalTable from "@/components/common/NomalTable";
	import BreadCrumb from "@/components/common/BreadCrumb";
    import TableSearch from "@/components/common/TableSearch";
	import Config from "../goods/config";

export default {
    data() {
        return {
            breadcrumb: [
                //面包屑
                {
                    name: "加盟商管理"
                },
                {
                    name: "培训列表",
                    url: "/training/list"
                }
            ],
            user: JSON.parse(localStorage.user),
            dialog: false,
            business_id: '',
            is_use: '',
            remark: '无',
            status_filter: "",
            searchs: {
                "list": [{
                        "type": "input-text", //输入文本
                        "label": "培训id",
                        "name": "id",
                        "value": "",
                        "placeholder": "请输入培训id",
                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "培训标题",
                        "name": "train_title",
                        "value": "",
                        "placeholder": "请输入培训标题",
                    }
                    // {
                    //     "type": "input-date", //输入日期
                    //     "label": "添加日期",
                    //     "name": "date",
                    //     "value": "",

                    // },
                ]
            },
            url: "/api/admin/train/index",

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "培训ID",
                        "prop": "train_id",
                        "width": ""
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "创建时间",
                        "prop": "train_ctime",
                        "width": "",

                    },
                    
                    
                    {
                        "type": "text",
                        "align": "center",
                        "label": "培训标题",
                        "prop": "train_title",
                        "width": "200",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "培训内容",
                        "prop": "train_content",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "报名链接",
                        "prop": "train_url",

                    },
                    // {
                    //     "type": "text",
                    //     "align": "center",
                    //     "label": "状态",
                    //     "width": "",
                    //     formatter(row) {
                    //         return `<div style="color:red">
                    //             ${row.train_status==0?'停用':'启用'}
                    //             </div>`
                    //     }

                    // },
                    // {
                    //     "type": "switch_btn",
                    //     "label": "操作",
                    //     "align": "center",
                    //     "width": "50",
                    //     "prop": "train_status",
                    //     "value": ['停用', '启用']
                    // },
                    // {
					// 		"type": "handle",
					// 		"label": "操作",
					// 		"align": "center",
					// 		"width": "",
					// 		"list": [{
					// 				"label": "删除",
					// 				"type": "edit",
					// 				// "url": "", //优先执行url
					// 				onClick(tablePage, self, record) {
					// 					console.log(record);
					// 					self.openModal(record)
					// 				}
					// 			},
					// 			{
					// 				"label": "编辑",
					// 				"type": "edit",
					// 				onClick(tablePage, self, record) {
					// 					self.$router.push({
					// 						path: '/createGood',
					// 						query: {
					// 							good_id: record.good_id,
					// 							good_type: 2 // good_tpye: 1门店服务 2平台商品 3品项管理 4虚拟卡券
					// 						}
					// 					})
					// 				}
					// 			}
								
					// 		]
                    // 	}
                    {
                        type: "handle",
                        label: "操作",
                        align: "center",
                        width: "",
                        list: [{
                                label: "删除",
                                type: "delete",
                                url: "", //优先执行url
                                params: {
                                    name: "id",
                                    data: "train_id"
                                },
                                axiosUrl: "/api/admin/train/remove",
                                axiosType: "post",
                                callback(tablePage, self, row) {
                                    console.log(row,'!!!!!!');
                                    //console.log(params,'params')
                                    self.nomal = !self.nomal;
                                    tablePage.isShow = !tablePage.isShow;
                                }
                            },
                            {
                                label: "编辑",
                                type: "edit",
                                onClick(tablePage, self, row) {
                                    console.log(row,'row')
                                    self.$router.push("/training/add/" + row.train_id)
                                }
                                // url: "", //优先执行url
                                // axiosUrl: "api/admin/train/detail",
                                // axiosType: "get",
                                // // onClick(tablePage, self, row){
                                // //     console.log(self,'self')
                                // //     console.log(row,'row')
                                // //     console.log(tablePage,'tablePage')
                                // //     self.$router.push("/training/add")
                                // // }
                                // onClick(tablePage, self, record) {
                                //     console.log(record,'record');
                                //     self.$router.push("/training/add?id=" + record.train_id)
                                //     // self.$router.push({
                                //     //     path: '/training/add',
                                //     //     query: {
                                //     //         id: record.train_id
                                //     //     }
                                //     // })
								// }
                            }
                        ]
                    }


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
        //this.tableJson = this.initColumn();
    },
    computed: {

    },
    methods: {
        			// 打开上下架弹窗
			openModal(record) {
				this.currentItem = record;
				this.visible = true;
			},
	
			// 上下架接口调用
			doUpdateIsUse() {
				const currentItem = this.currentItem;
				const {
					good_id,
					is_use
				} = currentItem;
				let newUse;
				if (is_use === 1) {
					newUse = 2
				} else if (is_use === 2) {
					newUse = 1;
				}
				const params = {
					id: good_id,
					is_use: newUse
				}
				this.$axios.post("/api/admin/shopgoods/isUse", params).then(res => {
					this.visible = false;
					this.$refs.table.getData({
						good_type: 1
					});
					//this.tableJson = this.initColumn();
				});
			},
        //调用子组件的gatData方法
        //
        listenSwitchChange(data) {



            const { business_id, shop_is_use } = data.value
            console.log(shop_is_use)

            this.business_id = business_id
            this.is_use = shop_is_use == 1 ? 0 : 1
            console.log(this.is_use)

            this.dialog = true
        },
        doUpdateIsUse() {
            const params = {
                id: this.business_id,
                is_use: this.is_use,
                remark: this.remark
            }

            this.$axios.post("/api/admin/shop/isUse", params).then(res => {
                this.dialog = false;
                console.log(res)

                if (res.data.code == 0) {

                    this.$alert('操作成功' + res.data.data)

                    this.$refs.table.getData({
                        is_page: 1,
                        page: 1
                    });
                } else {
                    this.$alert('操作失败' + res.data.msg)

                }


            }).catch((e) => {

                this.$alert('操作失败' + e)

            })

        },
        openModal() {

            console.log('openModal')
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