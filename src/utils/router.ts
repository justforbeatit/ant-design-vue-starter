import type {RouteRecordRaw} from "vue-router"

export default function(): RouteRecordRaw[] {
  const routers: RouteRecordRaw[] = []
  const children: RouteRecordRaw[]  = []
  const views = Object.entries(import.meta.glob('../views/__autoload__/**'))
  for (const [key, component] of views) {
    const match = key.match(/.*views\/__autoload__\/(.*)\.vue$/)!
    const _path = match[1]!.replace(/View/g, '')

    //console.info(_path, _path.match(/([A-Z])/g))
    const uppers = _path.match(/([A-Z])/g)
    console.info(uppers)

    const path = _path
    const name = path.replaceAll('/', '.')
    if (!path.includes('/')) {
      routers.push({ path, component, name })
    } else {
      children.push({ path, component, name })
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
