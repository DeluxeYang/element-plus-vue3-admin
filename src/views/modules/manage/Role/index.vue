<template>
  <div class="app-container">
    <perms-search
      :params="params" />
    <perms-table
      :columns="columns"
      :acquire="getRoles"
      :params="params" />
  </div>
</template>

<script>
import { defineComponent, reactive, onUnmounted } from 'vue'
import PermsTable from '/@/components/Table/index.vue'
import PermsSearch from '/@/components/Search/index.vue'
import { getRoles } from '/@/api/manage/role'
import emitter from '/@/utils/emitter'

export default defineComponent({
  name: 'Role',
  components: {
    PermsTable,
    PermsSearch
  },
  setup() {
    const columns = reactive([
      {
        field: 'role_name',
        label: '角色名称'
      },
      {
        field: 'remark',
        label: '备注'
      },
      {
        type: 'action',
        label: '操作',
        actions: [
          {
            perms: 'update',
            type: 'text',
            divider: true,
            click: row => {
              console.log(row)
            }
          },
          {
            perms: 'delete',
            type: 'text',
            confirm: true,
            confirmType: 'warning',
            confirmPromptMessage: '删除',
            confirmPromptField: 'role_name',
            click: row => {
              console.log(row.id)
            }
          }
        ]
      }
    ])
    const params = reactive([
      {
        type: 'input',
        field: 'key',
        label: '关键字',
        field_type: 'string'
      }
    ])
    const f =  item => {
      console.log(item)
    }
    emitter.on('test', f)
    onUnmounted(() => {
      emitter.off('test', f)
      console.log(emitter.all)
    })
    return {
      columns,
      params,
      getRoles
    }
  }
})
</script>

<style scoped>
</style>

