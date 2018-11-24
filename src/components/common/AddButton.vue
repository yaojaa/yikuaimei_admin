<template>
    <div class="add-ad">
        <div class="left" v-if="addBtn.title">{{addBtn.title}}</div>
        <div class="right">
            <el-button size="mini" type="primary" @click="btnClick">{{addBtn.name}}</el-button>
            <!-- <a href="javascript:;" @click="btnClick">{{addBtn.name}}</a> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props:{
            addBtn: Object
        },
        methods: {
            btnClick() {
                let btn  = this.addBtn; 
                if(btn.url){
                    this.$router && this.$router.push({ path: btn.url})
                }else{
                    this.$emit('btn-click');
                }
            },
        },
        computed: {
        },
        watch:{
        },
        created(){
        }
    }

</script>


<style scoped>
.add-ad{
    height: 50px;
    line-height: 50px;
    display: flex;
    padding: 0 20px 0 10px;
    background-color: #f5f5f5;
}
.add-ad .left{
    flex-grow: 1;
    font-size: 18px;
}
.add-ad .right{
    text-align: right;
}
.add-ad .right a{
    color: #fff;
    display: inline-block;
    height: 26px;
    line-height: 26px;
    padding: 0 10px;
    border-radius: 5px;
    background-color: #7224D8;
    font-size: 14px;
}
</style>
