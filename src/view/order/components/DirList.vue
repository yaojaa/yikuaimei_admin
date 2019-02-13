<template>
    <div>
        <el-steps :space="100" direction="vertical" :active="0">
            <el-step 
                :key="index" 
                v-for="(item, index) in disInfo"
                :title="`${item.order_dis_ctime} ${item.order_dis_content}`"
            ></el-step>
        </el-steps>
    </div>
</template>

<script>
   
    
    export default {
        name:'Dirlst',

        components: {
    
        },

        data() {
            return {
                
            }
        },

        props:{
            disInfo: {
                type: Array,
                default:() => []
            }
        },

        computed:{
            disInfo_id(){
                return disInfo.order_dis_package_id
            }
        },
    
        beforeRouteUpdate(to, from, next) {
    
        },

        created() {
            console.log(this.disInfo)
        },

        mounted() {

        },

        methods: {
    
        }
    }
</script>

<style scoped>
    
</style>
