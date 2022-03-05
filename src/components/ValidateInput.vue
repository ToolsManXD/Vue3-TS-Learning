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

    const updateValue = (e:KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

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
