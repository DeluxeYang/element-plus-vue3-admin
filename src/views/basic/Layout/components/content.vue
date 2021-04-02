<template>
  <el-scrollbar class="p-3">
    <router-view
      v-slot="{ Component }">
      <transition
        name="fade-transform"
        mode="out-in">
        <component
          :is="Component"
          :key="key"
          class="page m-3" />
      </transition>
    </router-view>
  </el-scrollbar>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'LayoutContent',
  setup() {
    const route = useRoute()
    const store = useStore()

    const key = computed(() => route.path)

    const data = reactive({
      cachedViews: [...store.state.tags.cachedViews]
    })
    // keep-alive的include重新赋值，解决bug https://github.com/vuejs/vue-next/issues/2550
    watch(
      () => store.state.tags.cachedViews.length,
      () => data.cachedViews = [...store.state.tags.cachedViews]
    )
    return {
      key,
      data,
      tags: store.state.tags
    }
  }
})
</script>
