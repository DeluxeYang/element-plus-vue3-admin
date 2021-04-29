<template>
  <div>
    <div class="table-container">
      <el-table
        ref="table"
        v-loading="data.loading"
        :data="data.lists"
        row-key="id"
        @cell-click="rowClick"
        @selection-change="onSelectionChange">
        <el-table-column
          v-if="selection"
          type="selection"
          align="center" />
        <el-table-column
          label="#"
          type="index"
          align="center" />
        <el-table-column
          v-for="(col, index) in columns"
          :key="index"
          :label="col.label || ''"
          :prop="col.field || ''"
          :type="col.type || ''"
          :align="col.align || 'center'">
          <template
            #default="props">
            <span v-if="col.type === 'expand'">
              <slot
                :name="'expand-'+col.field"
                :row="props.row" />
            </span>
            <span v-if="col.type === 'action'">
              <span v-if="col.actions">
                <perms-button
                  v-for="(act, idx) in col.actions"
                  :key="idx"
                  :perms="act.perms"
                  :type="act.type"
                  :disabled="act.disabled"
                  :batch="act.batch"
                  :tip="act.tip"
                  :loading="act.loading"
                  :divider="act.divider"
                  :prefix="act.prefix"
                  :suffix="act.suffix"
                  :alt="act.alt"
                  @click="onClick(act.click, act, props.row)" />
              </span>
              <span v-else>
                <slot
                  name="action"
                  :row="props.row" />
              </span>
            </span>
            <span v-else>
              {{ props.row[col.field] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      v-model:page="data.params.page"
      v-model:limit="data.params.limit"
      class="text-center"
      :total="data.params.total"
      @pagination="get" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, PropType } from 'vue'
import PermsButton from '/@/components/PermsButton/index.vue'
import Pagination from '/@/components/Pagination/index.vue'
import emitter from '/@/utils/emitter'
import { ElMessageBox } from 'element-plus'

export interface Actions {
  perms: string
  type?: string
  disabled?: boolean
  batch?: boolean
  tip?: string
  loading?: boolean
  divider?: boolean
  prefix?: string
  suffix?: string
  alt?: string
  // eslint-disable-next-line no-unused-vars
  click: (row: any) => void
  confirm?: boolean
  confirmType?: string
  confirmPromptMessage?: string
  confirmPromptField?: string
}

export interface ColumnOptions {
  field: string
  label: string
  type: string
  width?: number
  align?: boolean
  actions?: Array<Actions>
}

export default defineComponent({
  name: 'PermsTable',
  components: { PermsButton, Pagination },
  props: {
    columns: {
      type: Array as PropType<ColumnOptions[]>,
      required: true
    },
    selection: {
      type: Boolean,
      default: true
    },
    acquire: {
      type: Function,
      required: true
    },
    params: {
      type: Object,
      default: null
    }
  },
  setup(props, context) {
    const data = reactive({
      lists: [],
      params: {
        limit: 20,
        page: 1,
        total: 0
      },
      loading: false,
      multiSelection: []
    })
    const table = ref(null)
    const get = () => {
      const params = {
        limit: data.params.limit,
        page: data.params.page,
        ...props.params
      }
      props.acquire(params).then((res: any) => {
        data.lists = res.data.data.list
        data.params.limit = res.data.data.limit
        data.params.page = res.data.data.page
        data.params.total = res.data.data.total
      })
    }
    const rowClick = (row: any) => {
      table.value.toggleRowSelection(row)
      emitter.emit('test', row)
    }
    const onSelectionChange = (val: Array<any>) => {
      data.multiSelection = val
    }
    const onClick = (method: any, act: any, row: any) => {
      if (act.confirm) {
        ElMessageBox({
          type: act.confirmType,
          title: act.confirmPromptMessage + '确认',
          message: '是否确认' + act.confirmPromptMessage + '[' + row[act.confirmPromptField] + ']？',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: act.confirmPromptMessage
        }).then(() => {
          method(row)
        }).catch(() => null)
      } else {
        method(row)
      }
    }
    onMounted(() => {
      get()
    })
    return {
      data,
      table,
      rowClick,
      onSelectionChange,
      onClick,
      get
    }
  }
})
</script>

<style scoped>

</style>
