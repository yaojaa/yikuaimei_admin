<template>
<!-- tabs -->
<div class="nomaltable">
    <div class="handle-box" v-if="pageTabs.type == 'menu'">
        <el-menu :default-active="pageTabs.activeIndex" class="primary-menu" mode="horizontal" router @select="menuClick">
          <el-menu-item v-for="(item, index) in pageTabs.list" :index="item.index" :key="index">{{item.label}}</el-menu-item>
        </el-menu>
    </div>
    <div v-else :class="{tabcard:pageTabs.type == 'card'}">
        <el-tabs :type="pageTabs.type" v-model="pageTabs.activeVal" @tab-click="handleSelect(pageTabs.activeVal)">
            <el-tab-pane 
                v-for="(tab, tabIndex) in pageTabs.list" 
                :key="tab.name" 
                :label="tab.label" 
                :name="tab.name">
                <slot :name="tab.name"></slot>
            </el-tab-pane>
        </el-tabs>
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
            pageTabs: Object
        },
        methods: {
            handleSelect(val) { // 选中选项卡触发
                let tabs = this.pageTabs.list;
                let index = this.getIndex(tabs,val,"name");
                
                if(tabs[index].url){
                    this.$router && this.$router.push({ path: tabs[index].url})
                }else{
                    this.$emit('tabs-click',index, this)
                }
            },
            getIndex(arr,val,key){  //v再数组a中的位置
                let index;
                arr.forEach((e,i) => {
                    if(e[key] == val){
                        index = i;
                    }
                });
                return index;
            },
            menuClick(index){
                this.$emit('tabs-click',index)
            }
           
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

</style>
