import '@/assets/base.css'

export default defineComponent({
  setup() {
    const routerView = resolveComponent('RouterView')
    return () => h(routerView)
  }
})
