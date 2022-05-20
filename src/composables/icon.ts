import type { PropType } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

type CustomIconType = [
  'icon-dark-mode',
  'icon-user-avatar'
]

const component = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3416835_p8bwgbtd4n.js'
})

export const icon = defineComponent({
  props: {
    is: {
      type: String as PropType<CustomIconType[number]>,
      required: true
    },
    style: {
      type: Object,
      default: () => ({ fontSize: '1rem' })
    }
  },
  setup({ is: type, style }) {
    return () => h(component, { type, style })
  }
})

export default defineComponent({
  props: {
    is: {
      type: String,
      required: true,
    },
  },
  setup({ is: component }) {
    const icon = defineAsyncComponent(async () => {
      return import('@ant-design/icons-vue').then(module => module[<AntIcon>component])
    })
    return () => h(icon)
  },
})
