<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm" style="width: 18rem">
        <div class="card-body text-center">
          <img :src="column.avatar" class="rounded-circle border border-light w-25 my-3" :alt="column.title" />
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-start text-wrap">{{column.description}}</p>
          <router-link :to="{ name: 'columnDetail' , params:{ id: column.id}}" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // Array是数组的构造函数不是一个类型，构造函数返回泛型类型使用PropType
      required: true
    }
  },
  setup (props) {
    // computed监听父组件传递过来的list中avatar属性是否存在,设定默认图片，返回结果columnList用作模板数据渲染
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg')
        }
        return column
      })
    })
    return { columnList }
  }
})
</script>

<style>

</style>
