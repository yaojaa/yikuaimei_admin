<template>
<div class="marketGame">    
    <nomal-table :table-json="tableJson" :url="url"></nomal-table>
    <el-dialog
    title="案例详情"
    :visible.sync="centerDialogVisible"
    width="30%"
    center
    class="casecontent">
        <ShowDetail :showdata='showdata1'></ShowDetail>
    </el-dialog>
</div>
</template>

<script>
    import NomalTable from '@/components/common/NomalTable'
    import ShowDetail from '@/components/common/showdetail'
    export default {
        name: 'tabletest',
        data() {
            return {
                centerDialogVisible:false,
                url:"",
                tableJson:{
                    cellstyle: function({row, column, rowIndex, columnIndex}){
                        if(columnIndex == 1){
                            return {"vertical-align":"top"}
                        }
                    },
                    "column": [ //行
                        {
                            "type": "text",
                            "label": "案例名称",
                            "prop": "address",
                            "width": "",
                            "align": "center",
                            formatter(row) {
                                let str = "<div style='display:flex; background-color#fff;'>";
                                str += "<div style='width:80px;height:80px;padding:8px; flex-shrink:0;'><img style='width:100%; height:100%;' src='/static/img/img.jpg'></div>";
                                str += "<div style='flex-grow:1; text-align:left; font-size:12px; padding-top:10px;line-height:18px;'><p style='margin-bottom:5px;'>" + row.address + row.address + row.address + "</p><p style='font-size:10px; color:#999;'>参考价：¥"+ row.id +"</p></div>"

                                str += "</div>";
                                return str;
                            }
                            
                        },
                        {
                            "type": "text",
                            "label": "内容",
                            "prop": "name",
                            "width": "",
                            "headerAlign":"center",
                            "align": "left",
                            formatter(row) {
                                return '<p style="padding-top:10px; font-size12px; line-height:18px;">' + row.address + row.address + row.address + row.address + '</p>';
                            }
                            
                        },
                        {
                            "type": "text",
                            "label": "收藏数",
                            "prop": "name",
                            "width": "100",
                            "align": "center",
                            
                        },
                        {
                            "type": "text",
                            "label": "上传时间",
                            "prop": "date",
                            "width": "100",
                            "align": "center",
                            
                        },
                        {
                            "type": "handle",
                            "label":"操作",
                            "align": "center",
                            "width": "100",
                            "list": [
                                {
                                    "label":"查看详情",
                                    "type":"detail",
                                    // "url":"/caseDetails", 
                                    onClick(tablePage, self){
                                        console.log(self.centerDialogVisible=true)
                                    }
                                }
                            ]
                        }
                    ],
                },
                showdata1:[
                {
                    type:4,
                    url:'/static/img/case1.png'
                },
                {
                    type:7,
                    label:'拍摄风格',
                    title:'时尚 森系 个性创意'
                },
                {
                    type:7,
                    label:'拍摄地点',
                    title:'巴厘岛'
                },
                {
                    type:7,
                    label:'服装造型',
                    title:'八服八造'
                },
                {
                    type:7,
                    label:'案例参考价格',
                    title:'¥16800.00'
                },
                {
                    type:1,
                    text:'高端私人订制婚纱摄影品牌，量身定做属于每一位客户的幸福情感回忆。'
                },
                {
                    type:4,
                    url:'/static/img/case2.png'
                },
                {
                    type:4,
                    url:'/static/img/case3.png'
                }
            ],


            }
        },
        components: {
            NomalTable,
            ShowDetail
        },
        created() {
            
        },
        computed: {
           
        },
        methods: {

        }
    }

</script>

<style scoped lang='less'>
.case{
    padding-top: 20px;
}
.casecontent{
    // width: 700px;
}
.casecontent /deep/ .el-dialog{
    width: 50%!important;
}
.casecontent /deep/ .labeltext span{
    text-align: left;
    min-width: 70px;
    flex: none
}
.casecontent /deep/ .showdetail .imgcontainer img{
    width: 100%;
}
.casecontent /deep/ .singlep{
    color: #999;
    font-size: 16px;
}
</style>
