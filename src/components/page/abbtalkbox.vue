<template>
    <div>
        <talk-box :table='false' :talk='true' :url='"ws://172.16.1.250:9502?from=front&token=k4k7986arg4a2cqvr27hstj8fo"'></talk-box>
    </div>
</template>
<script>
    import TalkBox from '@/components/common/TalkBox.vue'
    export default{
        data(){
            return {

            }
        },
        components:{
            TalkBox
        }
    }
</script>
<style lang="less" scoped>

</style>
