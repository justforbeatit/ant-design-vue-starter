<script setup lang="ts">
import type { FormItem, FormItemSelectOption } from '@/utils/types/ant'
import dayjs from 'dayjs'

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
    label: '用户手机号',
    name: 'phone',
  },
  {
    type: 'Select',
    label: '角色',
    name: 'role_id',
    options: () => Promise.resolve([
      {
        label: '管理员',
        value: '1',
      },
      {
        label: '普通用户',
        value: '2',
      },
    ])
  },
  {
    type: 'DatePicker',
    label: '生日',
    name: 'birthday',
  },
  {
    type: 'Custom',
    label: '爱好',
    name: 'hobby',
  }
]

  /*
const values = {
  username: '',
  age: '',
  phone: '',
  role_id: undefined,
  birthday: dayjs('1990-01-01'),
}
  */

const search = (params: JsonData) => {
  console.log( params )
}

onMounted(async () => {
  const hobby = await new Promise(resolve => {
    setTimeout(() => {
      const _ = [
        {
          label: '吃饭',
          value: '1',
        },
        {
          label: '睡觉',
          value: '2',
        },
      ]
      resolve(_)
    }, 1)
  })
  options.value = hobby as FormItemSelectOption
})

</script>

<template>
  <div style="width: 80%; margin: 30px auto;">
    <ant-search-form
      :label-col="{ span: 6 }"
      :items="items"
      @on-search="search"
    >
      <template #custom="{ item, state }">
        <a-select v-if="item.name === 'hobby'"
          :options="options"
          v-model:value="state[item.name]"
          placeholder="请选择爱好"
        />
      </template>
    </ant-search-form>
    <div class="search-result-list">Search Result List</div>
  </div>
</template>
