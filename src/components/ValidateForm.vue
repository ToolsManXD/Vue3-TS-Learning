<template>
    <form class="validate-form-container">
        <slot name="default"></slot>
        <!-- 提交按钮触发表单验证函数submitForm会给每个validateInput组件进行表单验证 -->
        <div class="submit-area" @click.prevent="submitForm">
            <slot name="submit">
                <button type="submit" class="btn btn-primary">提交</button>
            </slot>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type ValidateFunc = () => boolean

// mitt组件创建监听器监听自定义事件
export const emitter = mitt<{
  formItemCreated: ValidateFunc
}>()

export default defineComponent({

  setup (props, context) {
    // 定义数组接受validateInput组件中的表单验证函数
    let funcArr:ValidateFunc[] = []

    // 遍历表单验证结果的数组
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }

    // callback将每个validateInput组件的验证函数添加到数组
    const callback = (func:ValidateFunc) => {
      funcArr.push(func)
    }

    // 监听validateInput组件的自定义事件formItemCreated
    emitter.on('formItemCreated', callback)

    onUnmounted(() => {
      emitter.off('formItemCreated', callback)
      funcArr = []
    })

    return {
      submitForm
    }
  }
})
</script>

<style>

</style>
