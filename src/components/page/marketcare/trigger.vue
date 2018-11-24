<template>
    <div>
        <nomal-table :border="true" :table-json="tableJson" :url="url">
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
            url: "./static/vuetable.json",
            searchs: {
                "list": [{
                        "type": "input-select", //选择器
                        "label": "触发分类",
                        "name": "option",
                        "value": "all",
                        "options": [{
                                "name": "全部",
                                "value": "all",
                            },
                            {
                                "name": "option2",
                                "value": "option2",
                            },
                            {
                                "name": "option3",
                                "value": "option3",
                            },
                        ],
                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "触发条件",
                        "name": "user",
                        "value": "",
                        "placeholder": "触发条件名称",
                    }
                ]
            },
            tableJson: {
                spanMethod: function({ row, column, rowIndex, columnIndex }) { //合并单元格
                    console.log(columnIndex)
                    if (columnIndex === 0) {
                        if (rowIndex % 2 === 0) {
                            return {
                                rowspan: 2,
                                colspan: 1
                            };
                        } else {
                            return {
                                rowspan: 0,
                                colspan: 0
                            };
                        }
                    }
                },
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "触发条件",
                        "prop": "name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "关联渠道",
                        "prop": "name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "关联模板名称",
                        "prop": "address",
                        "width": "",

                    }
                ]
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


    }
}
</script>
<style lang='less' scoped>
</style>