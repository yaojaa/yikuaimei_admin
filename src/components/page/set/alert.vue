<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button type="primary" size="mini" @click="addAlert">添加</el-button>
            </div>
        </div>
        <div class="page-content">
            <nomal-table :table-json="tableJson" :url="url"></nomal-table>
        </div>

        <el-dialog
            title="添加"
            :visible.sync="isShow"
            width="500px">

            <div class="add-alert">
                <div class="form-content">
                    <div class="form-cell">
                        <label class="label">* 页面</label>
                        <div class="input">
                            <el-input placeholder="请输入页面" v-model.trim="alert.page">
                            </el-input>
                        </div>
                    </div>
                    <div class="form-cell">
                        <label class="label">* 停留时间</label>
                        <div class="input">
                            <el-input placeholder="请输入时间" v-model.trim="alert.time">
                                <template slot="append">秒</template>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-cell">
                        <label class="label">* 提示内容</label>
                        <div class="input">
                            <el-input type="textarea" v-model.trim="alert.content" rows="6">
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button plain @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="isShow = false">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import BreadCrumb from '@/components/common/BreadCrumb'
import AddButton from '@/components/common/AddButton'

export default {
    data() {
        return {
            isShow: false,
            alert: {
                title: "",
                time: "",
                content: "",
            },
            url: "./static/vuetable.json",
            breadcrumb: [ //面包屑
                {
                    "name": "设置",
                },
                {
                    "name": "弹窗管理",
                }
            ],
            addButton: {
                "title": "弹窗设置",
                "name": "添加",
            },

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "label": "页面",
                        "prop": "name",
                        "width": "200",
                        "align": "center"
                    },
                    {
                        "type": "text",
                        "label": "停留时间",
                        "prop": "date",
                        "width": "200",
                        "align": "center"
                    },
                    {
                        "type": "text",
                        "label": "内容",
                        "prop": "address",
                        "width": "",

                    }
                ],
            },

        }
    },
    components: {
        NomalTable,
        BreadCrumb,
        AddButton
    },
    created() {

    },
    computed: {

    },
    methods: {
        addAlert() {
            this.isShow = true;
        },
        submit() {
            console.log(this.alert)

            this.isShow = false;
        }

    }
}
</script>
<style scoped>
.member-search {
    background-color: #fff;
    padding: 20px 10px 0;
    overflow: hidden;
}

.add-alert {
    width: 400px;
    margin:0 auto;
}

.form-content {
    padding: 20px 0;
}

.form-cell {
    display: flex;
}

.form-cell .label {
    width: 100px;
    text-align: right;
    padding-right: 20px;
    font-size: 14px;
    line-height: 30px;
    color: #666;
}

.form-cell .input {
    width: 200px;
    position: relative;
    margin-bottom: 20px;
}

</style>
<style>
.add-alert .el-input__inner {
    border-color: #dcdfe6;
}

.add-alert .el-input__inner:focus {
    border-color: #7224D8;
}
</style>