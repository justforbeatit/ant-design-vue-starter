<script setup lang="ts">
const routes = [
  { path: '/', breadcrumbName: '首页' },
  { path: '/about', breadcrumbName: '订单管理' },
  { path: '/about', breadcrumbName: '订单列表' }
]
</script>

<template>
  <header>
    <a-breadcrumb :routes="routes" style="margin-left: 1rem;">
      <template #itemRender="{ route, routes }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="{ name: 'orders'}">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
  </header>
  <main>
    <a-card style="margin: 1.2rem;" :bordered="false">
      <p>这是订单</p>
    </a-card>
  </main>
</template>

<style scoped>
header {
  margin-top: 0.5rem;
  min-height: 40px;
  line-height: 20px;
  width: 100%;
  background-color: #fff;
}
#main {
  margin: 0.8rem;
  width: 100%;
}
.item-l {
  margin-left: 1rem;
  width: 40%;
  display: flex;
  align-items: center;
}
.item-r {
  margin-right: 1rem;
  display: flex;
}
.item-r .analysis {
  margin-right: 1rem;
  margin-left: 1rem;
  text-align: right;
  padding-top: 0.5rem;
}
.sep {
  border-right: 1px solid #f0f0f0;
  padding-right: 2rem;
}
</style>
