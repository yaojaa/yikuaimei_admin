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
          name: "营销管理" //名字
        },
        {
          name: "总部活动", //名字
          url: '/event'
        },
        {
          name: "创建活动" //名字
        }
      ],
      options: [
        {
          name: "eventName",
          type: "input",
          label: "活动名称",
          placeholder: '请填写活动名称',
          rules: [
            {
              required: true,
              message: "请输入活动名称",
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
          name: "gameTemplate",
          type: "selector",
          label: "游戏模板",
          rules: [
            {
              required: true,
              message: "请选择游戏模板",
              trigger: "blur"
            }
          ],
          options: [
            {
              label: '砸金蛋活动',
              value: '001'
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
        },
        {
          name: "eventTime",
          type: "timeSlot",
          label: "活动时间",
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
        {
          name: "fanwei",
          type: "input",
          label: "限适用范围",
          placeholder: '',
          rules: [
            {
              required: true,
              message: "请填写使用范围",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "address",
          type: "input",
          label: "领取地址",
          placeholder: '',
          rules: [
            {
              required: true,
              message: "请填写领取地址",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "chance",
          type: "input",
          label: "概率",
          placeholder: '',
          width: '50%',
          rules: [
            {
              required: true,
              message: "请填写概率",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "couponSize",
          type: "input",
          label: "实物券库存数",
          placeholder: '',
          width: '50%',
          rules: [
            {
              required: true,
              message: "请填写库存数",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "overtime",
          type: "single",
          label: "实物券全部领取完中奖配置",
          placeholder: '',
          rules: [
            {
              required: true,
              message: "请填写库存数",
              trigger: "blur"
            }
          ],
          options: [
            {
              type: 'selector',
              name: '',
              label: '发放优惠券',
              value: ''
            },
            {
              type: 'input',
              name: '',
              label: '文案提示',
              value: ''
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
