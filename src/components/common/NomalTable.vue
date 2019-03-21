<template>
    <div>

        <slot></slot>

        <div class="nomaltable goodlist-table-custem" :class="{noborder: !border}">
            <div class="right-button table-button" :class="{tabletabs: tableJson.excelButton && tableJson.excelButton.tableTabs}">
                <span v-for="(excel, excelIndex) in tableJson.excelButton" :key="excelIndex"> 
                    <el-upload
                        v-if="excel.type == 'upload'"
                        class="upload-button"
                        action="https://jsonplaceholder.typicode.com/posts/" 
                        :show-file-list="false">
                        <el-button plain size="mini" class="el-icon-document"> 导入</el-button>
                    </el-upload>
                    <el-button v-if="excel.type == 'export'" plain size="mini" class="el-icon-tickets" @click="export2Excel(tableJson)"> 导出</el-button>
                </span>
            </div>

            <el-table 
            :data="tableData" 
            :border='border' 
            :row-class-name="tableRow" 
            :span-method="tableJson.spanMethod" 
            :cell-style="tableJson.cellstyle"
            header-row-class-name="head-row" 
            v-loading="loading"
            style="width: 100%" 
            ref="multipleTable" 
            @sort-change="sortable" 
            @selection-change="handleSelectionChange">
                    <el-table-column 
                        v-if="tableJson.selectBox" 
                        type="selection" 
                        :align="tableJson.selectBox.center || 'left'" 
                        :width="tableJson.selectBox.width">
                    </el-table-column>
                    <el-table-column 
                        v-for="(column, columnIndex) in tableJson.column" 
                        :key="columnIndex"
                        :sortable="column.sortable || false"
                        :label="column.label" 
                        :prop="column.prop"
                        :width="column.width || ''"
                        :fixed="column.fixed || false"
                        :min-width="column.minWidth"
                        :align="column.align || 'left'"
                        :header-align="column.headerAlign">
                        <template slot-scope="scope">
                            <p v-if="column.type == 'text'" v-html="formatter(scope.row,column,columnIndex,scope.$index)"></p>
                            <!-- <p v-if="column.type == 'text'" v-html="formatter(scope.row[column.prop])"></p> -->

                            <el-popover
                                v-if="column.type == 'hover'"
                                :placement="column.hover.placement || 'bottom'"
                                :title="column.hover.title || ''"
                                :width="column.hover.width || 150"
                                :trigger="column.hover.trigger || 'hover'"
                                :popper-class="column.hover.popperClass || ''"
                                :content="scope.row[column.prop]">
                                <el-button type="text" size="small" slot="reference" v-html="column.hover.label"></el-button>
                            </el-popover>

                            <el-button 
                                v-if="column.type == 'handle'" 
                                v-for="(handle, handleIndex) in column.list" 
                                :key="handleIndex" 
                                size="small" 
                                type="text" 
                                @click="handleButtons(handle, scope)"
                                v-html="handle.label">
                            </el-button>

                            <el-button 
                                v-if="column.type == 'switch_btn'" 
                                size="small" 
                                type="text" 
                                @click="handleSwitch(scope,column)"
                                v-html="scope.row[column.prop]?column.value[0]:column.value[1]">
                            </el-button>

                            <el-button 
                                v-if="column.type == 'switch_button'" 
                                size="small" 
                                type="text" 
                                @click="handleSwitchButton(scope,column)"
                                v-html="scope.row[column.prop]==1?column.value[0]:column.value[1]">
                            </el-button>


                            

                            <el-switch
                                v-if="column.type == 'switch'"
                                v-model="scope.row[column.prop]"
                                :active-color="column.config.activeColoe || '#7224D8'"
                                :inactive-color="column.config.inactiveColor || '#999'"
                                :active-text="column.config.value[1]"
                                :inactive-text="column.config.value[0]"
                                @change="switchChange(scope.row, column)">
                            </el-switch>

                        </template>
                    </el-table-column>

            </el-table>

            <div class="pagination" v-if="page.total > page.page_size">
                <!-- <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="page.total" :current-page="page.currentPage">
                </el-pagination> -->
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="page.page"
                  :page-size="page.page_size"
                  :total="page.total"
                  layout="prev, pager, next, jumper">
                </el-pagination>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'nomaltable',
        data() {
            return {
                loading: false,
                tableData: [],//表格数据
                tableUrl:"",
                page:{
                    page:1,//当前页
                    page_size:10,
                },
            }
        },
        props:{
            tableJson: Object,
            url: String,
            border: Boolean,
            axiosType: String,
            pageSize: Number,
            isPage: {
                type: Boolean,
                default: true
            },
            query: {
                type: Object,
                default: function(){
                    return {}
                }
            }
        },
        created() {
            let page = JSON.parse(sessionStorage.getItem('page'));
            let path = this.$route.path;


            if(page){
                if(page[path]){
                    this.page.currentPage = page[path].currentPage;
                    this.page.pageSize = page[path].pageSize;
                }
                sessionStorage.removeItem("page");
            }
            
            this.page.pageSize = this.pageSize || this.page.pageSize;

            this.getPageData({
                currentPage: this.page.page,
                pageSize: this.page.page_size
            })

            this.getData({
                is_page: 1,
                page: this.page.page
            });
        },
        mounted(){
           
        },
        computed: {
        },
        methods: {

            // 获取 easy-mock 的模拟数据
            getData(params, type) {
                console.log("getData--",params);

                let _this = this;


                params.page = params.page || this.page.page || 1;
                params.page_size = params.page_size || this.page.page_size || this.page_size || 10;

                this.loading = true;
                console.log(this.query, '-----')
                this.Axios({
                    url: _this.url,
                    type: type || _this.axiosType,
                    params: {...params,...this.query, is_page: this.isPage ? 1 : 0},
                    // params: {},
                    successfn(d){

                        _this.loading = false;

                        if(_this.tableJson.formatter && typeof _this.tableJson.formatter == 'function'){
                            _this.tableData = _this.tableJson.formatter(d.data);
                        }else{
                            _this.tableData = d.data;
                        }

                        let page = d.pagination;

                        // page = {
                        //     current_page:1,
                        //     page_size:10,
                        //     total:158
                        // }

                        _this.page.page = parseInt(page.current_page);
                        _this.page.page_size = parseInt(page.page_size);
                        _this.page.total = parseInt(page.total);

                        _this.getPageData({
                            currentPage: _this.page.currentPage,
                            pageSize: _this.page.pageSize
                        })

                    },
                    errorfn: function(){}

                })

            },
            formatter(row, column, columnIndex, rowIndex) { //格式数据
                if(column.formatter){
                    return column.formatter(row, column, columnIndex, rowIndex)
                }else{
                    return row[column.prop]
                }
            },
            tableRow({row,rowIndex}) { //添加表格斑马线
                if(rowIndex%2 == 1){
                    return "table-row"
                }
            },
            export2Excel(table) { //导出
                let headers = [];
                let props = [];

                table.column.forEach(e => {
                    if(e.prop){
                        props.push(e.prop)
                        headers.push(e.label)
                    }
                })

    　　　　　　require.ensure([], () => {
    　　　　　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
    　　　　　　　　const tHeader = headers;
    　　　　　　　　const filterVal = props;
    　　　　　　　　const list = this.tableData;
    　　　　　　　　const data = this.formatJson(filterVal, list);
    　　　　　　　　export_json_to_excel(tHeader, data, table.excelButton.export.name);
    　　　　　　})
    　　　　},
    　　　　formatJson(filterVal, jsonData) {
    　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
    　　　　},

            switchChange(row, column){  //Switch 开关回调
                console.log("switch", row[column.prop], column)

                let _this = this;
                let params = {};
                let id = column.idName || _this.tableJson.idName || 'id';
                params[id] = row[id]

                params[column.prop] = row[column.prop];

                _this.loading = true;

                _this.Axios({
                    url: column.axiosUrl || _this.url,
                    type: column.axiosType || _this.axiosType,
                    params: params,
                    successfn(res){
                        _this.loading = false;
                        if(res.code != 0){
                            _this.$alert(res.msg, '温馨提示');

                            _this.tableData.map(e => {
                                if(e[id] == row[id]){
                                   e[column.prop] = e[column.prop] == column.config.value[0] ? column.config.value[1] : column.config.value[0];
                                }
                            })
                        }
                    }
                })
            },

            handleSelectionChange(selection){ //勾选选择框
                console.log(selection)
            },
            handleSwitch(scope,column){
                console.log('$emit listenSwitchChange data is',column.prop,scope.row[column.prop])

                this.$emit('listenSwitchChange',{key:column.prop,value:scope.row})

            },
            handleSwitchButton(scope,column){
                console.log('$emit listenSwitchChange data is',column.prop,scope.row[column.prop])

                this.$emit('listenSwitchChange',{key:column.prop,value:scope.row})
            },
            //操作按钮
            handleButtons(handle, scope){
                if(handle.url){
                    this.$router.push({ path: handle.url+'/'+scope.row[handle.query] })
                }else if(handle.onClick){
                    handle.onClick(this, this.$parent, scope.row);
                }else{
                    if(handle.type == "delete"){
                        this.handleDelete(handle, scope.row);
                    }

                    handle.callback && handle.callback(this, this.$parent, scope.row);
                }
            },

            handleDelete(handle, row) { //删除


                let _this = this;

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {  //删除
                    _this.loading = true;
                    let params = {};
                    console.log(handle.params, '0-0-0-')
                    // let id = handle.idName || _this.tableJson.idName || 'id';
                    let {name, data} = handle.params;
                    console.log(name, data);
                    params[name] = row[data];
                    console.log(params, 'params');

                    _this.Axios({
                        url: handle.axiosUrl,
                        type: handle.axiosType,
                        params: params,
                        successfn(res){
                            _this.loading = false;
                            if(res.code != 0){
                                _this.$alert(res.msg, '温馨提示');
                                return;
                            }

                            _this.tableData = _this.tableData.filter(e => {

                                return e[data] != row[data];
                            })
                            
                            _this.$message({
                                type:"success",
                                message: "删除成功！"
                            })
                        } 
                    });

                }).catch(() => { //取消删除
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });          
                });
            },

            // 分页导航
            handleCurrentChange(val) {

                this.page.page = val;

                console.log(this.page.page)

                this.getPageData({
                    page: this.page.page
                })

                this.getData({
                    page: this.page.page,
                    page_size: this.page.page_size
                });

            },
            handleSizeChange(val) {

                this.page.page_size = val;
                this.getData({
                    page: this.page.page,
                    page_size:this.page.page_size
                });
            },

            sortable(data){
                console.log(data)

                if(data.prop && data.order){
                    this.getData({
                        sort:data.prop,
                        sortRule:data.order
                    })
                }
            },

            getPageData({page, page_size, path}){ //存储页，条数
                page = {
                    page: page || 1,
                    page_size: page_size || this.page_size || 10
                };
                let session = {};
                path = path || this.$route.path;

                session[path] = page;
                
                sessionStorage.setItem("page", JSON.stringify(session));
            },

            Axios({url, type, params, successfn, errorfn}){
                let _data = null;

                type = type || "get";
                params = params || {};

                if(type == 'get'){
                    _data = {
                        params: params
                    }
                }else if(type == 'post'){
                    _data = params;
                }

                this.$axios[type](url, _data)
                .then(function (response) { //success

                    console.log(response.data);

                    successfn && typeof successfn == 'function' && successfn(response.data);

                })
                .catch(function (error) { //error

                    console.log(error);

                    errorfn && typeof errorfn == 'function' && errorfn(error);

                });
            }


        }
    }

</script>

<style scoped>

</style>
