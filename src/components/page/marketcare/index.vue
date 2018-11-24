<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
            <div class="menus-box">
                <table-tabs :page-tabs="menus" @tabs-click="menusClick"></table-tabs>
                <add-button :add-btn="addButton" v-if="addButton.url"></add-button>
            </div>
            <router-view/>
        </div>
    </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import TableTabs from '@/components/common/TableTabs'
import AddButton from '@/components/common/AddButton'

export default {
    data() {
        return {
            breadcrumb: [ //面包屑
                {
                    "name": "营销", //名字
                },
                {
                    "name": "关怀",
                },
                {
                    "name": "APP推送",
                }
            ],

            addButton: {
                name: "",
                url: "",
            },

            menus: {
                "type": "menu",
                "list": [{
                        "label": "APP推送",
                        "index": "/care/app",
                        "add": '/care/templateApp',
                        "addBtn": '添加模版'
                    },
                    {
                        "label": "站内信",
                        "index": "/care/mail",
                        "add": '/care/templateInfo',
                        "addBtn": '添加模版'
                    },
                    {
                        "label": "短信",
                        "index": "/care/sms",
                        "add": '/care/templateMsg',
                        "addBtn": '添加模版'
                    },
                    {
                        "label": "微信模版",
                        "index": "/care/chat",
                        "add": '/care/templateWeChat',
                        "addBtn": '添加模版'
                    },
                    {
                        "label": "触发条件",
                        "index": "/care/trigger",
                        "add": '/care/relation',
                        "addBtn": '创建关联'
                    }
                ],
                "activeIndex": "/care/app" //初始值
            }


        }
    },
    watch: {

    },
    components: {
        BreadCrumb,
        TableTabs,
        AddButton
    },
    created() {
        this.menus.activeIndex = this.$route.path;
        let arr = _.find(this.menus.list, ['index', this.$route.path]);
        this.breadcrumb[2].name = arr.label
        this.addButton.name = arr.addBtn
        this.addButton.url = arr.add
    },
    computed: {

    },
    methods: {
        menusClick(index) { //点击nav
            let option = this.getLabel(this.menus.list, index)
            this.breadcrumb[2].name = option[0].label;
            this.addButton.name = option[0].addBtn;
            this.addButton.url = option[0].add;
        },
        getLabel(arr, name) {
            return arr.filter(e => {
                return e.index == name
            });
        }
    }
}
</script>
<style scoped>
.menus-box {
    position: relative;
}

.menus-box .add-ad {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    align-items: center;
    margin-top: 0;
    padding: 0;
}
</style>