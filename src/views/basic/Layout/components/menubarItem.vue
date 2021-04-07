<template>
  <el-submenu
    v-if="haChild"
    :key="menuList.path"
    :index="menuList.path">
    <template #title>
      <i
        v-if="menuList.meta.icon.startsWith('el-icon')"
        :class="menuList.meta.icon || 'el-icon-location'" />
      <svg-icon
        v-else
        class="ml-1 mr-2 inline-block"
        :name="menuList.meta.icon" />
      <span>{{ menuList.meta.title }}</span>
    </template>
    <el-menu-item-group>
      <menubar-item
        v-for="v in cMenuList"
        :key="v.path"
        :index="v.path"
        :menu-list="v" />
    </el-menu-item-group>
  </el-submenu>

  <el-menu-item
    v-else
    :key="menuList.path"
    :index="menuList.path">
    <i
      v-if="menuList.meta.icon.startsWith('el-icon')"
      :class="menuList.meta.icon || 'el-icon-location'" />
    <svg-icon
      v-else
      class="ml-1 mr-2"
      :name="menuList.meta.icon" />
    <template #title>
      {{ menuList.meta.title }}
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { IMenubarList } from '/@/store/type/menu'
export default defineComponent({
  name: 'MenubarItem',
  props: {
    menuList: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup(context) {
    const cMenuList = computed(() => context.menuList.children.filter((v:IMenubarList) => !v.hidden))
    return {
      haChild: context.menuList.children && context.menuList.children.length > 0,
      cMenuList
    }
  }
})
</script>
