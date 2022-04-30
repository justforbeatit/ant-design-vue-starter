<script setup lang="ts">
/*
const fileList = [
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?v1',
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?v2',
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?v3',
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?v4',
]
  */

const uploadDone = (fileUrl: string | Array<string>) => {
  console.info(fileUrl)
}

</script>
<template>
  <div class="clearfix" style="margin-top: 100px">
    <ant-upload :maxCount="5" @uploadDone="uploadDone" />
  </div>
</template>
