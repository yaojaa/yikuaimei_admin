<template>
<!-- 筛选 -->
    <div class="nomaltable">
        <!-- <div class="search-header">筛选查询</div> -->
        <div class="search-box" v-loading="loading">

            <el-form :inline="true" :model="searchVal">

                <el-form-item :label="search.label" v-for="(search, searchIndex) in searchs.list" :key="searchIndex">

                    <!-- 输入框 -->
                    <el-input  v-if="search.type == 'input-text'" v-model="search.value" :placeholder="search.placeholder"></el-input>

                    <!-- 下拉框 -->
                    <el-select v-else-if="search.type == 'input-select'" v-model="search.value" :placeholder="search.placeholder">
                      <el-option v-for="(option, optionIndex) in search.options" :key="optionIndex" :label="option.name" :value="option.value"></el-option>
                    </el-select>

                    <!-- 日期区间 -->
                    <el-date-picker
                        v-else-if="search.type == 'input-date'"
                        v-model="search.value"
                        type="daterange"
                        :align="search.align || 'center'"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"> 
                    </el-date-picker>

                    <el-date-picker
                        v-else-if="search.type == 'input-singal-date'"
                        v-model="search.value"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        :align="search.align || 'center'"
                        unlink-panels
                        :placeholder="search.placeholder"
                        :picker-options="pickerOptions1"> 
                    </el-date-picker>

                    <!-- 单选框 -->
                    <span v-else-if="search.type == 'input-radio'">
                        <el-radio v-for="radio, index in search.options" :key="index" v-model="search.value" :label="radio.value">{{radio.name}}</el-radio>
                    </span>

                </el-form-item>

                <el-form-item>
                    <el-button 
                        size="small" 
                        type="primary" 
                        :icon="searchs.btn && searchs.btn.iconClass || 'el-icon-search'" 
                        @click="search(searchs)">
                        {{searchs.btn && searchs.btn.label || '查询'}}
                    </el-button>
                    <el-button 
                        size="small" 
                        plain 
                        @click="resetForm(searchs)" 
                        class="reset">
                    <img src="/static/img/reset.png"> 重置</el-button>
                </el-form-item>
            </el-form>
                
        </div>

    </div>

</template>
<script>
    export default {
        data() {
            return {
                pickerOptions: {//日期
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                    }]
                },
                searchVal:{},//搜索
                loading: false,
            }
        },
        props:{
            searchs: Object
        },
        methods: {
            search(search) { //搜索


                search.list.forEach((e,i) => {
                    if(e.value!==''){
                      this.searchVal[e.name] = e.value;
                    }
                })
                
                this.$parent.getData && this.$parent.getData(this.searchVal);
            },
            resetForm(search){ //重置
                search.list.forEach((e,i) => {
                    e.value = "";
                    this.searchVal[e.name] = e.value;
                })

                this.$parent.getData && this.$parent.getData(this.searchVal);

            },

            formatter(opt){
                let arr = [];
                let index = [];
                let _data = null;
                let _this = this;
                opt.forEach( (e,i) => {
                    if(e.type == 'input-select' || e.type == 'input-radio'){
                        if(!e.url) return;

                        this.loading = true;

                        let type = e.axiosType || "post";
                        let params = e.params || {};

                        if(type == 'get'){
                            _data = {
                                params: params
                            }
                        }else if(type == 'post'){
                            _data = params;
                        }

                        arr.push(this.promiseAxios({url: e.url, type, data:_data}))
                        index.push(i);
                    }
                    
                })

                if(arr.length > 0){
                    this.$axios.all(arr)
                      .then(function (res) {
                        _this.loading = false;

                        index.map((e,i) => {

                            if(_this.searchs.list[e].formatter && typeof _this.searchs.list[e].formatter == 'function'){
                                _this.searchs.list[e].options = _this.searchs.list[e].formatter(res[i].data,i)
                            }else{
                                _this.searchs.list[e].options = res[i].data;
                            }

                        })

                        console.log(_this.searchs)

                      });
                }

            },

            promiseAxios({url, type, data}){
                return this.$axios[type](url, data)
            },

        },
        computed: {
        },
        watch:{
        },
        created(){
            this.formatter(this.searchs.list);
        }
    }

</script>


<style scoped lang='less'>
.nomaltable /deep/ .el-form-item__content{
    display: inline-block;
}
.nomaltable /deep/ .el-form-item__content>button{
    vertical-align: top;
}
.search-box{
    position: relative;
    /*padding-right: 100px;*/
    background-color: #fff;
    padding:20px 0 0 20px;
    margin-bottom: 26px;
}

.reset{
    color: #7224d8;
    border-color:#7224d8;
}
.reset img{
    height: 12px;
    width: 12px;
    float: left;
    vertical-align: middle;
    margin-right: 5px;
}
.reset:hover{
    background-color: rgba(197,164,239,0.2);
}

.nomaltable .el-form-item{
    margin-right: 25px;
}
</style>
