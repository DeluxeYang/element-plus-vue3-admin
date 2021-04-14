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
      v-bind="$attrs" />
  </div>
</template>

<script>
export default {
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
      default(): Array<number> {
        return [10, 20, 30, 50]
      }
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
  emits: ['update:page', 'update:limit'],
  computed: {
    currentPage: {
      get(): number {
        return this.page
      },
      set(val: number): number {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get(): number {
        return this.limit
      },
      set(val: number): number {
        this.$emit('update:limit', val)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 12px 16px 0 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
