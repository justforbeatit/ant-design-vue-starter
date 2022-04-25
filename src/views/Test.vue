<script setup lang="ts">
import type { FormItem, FormItemSelectOption } from '@/types/ant'
import type { TableColumnType } from 'ant-design-vue'
import MyTable from './table.vue'

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

const columns: TableColumnType[] = [
  {
    title: '所属店铺',
    dataIndex: 'shop_id',
    key: 'shop_id',
    width: 100
  },
  {
    title: '卡券标题',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    ellipsis: true,
  },
  {
    title: '卡券副标题',
    dataIndex: 'sub_title',
    key: 'sub_title',
    width: 200,
    ellipsis: true,
  },
  {
    title: '卡券类型',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: '剩余数量',
    key: 'num',
    dataIndex: 'num',
  },
  {
    title: '卡券状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '创建时间',
    key: 'created_at',
    dataIndex: 'created_at',
  },
];

const options = ref<FormItemSelectOption>()

const dataFetch = async (params: JsonData) => await useRequest().coupon.query(params)

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
  <my-table
    :columns="columns"
    :data-fetch="dataFetch"
    :search-items="items"
  >
    <template #searchItemCustom="{ item, state }">
      <a-select v-if="item.name === 'hobby'"
        :options="options"
        v-model:value="state[item.name]"
        placeholder="请选择爱好"
      />
    </template>
    <template #actions>
      <a-button type="primary" size="small">
        编辑
      </a-button>
      <a-divider type="vertical" />
      <a-button type="danger"  size="small">
        删除
      </a-button>
    </template>
  </my-table>
</template>

<style scoped>
/* code... */
</style>
