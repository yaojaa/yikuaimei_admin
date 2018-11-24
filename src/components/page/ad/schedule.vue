<template>
    <div class="page sc-main">
        <div class="page-header">
            <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
        </div>
        <div class="page-content">
          <!--   <add-button :add-btn="addButton" @btn-click="$router.go(-1)"></add-button> -->
            <div>
                <div class="sc-date">
                    <div class="cell-btn left-btn"><a href="javascript:;" class="el-icon-arrow-left" @click="leftClick"></a></div>
                    <div class="date-show">
                        <el-date-picker v-model="date" :editable="false" prefix-icon=" " clear-icon=" " align="center" placeholder="选择日期" format="yyyy-MM" value-format="yyyy-MM" type="month" @change="dateChange">
                        </el-date-picker>
                    </div>
                    <div class="cell-btn right-btn"><a href="javascript:;" class="el-icon-arrow-right" @click="rightClick"></a></div>
                </div>
                <div class="sc-content">
                    <div class="sc-list">
                        <div class="sc-list-id cell dateHeader"></div>
                        <div class="sc-list-item cell week dateHeader">日</div>
                        <div class="sc-list-item cell week dateHeader">一</div>
                        <div class="sc-list-item cell week dateHeader">二</div>
                        <div class="sc-list-item cell week dateHeader">三</div>
                        <div class="sc-list-item cell week dateHeader">四</div>
                        <div class="sc-list-item cell week dateHeader">五</div>
                        <div class="sc-list-item cell week dateHeader">六</div>
                    </div>
                    <div class="sc-list" v-for="item,index in datelist" :key="index">
                        <div class="sc-list-id cell dateHeader">
                            <div class="dt"></div>
                            <div class="dd" v-for="no,noIndex in getNo(item)">{{no}}</div>
                        </div>
                        <div v-for="days,i in item" :key="i" class="sc-list-item cell" :class="{dateFlag: (days.flag == 'after' || days.flag == 'before')}">
                            <div class="dt">{{days.day}}</div>
                            <!-- <div class="dd" v-for="logo,logoIndex in logofilter(days)" :key=logoIndex>
                            <div class="logo-des"><img :src="logo.logoPath"><span>{{logo.name}}</span></div>
                        </div> -->
                            <draggable class="drag" v-model="logoList[days.day.toString()]" :options="dragOptions" :move="checkMove">
                                <div class="dd" v-for="logo,logoIndex in logofilter(days)" :key=logoIndex>
                                    <div class="logo-des"><img :src="logo.logoPath"><span>{{logo.name}}</span></div>
                                </div>
                            </draggable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import AddButton from '@/components/common/AddButton'
import draggable from 'vuedraggable'

