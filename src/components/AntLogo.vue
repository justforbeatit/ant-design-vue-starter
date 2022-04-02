<script setup lang="ts">
import logo from '@/assets/logo.png'

withDefaults(defineProps<{
  width?: string,
  height?: string
}>(), {
  width: '40px',
  height: '40px'
})
</script>

<template>
  <img :src="logo" class="logo" />
</template>

<style scoped>
.logo {
  width: v-bind(width)!important;
  height: v-bind(height)!important;
}
</style>
