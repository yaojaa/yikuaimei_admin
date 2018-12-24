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
        <formlist :formdata="options" :api="'/api/admin/business/create'"></formlist>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import formlist from "@/components/formlist";

 // "business_phone" : "18655556666",//加盟商手机号
 //    "business_company_name" : "公司名称",//公司名称
 //    "category_id" : [1,2,8],//行业id 3或[3]或[3,5,7]
 //    "business_type" : 1,//1加盟 2非加盟
 //    "business_corporation" : "张三",//法人
 //    "business_sfz_num" : "370684198909212231",//身份证号
 //    "business_sfz_pic_z" : "/z.jpg",//身份证正面照片地址
 //    "business_sfz_pic_f" : "/f.jpg",//身份证反面照片地址
 //    "business_licence_num" : "2356325623",//营业执照号码
 //    "business_licence_pic" : "/ico.jpg",//营业执照图片地址
 //    "business_company_adress" : "大望路27号",//公司地址
 //    "referee_phone" : "18668991078",//推荐人手机号
 //    "review_id" : "5be55f3e4c22ad1bd0007e2c",//加盟商审核信息的_id
 //    "business_contract_num" : "34563434",//合同编号
 //    "business_percentage" : 80,//进货提成比例
 //    "business_discount_mater" : 70,//线下耗材折扣
 //    "business_discount_goods" : 60,//线下商品折扣
 //    "business_discount_device" : 90//线下仪器折扣

export default {
  name: "tabletest",
  data() {
    return {
      url: "",
      breadcrumb: [
        //面包屑
        {
          name: "加盟商" //名字
        },
        {
          name: "添加加盟商" //名字
        }
      ],
      options: [
        {
          name: "business_company_name",
          type: "input",
          label: "公司名称",
          placeholder: '公司名称',
          rules: [
            {
              required: true,
              message: "请输入公司名称",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "business_company_adress",
          type: "input",
          label: "公司地址",
          rules: [
           {
              required: true,
              message: "请输入公司地址",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "referee_phone",
          type: "input",
          placeholder: '推荐人手机号',
          width: '70%',
          label: "推荐人手机号",
          value: ""
        },
        {
          name: "business_type",
          type: "single",
          label: "加盟商类别",
          options:[
          {value:'0',
           label:'加盟'
          },
          {value:'1',
           label:'非加盟'
          },
          ],
          value: ""
        },

          {
          name: "business_corporation",
          type: "input",
          placeholder: '法人姓名',
          width: '70%',
          label: "法人姓名",
          value: "",
            rules: [
            {
              required: true,
              message: "请添加法人姓名",
              trigger: "blur"
            }
          ],
        },
          {
          name: "business_phone",
          type: "input",
          placeholder: '法人手机号',
          width: '70%',
          label: "法人手机号",
          value: "",
            rules: [
            {
              required: true,
              message: "请填写手机号",
              trigger: "blur"
            }
          ],
        },

        {
          name: "business_sfz_pic_z",
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
          name: "business_sfz_pic_f",
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
          name: "business_licence_num",
          type: "input",
          label: "营业执照号码",
          placeholder: "请输入营业执照号码",
          rules: [
            {
              required: true,
              message: "请填写正确的营业执照号码",
              trigger: "blur"
            }
          ],
          value: ""
        },
          {
          name: "business_licence_pic",
          type: "upload",
          label: "营业执照照片",
          rules: [
            {
              required: true,
              message: "请添加营业执照照片",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "business_contract_num",
          type: "input",
          label: "合同编号",
          placeholder: "请输入合同编号",
          rules: [
            {
              required: true,
              message: "请输入合同编号",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "business_percentage",
          type: "input",
          label: "进货提成比例",
          placeholder: "只输入数字如20，即20%",
          rules: [
            {
              required: true,
              message: "进货提成比例",
              trigger: "blur"
            },
             {
              isNumer: true,
              message: "只支持数字",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "business_discount_mater",
          type: "input",
          label: "线下耗材折扣",
          placeholder: "请输入折扣",
          rules: [
            {
              required: true,
              message: "请填写折扣",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "business_discount_goods",
          type: "input",
          label: "线下商品折扣",
          placeholder: "请输入线下商品折扣",
          rules: [
            {
              required: true,
              message: "请填写折扣",
              trigger: "blur"
            }
          ],
          value: ""
        },
        {
          name: "business_discount_device",
          type: "input",
          label: "线下仪器折扣",
          placeholder: "请输入线下仪器折扣",
          rules: [
            {
              required: true,
              message: "请填写仪器折扣",
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
  created() {


  },
  computed: {

  },
  methods: {}
};
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px 20px 4px 10px;
}
</style>
