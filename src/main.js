
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


// if(process.env.NODE_ENV =='production'){
//     axios.defaults.baseURL='http://.countinsight.com'
// }



import ElementUI from 'element-ui';
import vali from '@/components/v-vali'
//import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import '../static/css/theme-purple/index.css';       // 紫色主题
import "babel-polyfill";

import BaiduMap from 'vue-baidu-map'
import '@/assets/css/common.css'
import store from '@/store'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
import router from './router';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)

//peity
import Peity from 'vue-peity'
Vue.component('peity', Peity)

import NProgress from 'nprogress'
import '../static/css/nprogress.css'
NProgress.configure({ showSpinner: false });

//城市三级联动
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';
Vue.use(VueAreaLinkage)

// vue-lodash
import VueLodash from 'vue-lodash'
Vue.use(VueLodash, { name: 'lodash' })
Vue.use(vali);
Vue.use(ElementUI, { size: 'small' });
Vue.use(BaiduMap, { ak: 'NqiLB3SI1yCO0hlXUnKBBlvqKDDZBCEV'})
Vue.use(VueQuillEditor)
Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    NProgress.start();
    const role = store.getters.isLogin;
    
    if (role && to.path === '/login'){
        next('/')
    }
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})
axios.interceptors.request.use(
    config => {
        let { user } = store.state
        if (user.sid) { // 判断是否存在token，如果存在的话，则每个axios header都加上token。废弃cookie
            config.headers.sid = user.sid;
        }
        return config;
    },
    err => {
        alert(err)
        return Promise.reject(err);
    });
axios.interceptors.response.use(
    response => {
        if (response.data.code === -1) { //未登录为4002,4002时清除token，跳转到登录页
            store.dispatch('USER_SIGNOUT')
            window.location.reload();
        }
        return response
    },
    error => {
        return Promise.reject(error)
    });
router.afterEach(transition => {
  NProgress.done();
});

Vue.directive('countup', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el,binding) {
        var bind=binding.value;
        var end = parseInt(bind.endvalue) || parseInt(el.innerText);
        var start = parseInt(bind.startvalue) || 0;
        var num = start;
        el.innerText=format({value:start});
        var step = Math.floor(end/20);
        function cout(){
            // console.log(end,el.innerText)
            num = step+num;
            el.innerText=format({value:num});
            if(parseInt(num)<end){
                window.requestAnimationFrame(cout)
            }else{
                el.innerText=format({value:end});
                // console.log(end,el.innerText)
            }
        };
        function format(binding) {
            var decimal = '.';
            var useGrouping = true;
            var separator = ',';
            var num = parseInt(binding.value);
            function formatNumber(num) {
                var x, x1, x2, x3, i, len;
                num = Math.abs(num);
                num += '';
                x = num.split('.');
                x1 = x[0];
                x2 = x.length > 1 ? decimal + x[1] : '';
                if (useGrouping) {
                    x3 = '';
                    for (i = 0, len = x1.length; i < len; ++i) {
                        if (i !== 0 && ((i % 3) === 0)) {
                            x3 = separator + x3;
                        }
                        x3 = x1[len - i - 1] + x3;
                    }
                    x1 = x3;
                }
                return x1
            };
            return formatNumber(binding.value)
        };
        window.requestAnimationFrame(cout)
    }
})
Vue.directive('formatnum',{
    inserted:function(el,binding){
        var decimals = binding.value.decimals || 0;
        var decimal = binding.value.decimal || '.';
        var useGrouping = true;
        var separator = true && binding.value.separator || ',';
        var num =parseInt(binding.value.num);
        function formatNumber(num) {
            var x, x1, x2, x3, i, len;
            num = Math.abs(num).toFixed(decimals);
            num += '';
            x = num.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? decimal + x[1] : '';
            if (useGrouping) {
                x3 = '';
                for (i = 0, len = x1.length; i < len; ++i) {
                    if (i !== 0 && ((i % 3) === 0)) {
                        x3 = separator + x3;
                    }
                    x3 = x1[len - i - 1] + x3;
                }
                x1 = x3;
            }
            return x1
        };
        el.innerText = formatNumber(num);
    }
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');