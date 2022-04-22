<script setup lang="ts">
import { useMenuStore } from '@/store/menu'

const { parent, first, current } = storeToRefs(useMenuStore())

const routes = computed(() => {
  const _ = [
    { path: first.value.route, breadcrumbName: '首页' },
  ]
  parent.value && _.push({
    path: (parent.value as MenuItem)?.children?.[0]?.route!,
    breadcrumbName: (parent.value as MenuItem).name
  })
  current.value && _.push({
    path: (current.value as MenuItem).route,
    breadcrumbName: (current.value as MenuItem).name
  })
  return _
})
</script>

<template>
  <a-breadcrumb :routes="routes" style="margin-left: 1rem;">
    <template #itemRender="{ route, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="{ name: route.path }">
        {{ route.breadcrumbName }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>
