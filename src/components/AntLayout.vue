<script setup lang="ts">
const props = withDefaults(defineProps<{
  headerStyle?: {}
  withBreadcrumb?: boolean
}>(), {
  withBreadcrumb: true
})

// @ts-ignore
const breadcrumb = defineAsyncComponent(() => {
  if (props.withBreadcrumb) {
    return import('@/views/layout/TheBreadcrumb.vue')
  }
})
</script>

<template>
  <header :style="headerStyle">
    <breadcrumb v-if="withBreadcrumb" />
    <slot name="header"></slot>
  </header>
  <main>
    <div :style="{ margin: '1rem 1rem' }">
      <slot></slot>
    </div>
  </main>
</template>

<style scoped>
header {
  margin-top: 0.5rem;
  min-height: 40px;
  background-color: #fff;
}
</style>
