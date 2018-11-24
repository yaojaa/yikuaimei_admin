<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>营销</el-breadcrumb-item>
                    <!-- <el-breadcrumb-item>关怀</el-breadcrumb-item> -->
                    <el-breadcrumb-item to="/care/trigger">触发条件</el-breadcrumb-item>
                    <el-breadcrumb-item>创建关联</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-body">
                    <el-tree :data="data2" show-checkbox node-key="id" :default-expand-all="true" :accordion="true" :props="defaultProps">
                    </el-tree>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data2: [{
                id: 1,
                label: '订单返现',
                children: [{
                    id: 4,
                    label: 'APP推送',
                    children: [{
                        id: 9,
                        label: 'APP模板1'
                    }, {
                        id: 10,
                        label: 'APP模板2'
                    }]
                }, {
                    id: 4,
                    label: '站内信',
                    children: [{
                        id: 9,
                        label: '站内信模板1'
                    }, {
                        id: 10,
                        label: '站内信模板2'
                    }]
                }, {
                    id: 4,
                    label: '短信',
                    children: [{
                        id: 9,
                        label: '短信模板1'
                    }, {
                        id: 10,
                        label: '短信模板2'
                    }]
                }, {
                    id: 4,
                    label: '微信模板',
                    children: [{
                        id: 9,
                        label: '微信模板1'
                    }, {
                        id: 10,
                        label: '微信模板2'
                    }]
                }]
            }, {
                id: 1,
                label: '预约时间前三天',
                children: [{
                    id: 4,
                    label: 'APP推送',
                    children: [{
                        id: 9,
                        label: 'APP模板1'
                    }, {
                        id: 10,
                        label: 'APP模板2'
                    }]
                }, {
                    id: 4,
                    label: '站内信',
                    children: [{
                        id: 9,
                        label: '站内信模板1'
                    }, {
                        id: 10,
                        label: '站内信模板2'
                    }]
                }, {
                    id: 4,
                    label: '短信',
                    children: [{
                        id: 9,
                        label: '短信模板1'
                    }, {
                        id: 10,
                        label: '短信模板2'
                    }]
                }, {
                    id: 4,
                    label: '微信模板',
                    children: [{
                        id: 9,
                        label: '微信模板1'
                    }, {
                        id: 10,
                        label: '微信模板2'
                    }]
                }]
            }, {
                id: 1,
                label: '审核通过',
                children: [{
                    id: 4,
                    label: 'APP推送',
                    children: [{
                        id: 9,
                        label: 'APP模板1'
                    }, {
                        id: 10,
                        label: 'APP模板2'
                    }]
                }, {
                    id: 4,
                    label: '站内信',
                    children: [{
                        id: 9,
                        label: '站内信模板1'
                    }, {
                        id: 10,
                        label: '站内信模板2'
                    }]
                }, {
                    id: 4,
                    label: '短信',
                    children: [{
                        id: 9,
                        label: '短信模板1'
                    }, {
                        id: 10,
                        label: '短信模板2'
                    }]
                }, {
                    id: 4,
                    label: '微信模板',
                    children: [{
                        id: 9,
                        label: '微信模板1'
                    }, {
                        id: 10,
                        label: '微信模板2'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    components: {

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