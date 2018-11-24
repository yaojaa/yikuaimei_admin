<template>
    <div class="page">
        <div class="page-header">
            <div class="crumbs">
                <bread-crumb :bread-crumb="breadcrumb"></bread-crumb>
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="form-panel p-xl">
                    <el-form :rules="rules" :model="addForm" ref="addForm" label-width="96px">
                        <div class="ad-form-cell">
                            <div class="cell" style="position: relative;">
                                <el-form-item label="广告位编号" prop="id">
                                    <el-input v-model.trim="addForm.id" placeholder="请输入广告位编号"></el-input>

                                </el-form-item>
                                    <div style="position: absolute;right:-100px;top:0px;">
                                        <a class="ad-ID-btn" href="javascript:;" @click="dialogVisible=true">查看广告位编号</a>
                                    </div>
                            </div>
                            
                        </div>
                        <div class="ad-form-cell">
                            <div class="cell">
                                <el-form-item label="广告位名称" prop="name">
                                    <el-input v-model.trim="addForm.name" placeholder="请输入广告位名称"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="ad-form-cell">
                            <div class="cell">
                                <el-form-item label="广告位类型" prop="type">
                                    <el-radio v-model="addForm.type" label="1">图片</el-radio>
                                    <el-radio v-model="addForm.type" label="2">视频</el-radio>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="ad-form-cell">
                            <div class="cell">
                                <el-form-item label="广告位尺寸" prop="size">
                                    <div class="ad-size">
                                        <div class="input-box">
                                            <el-input v-model="size.width" placeholder="广告位宽度">
                                                <template slot="append">px</template>
                                            </el-input>
                                            <!--  -->
                                        </div>
                                        <div class="input-box">
                                            <el-input v-model="size.height" placeholder="广告位高度">
                                                <template slot="append">px</template>
                                            </el-input>
                                        </div>
                                        <div class="add-btn">
                                            <!-- <a href="javascript:;">+</a> -->
                                            <el-button plain @click="submitForm('addForm')">+</el-button>
                                        </div>
                                    </div>
                                    <div class="add-radio">
                                        <el-radio v-model="addForm.size" label="0">640*720</el-radio>
                                        <el-radio v-model="addForm.size" label="1">1980*1240</el-radio>
                                        <el-radio v-model="addForm.size" label="2">960*850</el-radio>
                                        <el-radio v-model="addForm.size" label="3">640*320</el-radio>
                                        <el-radio v-model="addForm.size" label="4">1980*1240</el-radio>
                                        <el-radio v-model="addForm.size" label="5">960*850</el-radio>
                                        <el-radio v-model="addForm.size" label="6">640*320</el-radio>
                                    </div>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="ad-form-cell">
                            <div class="cell">
                                <el-form-item label="价格" required>
                                    <el-col :span="11">
                                        <el-form-item prop="minprice">
                                            <el-input type="text" placeholder="请输入价格" v-model.trim.number="addForm.minprice" style="width: 100%;"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="line" :span="2">-</el-col>
                                    <el-col :span="11">
                                        <el-form-item prop="maxprice">
                                            <el-input type="text" placeholder="请输入价格" v-model.trim.number="addForm.maxprice" style="width: 100%;"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="ad-form-cell">
                            <div class="cell right-cell">
                                <el-form-item class="mb-n">
                                    <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>

        <el-dialog
          title="广告位编号"
          :visible.sync="dialogVisible"
          width="520px">
          <nomal-table :table-json="tableJson" :url="url"></nomal-table>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确定</el-button>
          </span>
        </el-dialog>

    </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import NomalTable from '@/components/common/NomalTable'

export default {
    name: 'tabletest',
    data() {
        return {
            dialogVisible:false,
            url: "",
            breadcrumb: [ //面包屑
                {
                    "name": "广告", //名字
                },
                {
                    "name": "广告管理", //名字
                    "url": "/ad/admin"
                },
                {
                    "name": "添加广告位", //名字
                }
            ],
            addForm: {
                id: "",
                name: "",
                type: "",
                size: "",
                minprice: "",
                maxprice: "",
            },
            size: {
                width: "",
                height: "",
            },

            rules: {
                id: [
                    { required: true, message: '请输广告位编号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入广告位名称', trigger: 'blur' }
                ],
                minprice: [
                    { required: true, message: '请填写价格', trigger: 'blur' }
                ],
                maxprice: [
                    { required: true, message: '请填写价格', trigger: 'blur' }
                ]
            },
            tableJson: {
                formatter: function(data){  //表格数据处理
                    return data.splice(0,5);
                },
                "column": [ //列
                    {
                        "type": "text",
                        "label": "编号",
                        "prop": "id",
                        "width": "100",
                        "align": "center"
                    },
                    {
                        "type": "text",
                        "label": "广告位名称",
                        "prop": "name",
                        "width": "",
                        "align": "center"
                    }
                ],
            },


        }
    },
    components: {
        BreadCrumb,
        NomalTable
    },
    created() {

    },
    computed: {

    },
    methods: {
        submitForm(formName) {
            console.log(this.addForm)
            
        },
    }
}
</script>
<style scoped>
.ad {
    position: relative;
    height: 100%;
}

.add-ad {
    position: absolute;
    left: 0;
    top: 44px;
    bottom: 0;
    right: 0;
    background-color: #fff;
}

.ad-main {
    padding-top: 60px;
    margin-left: 50px;
}

.ad-form-cell {
    display: flex;
}

.ad-form-cell .cell {
    width: 500px;
}

.ad-ID-btn {
    font-size: 12px;
    color: #666;
    line-height: 30px;
    margin-left: 20px;
}

.ad-ID-btn:hover {
    color: #7224D8;
}

.ad-form-cell .line {
    text-align: center;
    color: #666;
}

.ad-size {
    width: 100%;
    display: flex;
}

.ad-size .input-box {
    position: relative;
    padding-right: 20px;
}

.ad-size .input-box .unit {
    font-size: 14px;
    color: #666;
    background-color: #ccc;
    line-height: 26px;
    height: 28px;
    width: 28px;
    right: 0;
    display: block;
    border-radius: 0 5px 5px 0;
}

.add-btn a {
    display: block;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    color: #999;
    background-color: #f5f7fa;
    flex-shrink: 0;
    border-radius: 3px;
    border: 1px solid #dcdfe6;
}

.right-cell {

}

.right-cell button {
    width: 100px;
}

.add-radio {
    padding: 20px 0 0;
}
</style>
<style>
.ad-size .input-box .el-input__suffix {
    right: 1px;
    top: 1px;
}

.ad-form-cell .el-radio {
    margin: 10px 30px 0 0;
}

.ad-form-cell .el-input-group__append,
.el-input-group__prepend {
    padding: 0 10px;
}
</style>