import { Layout } from "ant-design-vue"
import logo from '@/composables/logo'
import TheSider from './layouts/TheSider.vue'
import TheMenu from './layouts/TheMenu.vue'
import TheHeader from './layouts/TheHeader.vue'
import TheContent from './layouts/TheContent.vue'
import TheFooter from './layouts/TheFooter.vue'
import { useMenuStore } from '@/store/menu'

export default defineComponent({
  setup() {
    const { collapsed } = storeToRefs(useMenuStore())

    const style = computed(() => {
      return {
        marginLeft: collapsed.value ? '48px' : '208px',
      }
    })

    const media = window.matchMedia('(max-width: 960px)')
    media.addEventListener('change', () => {
      if (media.matches) {
        collapsed.value = true
      } else {
        collapsed.value = false
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
