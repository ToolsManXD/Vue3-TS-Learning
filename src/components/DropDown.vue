<template>
  <div class="dropdown" ref="dropdownRef">
  <a class="btn btn-outline-light dropdown-toggle" href="#" @click.prevent="toggleOpen">{{title}}</a>
  <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
    <slot></slot>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    // 监听点击事件布尔值实现点击下拉框外元素取消下拉框显示
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef,
      isClickOutside
    }
  }
})
</script>

<style>

</style>
