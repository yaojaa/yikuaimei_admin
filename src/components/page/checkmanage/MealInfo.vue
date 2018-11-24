<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="套餐信息" name="first">
                <ShowDetail :showdata='showdata1'></ShowDetail>
            </el-tab-pane>
            <el-tab-pane class="mealcontent" label="套餐内容" name="second">
                <div>
                    <h3>{{'①  造型'}}</h3>
                    <ShowDetail :showdata="showdata2"></ShowDetail>
                </div>
                <div>
                    <h3>{{'②  场景'}}</h3>
                    <ShowDetail :showdata="showdata3"></ShowDetail>
                </div>
                <div>
                    <h3>{{'③  拍摄'}}</h3>
                    <ShowDetail :showdata="showdata4"></ShowDetail>
                </div>
                <div>
                    <h3>{{'④  成品'}}</h3>
                    <ShowDetail :showdata="showdata5"></ShowDetail>
                </div>
                <div>
                    <h3>{{'⑤  团队'}}</h3>
                    <ShowDetail :showdata="showdata6"></ShowDetail>
                </div>
                <div>
                    <h3>{{'⑥  补充说明'}}</h3>
                    <ShowDetail :showdata="showdata2"></ShowDetail>
                </div>
            </el-tab-pane>
            <el-tab-pane class="serveritem" label="套餐服务项" name="third">
                <div><i class="icon icondone"></i><span>一、确定拍摄时间</span></div>
                <div><i class="icon icondone"></i><span>二、到店签合同</span></div>
                <div><i class="icon icondone"></i><span>三、上传合同及相关票据</span></div>
                <div><i class="icon icondone"></i><span>四、预约拍摄时间及地点</span></div>
                <div><i class="icon icondone"></i><span>五、提醒客户相关注意事项</span></div>
                <div><i class="icon icondone"></i><span>六、安排拍摄</span></div>
                <div><i class="icon icondone"></i><span>七、支付剩余尾款</span></div>
                <div><i class="icon icondone"></i><span>八、选精修片</span></div>
                <div><i class="icon icondone"></i><span>九、确认版面、相框等</span></div>
                <div><i class="icon icondone"></i><span>十、取成品</span></div>
            </el-tab-pane>
            <el-tab-pane class="stylebtn" label="套餐标签" name="fourth">
                <div>
                    <span>类别：</span>
                    <div class="btn">仪式区</div>
                    <div class="btn">主舞台</div>
                </div>
                <div>
                    <span>风格：</span>
                    <div class="btn">仪式区</div>
                </div>
                <div>
                    <span>场地：</span>
                    <div class="btn">仪式区</div>
                </div>
                <div>
                    <span>颜色：</span>
                    <div class="btn">仪式区</div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="btnbox">
            <el-button type="primary">通过</el-button>
            <el-button type="primary">不通过</el-button>
        </div>
    </div>

