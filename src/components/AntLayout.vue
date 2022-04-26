<script setup lang="ts">
import breadcrumb from '@/composables/breadcrumb'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const { hasBreadcrumb } = withDefaults(defineProps<{
  hasBreadcrumb?: boolean
}>(), {
  hasBreadcrumb: false
})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <header>
      <slot name="header">
        <breadcrumb v-if="hasBreadcrumb" />
      </slot>
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
  background-color: #fff;
  min-height: 40px;
}
</style>
