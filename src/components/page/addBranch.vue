<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="form-panel p-xl">
                    <formlist :formdata="options" @submit="submit"></formlist>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import formlist from "@/components/formlist";

export default {
    name: "tabletest",
    data() {
        return {
            url: "",
            breadcrumb: [
                //面包屑
                {
                    name: "分公司管理", //名字
                    url: 'branchManagement'
                },
                {
                    name: "添加分公司" //名字
                }
            ],
            options: [{
                    name: "name",
                    type: "input",
                    label: "公司名称",
                    placeholder: '请输入公司名称',
                    rules: [{
                            required: true,
                            message: "请输入公司名称",
                            trigger: "blur"
                        },
                        {
                            min: 3,
                            max: 5,
                            message: "长度在 3 到 5 个字符",
                            trigger: "blur"
                        }
                    ],
                    value: "abc"
                },
                {
                    name: "region",
                    label: "联系地址",
                    placeholder: '请选择',
                    type: "address",
                    key0: "满",
                    rules: [{
                        required: true,
                        message: "请输入联系地址",
                        trigger: "blur"
                    }],
                    value: ['', '', '']
                },
                {
                    name: "address",
                    type: "input",
                    label: "详细地址",
                    placeholder: '详细地址',
                    rules: [{
                        required: true,
                        message: "请输入详细地址",
                        trigger: "blur"
                    }],
                    value: "朝阳大悦城"
                },
                {
                    name: "linkman",
                    type: "input",
                    label: "负责人姓名",
                    placeholder: '输入负责人',
                    rules: [{
                        required: true,
                        message: "请输入负责人姓名",
                        trigger: "blur"
                    }],
                    value: "小王"
                },
                {
                    name: "phone",
                    type: "input",
                    label: "负责人电话",
                    placeholder: '输入负责人电话',
                    rules: [{
                        required: true,
                        message: "请输入负责人电话",
                        trigger: "blur"
                    }],
                    value: "18310101010"
                },
                {
                    name: "landlines",
                    type: "input",
                    label: "座机电话",
                    placeholder: '输入座机电话',
                    rules: [{
                        required: true,
                        message: "请输入座机电话",
                        trigger: "blur"
                    }],
                    value: "010-80808080"
                },
            ]
        };
    },
    components: {
        BreadCrumb,
        formlist
    },
    created() {},
    computed: {},
    methods: {
        submit(form){
            console.log(form)
            this.$axios.post('/api/admin/company/add', form);
        }
    }
};
</script>
<style scoped>
.search {
    background-color: #fff;
    padding: 20px 20px 4px 10px;
}
</style>