</template>
<script>
import ShowDetail from '@/components/common/showdetail'
export default {
    data(){
        return{
            activeName:'first',
            showdata1:[
                {
                    type:7,
                    label:'套餐标题',
                    title:'【高端婚礼】18年大热 镜面T台水晶布景超炫灯光'
                },
                {
                    type:7,
                    label:'套餐现价',
                    title:'4998元'
                },
                {
                    type:7,
                    label:'套餐原价',
                    title:'6999元'
                },
                {
                    type:7,
                    label:'定金支付',
                    title:'1500元'
                },
                {
                    type:7,
                    label:'负责人姓名',
                    title:'赵春钫'
                },
                {
                    type:7,
                    label:'订单礼',
                    title:'全款支付送万元婚嫁大礼包'
                },
                {
                    type:7,
                    label:'全款礼',
                    title:'全款支付送万元婚嫁大礼包'
                },
                {
                    type:7,
                    label:'套餐封面',
                    imgurl:'/static/img/2.png'
                },
                {
                    type:7,
                    label:'套餐头图',
                    imgurl:['/static/img/2.png','/static/img/2.png','/static/img/2.png','/static/img/2.png']
                },
                {
                    type:7,
                    label:'套餐描述',
                    title:'城市花园婚纱摄影，中国一站式婚纱摄影领导品牌。自成立以来始终坚持【原创、高端、幸福】风格。'
                },
                {
                    type:7,
                    label:'商家简介',
                    title:'韩国KBS报道：韩国艺匠ARTIZ STUDIO对全球婚纱照有着不可忽视的影响。在洛杉矶、首尔、新加坡、上海等地引起一场婚照革命。艺匠工匠来自世界各地。中国、德国、法国、韩国、美国、意大利等。'
                },
                {
                    type:7,
                    label:'套餐图片',
                    imgurl:['/static/img/2.png','/static/img/2.png','/static/img/2.png','/static/img/2.png']
                }
            ],
            showdata2:[
                {
                    type:7,
                    label:'新娘服装',
                    title:'4套'
                },
                {
                    type:7,
                    label:'新郎服装',
                    title:'4套'
                },
                {
                    type:7,
                    label:' 服装说明',
                    title:'提供精致白纱、晚礼、特色服装整体搭配【城市恋人拍摄区】'
                },
                {
                    type:7,
                    label:'造型说明',
                    title:['提供首席摄影、化妆团队','量身定制全程拍摄【全程贴心服务】','提供拍摄新娘化妆造型4款','提供拍摄新郎化妆造型全程']
                }
            ],
            showdata3:[
                {
                    type:7,
                    label:'拍摄场景',
                    title:'4'
                },
                {
                    type:7,
                    label:'内外景结合',
                    title:'4'
                },
                {
                    type:7,
                    label:'内景说明',
                    title:['【公主馆】','【纯爱美艺馆】','【戛纳国际公馆】','【印象美学宫殿】']
                },
                {
                    type:7,
                    label:'外景说明',
                    title:['【丁达尔5D电影棚】','【希腊圣托里尼】','【异国风情街】','【秘密花园】']
                }
            ],
            showdata4:[
                {
                    type:7,
                    label:'新娘服装',
                    title:'4套'
                },
                {
                    type:7,
                    label:'新郎服装',
                    title:'4套'
                },
                {
                    type:7,
                    label:' 服装说明',
                    title:'提供精致白纱、晚礼、特色服装整体搭配【城市恋人拍摄区】'
                },
                {
                    type:7,
                    label:'造型说明',
                    title:['提供首席摄影、化妆团队','量身定制全程拍摄【全程贴心服务】','提供拍摄新娘化妆造型4款','提供拍摄新郎化妆造型全程']
                }
            ],
            showdata5:[
                {
                    type:7,
                    label:'新娘服装',
                    title:'4套'
                },
                {
                    type:7,
                    label:'新郎服装',
                    title:'4套'
                },
                {
                    type:7,
                    label:' 服装说明',
                    title:'提供精致白纱、晚礼、特色服装整体搭配【城市恋人拍摄区】'
                },
                {
                    type:7,
                    label:'造型说明',
                    title:['提供首席摄影、化妆团队','量身定制全程拍摄【全程贴心服务】','提供拍摄新娘化妆造型4款','提供拍摄新郎化妆造型全程']
                }
            ],
            showdata6:[
                {
                    type:7,
                    label:'新娘服装',
                    title:'4套'
                },
                {
                    type:7,
                    label:'新郎服装',
                    title:'4套'
                },
                {
                    type:7,
                    label:' 服装说明',
                    title:'提供精致白纱、晚礼、特色服装整体搭配【城市恋人拍摄区】'
                },
                {
                    type:7,
                    label:'造型说明',
                    title:['提供首席摄影、化妆团队','量身定制全程拍摄【全程贴心服务】','提供拍摄新娘化妆造型4款','提供拍摄新郎化妆造型全程']
                }
            ],
        }
    },
    methods:{
        handleClick(t){
            
        }
    },
    beforeCreate(){
        
    },
    mounted(){
        
    },
    components:{
        ShowDetail
    }
}
</script>
<style lang="less" scoped>

.btn{
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 3px;    
    border: 1px solid #666;
}
.btnbox{
    display: flex;
    justify-content: center;
    margin: 30px;
}
.stylebtn .btn{
    border-radius: 35px;
    color: #666;
    padding: 0 10px;
}
.serveritem{
    div{
        margin: 15px;
        margin-left: 30px;
    }
}
.mealcontent h3{
    margin-left: 20px;
}
.mealcontent /deep/ .pbox{
    flex: 8;
}
</style>