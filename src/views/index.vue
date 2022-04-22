<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import logo from '@/composables/logo'
import TheSider from './layouts/TheSider.vue'
import TheMenu from './layouts/TheMenu.vue'
import TheHeader from './layouts/TheHeader.vue'
import TheContent from './layouts/TheContent.vue'
import TheFooter from './layouts/TheFooter.vue'
import { useMenuStore } from '@/store/menu'

const { collapsed } = storeToRefs(useMenuStore())
</script>

<template>
  <a-layout>
    <the-sider>
      <template #logo><logo /></template>
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
  transition: margin-left 0.1s;
}
.layout-shrink {
  margin-left: 48px;
  transition: margin-left 0.1s;
}
</style>
