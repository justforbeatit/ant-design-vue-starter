import logo from '@/assets/logo.png'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: () => '40px'
    },
    height: {
      type: String,
      default: () => '40px'
    }
  },
  setup({ width, height }) {
    return () => h('img', { src: logo, style: { width, height } })
  }
})
