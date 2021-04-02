<template>
  <el-dialog
    v-model="dialogVisible"
    title="收货地址"
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
        <el-input
          v-model="obj.icon"
          size="small">
          <template #prepend>
            <i :class="obj.icon" />
          </template>
        </el-input>
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
    {{ obj }}
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, computed } from 'vue'
import { store } from '/@/store'

export default defineComponent({
  name: 'MenuUpdate',
  components: { EIconPicker },
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
    'update:path', 'update:perms', 'update:icon', 'update:buttons'],
  setup(props, context) {
    let dialogVisible = computed({
      get: () => props.visible,
      set: val => {
        context.emit('update:visible', val)
      }
    })
    // let obj = computed({
    //   get: () => props.menu,
    //   set: val => {
    //     context.emit('update:menu', val)
    //   }
    // })
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
    const load = () => {
      obj.type = props.type
      obj.title = props.title
      obj.component = props.component
      obj.hidden = props.hidden
      obj.path = props.path
      obj.perms = props.perms
      obj.icon = props.icon
      obj.buttons = props.buttons

      console.log(store.getters.menu.perms)
    }
    const confirm = () => {
      context.emit('update:type', obj.type)
      context.emit('update:title', obj.title)
      context.emit('update:component', obj.component)
      context.emit('update:hidden', obj.hidden)
      context.emit('update:path', obj.path)
      context.emit('update:perms', obj.perms)
      context.emit('update:icon', obj.icon)
      context.emit('update:buttons', obj.buttons)
    }
    return {
      dialogVisible,
      obj,
      load,
      confirm
    }
  }
})
</script>

