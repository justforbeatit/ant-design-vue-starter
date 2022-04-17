<script setup lang="ts">
import type {FormItemSelectOption} from '@/utils/types/ant';
//import AntFormItemInput from '@/components/form-items/AntFormItemInput.vue';


const cols = ref(3)

const options = ref<FormItemSelectOption>()

const items: FormItem[] = [
  {
    type: 'input',
    label: '用户名',
    name: 'username',
  },
  {
    type: 'input',
    label: '年龄',
    name: 'age',
  },
  {
    type: 'input',
    label: '手机号',
    name: 'phone',
  },
  {
    type: 'select',
    label: '角色',
    name: 'role_id',
  }
]

const values = {
  username: '',
  age: '',
  phone: '',
  role_id: undefined,
}

const state = ref(values)
const atNextRow = computed(() => items.length % cols.value === 0)

const onSubmit = () => {
  console.info(state.value)
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
    }, 1000)
  })
  options.value = roles as FormItemSelectOption
})

</script>

<template>
  <div style="width: 80%; margin: 30px auto;">
    <a-form
      class="ant-advanced-search-form"
      :labelCol="{ span: 4 }"
      :model="state"
    >
      <a-row :gutter="24">
        <template v-for="item in items" :key="item.name">
          <a-col :span="8">
            <ant-form-item
              :is="item.type"
              :label="item.label"
              :name="item.name"
              :options="options"
              prefixIcon="UserOutlined"
              v-model="state[item.name]"
            />

            <a-form-item
              :name="item.name"
              :label="item.label"
            >
              <a-input
                v-if="item.type === 'input'"
                :placeholder="`请输入${item.label}`"
                v-model:value="state[item.name]"
              />
              <a-select
                v-else-if="item.type === 'select'"
                :placeholder="`请选择${item.label}`"
                v-model:value="state[item.name]"
                :options="options"
              />
            </a-form-item>
          </a-col>
        </template>
        <a-col :span="8" v-if="!atNextRow" style="margin-left: 24px;">
          <a-form-item>
            <a-button type="primary" @click="onSubmit"><SearchOutlined style="font-size: large;"/></a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="atNextRow">
        <a-col :span="24" style="text-align: right;">
          <a-form-item>
            <a-button type="primary" @click="onSubmit"><SearchOutlined style="font-size: large;"/></a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list">Search Result List</div>
  </div>
</template>

<style scoped lang="less">
[data-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
</style>
