<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/audit/business' })">加盟商审核</el-button>
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/business/alliance_add' })">添加加盟商</el-button>
            </div>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/business/alliance', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
            <el-dialog :title="is_use==0?'停用':'启用'" :visible.sync="dialog" width="30%">
                <p style="color:red">此操作会{{is_use==0?'停用':'启用'}}加盟商名下所有门店</p>
                <p>操作人:{{user.data.user_realname}}</p>
                <p>操作备注:</p>
                <p>
                    <el-input type="textarea" autosize placeholder="请输入操作备注" v-model="remark">
                    </el-input>
                </p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="doUpdateIsUse">确 定</el-button>
                </span>
            </el-dialog>
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
            breadcrumb: [
                //面包屑
                {
                    name: "加盟商管理"
                },
                {
                    name: "加盟商列表",
                    url: "/business/alliance"
                }
            ],
            user: JSON.parse(localStorage.user),
            dialog: false,
            business_id: '',
            is_use: '',
            remark: '无',
            status_filter: "",
            tagsListGroup: {
                '选择类型:': [
                    { title: '全部', key: 'business_type', value: '' },
                    { title: '加盟', key: 'business_type', value: 1 },
                    { title: '非加盟', key: 'business_type', value: 2 }
                ],

                '选择状态:': [
                    { title: '全部', key: 'business_is_use', value: '' },
                    { title: '停用', key: 'business_is_use', value: 0 },
                    { title: '启用', key: 'business_is_use', value: 1 }
                ]
            },
            searchs: {
                "list": [{
                        "type": "input-text", //输入文本
                        "label": "加盟商名称",
                        "name": "business_name",
                        "value": "",
                        "placeholder": "加盟商名称",
                    },
                    {
                        "type": "input-text", //输入文本
                        "label": "店长",
                        "name": "city",
                        "value": "",
                        "placeholder": "",
                    },
                   
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
            url: "/api/admin/business/index",

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "加盟日期",
                        "prop": "business_ctime",
                        "width": ""
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "公司名称",
                        "prop": "business_name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "法人姓名/手机号",
                        "prop": "business_corporation",
                        "width": "200",
                        formatter(row) {
                            return `<p style='text-align: center'>
                                ${row.business_corporation}<br/>
                                ${row.business_phone}
                                                    </p>`;
                        }

                    },

                    {
                        "type": "text",
                        "align": "center",
                        "label": "类型",
                        "width": "",
                        formatter(row) {
                            return row.business_type == 1 ? '加盟' : '非加盟'
                        }

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "公司地址",
                        "prop": "business_company_adress",
                        "width": "200",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "推荐人平台账号",
                        "prop": "p_name",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "状态",
                        "width": "",
                        formatter(row) {
                            return `<div style="color:red">
                                ${row.business_is_use==0?'停用':'启用'}
                                </div>`
                        }
                    },
                    {
                        "type": "switch_btn",
                        "label": "操作",
                        "align": "center",
                        "width": "50",
                        "prop": "business_is_use",
                        "value": ['停用', '启用']
                    },

                    {
                        "type": "handle",
                        "label": "查看",
                        "align": "center",
                        "width": "",
                        "list": [
                            {
                                "label": "修改",
                                "type": "edit",
                                onClick(tablePage, self, row) {
                                    console.log(row,'row')
                                    self.$router.push("/business/alliance_add/" + row.business_id)
                                }
                            },
                            {
                            "label": "详情",
                            "type": "detail",
                            onClick(tablePage, self, row) {
                                self.$router.push("/business/alliance_detail/" + row.business_id)
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
    computed: {

    },
    methods: {
        //调用子组件的gatData方法
        listenSwitchChange(data) {

            const { business_id, business_is_use } = data.value
            console.log(business_is_use)

            this.business_id = business_id
            this.is_use = business_is_use == 1 ? 0 : 1
            console.log(this.is_use)

            this.dialog = true
        },
        doUpdateIsUse() {

            const params = {
                id: this.business_id,
                is_use: this.is_use,
                remark: this.remark
            }


            this.$axios.post("/api/admin/business/isUse", params).then(res => {
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