<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>营销管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/audit/shop', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
            <el-dialog :title="is_use==0?'停用':'启用'" :visible.sync="dialog" width="30%">
                <p style="color:red">此操作会{{is_use==0?'停用':'启用'}}门店</p>
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

export default {
    data() {
        return {
            user: JSON.parse(localStorage.user),
            dialog: false,
            business_id: '',
            is_use: '',
            remark: '无',
            status_filter: "",
            tagsListGroup: {
                '购买渠道:': [
                    { title: '全部', key: 'business_type', value: '' },
                    { title: '加盟', key: 'business_type', value: 1 },
                    { title: '非加盟', key: 'business_type', value: 2 }
                ],

                '选择状态:': [
                    { title: '全部', key: 'shop_is_use', value: '' },
                    { title: '停用', key: 'shop_is_use', value: 0 },
                    { title: '启用', key: 'shop_is_use', value: 1 }
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
                        "type": "input-text", //选择器
                        "label": "城市",
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
            url: "/api/admin/shop/reviewList",

            tableJson: {
                "column": [ //行
                    {
                        "type": "text",
                        "align": "center",
                        "label": "创建时间",
                        "prop": "create_time",
                        "width": ""
                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "门店名称",
                        "prop": "shop_name",
                        "width": "",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "店长",
                        "prop": "shop_corporation",
                        "width": "200"

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "城市",
                        "prop": "shop_address",
                        "width": "200",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "归属加盟商",
                        "prop": "business_name",

                    },
                    {
                        "type": "text",
                        "align": "center",
                        "label": "状态",
                        "width": "",
                        formatter(row) {
                            return `<div style="color:red">
                                ${row.review_status==1?'审核中':''}
                                ${row.review_status==2?'审核通过':''}
                                ${row.review_status==3?'审核不通过':''}
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
                                self.$router.push("/audit/shop/" + row._id)
                            }

                        }]
                    }


                ],
            }
        }
    },
    components: {
        NomalTable,
        TableSearch
    },
    created() {

    },
    computed: {},
    methods: {
        //调用子组件的gatData方法
        //
        listenSwitchChange(data) {



            const { business_id, shop_is_use } = data.value
            console.log(shop_is_use)

            this.business_id = business_id
            this.is_use = shop_is_use == 1 ? 0 : 1
            console.log(this.is_use)

            this.dialog = true
        },
        doUpdateIsUse() {

            const params = {
                id: this.business_id,
                is_use: this.is_use,
                remark: this.remark
            }


            this.$axios.post("/api/admin/shop/isUse", params).then(res => {
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