<template>
    <div class="table">
            <table-tabs :page-tabs="pageTapsCard" @tabs-click="pageTapsClick">
                
                <nomal-table :table-json="tableJson1" :url="url" slot="0"></nomal-table>
                <nomal-table :table-json="tableJson2" :url="url2" slot="1"></nomal-table>

            </table-tabs>
            
    </div>
</template>
<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableTabs from '@/components/common/TableTabs'

    export default {
        data() {
            return {
                index:0,
                url2:`/api/admin/user/fundExpenses?page=1&pagesize=10&user_id=${this.$route.params.id}`,
                url:`/api/admin/user/fundIncome?page=1&pagesize=10&user_id=${this.$route.params.id}`,
                pageTapsCard:{
                    "type":"card",
                    "list":[
                        {
                            "label":"收入",
                            "name": "0",
                        },
                        {
                            "label":"支出",
                            "name": "1",
                        },
                    ],
                    "activeVal":"0" //初始值
                },
                tableJson1: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "时间",
                            "prop": "user_fund_income_ctime",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "金额",
                            "prop": "user_fund_income_price",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "收益来源",
                            "prop": "user_fund_income_type",
                            "width": "",
                            formatter(row, column, columnIndex, rowIndex) {
                                switch (row.user_fund_income_type){
                                    case 1:
                                        return '首次注册红包';
                                    case 2:
                                        return '订单评价返现';
                                    case 3:
                                        return '优质评价返现';
                                    case 4:
                                        return '推荐用户提成';
                                    default:return 'error';
                                }
                            }
                        },
                    ],
                },
                tableJson2: {
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "时间",
                            "prop": "user_fund_expenses_ctime",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "金额",
                            "prop": "user_fund_expenses_price",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "支出方式",
                            "prop": "user_fund_expenses_type",
                            "width": "",
                            formatter(row, column, columnIndex, rowIndex) {
                                switch (row.user_fund_expenses_type){
                                    case 1:
                                        return '提现';
                                    case 2:
                                        return '消费';
                                    default:return 'error';
                                }
                            }
                            
                        },
                    ],
                }


            }
        },
        components: {
            NomalTable,
            TableTabs
        },
        created() {
            
        },
        computed: {

        },
        methods: {
            pageTapsClick(index) { //index 是tabs的下标
                this.index = index
                console.log('index',index)
            },


        }
    }

</script>
<style lang='less' scoped>
</style>