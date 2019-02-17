<template>
    <div class="refund_info">
        {{refundInfo}}
    </div>
</template>

<script>
    import Config from "../config";
    export default {
        name: 'OrderRefundInfo',
    
        components: {
    
        },
    
        data() {
            return {
                
            }
        },
    
        props: {
            refundInfo: {
                type: Object(),
                default: () => {}
            }
        },
    
        computed: {},
    
        beforeRouteUpdate(to, from, next) {
    
        },
    
        created() {
        },
    
        mounted() {
        },
    
        methods: {
            
        }
    }
</script>

<style scoped>
    
</style>
