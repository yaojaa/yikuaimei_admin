<template>  
  <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm"  label-position="right" :label-width="labelWidth">
      <form-item :formdata="formdata" :labelWidth="labelWidth" ref="formitem"></form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button>取消</el-button>
      </el-form-item>
  </el-form>
</template>
<script>
import data from "./data";
import formItem from './formItem'
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
  verify: true,
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
    }
  },
  components: {
    formItem
  },
  methods: {
    setForm(form) {
      for (let k in form) {
        if (k === "eventTime") {
          this.formdata.forEach(o => {
            if (o.type === "timeSlot" && o.timesName) {
              let value = form[k];
              let obj = {};
              o.timesName.forEach((oo, ii) => {
                obj[oo] = value[ii]
              });
              form[k] = obj;
            }
          });
        }
        this.formdata.forEach(o => {
          let { json } = o;
          if (!!json) {
            if (o.name === k) {
              let value = form[k];
              delete form[k];
              let obj = {};
              obj[k] = value;
              form[json] = Object.assign(form[json] || {}, obj);
              console.log(form,'合并后')
            }
          }
        });
      }
      return form;
    },
    onSubmit(formName) {
      this.form = this.$refs.formitem.getform();
      this.$refs[formName].validate(valid => {
        this.setForm(Object.assign({}, this.form));

        if (valid) {
          let form = this.setForm(Object.assign({}, this.form));
          this.$emit('submit', this.form)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
     let { form, rules, formdata } = this;
    formdata.forEach((o, i) => {
      let name = o["name"];
      rules[name] = o["rules"];
      form[name] = o["value"];
    });
    this.form = this.$refs.formitem.getform();
    console.log('this.form',this.form)
    this.rules = Object.assign({}, rules);
  },
  created() {
   
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