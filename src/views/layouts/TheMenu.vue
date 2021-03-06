<script setup lang="ts">
import icon from '@/composables/icon'
import { useMenuStore } from '@/store/menu'

const theme = import.meta.env.VITE_APP_THEME
const router = useRouter()
const menu = useMenuStore()
const { first, selected, opened, data: menus } = storeToRefs(menu)

menu.initialize().then(() => {
  const { route: name } = first.value
  menu.active(name)
  router.push({ name })
})

const onOpened = (openKeys: string[] | number[]) => {
  menu.opened = []
  if (openKeys.length > 0) {
    menu.opened = [<number>openKeys[openKeys.length - 1]]
  }
}

const onSelected = ({ key: name }: JsonData) => router.push({ name })

watch(() => router.currentRoute.value, ({ name }) => menu.active(<string>name))
</script>

<template>
  <a-menu
    :theme="theme"
    mode="inline"
    v-model:selectedKeys="selected"
    :openKeys="opened"
    @openChange="onOpened"
    @select="onSelected"
  >
    <template v-for="menu in menus" :key="menu.id">
      <a-menu-item v-if="!menu.children" :key="`${menu.route ?? menu.id}`">
        <icon v-if="menu.icon" :is="menu.icon" />
        <span class="nav-text">{{ menu.name }}</span>
      </a-menu-item>
      <template v-else>
        <a-sub-menu :key="menu.id">
          <template #title>
            <span slot="title">
              <icon v-if="menu.icon" :is="menu.icon" />
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
