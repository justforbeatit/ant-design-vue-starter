<script setup lang="ts">
import TheSider from './layout/TheSider.vue'
import TheMenu from './layout/TheMenu.vue'
import TheHeader from './layout/TheHeader.vue'
import TheContent from './layout/TheContent.vue'
import TheFooter from './layout/TheFooter.vue'
import { useMenuStore } from '@/store/menu'

const { collapsed } = storeToRefs(useMenuStore())
</script>

<template>
  <a-layout>
    <the-sider>
      <template #logo><ant-logo /></template>
      <template #menu><the-menu /></template>
    </the-sider>
    <a-layout class="layout-main" :style="{ marginLeft: collapsed ? '48px' : '200px' }">
      <the-header />
      <the-content />
      <the-footer />
    </a-layout>
  </a-layout>
</template>
