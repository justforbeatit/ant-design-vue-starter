<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useMenuStore } from '@/store/menu'
import TheSider from './layout/TheSider.vue'
import TheMenu from './layout/TheMenu.vue'
import TheHeader from './layout/TheHeader.vue'
import TheContent from './layout/TheContent.vue'
import TheFooter from './layout/TheFooter.vue'

const { collapsed } = storeToRefs(useMenuStore())
</script>

<template>
  <a-layout>
    <the-sider>
      <template #logo><ant-logo /></template>
      <template #menu><the-menu /></template>
    </the-sider>
    <a-layout :class="collapsed ? 'layout-shrink' : 'layout-spread'">
      <the-header />
      <a-config-provider :locate="zhCN">
        <the-content />
      </a-config-provider>
      <the-footer />
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.layout-spread {
  margin-left: 200px;
  transition: margin-left 0.2s;
}
.layout-shrink {
  margin-left: 48px;
  transition: margin-left 0.2s;
}
</style>
