<template>
  <div
    :class="{'hidden':hidden}"
    class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default: [10, 20, 30, 50]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:page', 'update:limit', 'pagination'],
  setup(props, context) {
    let currentPage = computed({
      get: () => {
        return props.page
      },
      set: (val) => {
        context.emit('update:page', val)
      }
    })
    let pageSize = computed({
      get: () => {
        return props.limit
      },
      set: (val) => {
        context.emit('update:limit', val)
      }
    })
    const onSizeChange = () => {
      context.emit('pagination')
    }
    const onCurrentChange = () => {
      context.emit('pagination')
    }
    return {
      currentPage,
      pageSize,
      onSizeChange,
      onCurrentChange
    }
  }
})
</script>

<style scoped>
.pagination-container {
  background: #fff;
  margin-top: 10px;
}
.pagination-container.hidden {
  display: none;
}
</style>
