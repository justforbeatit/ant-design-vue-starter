<script setup lang="ts">
import type { FormItem } from '@/types/ant'
import type { ApiResponse, PaginationResult } from '@/utils/http/core'
import type { TableColumnType } from 'ant-design-vue'

interface Pagination {
  current: number,
  pageSize: number,
  total: number
}

const { columns, dataFetch } = defineProps<{
  columns: TableColumnType[]
  dataFetch: (params: JsonData) => Promise<ApiResponse<PaginationResult>>
  searchItems?: FormItem[]
}>()

const dataSource = ref()
const pagination = ref<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0,
})

const hasActions = useSlots().actions
const loading = ref(false)

const fetchTableData = async (_pagination: Pagination, params: JsonData = {}) => {
  loading.value = true
  const { current: page, pageSize: limit } = _pagination
  const { data: { data, total }  } = await dataFetch({ page, limit, ...params })
  dataSource.value = data
  pagination.value = { ..._pagination, total }
  setTimeout(() => loading.value = false, 200)
}

const onPageChanged = (pagination: Pagination) => fetchTableData(pagination)

const onSearch = (params: JsonData) => fetchTableData(pagination.value, params)

onMounted(() => {
  if (hasActions && !columns.some(_ => _.key === 'action')) {
    columns.push({
      title: '操作', key: 'action', fixed: 'right',
    })
  }
  fetchTableData(pagination.value)
})
</script>

<template>
  <ant-layout :with-breadcrumb="true">
    <a-card :bordered="false">
      <ant-search-form
        v-if="searchItems?.length > 0"
        :label-col="{ span: 6 }"
        :items="searchItems"
        @on-search="onSearch"
      >
        <template #custom="{ item, state }">
          <slot name="searchItemCustom" :item="item" :state="state"></slot>
        </template>
      </ant-search-form>
    </a-card>
    <a-card :bordered="false" :style="{ marginTop: '1rem' }">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="{
          total: pagination.total,
          pageSize: pagination.pageSize,
          showTotal: (total: number) => `共 ${total} 条`,
        }"
        @change="onPageChanged"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'action'">
            <slot name="actions" :record="record"></slot>
          </span>
          <slot v-else :column="column" :record="record"></slot>
        </template>
      </a-table>
    </a-card>
  </ant-layout>
</template>
