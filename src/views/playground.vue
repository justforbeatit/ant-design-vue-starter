<script setup lang="ts">
import Region from './components/Region.vue'

const selected = ref(['北京市', '市辖区', '东城区'])

const onChange = (value: number[]) => {
  console.info(value)
}

</script>

<template>
  <div style="margin: 100px">
    <region :selected="selected"  @change="onChange"/>
  </div>
</template>
