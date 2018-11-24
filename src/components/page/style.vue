<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel" v-for="(cas,idx) in classData" :key="'class' + idx">
                <div class="panel-heading">
                    <h3 class="panel-title">{{cas.name}}</h3>
                </div>
                <div class="panel-body classBox">
                    <div class="classOne" v-for="(nm, ind) in cas.list" :key="'nm' + ind">{{nm}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
    name: "tabletest",
    data() {
        return {
            vue: "slot",
            url: "./static/vuetable.json",
            breadcrumb: [
                //面包屑
                {
                    name: "营销管理", //名字
                    url: "/" //路径
                },
                {
                    name: "风格",
                    url: ""
                }
            ],
            classData: [{
                    name: "婚纱摄影",
                    list: [
                        '复古风',
                        '时尚简约',
                        '中式',
                        '欧美时尚',
                        '田园'
                    ]
                },
                {
                    name: "婚礼策划",
                    list: [
                        '复古风',
                        '时尚简约',
                        '中式',
                        '欧美时尚',
                        '田园'
                    ]
                }
            ]
        };
    },
    components: {
        BreadCrumb
    },
    created() {},
    computed: {},
    methods: {}
};
</script>
<style scoped>
.classBox {
    font-size: 18px;
}

.classBox .tit {
    color: #333;
    line-height: 64px;
}

.classBox .classOne {
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #666;
    border: 1px solid #666;
    margin: 0 14px 24px 0;
    border-radius: 20px;
}
</style>