import Vue from 'vue'
import App from '@/index/App.vue'
import router from '@/index/router.js'
import store from '@/lib/store'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import "../assets/styles/iconfont/iconfont.css";
import {
    post
} from '@/lib/http'
// import "./assets/styles/markdown.css"
// import JQuery from '@/commonFunction/jquery.min.js'
// import viewClickAnimation from '@/commonFunction/viewClickAnimation.js'
// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$post = post;
console.log('当前为index应用', '')
console.log(process.env.VUE_APP_URL);
console.log(process.env.VUE_APP_MESSAGE);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')