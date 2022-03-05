<template>
  <div class="validate-input-container pb-3">
    <input
      type="text"
      class="form-control"
      :class="{'is-invalid':inputRef.err}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-if="inputRef.err" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'

interface RuleProp {
  type:'required' | 'email' | 'password';
  message: string
}

const emailReg = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/

export type RulesProp = RuleProp[]
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },

  inheritAttrs: false,

  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      err: false,
      message: ''
    })
    // 利用特定 prop 和自定义事件 给子组件绑定v-model向父组件传值
    const updateValue = (e:KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    // 子组件接受父组件的prop ‘rules’进行输入合法性判断
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true

          inputRef.message = rule.message

          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'password':
              passed = (inputRef.val.trim() !== '')
              break
            default:
              break
          }
          return passed
        })

        inputRef.err = !allPassed
        return allPassed
      }

      return true
    }
    // 每个ValidateInput组件中的输入合法验证结果以自定义事件方式传递出去
    onMounted(() => {
      emitter.emit('formItemCreated', validateInput)
    })

    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})

</script>

<style>
</style>
