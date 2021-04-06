<template>
  <svg
    :class="svgClass"
    :style="'font-size: ' + size + 'px;'"
    aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    }
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.name}`)
    const svgClass = computed(() => {
      if (props.name) {
        return `svg-icon icon-${props.name}`
      }
      return 'svg-icon'
    })
    return {
      iconName,
      svgClass
    }
  }
})



</script>

<style lang='scss'>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
