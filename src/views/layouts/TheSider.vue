<script setup lang="ts">
import { useMenuStore } from '@/store/menu'

const theme = import.meta.env.VITE_APP_THEME
const title = import.meta.env.VITE_APP_TITLE
const { collapsed } = storeToRefs(useMenuStore())
</script>

<template>
  <a-layout-sider
    class="menu-sider"
    collapsible
    :collapsedWidth="48"
    :width="collapsed ? 48 : 208"
    v-model:collapsed="collapsed"
    :trigger="null"
    :theme="theme"
  >
    <div class="logo">
      <slot name="logo"></slot>
      <template v-if="!collapsed">{{ title }}</template>
    </div>
    <slot name="menu"></slot>
  </a-layout-sider>
</template>

<style scoped lang="less">
.menu-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  box-shadow:  0 8px 0 rgb(29 35 41 / 5%);
  transition: all 0.2s;
  .logo {
    height: 32px;
    margin: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-weight: 700;
    font-size: 1.1rem;
    color: #fff;
  }
}
</style>
