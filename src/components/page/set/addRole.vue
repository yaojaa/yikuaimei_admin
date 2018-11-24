<template>
    <div class="page add-role">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button type="primary" size="mini" @btn-click="submit">提交</el-button>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-body">
                    <div class="form">
                        <div class="label">* 角色名称：</div>
                        <div class="input">
                            <el-input placeholder="请输入角色名称" v-model="form.session">
                            </el-input>
                        </div>
                    </div>
                    <div class="form padding-t24 nomaltable">
                        <div class="label">* 管理权限：</div>
                        <div class="input">
                            <div class="form-input">
                                <div class="cell f-checkbox"><a href="javascript:;" @click="allClick">全部</a></div>
                                <div class="cell f-content">导航名称</div>
                                <div class="cell f-content">权限分配</div>
                            </div>
                            <div class="f-table">
                                <div class="f-tr border-b-1px" v-for="(item, index) in tableData" :key="index">
                                    <div v-for="(col, colIndex) in item" :key="colIndex">
                                        <el-collapse-transition>
                                            <div class="form-input" v-show="isShow(colIndex, col.show)">
                                                <div class="f-checkbox f-check">
                                                    <el-checkbox v-model="col.checked"></el-checkbox>
                                                </div>
                                                <div class="f-content f-check" :class="{fAacitve: (colIndex == 0)}">
                                                    <p class="f-cell">
                                                        <i :class="col.label.class || 'font-icon'"></i>
                                                        <a href="javascript:;" class="f-check-a" @click="show(index, colIndex)">{{col.label.name}}</a>
                                                    </p>
                                                </div>
                                                <div class="f-content f-check">
                                                    <el-checkbox-group v-model="col.listCheck" @change="handleChecked(index, colIndex, col.listCheck)">
                                                        <el-checkbox v-for="val in col.list" :label="val" :key="val">{{val}}</el-checkbox>
                                                    </el-checkbox-group>
                                                </div>

                                            </div>
                                        </el-collapse-transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import TableButton from '@/components/common/TableButton'

export default {
    data() {
        return {
            url: "./static/vuetable.json",
            breadcrumb: [ //面包屑
                {
                    "name": "设置",
                },
                {
                    "name": "角色管理",
                    "url": "/set/role",
                },
                {
                    "name": "添加角色",
                }
            ],
            buttons: {
                "list": [{
                    "buttonName": "提交",
                    "size": "mini", //按钮大小    同element-ui
                }],
            },
            form: {
                session: "",
                checked: null,
            },

            tableData: [
                [{
                        checked: false,
                        show: true,
                        label: {
                            name: "平台管理",
                            class: "el-icon-caret-bottom"
                        },
                        list: ["显示"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "添加分公司",
                        },
                        list: ["显示", "新增", "删除"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "编辑分公司",
                        },
                        list: ["显示", "编辑"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "商家管理",
                        },
                        list: ["显示", "拉黑", "查看"],
                        listCheck: [],
                    },
                ],
                [{
                        checkVal: false,
                        show: false,
                        label: {
                            name: "分公司管理",
                            class: "el-icon-caret-bottom"
                        },
                        list: ["显示"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "添加广告位",
                        },
                        list: ["显示", "新增", "删除"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "商家管理",
                        },
                        list: ["显示", "编辑"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "展会管理",
                        },
                        list: ["显示", "拉黑", "查看"],
                        listCheck: [],
                    },
                ],
                [{
                        checkVal: false,
                        show: false,
                        label: {
                            name: "审核管理",
                            class: "el-icon-caret-bottom"
                        },
                        list: ["显示"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "商家信息",
                        },
                        list: ["显示", "新增"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "展会信息",
                        },
                        list: ["显示"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "套餐信息",
                        },
                        list: ["显示", "新增"],
                        listCheck: [],
                    },
                    {
                        checkVal: false,
                        show: false,
                        label: {
                            name: "案例信息",
                        },
                        list: ["显示", "编辑"],
                        listCheck: [],
                    },
                ],
            ],

        }
    },
    components: {
        BreadCrumb,
        TableButton
    },
    created() {

    },
    computed: {

    },
    methods: {
        allClick() {
            console.log("all")
        },
        handleChecked(...args) {
            console.log(...args)
        },
        show(index, colIndex) {
            if(colIndex > 0) return;
            this.tableData[index].forEach((e, i) => {
                if (i > 0) {
                    e.show = !e.show;
                }
            })
        },
        isShow(colindex, show) {
            if (colindex == 0) {
                return true;
            } else {
                return show;
            }
        },
        submit() {
            console.log(this.form)
        }
    }
}
</script>
<style scoped>

.form {
    display: flex;
}

.form .label {
    width: 100px;
    font-size: 14px;
    text-align: right;
    color: #666;
    line-height: 30px;
    margin-right: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    padding-right: 12px;
}

.nomaltable .label {
    line-height: 1.6;
}

.form .input .el-input {
    width: 190px;
}

.form .input {
    flex-grow: 1;
    flex-shrink: 0;
}

.form-input {
    position: relative;
    display: flex;
    padding-left: 80px;
}

.form-input .f-checkbox {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    text-align: center;
}

.f-table {
    border: 1px solid #f6f6f6;
}

.f-tr {
    padding: 8px 0 8px;
}

.form-input .f-content {
    width: 50%;
    font-size: 14px;
}

.form-input .f-check {
    padding: 8px 0;
    color: #666;
}

.form-input .f-checkbox a,
.form-input .cell {
    height: 36px;
    line-height: 36px;
    background-color: #eeefff;
    font-size: 14px;
    color: #666;
}

.f-check .font-icon {
    display: inline-block;
    height: 16px;
    width: 16px;
}

.f-cell {
    height: 20px;
    line-height: 20px;
}

.f-check-a {
    color: #606266;
    font-size: 14px;
    cursor: initial;
}
.fAacitve:hover,.fAacitve a:hover{
    color: #7224D8;
    cursor: pointer;
}
.padding-t35 {
    padding-top: 35px;
}

.padding-t24 {
    padding-top: 24px;
}

.border-b-1px {
    border-bottom: 1px solid #f6f6f6;
}

.f-tr:last-child {
    border: none;
}

.padding-r-20 {
    padding-right: 20px;
}

.form-input .el-checkbox {
    margin-right: 30px;
    height: 20px;
    line-height: 20px;
}

.form-input .el-checkbox+.el-checkbox {
    margin-left: 0;
}
</style>