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
                    <formlist :formdata="options" :labelWidth="'200px'" v-if="isShow" @submit="submit"></formlist>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import formlist from "@/components/formlist";

export default {
  name: "createCategory",
  data() {
    return {
      isShow: true,
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
          name: "分类管理" //名字
        }
      ],
      options: [
        {
          name: "category_id",
          type: "input",
          label: "行业分类id",
          value: ''
        },
        {
          name: "category_name",
          type: "input",
          label: "行业分类名称",
          placeholder: '名称为2-13字',
          rules: [
            {
              required: true,
              message: "请填写行业分类名称",
              trigger: "blur"
            },
            {
              min: 2,
              max: 6,
              message: "长度在 2 到 6 个字符",
              trigger: "blur"
            }
          ],
          value: ''
        },
        {
          name: "category_name",
          type: "textarea",
          label: "备注",
          placeholder: '备注为0-30字',
          rules: [
            {
              min: 0,
              max: 30,
              message: "长度在 0 到 30 个字符",
              trigger: "blur"
            }
          ],
          value: ''
        }
      ]
    };
  },
  components: {
    BreadCrumb,
    formlist
  },
  created() {
    if(this.$route.query.id){
      this.isShow = false;
      this.$axios({
        url: '/api/admin/category/detail',
        type: 'post',
        params: {id: this.$route.query.id}
      }).then(res => {
        this.isShow = true;
        this.options = this.options.map(o => {
          return {...o, value: res.data.data[o.name]}
        })
      })


    }else{
      this.options.splice(0, 1);
    }
  },
  computed: {},
  methods: {
    submit(data){
      console.log(data);
      let url = '/api/admin/category/create',
          params = { category_name: data.category_name};
      if(data.id){
        url = '/api/admin/category/modify';
        params.id = data.id;
      }
      this.$axios({
        url,
        type: 'post',
        params
      }).then(res => {
        console.log(res)
        if(res.data.code === 0){
          
          this.$message({
              type:"success",
              message: res.data.data
          });
          this.$router.replace('/categorylist')
        }
      })

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
