<template>
  <div class="create-post-page">
      <h4>新建文章</h4>
      <validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
            <label class="form-label">文章标题: </label>
            <validate-input v-model="titleVal" :rules="titleRules" placeholder="请输入标题" type="text"></validate-input>
        </div>
        <div class="mb-3">
            <label class="form-label">文章详情: </label>
            <validate-input rows="10"  :tag="'textarea'" v-model="contentVal" :rules="contentRules" type="text" placeholder="请输入文章详情"></validate-input>
        </div>

        <template #submit>
            <button class="btn btn-primary btn-large">发表文章</button>
        </template>
      </validate-form>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { GlobalDataProps } from '@/store/store'
import { PostProps } from '@/testData'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const titleVal = ref()
    const contentVal = ref()
    const store = useStore<GlobalDataProps>()
    const titleRules : RulesProp = [
      { type: 'title', message: '标题不能为空' }
    ]
    const contentRules : RulesProp = [
      { type: 'title', message: '标题不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'columnDetail', params: { id: columnId } })
        }
      }
    }
    return {
      onFormSubmit,
      titleVal,
      contentVal,
      titleRules,
      contentRules
    }
  }
})
</script>

<style>

</style>
