<script setup lang="ts">
import type {MenuItem} from '@/utils/types/ant'
import { useMenuStore } from '@/store/menu'

const theme = import.meta.env.VITE_APP_THEME
const menuState = useMenuStore()
const router = useRouter()

menuState.initialize().then(() => {
  const parent = (menuState.data[0] as MenuItem)
  const firstChild = parent?.children?.[0]
  if (!firstChild) {
    menuState.selected = <any>[parent.route]
    menuState.setCurrent(parent.name, <string>parent.route)
    router.push(parent.route!)
  } else {
    menuState.opened = <any>[parent.id]
    menuState.selected = <any>[firstChild.route]
    menuState.setCurrent(firstChild.name, <string>firstChild.route)
    router.push(firstChild.route!)
  }
})

const onOpenChanged = (openKeys: string[] | number[]) => {
  if (openKeys.length > 0) {
    const lastIndex = openKeys.length - 1
    menuState.opened = <any>[openKeys[lastIndex]]
  } else {
    menuState.opened = []
  }
}

const findByRoute = (route: string) => {
  let result: MenuItem | undefined
  menuState.data.forEach((item: MenuItem) => {
    if (item.route === route) {
      result = item
      return false
    }
    item.children?.find((child: MenuItem) => {
      if (child.route === route) {
        result = child
        return false
      }
    })
  })
  return result!
}

const onSelected = (selectKeys: JsonData) => {
  const { name, route, pid }= findByRoute(selectKeys.key) as MenuItem
  (pid === 0) && (menuState.opened = [])
  menuState.setCurrent(name, route)
  router.push(route)
}
</script>

<template>
  <a-menu
    :theme="theme"
    mode="inline"
    v-model:selectedKeys="menuState.selected"
    :openKeys="menuState.opened"
    @openChange="onOpenChanged"
    @select="onSelected"
  >
    <template v-for="menu in menuState.data as MenuItem[]" :key="menu.id">
      <a-menu-item v-if="!menu.children" :key="`${menu.route ?? menu.id}`">
        <ant-icon v-if="menu.icon" :is="menu.icon" />
        <span class="nav-text">{{ menu.name }}</span>
      </a-menu-item>
      <template v-else>
        <a-sub-menu :key="menu.id">
          <template #title>
            <span slot="title">
              <ant-icon v-if="menu.icon" :is="menu.icon" />
              <span class="nav-text">{{ menu.name }}</span>
            </span>
          </template>
          <a-menu-item v-for="submenu in menu.children" :key="`${submenu.route}`">
            <span class="nav-text">{{ submenu.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>
