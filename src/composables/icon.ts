import type { PropType } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const iconFontCN = [
  'user-avatar',
  'dark-mode',
  'light-mode',
  'quick-entry',
  'merchant',
  'store-1',
  'store-2',
  'coupon',
  'rights',
  'orders',
  'brand',
  'log',
  'more',
  'n-1',
  'n-2',
  'n-3',
  'n-4',
  'n-5',
  'n-6',
  'n-7',
] as const

const component = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3416835_wcrr6u3xbyb.js'
})

export type NumberIconType = [1, 2, 3, 4, 5, 6, 7][number]

export type IconFontCNType = typeof iconFontCN[number] extends infer F
  ? F extends string
    ? `icon-${F}` : never
  : never

export const icon = defineComponent({
  props: {
    is: {
      type: String as PropType<IconFontCNType>,
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
