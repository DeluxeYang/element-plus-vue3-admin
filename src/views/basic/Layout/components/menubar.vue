<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="menubar.status === 1 || menubar.status === 3"
      class="el-menu-vertical-demo"
      :class="{
        'w-64': menubar.status === 0 || menubar.status === 2,
        'w-0': menubar.status === 3,
        'w-16': menubar.status === 1,
      }"
      :collapse-transition="false"
      :unique-opened="true"
      @select="onOpenChange">
      <menubar-item
        v-for="v in menuList"
        :key="v.path"
        :index="v.path"
        :menu-list="v" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import MenubarItem from './menubarItem.vue'
import { useStore } from '/@/store'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'LayoutMenubar',
  components: {
    MenubarItem
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { menu } = store.state
    const menuList = menu.menuList.filter(v => !v.hidden)

    const activeMenu = computed(() => {
      if (route.meta.activeMenu) return route.meta.activeMenu
      return route.path
    })
    const onOpenChange = (d: any) => router.push({ path: d })
    return {
      menubar: store.state.menu,
      menuList,
      activeMenu,
      onOpenChange
    }
  }
})
</script>
