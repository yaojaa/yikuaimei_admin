<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <formlist :formdata="options"></formlist>
            </div>
        </div>

    </div>
</template>

<script>
import formlist from "@/components/formlist";
export default {
  name: "baseform",
  data: function() {
    return {
      options: [
        {
          name: "title",
          type: "input",
          label: "展会名称",
          rules: [
            {
              required: true,
              message: "请输入展会名称",
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
          name: "title1",
          type: "input",
          label: "展会介绍",
          rules: [
            {
              required: true,
              message: "请输入展会介绍",
              trigger: "blur"
            },
            {
              min: 10,
              max: 50,
              message: "长度在 10 到 50 个字符",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "eventTime",
          type: "timeSlot",
          label: "展会时间",
          rules: [
            {
              required: true,
              message: "请选择开始和结束时间",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "map",
          type: "map",
          label: "展会地址",
          rules: [
            {
              required: true,
              message: "请添加图片",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "ADPic",
          type: "upload",
          label: "广告图片",
          rules: [
            {
              required: true,
              message: "请添加图片",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "describe",
          type: "textarea",
          label: "描述",
          rules: [
          ],
          value: ""
        }
      ]
    };
  },
  methods: {
  },
  components: {
    formlist
  }
};
</script>