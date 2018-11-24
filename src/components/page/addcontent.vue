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
                    <formlist :formdata="options"></formlist>
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
          name: "营销管理" //名字
        },
        {
          name: "内容" //名字
        },
        {
          name: "添加内容" //名字
        }
      ],
      options: [
        {
          name: "title",
          type: "input",
          label: "标题名称",
          placeholder: '标题名称',
          rules: [
            {
              required: true,
              message: "请输入标题名称",
              trigger: "blur"
            },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "label",
          type: "label",
          label: "标签",
          clicked: false,
          rules: [
          ],
          options: [
            {
              label: '避坑指南',
              value: '1'
            },
            {
              label: '攻略',
              value: '2'
            }
          ],
          value: []
        }
      ]
    };
  },
  components: {
    BreadCrumb,
    formlist
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
</style>
