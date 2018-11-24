<template>
<div>    
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
                    "column": [ //行
                        {
                            "type": "text",
                            "align": "center",
                            "label": "模版名称",
                            "prop": "name",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "内容",
                            "prop": "address",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "链接",
                            "prop": "address",
                            "width": "",
                            
                        },
                        {
                            "type": "text",
                            "align": "center",
                            "label": "创建时间",
                            "prop": "date",
                            "width": "",
                            
                        },
                        {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "200",
                            "list": [
                                {
                                    "label":"查看",
                                    "type":"detail",
                                    "url":"/care/templateInfo", //优先执行url

                                },
                                {
                                    "label":"编辑",
                                    "type":"edit",
                                    "url":"/care/templateInfo", //优先执行url

                                },
                                {
                                    "label":"删除",
                                    "type":"delete"
                                },
                            ]
                        }
                    ],
                }



            }
        },
        components: {
            NomalTable
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

</style>
