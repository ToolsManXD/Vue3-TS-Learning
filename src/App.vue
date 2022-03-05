<template>
  <div class="container">
    <!-- 头部 -->
    <global-header :user="user"></global-header>

    <!-- 专栏列表 -->
    <column-list :list="list"></column-list>

    <!-- 登录表单 -->
    <validate-form @form-submit="onFormSubmit">

      <!-- 表单内容 -->
      <div class="mb-3">
        <label class="form-lable">邮箱地址</label>
        <validate-input ref="inputRef" :rules="emailRules" v-model="emailVal" placeholder="请输入电子邮箱地址"></validate-input>
        <label class="form-lable">密码</label>
        <validate-input :rules="passwordRules" type="password" ref="inputRef" placeholder="请输入密码"></validate-input>
      </div>

      <!-- 提交按钮 -->
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1 title',
    description: 'this is description this is description this is description this is description',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn4.littlethings.com%2Fapp%2Fuploads%2F2020%2F06%2Fhigh-angle-photo-of-a-corgi-looking-upwards-2664417-850x847.jpg&refer=http%3A%2F%2Fcdn4.littlethings.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648805792&t=5a1ff3f63ed6c0637a94dcf43220f671'
  },
  {
    id: 1,
    title: 'test1 title',
    description: 'this is description this is description this is description this is description',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn4.littlethings.com%2Fapp%2Fuploads%2F2020%2F06%2Fhigh-angle-photo-of-a-corgi-looking-upwards-2664417-850x847.jpg&refer=http%3A%2F%2Fcdn4.littlethings.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648805792&t=5a1ff3f63ed6c0637a94dcf43220f671'
  },
  {
    id: 1,
    title: 'test1 title',
    description: 'this is description this is description this is description this is description',
    avatar: ''
  },
  {
    id: 1,
    title: 'test1 title',
    description: 'this is description this is description this is description this is description',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn4.littlethings.com%2Fapp%2Fuploads%2F2020%2F06%2Fhigh-angle-photo-of-a-corgi-looking-upwards-2664417-850x847.jpg&refer=http%3A%2F%2Fcdn4.littlethings.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648805792&t=5a1ff3f63ed6c0637a94dcf43220f671'
  }
]
const currentUser: UserProps = {
  isLogin: true,
  name: 'Max'
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const inputRef = ref<any>()
    const emailVal = ref()
    const passwordVal = ref()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '输入正确邮箱格式' }
    ]
    const passwordRules : RulesProp = [
      { type: 'password', message: '请输入正确密码' }
    ]

    // 表单验证结果
    const onFormSubmit = (result:boolean) => {
      console.log('result', result)
    }
    return {
      list: testData,
      user: currentUser,
      emailRules,
      passwordRules,
      emailVal,
      passwordVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style>

</style>
