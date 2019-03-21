<template>
    <div class="page">
        <div class="page-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>加盟商</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-content">
           

        </div>
    </div>
</template>
<script>
export default {
    name: 'detail',

    components: {},

    data() {
        return {
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
</style>