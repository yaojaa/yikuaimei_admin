<template>
<div class="marketGame packageInfo">
    <nomal-table :table-json="tableJson" :url="url"></nomal-table>
</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'

    export default {
        data() {
            return {
                url: "./static/vuetable.json",
                tableJson: {

                    spanMethod: function({row, column, rowIndex, columnIndex}){ //合并单元格
                        if (rowIndex % 2 === 0) {
                          if (columnIndex === 0) {
                            return [1, 4];
                          }else{
                            return [0, 0]
                          }
                        }
                    },

                    formatter: function(data){  //表格数据处理
                        let _data = [];
                        data.forEach((e,i) => {
                            _data.push(e, e)
                        });

                        return _data;
                    },
                    
                    "column": [ //行
                        {
                            "type": "text",
                            "label": "套餐名称",
                            "prop": "address",
                            "width": "",
                            "align": "center",
                            formatter(row, column, columnIndex, rowIndex) {

                                if(rowIndex%2 == 0){
                                    return '<div style="border-top: '+ (rowIndex == 0 ? 16 : 20) +'px solid #f8f9fa; height:56px; line-height:36px;font-size:12px; color:#999; background-color:#f5f5f5; text-align:left; padding-left:8px;">添加时间：' + row.date + '</div>'
                                }

                                let str = "<div style='display:flex; align-items:center; background-color#fff;'>";
                                str += "<div style='width:74px;height:74px;padding:8px; flex-shrink:0;'><img style='width:100%; height:100%;' src='/static/img/img.jpg'></div>";
                                str += "<div style='flex-grow:1; text-align:left;'>" + row.address + "</div>"

                                str += "</div>";
                                return str;
                            }
                            
                        },
                        {
                            "type": "text",
                            "label": "原价",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "现价",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            formatter(row) {
                                return '<p style="color:#7224D8;">' + row.name + '</p>'
                            }
                            
                        },
                        {
                            "type": "text",
                            "label": "是否为一站式",
                            "prop": "name",
                            "width": "",
                            "align": "center",
                            
                        }
                    ],
                },

            }
        },
        components: {
            NomalTable,
        },
        created() {
            
        },
        computed: {
           
        },
        methods: {

        }
    }

</script>

<style scoped>
.case{
    padding-top: 20px;
}
</style>
