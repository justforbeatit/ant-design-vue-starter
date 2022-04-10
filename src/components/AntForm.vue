<script setup lang="ts">
import type { FormItemSize, FormItemButton, FormItemButtonType, FormItemRule } from '@/utils/types/ant'
import type { ApiResponse } from "@/utils/types/http"

const props = withDefaults(defineProps<
  {
    items: Array<FormItem>,
    values: JsonData,
    rules?: FormItemRule,
    labelCol?: { span: number },
    wrapperCol?: { span: number },
    button?: FormItemButton | null,
    submit?: (payload: JsonData) => Promise<ApiResponse<JsonData>>,
    jumpTo?: { name: string, params?: JsonData } | null,
  }
>(), {
    values: undefined,
    labelCol: () => ({ span: 4 }),
    wrapperCol: () => ({ span: 20 }),
    button: () => ({
      text: '提交',
      type: 'primary',
      size: 'default',
      disabled: false,
      block: false,
    }),
})

const emits = defineEmits<
  {
    (e: 'on-finished', payload: JsonData): void,
  }
>()

const { values, button, submit, jumpTo } = props
const state = ref(values)
const loading = ref(false)
const router = useRouter()

const triggerSubmit = () => {
  loading.value = true
  setTimeout(async () => {
    emits('on-finished', toRaw(state.value))
    if (submit) {
      const { ok, msg } = await submit(toRaw(state.value))
      if (!ok) {
        return error(msg)
      }
      success(msg ?? `${button?.text || ''}成功`)
      jumpTo && router.push(jumpTo)
    }
  }, 2000)
}
</script>

<template>
  <a-form
    autocomplete="off"
    name="ant-form"
    :model="state"
    :labelCol="labelCol"
    :wrapperCol="wrapperCol"
    @finish="triggerSubmit"
  >
    <template v-if="items?.length > 0">
      <a-form-item
        v-for="(item, index) in items"
        :key="index"
        :name="item.name"
        :label="item?.label || ''"
        :rules="item.required !== false
          ? [{ required: true, message: item?.placeholder }, ...(item.rules as FormItemRule || []) ]
          : []
        "
      >
        <a-input
          v-if="item.type === 'input'"
          :placeholder="item?.placeholder ? item.placeholder : `请输入${item?.label}`"
          :size="item.size as FormItemSize || 'default'"
          v-model:value="state[item.name]"
        >
          <template #prefix v-if="item.prefix && item.prefix.type === 'icon'">
            <UserOutlined v-if="item.prefix?.value === 'UserOutlined'" class="icon-gray" />
          </template>
        </a-input>
        <a-input-password
          v-else-if="item.type === 'password'"
          :placeholder="item?.placeholder ? item.placeholder : item?.label ? `请输入${item.placeholder}` : '' "
          :size="item.size as FormItemSize || 'default'"
          v-model:value="state[item.name]"
          autocomplete
        >
          <template #prefix v-if="item.prefix && item.prefix.type === 'icon'">
            <LockOutlined v-if="item.prefix?.value === 'LockOutlined'" class="icon-gray" />
          </template>
        </a-input-password>
        <slot name="custom" v-if="item.type === 'custom'" :item="item" :state="state"></slot>
      </a-form-item>
    </template>
    <template v-if="button">
      <a-form-item>
        <a-button
          html-type="submit"
          :type="(button as FormItemButton).type as FormItemButtonType"
          :size="(button as FormItemButton).size as FormItemSize"
          :block="(button as FormItemButton).block"
          :loading="loading"
        >
          {{(button as FormItemButton).text}}
        </a-button>
      </a-form-item>
    </template>
  </a-form>
</template>

<style scoped>
.icon-gray {
  color: #ccc;
}
</style>
