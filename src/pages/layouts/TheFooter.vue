<script setup lang="ts">
const copyright = import.meta.env?.VITE_APP_COPYRIGHT
</script>

<template>
  <a-layout-footer style="text-align: center">
    <a-typography-text type="secondary" v-if="copyright">&copy;{{ copyright }}</a-typography-text>
  </a-layout-footer>
</template>
