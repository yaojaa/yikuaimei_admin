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
                    <formlist :formdata="options" @onsubmit="submit()"></formlist>
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
          name: "实物券", //名字
          url: '/physicalcoupon'
        },
        {
          name: "添加实物券" //名字
        }
      ],
      options: [
        {
          name: "couponName",
          type: "input",
          label: "模板名称",
          placeholder: '优惠券名称',
          rules: [
            {
              required: true,
              message: "请输入优惠券模板名称",
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
          name: "eventTime",
          type: "timeSlot",
          label: "有效期",
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
          name: "overtime",
          type: "input",
          placeholder: '领取后多少天过期',
          width: '70%',
          label: "",
          key1: "天",
          rules: [
            {
              required: true,
              message: "请输入过期时间",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "goodPrice",
          type: "input",
          label: "商品价格",
          placeholder: '商品价格',
          rules: [
            {
              required: true,
              message: "请输入商品价格",
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
          name: "pictrue",
          type: "upload",
          label: "身份证正面",
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
          name: "pictrue",
          type: "upload",
          label: "身份证反面",
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
          label: "使用描述",
          placeholder: "请输入1000字以内的内容",
          rules: [
            {
              required: true,
              message: "请填写使用描述",
              trigger: "blur"
            }
          ],
          value: ""
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
  methods: {
    submit(e){

      //....

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
