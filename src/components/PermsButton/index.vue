<template>
  <span
    v-if="isVisible">
    <el-tooltip
      v-if="tip !== ''"
      :content="tip"
      :disabled="!disabled">
      <span>
        <el-button
          :disabled="disabled"
          :loading="loading"
          :icon="buttonIcon"
          :type="buttonType"
          :size="buttonSize"
          @click.prevent.stop="onClick()">
          <svg-icon
            v-if="!buttonIcon.startsWith('el-icon')"
            :name="buttonIcon"
            style="width: 10px;margin-right: 5px" />
          {{ buttonLabel }}
        </el-button>
      </span>
    </el-tooltip>
    <el-button
      v-else
      :loading="loading"
      :disabled="disabled"
      :icon="buttonIcon"
      :type="buttonType"
      :size="buttonSize"
      @click.prevent.stop="onClick()">
      <svg-icon
        v-if="!buttonIcon.startsWith('el-icon')"
        :name="buttonIcon"
        style="width: 10px;margin-right: 5px" />
      {{ buttonLabel }}
    </el-button>
    <el-divider
      v-if="divider"
      direction="vertical" />
  </span>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { settings } from '/@/settings'
import { store } from '/@/store'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'PermsButton',
  props: {
    perms: {
      required: true,
      type: String
    },
    type: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    batch: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(props, context) {
    const router = useRoute()
    let isVisible = computed({
      get: () => {
        if (store.getters.perms.has(router.meta.perms)) {
          if (store.getters.perms.get(router.meta.perms)
            .has(settings.buttons[props.perms].value)) {
            return true
          }
        }
        return false
      }
    })
    let buttonType = computed({
      get: () => {
        return props.type !== null ? props.type : settings.buttons[props.perms].type
      }
    })
    let buttonIcon = computed({
      get: () => {
        return buttonType.value !== 'text' ? settings.buttons[props.perms].icon : ''
      }
    })
    let buttonSize = computed({
      get: () => {
        return settings.buttons[props.perms].size
      }
    })
    let buttonLabel = computed({
      get: () => {
        const prefix = props.batch ? '批量' : ''
        const label = props.alt === '' ? settings.buttons[props.perms].label : props.alt
        return prefix + props.prefix + label + props.suffix
      }
    })
    const onClick = () => {
      context.emit('click')
    }
    return {
      isVisible,
      buttonType,
      buttonIcon,
      buttonSize,
      buttonLabel,
      onClick
    }
  }
})
</script>

<style scoped>

</style>
