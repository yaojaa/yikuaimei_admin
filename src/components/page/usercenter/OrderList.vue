<template>
<div>
    <div>
        <table-tabs :page-tabs="pageTapsCard" @tabs-click="pageTapsClick"></table-tabs>
    </div>
    <div class="case marketGame packageInfo">
        <nomal-table v-show="index===0" :table-json="tableJson" :url="url"></nomal-table>
        <nomal-table v-show="index===1" :table-json="tableJson2" :url="url2"></nomal-table>
    </div>    
</div>

</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import TableTabs from '@/components/common/TableTabs'
    export default {
        data() {
            return {
                index: 0,
                url: `/api/admin/order/UserOrder?user_id=1&page=1&pagesize=10`,
                url2: `/api/admin/order/UserOrder?user_id=1&page=1&pagesize=10`,
                pageTapsCard:{
                    "type":"card",
                    "list":[
                        {
                            "label":"订单记录",
                            "name": "0",
                        },
                        {
                            "label":"预约记录",
                            "name": "1",
                        },
                        {
                            "label":"实物订单",
                            "name": "2",
                        }
                    ],
                    "activeVal":"0" //初始值
                },
                tableJson: {

                    spanMethod: function({row, column, rowIndex, columnIndex}){ //合并单元格
                        if (rowIndex % 2 === 0) {
                          if (columnIndex === 0) {
                            return [1, 5];
                          }else{
                            return [0, 0]
                          }
                        }
                    },

                    formatter: function(data){  //表格数据处理
                        return data.data
                    },
                    
                    "column": [ //行
                        {
                            "type": "text",
                            "label": "套餐",
                            "prop": "address",
                            "width": "",
                            "align": "center",
                            formatter(row, column, columnIndex, rowIndex) {

                                if(rowIndex%2 == 0){
                                    return '<div style="border-top: '+ (rowIndex == 0 ? 16 : 20) +'px solid #f8f9fa; height:56px; line-height:36px;font-size:12px; color:#999; background-color:#f5f5f5; text-align:left; padding-left:8px;"><span style="margin-right:40px;">' + row.order_ctime + '</span><span style="margin-right:40px;">订单号：' + row.order_id + '</span><span>'+ row.shop_name +'</span></div>'
                                }

                                let str = "<div style='display:flex; align-items:center; background-color#fff;'>";
                                str += "<div style='width:74px;height:74px;padding:8px; flex-shrink:0;'><img style='width:100%; height:100%;' src=' "+row.goods_cover_img+" '></div>";
                                str += "<div style='flex-grow:1; text-align:left;'>" + row.goods_name + "</div>"
                                str += "</div>";
                                return str;
                            }
                            
                        },
                        {
                            "type": "text",
                            "label": "应付金额",
                            "prop": "order_real_price",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "已付金额",
                            "prop": "order_have_pay",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "订单状态",
                            "prop": "order_status",
                            "width": "",
                            "align": "left",
                            formatter(row, column, columnIndex, rowIndex) {
                                switch (row.order_status){
                                    case 10:
                                        return '待支付';
                                    case 20:
                                        return '门店已确认';
                                    case 30:
                                        return '待评价';
                                    case 40:
                                        return '完成';
                                    default:return 'error';
                                }
                            }
                            
                        },
                        {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            "list": [
                                {
                                    "label":"查看详情",
                                    "type":"detail",
                                    "url":"/orderInfo", //优先执行url

                                }
                            ]
                        }
                    ],
                },
                tableJson2: {
                    spanMethod: function({row, column, rowIndex, columnIndex}){ //合并单元格
                        if (rowIndex % 2 === 0) {
                          if (columnIndex === 0) {
                            return [1, 5];
                          }else{
                            return [0, 0]
                          }
                        }
                    },

                    formatter: function(data){  //表格数据处理
                        return data.data
                    },
                    
                    "column": [ //行
                        {
                            "type": "text",
                            "label": "套餐",
                            "prop": "address",
                            "width": "",
                            "align": "center",
                            formatter(row, column, columnIndex, rowIndex) {

                                if(rowIndex%2 == 0){
                                    return '<div style="border-top: '+ (rowIndex == 0 ? 16 : 20) +'px solid #f8f9fa; height:56px; line-height:36px;font-size:12px; color:#999; background-color:#f5f5f5; text-align:left; padding-left:8px;"><span style="margin-right:40px;">' + row.order_ctime + '</span><span style="margin-right:40px;">订单号：' + row.order_id + '</span><span>'+ row.shop_name +'</span></div>'
                                }

                                let str = "<div style='display:flex; align-items:center; background-color#fff;'>";
                                str += "<div style='width:74px;height:74px;padding:8px; flex-shrink:0;'><img style='width:100%; height:100%;' src=' "+row.goods_cover_img+" '></div>";
                                str += "<div style='flex-grow:1; text-align:left;'>" + row.goods_name + "</div>"
                                str += "</div>";
                                return str;
                            }
                            
                        },
                        {
                            "type": "text",
                            "label": "预约金额",
                            "prop": "order_real_price",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "订单状态",
                            "prop": "order_status",
                            "width": "",
                            "align": "left",
                            formatter(row, column, columnIndex, rowIndex) {
                                switch (row.order_status){
                                    case 10:
                                        return '待支付';
                                    case 20:
                                        return '门店已确认';
                                    case 30:
                                        return '待评价';
                                    case 40:
                                        return '完成';
                                    default:return 'error';
                                }
                            }
                            
                        },
                        {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            "list": [
                                {
                                    "label":"查看详情",
                                    "type":"detail",
                                    "url":"/orderInfo", //优先执行url
                                }
                            ]
                        }
                    ],
                },

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
            pageTapsClick(index,el){
                this.index = index
            }
        }
    }

</script>

<style scoped>

</style>
