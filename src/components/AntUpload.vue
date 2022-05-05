<script setup lang="ts">
import type { UploadFile } from 'ant-design-vue'
import { authorization } from '@/utils/http'

const { file, maxCount } = withDefaults(defineProps<{
  file?: string | Array<string>,
  maxCount?: number
}>(), {
  file: () => [],
  maxCount: 1
})

const emit = defineEmits<{
  (e: 'upload-done', fileUrl: string | Array<string>): void
}>()

const action = `${import.meta.env.VITE_APP_URL}${import.meta.env.VITE_APP_UPLOAD_URL}`
const fileList = ref<Array<{ status: 'done' | 'error' | 'uploading', url: string}>>([])
const uploadedFiles = ref<Array<string> >([])

const finalFileList = computed(() => {
  return uploadedFiles.value.length > 1 ? uploadedFiles.value : uploadedFiles.value[0]
})

const beforeUpload = () => {
  if (uploadedFiles.value.length === maxCount) {
    return warning(`最多上传${maxCount}个文件`)
  }
}

const onUpload = (uploaded: { file: UploadFile, fileList: UploadFile[] }) => {
  const { status, response } = uploaded.file
  if (status === 'error') {
    return error('上传失败')
  } else if (status === 'done') {
    uploadedFiles.value.push(response?.data?.url as string)
    emit('upload-done', finalFileList.value)
  }
}

const onRemove = ({ url }: UploadFile, { remove }: { remove: CallableFunction}) => {
  remove()
  const index = uploadedFiles.value.findIndex((file: string) => file === url)
  uploadedFiles.value.splice(index, 1)
  emit('upload-done', finalFileList.value)
}

onMounted(() => {
  if (!file) return
  if (Object.prototype.toString.call(file) === '[object Array]') {
    fileList.value = (file as string[]).map(url => {
      uploadedFiles.value.push(url)
      return { status: 'done', url }
    })
  } else {
    fileList.value = [{ status: 'done', url: <string>file }]
    uploadedFiles.value.push(<string>file)
  }
})
</script>

<template>
  <a-upload
    list-type="picture-card"
    accept="image/*"
    v-model:file-list="fileList"
    :action="action"
    :maxCount="maxCount"
    :beforeUpload="beforeUpload"
    :headers="{ ...authorization() }"
    @change="onUpload"
  >
    <div v-if="fileList && fileList.length < 8">
      <plus-outlined />
      <div style="margin-top: 8px">上传</div>
    </div>
    <template #itemRender="{ file, actions }">
      <a-image :src="file?.response?.data?.url || file.url" v-if="file.status === 'done'">
        <template #previewMask>
          <a-space>
            <eye-outlined :style="{ fontSize: '1rem' }" />
            <delete-outlined @click="onRemove(file, actions)" :style="{ fontSize: '1rem' }" />
          </a-space>
        </template>
      </a-image>
      <div v-else-if="file.status === 'uploading'" class="ant-upload-list-picture-card-container"
      >
        <div class="ant-upload-list-item ant-upload-list-item-uploading ant-upload-list-item-list-type-picture-card">
          <div class="ant-upload-list-item-info">
            <span class="ant-upload-span">
              <div class="ant-upload-list-item-thumbnail">上传中...</div>
              <a target="_blank" rel="noopener noreferrer" class="ant-upload-list-item-name" :title="file.name || ''" :href="file.url">{{ file.name || '' }}</a>
            </span>
          </div>
          <div class="ant-upload-list-item-progress">
            <div class="ant-progress ant-progress-line ant-progress-default ant-progress-status-normal">
              <div class="ant-progress-outer">
                <div class="ant-progress-inner">
                  <div class="ant-progress-bg" :style="{width: `${file.percent}%`, height: '2px'}"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="file.status === 'error'"
        class="ant-upload-list-picture-card-container"
      >
        <div class="ant-upload-list-item ant-upload-list-item-error ant-upload-list-item-list-type-picture-card">
          <div class="ant-upload-list-item-info">
            <span class="ant-upload-span">
              <div class="ant-upload-list-item-thumbnail ant-upload-list-item-file">
                <picture-outlined />
              </div>
              <span class="ant-upload-list-item-name" :title="file.name">上传失败</span>
            </span>
          </div>
          <span class="ant-upload-list-item-actions">
            <button class="ant-btn ant-btn-text ant-btn-sm ant-upload-list-item-card-actions-btn ant-btn-icon-only" type="button">
              <delete-outlined @click="actions.remove" :style="{ fontSize: '1rem' }" />
            </button>
          </span>
        </div>
      </div>
    </template>
  </a-upload>
</template>
