<script setup lang="ts">
import { icon } from '@/composables/icon'


const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<template>
  <icon v-if="isDark" is="icon-dark-mode" @click="toggleDark()" />
  <icon v-else is="icon-light-mode" @click="toggleDark()" />
  <div>
    <h1>
  aaa
    </h1>
  </div>

</template>

<style scoped>
/* code... */
</style>
