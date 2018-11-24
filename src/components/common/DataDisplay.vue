<template>
    <div class="box">
        <div class="panel textboxcontainer">
            <div class="textbox" v-for="(v,i) in data" :key="i">
                <div class="text-t">
                    <p class="f13 text-info"><i class="iconfont"></i>{{v.title}}</p>
                    <h3 class="f24" v-countup='{startvalue:0,endvalue:parseInt(v.num)}'></h3>
                    <span class="f12 text-muted">{{v.label}}</span>
                </div>
                <div class="text-c">
                    <div>
                        <p class="f12 text-info">{{v.lefttitle}}</p>
                        <h4 class="f14">{{v.lfetnum}}</h4>
                    </div>
                    <div class="line"></div>
                    <div>
                        <p class="f12 text-info">{{v.righttitle}}</p>
                        <h4 class="f14">{{v.rightnum+'%'}}</h4>
                    </div>
                </div>
                <el-progress v-if="progress" :color="['#8EE6E5','#99B7EE 100%'][i%2]" class="text-b" :text-inside="true" :stroke-width="6" :percentage="v.rightnum"></el-progress>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            
        }
    },
    props:['data','progress'],
    methods: {

    },
    mounted() {
        
    },
    computed: {
        
    }
}
</script>
<style lang='less' scoped>
.box{
    width: 100%;
}
.textboxcontainer {
    background-color: transparent;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .textbox {
        background-color: #fff;
        flex: 1;
        margin-right: 20px;
    }
    .text-b {
        // padding-top: 19px;
        /deep/ .el-progress-bar {
            margin-bottom: -12px;
        }
        /deep/ .el-progress-bar__outer {
            background-color: #CDCFE8;
        }
    }
}
.textboxcontainer>div:nth-last-child(1) {
        margin: 0;
    }
.text-t {
    padding-top: 16px;
    text-align: center;
    p {
        line-height: 17px;
        font-weight: 600;
    }
    ;
    h3 {
        font-weight: 600;
        margin-top: 10px;
        line-height: 29px;
        color: #333;
    }
    ;
    span {
        line-height: 14px;
    }
}

.text-c {
    margin-top: 27px;
    margin-bottom: 19px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
        flex: 1;
        white-space: nowrap;
        text-align: center;
    }
    ;
    div:nth-child(1) {
        padding-left: 11px;
    }
    .line {
        flex: 0 0 1px;
        height: 34px;
        background-color: #f5ecff;
    }
    ;
    p {
        line-height: 18px;
        margin: 5px;
    }
}

.text-b /deep/ .el-progress-bar__outer {
    overflow: visible;
}

.text-b /deep/ .el-progress-bar__innerText {
    color: #999;
    margin: 0 -16px;
    margin-top: -37px;
}
.text-info{
    line-height: 18px;
}
div /deep/ .el-progress-bar__inner{
    animation: progress-bar-stripes 5s linear infinite;
    background-image: linear-gradient(15deg,rgba(255,255,255,0.25) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.25) 75%,transparent 75%,rgba(255,255,255,0.25) 100%);
}
@keyframes progress-bar-stripes
{
    0% {
    background-position: 0 0;
    }
    100% {
    background-position: 580px 0;
    }
}
</style>