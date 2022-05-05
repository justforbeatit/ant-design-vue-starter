<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import type { IDomEditor } from '@wangeditor/core'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { toolbarConfig, editorConfig } from '@/utils/editor/config'

const { modelValue } = withDefaults(defineProps<{
  modelValue?: string,
  mode?: string,
  style?: JsonData
}>(), {
  mode: 'default',
  style: () => ({
    height: '300px',
    overflow: 'hidden'
  })
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'change', value: string): void,
}>()

const editorRef = shallowRef()

const onCreated = (editor: IDomEditor) => editorRef.value = editor

const onChange = (editor: IDomEditor) => {
  const editorContent = editor.getHtml()
  emit('update:modelValue', editorContent)
  emit('change', editorContent)
}

onBeforeUnmount(() => editorRef.value && editorRef.value.destroy())
</script>

<template>
  <Toolbar
    :editor="editorRef"
    :defaultConfig="toolbarConfig"
    :mode="mode"
    style="border-bottom: 1px solid #ccc"
  />
  <Editor
    :defaultConfig="editorConfig"
    :mode="mode"
    v-model="modelValue"
    :style="style"
    @onCreated="onCreated"
    @onChange="onChange"
  />
</template>
