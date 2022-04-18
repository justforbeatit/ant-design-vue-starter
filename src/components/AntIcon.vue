<script setup lang="ts">
const props = defineProps<{
  is: string,
}>()

const icon = defineAsyncComponent(async () => {
  return import('@ant-design/icons-vue').then(module => module[<AntIcon>props.is])
})
</script>

<template>
  <icon />
</template>
