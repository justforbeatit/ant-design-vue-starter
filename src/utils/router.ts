import type {RouteRecordRaw} from "vue-router"

export default function(): RouteRecordRaw[] {
  const routers: RouteRecordRaw[] = []
  const children: RouteRecordRaw[]  = []
  const views = Object.entries(import.meta.glob('../views/__autoload__/**'))

  for (const [key, component] of views) {
    const match = key.match(/.*views\/__autoload__\/(.*)\.vue$/)!
    const _ = match[1]!.replace(/\/|View/g, '')
      .replace(/([A-Z])/g, '|$1').toLowerCase().split('|').filter(_ => _ !== '')
    const path = _.join('/')
    const name = _.join('.')
    const router = { path, component, name }
    if (!match[1].includes('/')) {
      routers.push(router)
    } else {
      children.push(router)
    }
  }

  return routers.map(router => {
    return {
      ...router,
      children: children
        .filter(child => child.path.split('/')[0] === router.path)
        .map(child => ({
          ...child,
          path: child.path.replace(`${router.path}/`, '')
        }))
    }
  })
}
