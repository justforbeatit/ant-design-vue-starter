<script setup lang="ts">
import { useMenuStore } from '@/store/menu'
import type { FormItem } from '@/types/ant'
import type { TableColumnType } from 'ant-design-vue'
import type { ApiResponse, PaginationResult } from '@/utils/http/core'

type Pagination = {
  current: number,
  pageSize: number,
  total: number
}

const {
  columns, dataFetch, actionsColumnWidth, hasBreadcrumb
} = withDefaults(defineProps<{
  columns: TableColumnType[],
  dataFetch: (params: JsonData) => Promise<ApiResponse<PaginationResult>>,
  searchItems?: FormItem[],
  actionsColumnWidth?: number
  hasBreadcrumb?: boolean,
}>(), {
  hasBreadcrumb: true,
})

const dataSource = ref()
const pagination = ref<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0,
})

const loading = ref(false)
const { toolbars, actions } = useSlots()
const { current: menu } = storeToRefs(useMenuStore())

console.info(useSlots())

const _actionsColumnWidth = computed(() => {
  if (actionsColumnWidth) return actionsColumnWidth
  return actions!().filter(_ => (_.type as JsonData).name === 'AButton').length * 90
})

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
  if (actions && !columns.some(_ => _.key === 'action')) {
    columns.push({
      title: '操作', key: 'action', fixed: 'right', align: 'center', width: _actionsColumnWidth.value
    })
  }
  fetchTableData(pagination.value)
})
</script>

<template>
  <ant-layout :has-breadcrumb="hasBreadcrumb">
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
      <template #title v-if="toolbars">
        <slot name="title">{{ menu.name }}</slot>
      </template>
      <template #extra v-if="toolbars">
        <slot name="toolbars"></slot>
      </template>
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

<style>
 .ant-card-head {
   border-bottom: 0;
   padding: 0 24px;
   height: 48px;
   line-height: 48px;
   margin-bottom: 0;
 }
</style>
