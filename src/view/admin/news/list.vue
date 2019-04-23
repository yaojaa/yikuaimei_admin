<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>平台管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="page-header-actions">
                <el-button icon="el-icon-plus" size="mini" type="primary" @click="$router.push({ path: '/admin/news/newsAdd' })">添加</el-button>
               
            </div>
            
        </div>
        <div class="page-content">
            <div class="filter-tag-box">
                <div class="filter-tag-item" v-for="(item,key,index) in tagsListGroup" :key="index">
                    <div class="tag-hd">{{key}}</div>
                    <div class="tag-bd">
                        <router-link class="tag" :class="tag.key+tag.value == status_filter?'active':''" v-for="(tag,i) in item" :key="tag.value" :to="{ path: '/admin/news/list', query: {[tag.key]: tag.value }}">
                            {{tag.title}}</router-link>
                    </div>
                </div>
            </div>
            <nomal-table v-on:listenSwitchChange="listenSwitchChange" ref="table" :table-json="tableJson" :url="url">
                <table-search :searchs="searchs"></table-search>
            </nomal-table>
           
        </div>
    </div>
</template>
<script>
import NomalTable from '@/components/common/NomalTable'
import TableSearch from '@/components/common/TableSearch'

export default {
    data() {
        return {
            status_filter: "",
            tagsListGroup: {
                '管理端是否接收:': [
                    { title: '是', key: 'business_on', value: 1 },
                    { title: '否', key: 'business_on', value: 0 }
                ],

                'POS端是否接收:': [
                    
                    { title: '是', key: 'pos_on', value: 1 },
                    { title: '否', key: 'pos_on', value: 0 }
                ]
            },
            searchs: {
                "list": [{
                        "type": "input-text", //输入文本
                        "label": "标题",
                        "name": "title",
                        "value": "",
                        "placeholder": "标题",
                    }
                    
                   
                    
                ]
            },
            
            url: "/api/admin/news/index",

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
                        "label": "标题",
                        "prop": "title",
                        "width": "",

                    },
                    

                    {
                        "type": "text",
                        "align": "center",
                        "label": "通知类型",
                        "width": "",
                        formatter(row) {
                            switch (row.type) {
                                case 1:
                                    return "重要通知"
                                    break;
                                case 2:
                                    return "新品"
                                    break;
                                case 3:
                                    return "优惠活动通知"
                                    break;
                                case 4:
                                    return "公告"
                                    break;
                                case 5:
                                    return "动态"
                                    break;
                                default:
                                    return ""
                                    break;
                            }
                            
                            
                        }

                    },
                    
                    {
                        "type": "handle",
                        "label": "查看",
                        "align": "center",
                        "width": "",
                        "list": [
                            {
                                "label": "编辑",
                                "type": "edit",
                                onClick(tablePage, self, row) {
                                    console.log(row,'row')
                                    self.$router.push("/admin/news/newsAdd/" + row.news_id)
                                }
                            },
                            {
                            "label": "删除",
                            "type": "remove",
                            onClick(tablePage, self, row) {
                                console.log(row,'row')
                                self.removeNews(row.news_id)
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

            // const { business_id, business_is_use } = data.value
            // console.log(business_is_use)

            // this.business_id = business_id
            // this.is_use = business_is_use == 1 ? 0 : 1
            // console.log(this.is_use)

            //this.dialog = true
        },
        removeNews(id){
                 
            this.$axios.post("/api/admin/news/remove", {"id":id}).then(res => {

                if (res.data.code == 0) {

                    this.$alert('删除成功')

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