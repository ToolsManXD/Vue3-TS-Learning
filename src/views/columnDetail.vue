<template>
  <div class="column-detail-page w-75 mx-auto">
      <div class="column-info row mb-4 border-bottom pb-4 align-item-center">
          <div class="col-3 text-center">
              <img :src="column.avatar" :alt="column.title" class="rounded-circle border" >
          </div>
          <div class="col-9">
              <h4>{{column.title}}</h4>
              <p class="text-muted">{{column.description}}</p>
          </div>
      </div>
  </div>
  <post-list :list="list"></post-list>
</template>

<script lang = "ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/store'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const currentId = +route.params.id
    const store = useStore<GlobalDataProps>()
    // const colArr = testData.find(c => c.id === currentId)
    // const setColumn = () => {
    //   if (colArr) {
    //     const column = colArr
    //     return column
    //   } else {
    //     return {
    //       id: 0,
    //       title: '404',
    //       description: '404',
    //       avatar: '404'
    //     }
    //   }
    // }
    // const column = setColumn()
    const column = computed(() => store.getters.getColumnById(currentId))
    const list = computed(() => store.getters.getPostsByCid(currentId))
    return {
      column,
      list
    }
  }
})
</script>

<style>
.post-list h4 a {
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
</style>
