<template>
  <div>
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

<script lang = "ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import router from '@/router'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const inputRef = ref<any>()
    const emailVal = ref()
    const passwordVal = ref()
    const store = useStore()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '输入正确邮箱格式' }
    ]
    const passwordRules : RulesProp = [
      { type: 'password', message: '请输入正确密码' }
    ]

    // 表单验证结果
    const onFormSubmit = (result:boolean) => {
      if (result) {
        router.push('/')
        store.commit('login')
      }
    }
    return {
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
