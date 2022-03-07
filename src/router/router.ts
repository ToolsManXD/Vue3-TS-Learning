import Home from '../views/homeView.vue'
import Login from '../views/loginView.vue'
import ColumnDetail from '../views/columnDetail.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/columnDetail',
    name: 'columnDetail',
    component: ColumnDetail
  }
]

export default routes
