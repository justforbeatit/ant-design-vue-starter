<script setup lang="ts">
import type {FormItem, FormItemSelectOption} from '@/utils/types/ant'

const options = ref<FormItemSelectOption>()

const items: FormItem[] = [
  {
    type: 'Input',
    label: '用户名',
    name: 'username',
  },
  {
    type: 'Input',
    label: '年龄',
    name: 'age',
  },
  {
    type: 'Input',
    label: '手机号',
    name: 'phone',
  },
  {
    type: 'Custom',
    label: '角色',
    name: 'role_id',
  },
  {
    type: 'DatePicker',
    label: '生日',
    name: 'birthday',
    size: 'large',
  },
]

const values = {
  username: '',
  age: '',
  phone: '',
  role_id: undefined,
}

onMounted(async () => {
  const roles = await new Promise(resolve => {
    setTimeout(() => {
      const _ = [
        {
          label: '管理员',
          value: '1',
        },
        {
          label: '普通用户',
          value: '2',
        },
      ]
      resolve(_)
    }, 1)
  })
  options.value = roles as FormItemSelectOption
})

</script>

<template>
  <div style="width: 80%; margin: 30px auto;">
    <ant-search-form
      :items="items"
      :values="values"
      :options="options"
    >
      <template #custom="{ item, state }">
        <a-select v-if="item.name === 'role_id'"
          :options="options"
          v-model:value="state[item.name]"
          placeholder="请选择角色"
        />
      </template>
    </ant-search-form>
    <div class="search-result-list">Search Result List</div>
  </div>
</template>
