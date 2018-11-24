import Vue from 'vue'
let fetch = data => {
  console.log(Vue.prototype)
  return Vue.prototype.$axios[data.method](data.url, data.data)
  // .then(res => {
  //   let {data} = res
  //   if(data.code!==0) {
  //     console.error(data.msg)
  //   }
  // })
}
export default fetch