<script setup lang="ts">
import { useMenuStore } from '@/store/menu'

const theme = import.meta.env.VITE_APP_THEME
const title = import.meta.env.VITE_APP_TITLE
const { collapsed } = storeToRefs(useMenuStore())
</script>

<template>
  <a-layout-sider
    collapsible
    :collapsedWidth="48"
    v-model:collapsed="collapsed"
    :trigger="null"
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    :theme="theme"
  >
    <div class="logo">
      <span>
        <slot name="logo"></slot>
        <template v-if="!collapsed">{{ title }}</template>
      </span>
    </div>
    <slot name="menu"></slot>
  </a-layout-sider>
</template>

<style scoped>
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
}
</style>
