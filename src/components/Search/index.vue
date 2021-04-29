<template>
  <div class="filter-container">
    <el-card
      class="box-card"
      body-style="padding: 0px;">
      <template #header>
        <div class="card-header">
          <span class="ml-2">搜索</span>
          <div class="mr-2">
            <perms-button
              perms="query"
              @click="" />
          </div>
        </div>
      </template>
      <el-form
        class="p-3"
        :label-width="labelWidth"
        label-position="right"
        :model="data.queryParams">
        <el-row
          v-for="row in data.row"
          :key="row"
          :gutter="20">
          <el-col
            v-for="col in Math.min(params.length - (data.col * (row - 1)), data.col)"
            :key="item = params[(row - 1) * data.col + col - 1]"
            :span="6">
            <el-form-item
              :label="item.label"
              :prop="item.field"
              size="mini">
              <span v-if="item.type === 'input'">
                <el-input
                  v-model="data.queryParams[item.field]"
                  :placeholder="item.label"
                  clearable />
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script  lang="ts">
import { defineComponent, onMounted, reactive, ref, PropType } from 'vue'

export interface Params {
  field: string
  label: string
  type: string
  field_type: string
}

export default defineComponent({
  name: 'Search',
  props: {
    params: {
      type: Array as PropType<Params[]>,
      required: true
    },
    labelWidth: {
      type: String,
      default: '60px'
    }
  },
  setup(props, context) {
    const data = reactive({
      queryParams: {},
      row: 0,
      col: 4
    })
    const types = {
      string: '',
      number: '',
      array: [],
      object: null
    }

    props.params.map(item => {
      data.queryParams[item.field] = types[item.field_type]
    })
    data.row = Math.ceil(props.params.length / data.col)
    console.log(props.params.length, data.col)
    return {
      data
    }
  }
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