export default {
    name: 'tabletest',
    data() {
        return {
            url: "",
            date: "",
            dragOptions: {
                animation: 120,
                scroll: true,
                group: 'sortlist',
                ghostClass: 'ghost-style'
            },
            breadcrumb: [ //面包屑
                {
                    "name": "广告", //名字
                },
                {
                    "name": "一站搞定", //名字
                    "url": "/ad/admin"
                },
                {
                    "name": "查看排期", //名字
                }
            ],

            addButton: {
                title: "数据列表",
                name: "返回",
            },

            datelist: [],

            clone: [],

            logoList: {
                "1": [{
                        name: "1111111111",
                        logoPath: "/static/img/img.jpg",
                    },
                    {
                        name: "2222222222122",
                        logoPath: "/static/img/app.png",
                    },
                    {
                        name: "333333333333133",
                        logoPath: "/static/img/img.jpg",
                    },
                ],
                "2": [{
                        name: "111111111111111211",
                        logoPath: "/static/img/img.jpg",
                    },
                    {
                        name: "22222222222222",
                        logoPath: "/static/img/app.png",
                    },
                    {
                        name: "3333333333233",
                        logoPath: "/static/img/img.jpg",
                    },
                ],
                "3":[],
                "4":[],
                "5": [{
                        name: "1111111111511",
                        logoPath: "/static/img/app.png",
                    },
                    {
                        name: "22222222222522",
                        logoPath: "/static/img/img.jpg",
                    },
                    {
                        name: "333333333333333533",
                        logoPath: "/static/img/app.png",
                    },
                    {
                        name: "44444444444544",
                        logoPath: "/static/img/img.jpg",
                    },
                    {
                        name: "55555555555555",
                        logoPath: "/static/img/img.jpg",
                    },
                ],
            }


        }
    },
    components: {
        BreadCrumb,
        AddButton,
        draggable
    },
    created() {
        this.init();
    },
    watch: {
        logoList: function() {
            console.log(this.logoList)
        }
    },
    computed: {

    },
    methods: {
        checkMove(day) {
            console.log(day, this.logoList[day + ""])
        },
        getNo(data) { //获取logo列表最长长度
            let ln = 0;
            let arr = [];
            data.map(e => {
                if (!e.flag) {
                    let el = this.logoList[e.day.toString()] || [{name:"",logoPath:""}];
                    ln = Math.max(ln, el.length)
                }
            })
            for (let i = 1; i <= ln; i++) {
                if (i >= 10) {
                    arr.push("0" + i);
                } else if (i >= 100) {
                    arr.push(i.toString())
                } else {
                    arr.push("00" + i);
                }
            }
            return arr;
        },
        logofilter(data) { //挂载商家
            // return data.flag ? "" : this.logoList[data.day.toString()];

            this.logoList[data.day.toString()] = this.logoList[data.day.toString()] || [];


            return this.logoList[data.day.toString()];
        },
        leftClick() { //向前
            let y = this.date.split("-")[0];
            let m = this.date.split("-")[1];
            m = parseInt(m) - 1;
            if (m <= 0) {
                y = parseInt(y) - 1;
                m = 12;
            }
            this.date = y + "-" + m;
            this.createTable(this.date)
        },
        rightClick() { //向后
            let y = this.date.split("-")[0];
            let m = this.date.split("-")[1];
            m = parseInt(m) + 1;
            if (m > 12) {
                y = parseInt(y) + 1;
                m = 1;
            }

            this.date = y + "-" + m;

            this.createTable(this.date)

        },
        init() { //初始时间

            let d = new Date();
            let y = d.getFullYear();
            let m = d.getMonth() + 1;
            this.date = y + "-" + m;
            this.createTable(this.date);
        },
        dateChange(val) { //选择时间
            this.createTable(val);
        },
        createTable(da) { //da 格式 YY-MM
            this.datelist = [];

            let y = da.split("-")[0];
            let m = da.split("-")[1];

            let dates = [];
            let before = []; //月份前
            let current = []; //当前月份
            let after = []; //月份后
            let days = this.getDateDays(y, m);
            let week = this.getWeek(y, m);
            let _week = this.getWeek(y, m, days);

            if (week % 7 != 0) {
                let _y = y;
                let _m = m - 1;
                let _days = 0;

                if (_m < 0) {
                    _m = 12;
                    _y = y - 1;
                }

                _days = this.getDateDays(_y, _m);

                for (let i = 0; i < week; i++) {
                    before.push(_days - i);
                }

                before.sort((a, b) => a - b);
            }

            for (let i = 1; i <= days; i++) {
                current.push(i)
            }

            for (let i = 1; i <= 6 - _week; i++) {
                after.push(i)
            }

            dates = before.concat(current, after)

            dates.forEach((e, i) => {
                if (i % 7 == 0) {
                    this.datelist.push([{ day: e }])
                } else {
                    this.datelist[this.datelist.length - 1].push({ day: e });
                }

                let lastEl = this.datelist[this.datelist.length - 1]; //最后一组日期

                if (i < before.length) {

                    lastEl[lastEl.length - 1].flag = "before";

                } else if (i >= (before.length + current.length)) {

                    lastEl[lastEl.length - 1].flag = "after";

                }

            })

            //this.datelist=[[{day:"",flag:"",list:[{name:"",logo:""}]}],[{day:"",flag:"",list:[{name:"",logo:""}]}],];
        },
        getDateDays(y, m) { //获取月份天数
            return new Date(y, m, 0).getDate()
        },
        getWeek(y, m, d) { //获取星期天
            d = d || 1;
            return new Date(y + '-' + m + '-' + d).getDay();
        },

    }
}
</script>
<style scoped>
dl,
dd,
dt {
    list-style: none;
}

.sc-main {
    min-width: 800px;
}

.sc-date {
    display: flex;
    justify-content: center;
    background-color: #fff;
    padding-top: 40px;
}

.sc-date .cell-btn a {
    display: block;
    height: 30px;
    width: 38px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #dcdfe6;
    color: #999;
}

.sc-date .cell-btn a:hover {
    color: #7224d8;
    font-weight: bold;
}

.sc-date .right-btn a {
    border-radius: 0 3px 3px 0;
    border-left: none;
}

.sc-date .left-btn a {
    border-radius: 3px 0 0 3px;
    border-right: none;
}

.sc-content {
    background-color: #fff;
    padding: 30px 20px;
}

.sc-list {
    display: flex;
    border: 1px solid #eee;
    border-top: none;
}

.sc-list:first-child {
    border-top: 1px solid #eee;
}

.sc-list-id {
    width: 80px;
    text-align: center;
}

.sc-list .cell {
    border-left: 1px solid #eee;
}

.sc-list .cell:first-child {
    border: none;
}

.sc-list .cell .dt,
.sc-list .cell .dd {
    height: 43px;
    line-height: 43px;
    padding: 0 20px;
    color: #666;
}

.sc-list .sc-list-item {
    flex-grow: 1;
    width: 50px;
    padding-bottom: 15px;
    background-color: #fff;
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.sc-list .sc-list-item .dd {
    cursor: move;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
}

.sc-list .sc-list-item .dd:hover {
    background-color: #f8f9fa;
}

.logo-des {
    display: flex;
    align-items: center;
}

.logo-des img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
}

.logo-des span {
    font-size: 12px;
    color: #999;
    flex-grow: 1;
    width: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.week {
    padding-top: 15px;
    line-height: 1;
    text-align: center;
}

.sc-list .dateFlag {
    background-color: #f8f9fa;
}

.sc-list .dateFlag .dt,
.sc-list .dateFlag .logo-des span {
    color: #ccc;
}

.sc-list .dateHeader {
    background-color: #EEEFFF;
}

.sc-list .sc-list-item .ghost-style {
    display: block;
    color: transparent;
    border: 1px dashed #7224d8;
}
.drag{
    min-height: 43px;
}
</style>
<style>
.sc-date .el-input__inner {
    text-align: center;
    border-radius: 0;
    cursor: pointer;
}

.sc-date .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 200px;
}
</style>