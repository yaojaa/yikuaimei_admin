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
                    <formlist :formdata="options" :labelWidth="'200px'"></formlist>
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
          name: "商品管理" //名字
        },
        {
          name: "平台商品", //名字
          url: '/goodList'
        },
        {
          name: "添加商品" //名字
        }
      ],
      options: [
        {
          name: "eventName",
          type: "input",
          label: "名称",
          placeholder: '名称为2-13字',
          rules: [
            {
              required: true,
              message: "请输入活动名称",
              trigger: "blur"
            },
            {
              min: 2,
              max: 13,
              message: "长度在 2 到 13 个字符",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "describe",
          type: "textarea",
          label: "商品编码",
          placeholder: "支持14位内的数字+英文组合",
          rules: [
            {
              required: true,
              message: "请填写商品编码",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "gameTemplate",
          type: "textarea",
          label: "商品卖点",
          rules: [
            {
              required: true,
              message: "请输入商品卖点",
              trigger: "blur"
            }
          ],
          rules: [
            {
              required: true,
              message: "请填写商品卖点",
              trigger: "blur"
            },
            {
              min: 2,
              max: 50,
              message: "长度在 2 到 50 个字符",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "coupon",
          type: "selector",
          label: "商品类目",
          placeholder: '选择所属行业类目',
          rules: [
            {
              required: true,
              message: "请选择商品类目",
              trigger: "blur"
            }
          ],
          options: [
            {
              label: '满2000减1000',
              value: '001'
            }
          ],
          value: ""
        },
        {
          name: "pictrue",
          type: "upload",
          label: "商品视频",
          rules: [
            {
              required: true,
              message: "请添加商品视频",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "pictrue",
          type: "upload",
          label: "商品图片",
          rules: [
            {
              required: true,
              message: "请添加商品图片",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "pictrue",
          type: "upload",
          label: "商品展示图",
          rules: [
            {
              required: true,
              message: "请添加商品展示图",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "eventTime",
          type: "single",
          label: "规格",
          rules: [
          ],
          options: [
            {label: '无规格', name: 'none'},
            {label: '有规格', name: 'have'},
          ],
          children: [
            {
              fatherName: 'none',
              name: "days",
              type: "input",
              label: "售价",
              key1: '元',
              rules: [
                {
                  required: true,
                  message: "请填写售价",
                  trigger: "blur"
                }
              ],
              value: ""
            },
            {
              fatherName: 'none',
              name: "days",
              type: "input",
              label: "原价",
              key1: '元',
              rules: [
                {
                }
              ],
              value: ""
            },
            {
              fatherName: 'none',
              name: "days",
              type: "input",
              label: "成本",
              key1: '元',
              rules: [
                {
                  required: true,
                  message: "请填写成本",
                  trigger: "blur"
                }
              ],
              value: ""
            },
            
          ],
          value: "none"
        },
        {
          name: "days",
          type: "input",
          label: "参与频次",
          key1: '天',
          rules: [
            {
              required: true,
              message: "请填写参与周期",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "times",
          type: "input",
          label: "",
          key1: '次',
          rules: [
            {
              required: true,
              message: "请填写参与次数",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "coupon",
          type: "selector",
          label: "选择券",
          placeholder: '优惠券的名称',
          rules: [
            {
              required: true,
              message: "请选择优惠券",
              trigger: "blur"
            }
          ],
          options: [
            {
              label: '满2000减1000',
              value: '001'
            }
          ],
          value: ""
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
  methods: {}
};
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
</style>
