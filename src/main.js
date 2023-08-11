import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  RadioGroup,
  RadioButton,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
  Message,
  MessageBox
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from "vue-resource";

import router from '../router'
import store from '../store'
import '../src/api/mock'


Vue.config.productionTip = false;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

Vue.use(VueResource)
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)

router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.user.token
  const routes = store.state.tab.routes
  console.log(token, 'token')
  console.log(routes, 'routes')
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && routes.length === 0) {
    store.commit("getMenu")
    store.commit("addRoutesByMenu", router)
    store.commit("getUserInfo")
    if (to.name === 'login') {
      next({ name: 'home' })
    } else {
      next({ ...to, replace: true })
    }
  } else {
    next()
  }
})

// axios.interceptors.request.use(config => {
//   const token = sessionStorage.getItem('token')
//   if (token) {
//     config.headers.common['Authorization'] = 'Bearer ' + token
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
