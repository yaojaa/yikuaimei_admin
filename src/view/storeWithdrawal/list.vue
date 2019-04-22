<template>
    <div class="page">
        <div class="page-header">
             <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/storeWithdrawal/list', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
    data() {
        return {
            user: JSON.parse(localStorage.user),
            dialog: false,
            business_id: '',
            breadcrumb: [
                //面包屑
                {
                    name: "审核管理"
                },
                {
                    name: "门店提现",
                    url: "/manage/label"
                }
            ],
            
            remark: '无',
            status_filter: "",
            tagsListGroup: {
                '审核状态:': [
                    { title: '全部', key: 'shop_withdraw_status', value: 0 },
                    { title: '待审核', key: 'shop_withdraw_status', value: 1 },
                    { title: '已审核', key: 'shop_withdraw_status', value: 2 }
                ]

                
                
            },
            searchs: {
                "list": [
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
                    },
                ]
            },
            url: "/api/admin/shop/withdrawList",

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "申请时间",
                        "prop": "shop_withdraw_ctime",
                        "width": ""
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "提现金额",
                        "width": "100",
                        formatter(row) {
                            return  row.shop_withdraw_amount/100
                               
                        }
                    },
                    
                    {
                        "type": "text",
                        "align": "center",
                        "label": "状态",
                        "width": "",
                        formatter(row) {
                            return `<div style="color:red">
                                ${row.shop_withdraw_status==0?'审核不通过':''}
                                ${row.shop_withdraw_status==1?'待审核':''}
                                ${row.shop_withdraw_status==2?'审核通过':''}
                                </div>`
                        }

                    },
                    {
                        "type": "handle",
                        "label": "查看",
                        "align": "center",
                        "width": "50",
                        "list": [{
                            "label": "详情",
                            "type": "detail",
                            onClick(tablePage, self, row) {
                                console.log(row,'row')
                                self.$router.push("/storeWithdrawal/detail/" + row.shop_withdraw_id)
                            }

                        }]
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

    },
    computed: {},
    methods: {
        //调用子组件的gatData方法
        //
        listenSwitchChange(data) {



            // const { business_id, shop_is_use } = data.value
            // console.log(shop_is_use)

            // this.business_id = business_id
            // this.is_use = shop_is_use == 1 ? 0 : 1
            // console.log(this.is_use)

            // this.dialog = true
        },
        // doUpdateIsUse() {

        //     const params = {
        //         id: this.business_id,
        //         is_use: this.is_use,
        //         remark: this.remark
        //     }


        //     this.$axios.post("/api/admin/shop/isUse", params).then(res => {
        //         this.dialog = false;

        //         console.log(res)

        //         if (res.data.code == 0) {

        //             this.$alert('操作成功' + res.data.data)

        //             this.$refs.table.getData({
        //                 is_page: 1,
        //                 page: 1
        //             });
        //         } else {
        //             this.$alert('操作失败' + res.data.msg)

        //         }


        //     }).catch((e) => {

        //         this.$alert('操作失败' + e)

        //     })

        // },
        // openModal() {

        //     console.log('openModal')
        // },
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