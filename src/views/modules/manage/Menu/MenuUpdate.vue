<template>
  <el-dialog
    v-model="dialogVisible"
    title="页面编辑"
    @open="load">
    <el-form
      :model="obj"
      label-width="100px">
      <el-form-item
        label="菜单名称">
        <el-input
          v-model="obj.title"
          size="small" />
      </el-form-item>
      <el-form-item
        label="菜单标识">
        <el-input
          v-model="obj.perms"
          size="small" />
      </el-form-item>
      <el-form-item
        label="菜单类型">
        <el-switch
          v-model="obj.type"
          active-text="页面"
          inactive-text="目录"
          :active-value="1"
          :inactive-value="0" />
      </el-form-item>
      <el-form-item
        v-if="obj.type === 1"
        label="页面按键">
        <el-select
          v-model="obj.buttons"
          multiple
          size="small"
          clearable
          class="w-full"
          placeholder="添加按键">
          <el-option
            v-for="(item, index) in buttonTypes"
            :key="index"
            :label="item.title"
            :value="item.type" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="URL">
        <el-input
          v-model="obj.path"
          size="small">
          <template #prepend>
            /
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="菜单图标">
        <el-popover
          placement="bottom-start"
          width="400"
          trigger="click">
          <el-row
            v-for="i in Math.ceil(icons.iconsList.length/12)"
            :key="i">
            <el-col
              v-for="j in 12"
              :key="j"
              :span="2">
              <el-button
                v-if="(i-1)*12+j-1 < icons.iconsList.length"
                size="small"
                class="border-0"
                @click="selectIcon(obj, (i-1)*12+j-1)">
                <svg-icon :name="icons.iconsList[(i-1)*12+j-1]" />
              </el-button>
            </el-col>
          </el-row>
          <template #reference>
            <el-input
              v-model="obj.icon"
              size="small">
              <template #prepend>
                <i
                  v-if="obj.icon.startsWith('el-icon')"
                  :class="obj.icon"
                  style="font-size: 22px;" />
                <svg-icon
                  v-else
                  :size="22"
                  :name="obj.icon" />
              </template>
              <template #append>
                element原生图标请直接输入
              </template>
            </el-input>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item
        label="前端组件名">
        <el-input
          v-model="obj.component"
          size="small" />
      </el-form-item>
      <el-form-item
        label="是否隐藏">
        <el-switch
          v-model="obj.hidden"
          active-text="是"
          inactive-text="否" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          size="small"
          @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue'
import { store } from '/@/store'
import localIcons from '/@/icons/requireIcons'

const iconModule = () => {
  let icons = reactive({
    iconsList: localIcons,
    iconsPopover: false
  })
  const selectIcon = (obj, index) => {
    obj.icon = icons.iconsList[index]
  }
  return {
    icons,
    selectIcon
  }
}

export default defineComponent({
  name: 'MenuUpdate',
  props: {
    component: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 0
    },
    hidden: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: ''
    },
    perms: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    buttons: {
      type: Array,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible', 'update:type', 'update:title', 'update:component', 'update:hidden',
    'update:path', 'update:perms', 'update:icon', 'update:buttons', 'typeChange'],
  setup(props, context) {
    let dialogVisible = computed({
      get: () => props.visible,
      set: val => {
        context.emit('update:visible', val)
      }
    })

    let obj = reactive({
      type: 0,
      title: '',
      component: '',
      hidden: false,
      path: '',
      perms: '',
      icon: '',
      buttons: []
    })
    const { buttonTypes } = store.getters.menu

    const load = () => {
      obj.type = props.type
      obj.title = props.title
      obj.component = props.component
      obj.hidden = props.hidden
      obj.path = props.path
      obj.perms = props.perms
      obj.icon = props.icon
      obj.buttons = props.buttons
    }
    const confirm = () => {
      if (props.type === 0 && obj.type === 1) {
        context.emit('typeChange') // 由目录变为页面
      }
      context.emit('update:type', obj.type)
      context.emit('update:title', obj.title)
      context.emit('update:component', obj.component)
      context.emit('update:hidden', obj.hidden)
      context.emit('update:path', obj.path)
      context.emit('update:perms', obj.perms)
      context.emit('update:icon', obj.icon)
      context.emit('update:buttons', obj.buttons)
      context.emit('update:visible', false)
    }

    return {
      dialogVisible,
      obj,
      load,
      confirm,
      buttonTypes,
      ...iconModule()
    }
  }
})
</script>
