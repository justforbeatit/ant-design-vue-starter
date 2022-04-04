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
    menuState.selected = <any>[`${parent.route}-${parent.pid}`]
    router.push(parent.route!)
  } else {
    menuState.opened = <any>[parent.id]
    menuState.selected = <any>[`${firstChild.route}-${firstChild.pid}`]
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

const onSelected = (selectKeys: JsonData) => {
  const [ route, pid ] = selectKeys.key.split('-') as [string, string]
  (pid === '0') && (menuState.opened = [])
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
      <a-menu-item v-if="!menu.children" :key="`${menu.route ?? menu.id}-${menu.pid}`">
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
          <a-menu-item v-for="submenu in menu.children" :key="`${submenu.route}-${submenu.pid}`">
            <span class="nav-text">{{ submenu.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>
