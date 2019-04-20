<template>
    <div class="page">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
           <div class="info">
               <div class="info-left">
                    <img :src="info.user_info_user_img"   class="info-user-img">
               </div>
               <div class="info-right">
                    <div class="info-right-title">
                        <p>{{info.user_info_user_name}}</p>
                        <p>{{info.create_time}}</p>
                        
                    </div>
                    <div class="info-right-content">
                        <p>{{info.content}}</p>
                    </div>
                    <div class="info-right-img">
                        <img :src="item" alt="" v-for="item in info.beauty_img" :key="item" class="img-inline">
                    </div>
                    <div class="info-right-reply">
                        <p>商家回复:{{info.reply_info_reply}}</p>
                    </div>
               </div>
              
               
           </div>

        </div>
    </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
export default {
    name: 'detail',

    components: {
        BreadCrumb
    },

    data() {
        return {
            breadcrumb: [
                //面包屑
                {
                    name: "用户管理"
                },
                {
                    name: "美丽档案",
                    url: "/user/beautifulList"
                },
                {
                    name: "档案详情",
                    url: "/user/beautifulDetail"
                },

            ],
            info: {},
            id:''
        }
    },

    beforeRouteUpdate(to, from, next) {

    },
    created() {},
    computed: {

    },
    mounted() {

        this.id = this.$route.params.id
        console.log(this.id,'id')

        this.getData(this.$route.params)

    },
    methods: {

       

        getData(params) {

            this.$axios({
                method: 'get',
                url: '/api/admin/beautydiary/detail',
                params: params
            }).then((res) => {

                if(res.data.code ==0){
                    this.info = res.data.data;
                    console.log(this.info,'info')
                    //debugger;
                }else{
                    this.$alert('接口返回错误')
                }
                
            }).catch((error) => {
                this.$alert('接口返回错误'+error)
            });
        }
    }
}
</script>
<style scoped>
  .item-list.four-text .hd{
    width: 6em
  }
  .info{
      padding:20px;
      background-color: #fff;
      display: flex;
  }
  .info-left{
      width:70px;

  }
  .info-right{
      flex: 1;
      margin-left: 20px;
      margin-top: 15px;
  }
  .info-user-img{
      width: 70px;
      height: 70px;
      border-radius: 50%;
  }
  .img-inline{
      width:200px;
      height: 200px;
  }
  .info-right-img{
      margin-top: 20px;
  }
</style>