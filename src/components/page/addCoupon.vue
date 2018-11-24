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
          name: "优惠券", //名字
          url: "/marketcoupon"
        },
        {
          name: "添加优惠券" //名字
        }
      ],
      options: [
        {
          name: 'coupon_template_type',
          value: '1'
        },
        {
          name: "coupon_template_name",
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
          type: "input",
          label: "金额",
          placeholder: "输入金额",
          name: "price",
          key0: "满",
          json: 'rules',
          rules: [
            {
              required: true,
              message: "请输入优惠券模板名称",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          type: "input",
          label: "",
          placeholder: "输入金额",
          json: 'rules',
          name: "reduce",
          key0: "减",
          rules: [
            {
              required: true,
              message: "请输入优惠券模板名称",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "eventTime",
          type: "timeSlot",
          label: "有效期",
          json: 'coupon_template_expire',
          timesName: ['coupon_template_expire_start_time', 'coupon_template_expire_end_time'],
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
          name: "coupon_template_expire_days",
          type: "input",
          placeholder: "领取后多少天过期",
          width: "70%",
          label: "",
          key1: "天",
          json: 'coupon_template_expire',
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
          name: "coupon_template_source",
          type: "selector",
          label: "可使用范围",
          placeholder: "",
          rules: [
            {
              required: true,
              message: "请选择使用范围",
              trigger: "blur"
            }
          ],
          options: [
            {
              label: "全部",
              value: "全部"
            },
            {
              label: "APP",
              value: "APP"
            },
            {
              label: "PC",
              value: "PC"
            }
          ],
          value: "全部"
        },
        {
          name: "is_customer_use",
          type: "selector",
          label: "客服专享",
          placeholder: "",
          rules: [
            {
              required: true,
              message: "请选择使用范围",
              trigger: "blur"
            }
          ],
          options: [
            {
              label: "是",
              value: "0"
            },
            {
              label: "否",
              value: "1"
            }
          ],
          value: "0"
        },
        {
          name: "userange",
          type: "selector",
          label: "适用平台",
          placeholder: "",
          rules: [
            {
              required: true,
              message: "请选择使用范围",
              trigger: "blur"
            }
          ],
          options: [
            {
              label: "全部",
              value: "001"
            }
          ],
          value: "001"
        },
        {
          name: "userange",
          type: "selector",
          label: "可使用范围",
          placeholder: "",
          rules: [
            {
              required: true,
              message: "请选择使用范围",
              trigger: "blur"
            }
          ],
          options: [
            {
              label: "指定分类",
              value: "001"
            }
          ],
          value: "001"
        },
        {
          name: "coupon_template_text",
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
  methods: {}
};
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
</style>
