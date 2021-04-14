import { App } from 'vue'


export default (app: App<Element>): void => {
  app.directive('dialogDrag', {
    mounted(el) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header')
      const dragDom = el.querySelector('.el-dialog')

      dialogHeaderEl.style.cursor = 'move'

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

      dialogHeaderEl.onmousedown = (e: { clientX: number; clientY: number }) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop

        // 获取到的值带px 正则匹配替换
        let styL: number
        let styT: number

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes('%')) {
          styL = Number(document.body.clientWidth) * (Number(sty.left.replace(/%/g, '')) / 100)
          styT = Number(document.body.clientHeight) * (Number(sty.top.replace(/%/g, '')) / 100)
        } else {
          styL = Number(sty.left.replace(/px/g, ''))
          styT = Number(sty.top.replace(/px/g, ''))
        }

        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX
          const t = e.clientY - disY

          // 移动当前元素
          dragDom.style.left = `${l + styL}px`
          dragDom.style.top = `${t + styT}px`

          // 将此时的位置传出去
          // binding.value({x:e.pageX,y:e.pageY})
        }

        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })
  app.directive('dialogDragWidth', {
    mounted(el, binding) {
      const dragDom = binding.value.$el.querySelector('.el-dialog')

      el.onmousedown = (e: { clientX: number }) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - el.offsetLeft

        document.onmousemove = function(e) {
          e.preventDefault() // 移动时禁用默认事件

          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX
          dragDom.style.width = `${l}px`
        }

        document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })
}
