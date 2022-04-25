import { Layout } from "ant-design-vue"
import logo from '@/composables/logo'
import TheSider from '@/layouts/TheSider.vue'
import TheMenu from '@/layouts/TheMenu.vue'
import TheHeader from '@/layouts/TheHeader.vue'
import TheContent from '@/layouts/TheContent.vue'
import TheFooter from '@/layouts/TheFooter.vue'
import { useMenuStore } from '@/store/menu'

export default defineComponent({
  setup() {
    const { collapsed } = storeToRefs(useMenuStore())

    const style = computed(() => {
      return {
        marginLeft: collapsed.value ? '48px' : '200px',
        transition: 'margin-left 0.1s'
      }
    })

    return () => h(Layout, {}, () => [
      h(
        TheSider,
        {},
        {
          logo: () => h(logo),
          menu: () => h(TheMenu)
        }
      ),
      h(
        Layout,
        {
          style: style.value
        },
        () => [
          h(TheHeader),
          h(TheContent),
          h(TheFooter)
        ]
      )
    ])
  }
})
