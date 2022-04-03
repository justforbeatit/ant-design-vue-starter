<script setup lang="ts">
const props = defineProps<{
  is: string,
}>()

const icon = defineAsyncComponent(() => {
  // @ts-ignore
  return import('@ant-design/icons-vue')['then'](module => module[props.is])
})
</script>

<template>
  <icon />
</template>
