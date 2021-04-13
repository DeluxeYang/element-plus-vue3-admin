<template>
  <div>
    <drag-tree-table
      ref="table"
      class="mt-0"
      :data="treeData"
      :on-drag="onTreeDataChange"
      hight-row-change="true">
      <template #icon="{row}">
        <i
          v-if="row.icon.startsWith('el-icon')"
          style="font-size: 12px;"
          :class="row.icon" />
        <svg-icon
          v-else
          :size="12"
          :name="row.icon" />
        {{ row.icon }}
      </template>
    </drag-tree-table>
    <el-affix
      position="bottom"
      :offset="20">
      <div class="text-center">
        <el-button
          type="primary"
          size="small"
          @click="onCreateMenu">
          新增
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="onSave">
          保存
        </el-button>
      </div>
    </el-affix>
    <menu-update
      v-model:visible="updateDialog.visible"
      v-model:component="updateDialog.menu.component"
      v-model:title="updateDialog.menu.title"
      v-model:type="updateDialog.menu.type"
      v-model:hidden="updateDialog.menu.hidden"
      v-model:path="updateDialog.menu.path"
      v-model:perms="updateDialog.menu.perms"
      v-model:icon="updateDialog.menu.icon"
      v-model:buttons="updateDialog.menu.buttons"
      v-model:new-id="newId"
      @typeChange="onChangeToDirect" />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import DragTreeTable from 'drag-tree-table/src/lib/index'
import { getMenu, saveMenu } from '/@/api/manage/menu'
import MenuUpdate from './MenuUpdate.vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

export default defineComponent({
  name: 'Menu',
  components: {
    DragTreeTable,
    MenuUpdate
  },
  setup() {
    let updateDialog = reactive({
      visible: false,
      menu: {}
    })
    const table = ref(null)
    let treeData = reactive({
      columns: [
        {
          type: 'selection',
          title: '菜单名称',
          field: 'name',
          width: 200,
          align: 'center',
          formatter: (item) => {
            return '<a>' + item.title + '</a>'
          }
        },
        {
          title: '菜单图标',
          field: 'icon',
          type: 'icon',
          align: 'center',
          flex: 1
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
              onclick: (row) => {
                ElMessageBox({
                  type: 'warning',
                  title: '删除确认',
                  message: '是否确认删除[' + row.title + ']以及其中的子页面？',
                  showCancelButton: true,
                  cancelButtonText: '取消',
                  confirmButtonText: '删除'
                }).then(() => {
                  treeData.lists = table.value.DelById(row.id)
                }).catch(() => null)
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

    const inspectTreeData = list => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].type === 1 && list[i].children.length > 0) {
          ElMessage({ message: '不能将页面或者目录拖入页面中', type: 'error' })
          return false
        }
        if (list[i].type === 0) {
          if (!inspectTreeData(list[i].children)) {
            return false
          }
        }
      }
      return true
    }

    const onTreeDataChange = list => {
      if (inspectTreeData(list)) {
        treeData.lists = list
      }
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
            menu.buttons.push(item)
          })
          menu.children = []
        }
      }
    }

    const onChangeToDirect = () => {
      /** 将目录变更页面后，将目录下的所有子内容放到根目录下 **/
      for (let i = 0; i < updateDialog.menu.children.length; i++) {
        treeData.lists.push(updateDialog.menu.children[i])
      }
      ElMessage({ message: '变更为页面的原目录的子页面已被移至根目录', type: 'info' })
      updateDialog.menu.children = []
    }

    let newId = ref(-1)
    const onCreateMenu = () => {
      treeData.lists.push({
        id: newId.value--,
        name: 'Unknown',
        type: 0,
        title: '新增菜单',
        path: '',
        perms: '',
        icon: '',
        hidden: false,
        component: 'Unknown',
        children: [],
        parent_id: 0,
        order: 0,
        open: false,
        buttons: []
      })
    }

    const serializeMenu = list => {
      const menus = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (menus.find(x => x.path === item.path)) {
          throw Error('同级菜单路径不能重复')
        }
        const menu = {
          id: item.id,
          name: item.component || item.perms,
          type: item.type,
          title: item.title,
          path: item.path,
          perms: item.perms,
          icon: item.icon,
          hidden: item.hidden,
          component: item.component,
          children: []
        }
        if (item.type === 1 && item.buttons.length > 0) {
          menu.children = item.buttons
        }
        if (item.type === 0 && item.children.length > 0) {
          menu.children = serializeMenu(item.children)
        }
        menus.push(menu)
      }
      return menus
    }

    const onSave = () => {
      try {
        const menus = serializeMenu(treeData.lists)
        saveMenu(menus).then(() => {
          ElNotification({
            title: '保存成功',
            message: '菜单保存成功',
            type: 'success'
          })
          onGetMenu()
        })
      } catch (e) {
        ElMessage({ message: e.message, type: 'error' })
      }
    }

    const onGetMenu = () => {
      getMenu().then(res => {
        treeData.lists = res.data.data
        loadMenu(treeData.lists, 0)
      })
    }

    onMounted(() => {
      onGetMenu()
    })

    return {
      onTreeDataChange,
      onChangeToDirect,
      onCreateMenu,
      onSave,
      updateDialog,
      treeData,
      table,
      newId
    }
  }
})
</script>
