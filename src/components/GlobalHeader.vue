<template>
  <nav class="navbar navbar-dark bg-primary mb-4">
    <a class="navbar-brand mx-4" href="#">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0 mx-4">
      <li class="list-inline-item"><router-link :to="{ name: 'login' }" class="btn btn-outline-light my-2">登录</router-link></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0 mx-4">
      <li class="list-inline-item">
          <drop-down :title="`你好 ${user.name}`">
            <drop-down-item><router-link class="dropdown-item" :to="{ name:'createPost'}">新建文章</router-link></drop-down-item>
            <drop-down-item><a href="#" class="dropdown-item">编辑资料</a></drop-down-item>
            <drop-down-item><a href="#" class="dropdown-item">退出登录</a></drop-down-item>
          </drop-down>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropdownItem.vue'
export interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number
}
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDown,
    DropDownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style>

</style>
