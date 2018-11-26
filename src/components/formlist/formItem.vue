<template>
  <div :style="'margin-left:' +  (marginleft || 0) + 'px'">
      <el-form-item :label="item.label" :prop="item.name" v-for="(item, idx) in dataList" :key="'item' + idx">
          <template v-if="item.type === 'input'">
            <el-input v-model="form[item.name]" :style="item.key0 || item.key1 ? 'width: ' + (item.width||'50%') : ''" :placeholder="item.placeholder">
              <template slot="prepend" v-if="item.key0">{{item.key0}}</template>
              <template slot="append" v-if="item.key1">{{item.key1}}</template>
            </el-input>
          </template>
          <template v-if="item.type === 'timeSlot'">
            <el-date-picker
              v-model="form[item.name]"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="left">
            </el-date-picker>
          </template>
          <template v-if="item.type === 'single'">
            {{form[item.name]}}
            <el-radio v-for="(option,index) in item.options" :key="'single' + idx + index" v-model="form[item.name]" :label="option.name">
              {{option.label}}
            </el-radio>

          </template>
          <template v-if="item.type === 'upload'">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview(arguments[0],idx)"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </template>
          <template v-if="item.type === 'textarea'">
            <el-input v-model="form[item.name]" type="textarea" size="medium" :placeholder="item.placeholder"></el-input>
          </template>
          <template v-if="item.type === 'selector'">
            <el-select v-model="form[item.name]" :placeholder="item.placeholder">
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
          </template>
          <div v-if="item.type === 'address'" class="addressBox">
            <el-select v-model="form[item.name][0]" :placeholder="item.placeholder" @change="changeAddress(arguments[0], idx, 'sheng')">
              <el-option
                v-for="sheng in data"
                :key="sheng.id"
                :label="sheng.name"
                :value="sheng.name">
              </el-option>
            </el-select>
            <el-select v-model="form[item.name][1]" :placeholder="item.placeholder" @change="changeAddress(arguments[0], idx, 'shi')">
              <el-option
                v-for="shi in item.sheng"
                :key="shi.id"
                :label="shi.name"
                :value="shi.name">
              </el-option>
            </el-select>
            <el-select v-model="form[item.name][2]" :placeholder="item.placeholder">
              <el-option
                v-for="qu in item.shi"
                :key="qu.id"
                :label="qu.name"
                :value="qu.name">
              </el-option>
            </el-select>
          </div>
          <template v-if="item.type === 'map'">
            <label>关键词：<input v-model="keyword"></label>
            <label>地区：<input v-model="location"></label>
            <baidu-map>
              <bm-view class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15"></bm-view>
              <bm-local-search @markersset="markersset(arguments[0], idx)" :selectFirstResult="false" :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
              <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                <bm-label  content="" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
              </bm-marker>
            </baidu-map>
          </template>
          <div v-if="item.type === 'label'" class="labelBox">
            <div class="labelOne" :class="{act: item.value.indexOf(label) > -1}" @click="checklabel(label, idx)" v-for="(label, ind) in item.options" :key="'label' + idx + ind">{{label.label}}</div>
            <div class="addBtn" v-show="!item.clicked" @click="labelAdd(idx)">自定义</div>
            <el-input @change="labelChange(arguments[0], idx)" v-show="item.clicked" :ref="'labelInput' + idx"></el-input>
          </div >
          <div v-if="item.type === 'editor'">
          </div>
          <form-item v-if="item.children" :formdata="item.children" :marginleft="-200" :checked="form[item.name]"></form-item>
      </el-form-item>
  </div>
</template>
<script>
import data from "./data";
const pickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      }
    }
  ]
};
export default {
  name: 'formItem',
  data() {
    return {
      data,
      form: {},
      rules: {},
      pickerOptions,
      keyword: "天安门",
      location: ""
    };
  },
  props: {
    "formdata": {
      type: Array
    }, 
    'labelWidth':{
      default: '100px'
    },
    'marginleft':{
      default: 0
    },
    'checked': {
      default: ''
    }
  },
  computed: {
    dataList(){
      return this.formdata.filter(item => !item.fatherName || item.fatherName === this.checked);
    }
  },
  methods: {
    checklabel(label, index) {
      let arr = this.formdata[index].value;
      let ischeck = arr.indexOf(label) > -1;
      if (!ischeck) {
        arr.push(label);
      } else {
        arr.splice(arr.indexOf(label), 1);
      }
    },
    labelAdd(index) {
      this.$refs["labelInput" + index][0].focus();
      this.formdata[index].clicked = true;
    },
    labelChange(label, index) {
      this.formdata[index]["options"].push({ label });
      this.formdata[index]["clicked"] = false;
    },
    changeAddress(value, index, type) {
      let duiying = {
        sheng: "city",
        shi: "district"
      };
      this.form[this.formdata[index]["name"]].splice(
        type === "sheng" ? 1 : 2,
        type === "sheng" ? 2 : 1,
        "",
        ""
      );
      let arr = this.form[this.formdata[index]["name"]];
      arr.splice(3, arr.length - 3);
      let data = type === "sheng" ? this.data : this.formdata[index]["sheng"];
      data.forEach(sheng => {
        if (value === sheng.name) {
          this.formdata[index][type] = [...sheng[duiying[type]]];
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file, index) {
      let { name } = this.formdata[index];
      this.form[name] = file.url;
      this.dialogVisible = true;
    },
    markersset(posArr, index) {
      let { name } = this.formdata[index];
      this.form[name] = JSON.stringify(posArr[0]["point"]);
    }
  },
  mounted() {},
  created() {
    let { form, rules, formdata } = this;
    formdata.forEach((o, i) => {
      let name = o["name"];
      rules[name] = o["rules"];
      form[name] = o["value"];
    });
    this.form = Object.assign({}, form);
    this.rules = Object.assign({}, rules);
  }
};
</script>
<style scoped>
.map {
  width: 100%;
  height: 300px;
}
label.el-radio {
  display: block;
  margin: 0 20px 20px 0;
}

.labelBox {
  display: flex;
  flex-flow: row wrap;
}
.labelBox .addBtn {
  cursor: pointer;
  background: #000;
  color: #fff;
}
.labelBox .labelOne {
  cursor: pointer;
  border: 1px solid #000000;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
  border-radius: 15px;
}
.labelBox .labelOne.act {
  background: red;
}
.addressBox {
  display: flex;
}
</style>