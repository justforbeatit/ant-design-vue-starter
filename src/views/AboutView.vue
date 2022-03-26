<script setup lang="ts">
import {useRequest} from '@/utils/http/core';
import {onMounted, ref} from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'

const title = ref('')

onMounted(async () => {
  title.value = import.meta.env.VITE_APP_TITLE
  const { data } = await useRequest().users.query()
  console.info(data)
})


</script>

<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <HomeOutlined></HomeOutlined>
    <a-button type="primary">提交</a-button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
