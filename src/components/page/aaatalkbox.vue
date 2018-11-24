<template>
    <div>
        <talk-box :table='false' :talk='true' :url='"ws://172.16.1.250:9502?from=front&token="+token'></talk-box>
    </div>
</template>
<script>
    import TalkBox from '@/components/common/TalkBox.vue'
    export default{
        data(){
            return {

            }
        },
        created(){
            this.token = this.$store.state.user.sid;
            console.log(this.token)
        },
        components:{
            TalkBox
        }
    }
</script>
<style lang="less" scoped>

</style>
