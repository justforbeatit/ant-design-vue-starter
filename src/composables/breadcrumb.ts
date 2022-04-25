import 'ant-design-vue/es/breadcrumb/style/index.css'
import { Breadcrumb } from "ant-design-vue"
import { useMenuStore } from '@/store/menu'

export default defineComponent({
  setup() {
    const routerLink = resolveComponent('RouterLink')
    const { parent, first, current } = storeToRefs(useMenuStore())

    const routes = computed(() => {
      const breadcrumb = [
        { path: first.value?.route, breadcrumbName: '首页' },
      ]
      parent.value && breadcrumb.push({
        path: (parent.value as MenuItem)?.children?.[0]?.route!,
        breadcrumbName: (parent.value as MenuItem).name
      })
      current.value && breadcrumb.push({
        path: (current.value as MenuItem).route,
        breadcrumbName: (current.value as MenuItem).name
      })
      return breadcrumb
    })

    return () => h(
      Breadcrumb,
      { routes: routes.value, style: { marginLeft: '1rem' } },
      {
        itemRender: ({ route }: JsonData) => {
          if (routes.value.indexOf(route) === routes.value.length - 1) {
            return h('span', route.breadcrumbName)
          } else {
            return h(
              routerLink,
              { to: { name: route.path } },
              () => route.breadcrumbName
            )
          }
        }
      }
    )
  }
})
