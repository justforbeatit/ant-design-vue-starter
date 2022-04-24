<script setup lang="ts">
import breadcrumb from '@/composables/breadcrumb'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const props = withDefaults(defineProps<{
  headerStyle?: {}
  withBreadcrumb?: boolean
}>(), {
  withBreadcrumb: true
})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <header :style="headerStyle">
      <breadcrumb />
    </header>
    <main>
      <div :style="{ margin: '1rem 1rem' }">
        <slot></slot>
      </div>
    </main>
  </a-config-provider>
</template>

<style scoped>
header {
  margin-top: 0.5rem;
  min-height: 40px;
  background-color: #fff;
}
</style>
