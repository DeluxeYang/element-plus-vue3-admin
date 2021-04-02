<template>
  <div>
    <drag-tree-table
      style="margin-top: 0 !important;"
      :data="treeData"
      :on-drag="onTreeDataChange"
      fixed />
    <menu-update
      v-model:visible="updateDialog.visible"
      v-model:component="updateDialog.menu.component"
      v-model:title="updateDialog.menu.title"
      v-model:type="updateDialog.menu.type"
      v-model:hidden="updateDialog.menu.hidden"
      v-model:path="updateDialog.menu.path"
      v-model:perms="updateDialog.menu.perms"
      v-model:icon="updateDialog.menu.icon"
      v-model:buttons="updateDialog.menu.buttons" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted } from 'vue'
import DragTreeTable from 'drag-tree-table/src/lib/index'
import { getMenu, saveMenu } from '/@/api/manage/menu'
import MenuUpdate from './MenuUpdate.vue'

export default defineComponent({
  name: 'Menu',
  components: {
    DragTreeTable,
    MenuUpdate
  },
  setup() {
    let updateDialog = reactive({
      visible: false,
      menu: {

      }
    })
    let treeData = reactive({
      columns: [
        {
          type: 'selection',
          title: '菜单名称',
          field: 'name',
          width: 200,
          align: 'center',
          formatter: (item) => {
            return '<i class="' + item.icon + '"/>  <a>' + item.title + '</a>'
          }
        },
        {
          title: '菜单图标',
          field: 'icon',
          align: 'center',
          flex: 1,
          formatter: (item) => {
            return item.icon
          }
        },
        {
          title: '菜单类型',
          field: 'type',
          align: 'center',
          flex: 1,
          formatter: (item) => {
            return '<span class="el-tag el-tag--small el-tag--light el-tag--' + (item.type === 0 ? 'info' : '') + '">'
                + (item.type === 0 ? '目录' : '页面') + '</span>'
          }
        },
        {
          title: 'URL',
          field: 'path',
          align: 'center',
          flex: 1,
          formatter: (item) => {
            return item.path
          }
        },
        {
          title: '是否隐藏',
          field: 'hidden',
          align: 'center',
          flex: 1,
          formatter: (item) => {
            return item.hidden ? '<i class="el-icon-check"/>' : '<i class="el-icon-close"/>'
          }
        },
        {
          title: '菜单组件',
          field: 'component',
          align: 'center',
          flex: 1,
          formatter: (item) => {
            return item.component
          }
        },
        {
          title: '操作',
          type: 'action',
          width: 120,
          align: 'center',
          actions: [
            {
              text: '编辑',
              onclick: (item) => {
                updateDialog.visible = true
                updateDialog.menu = item
              },
              formatter: () => {
                return '<button class="el-button el-button--text" type="button">编辑</button> '
              }
            },
            {
              text: '删除',
              onclick: (item) => {
                console.log(item)
              },
              formatter: () => {
                return '<button class="el-button el-button--text" type="button">删除</button>'
              }
            }
          ]
        }
      ],
      lists: [],
      custom_field: {
        lists: 'children'
      }
    })

    const onTreeDataChange = list => {
      treeData.lists = list
    }
    const loadMenu = (menuData, parentId) => {
      for (let i = 0; i < menuData.length; i++) {
        const menu = menuData[i]
        menu.parent_id = parentId
        menu.order = i
        menu.open = false
        menu.buttons = []
        if (menu.type === 0) {
          if (menu.children.length > 0) {
            loadMenu(menu.children, menu.id)
          }
        } if (menu.type === 1) {
          menu.children.map(item => {
            menu.buttons.push(item.type)
          })
          menu.children = []
        }
      }
    }
    onMounted(() => {
      getMenu().then(res => {
        treeData.lists = res.data.data
        loadMenu(treeData.lists, 0)
        console.log(treeData.lists)
      })
    })
    return {
      onTreeDataChange,
      updateDialog,
      treeData
    }
  }
})
</script>
