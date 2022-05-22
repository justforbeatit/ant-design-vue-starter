<script setup lang="ts">
import { icon, type NumberIconType, type IconFontCNType } from '@/composables/icon'

const quickEntries = ref([
  { title: '商户管理', icon: 'icon-merchant', description: '可进行商户管理等相关操作' },
  { title: '品牌管理', icon: 'icon-brand', description: '可进行品牌管理等相关操作' },
  { title: '店铺管理', icon: 'icon-store-2', description: '可进行店铺管理等相关操作' },
  { title: '卡券管理', icon: 'icon-coupon', description: '可进行卡券管理等相关操作' },
  { title: '权益管理', icon: 'icon-rights', description: '可进行权益管理等相关操作' },
  { title: '订单管理', icon: 'icon-orders', description: '可进行订单管理等相关操作' },
])

const recentNews = ref([
  { title: '曲丽丽   在 高逼格设计天团 新建项目 六月迭代', created_at: '05/22 16:48' },
  { title: '付小小   在 高逼格设计天团 新建项目 六月迭代', created_at: '05/22 16:48' },
  { title: '林东东   在 中二少女团 新建项目 六月迭代', created_at: '05/22 16:48' },
  { title: '周星星   将 5 月日常迭代 更新至已发布状态', created_at: '05/22 16:48' },
  { title: '朱偏右   在 工程效能 发布了 留言', created_at: '05/22 16:48' },
  { title: '乐哥   在 程序员日常 新建项目 品牌迭代', created_at: '05/22 16:48' },
  { title: '那时候我只会想自己想要什么，从不想自己拥有什么', created_at: '05/22 16:48' }
])

const getNumberIconName = (index: NumberIconType): IconFontCNType => `icon-n-${index}`

</script>

<template>
  <ant-layout :has-breadcrumb="false">
    <template #header>
      <div class="header">
        <div class="item-left">
          <div>
            <p><icon is="icon-user-avatar" :style="{ fontSize: '50px' }"/></p>
          </div>
          <div style="margin-left: 1rem;">
            <p><h1>管理员</h1></p>
            <p><a-typography-text type="secondary">欢迎回来！</a-typography-text></p>
          </div>
        </div>
        <div class="item-right">
          <a-row>
            <a-col>
              <a-statistic title="订单数" :value="92032" class="sep" />
            </a-col>
            <a-col>
              <a-divider type="vertical" class="sep" style="height: 100%;" />
            </a-col>
            <a-col>
              <a-statistic title="商品数" :value="283292" class="sep" />
            </a-col>
            <a-col>
              <a-divider type="vertical" class="sep" style="height: 100%;" />
            </a-col>
            <a-col>
              <a-statistic title="入驻商家" :value="13323" />
            </a-col>
          </a-row>
        </div>
      </div>
    </template>
    <a-row justify="space-between" :gutter="16">
      <a-col :span="16">
        <a-card :bordered="false" style="min-height: 450px;">
          <template #title>
            <icon is="icon-quick-entry" /> 快捷入口
          </template>
          <a-card-grid v-for="(item, index) of quickEntries" :key="index" style="width: 50%; cursor: pointer;">
            <a-row :gutter="24">
              <a-col>
                <icon :is="item.icon as IconFontCNType" :style="{ fontSize: '64px' }"/>
              </a-col>
              <a-col>
                <dl>
                  <dd>{{ item.title }}</dd>
                  <dd>
                    <a-typography-text type="secondary">{{ item.description }}</a-typography-text>
                  </dd>
                </dl>
              </a-col>
            </a-row>
          </a-card-grid>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :bordered="false" style="min-height: 450px;" :bodyStyle="{ padding: 0 }">
          <template #title>
            <icon is="icon-log" /> 最新动态
          </template>
          <template #extra>
            <router-link :to="{ name: 'index' }">更多</router-link>
          </template>
          <a-list size="large" :data-source="recentNews">
            <template #renderItem="{ item, index }">
              <a-list-item>
                <a-list-item-meta>
                  <template #title>
                    <a-typography-text>{{ item.title }}</a-typography-text>
                  </template>
                  <template #avatar>
                    <icon :is="getNumberIconName(index + 1)" :style="{ fontSize: '20px' }"/>
                  </template>
                  <template #description>
                    05/22 14:16
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </ant-layout>
</template>

<style scoped lang="less">
.header {
  margin-top: 1rem;
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  .item-left {
    margin-left: 1rem;
    width: 40%;
    display: flex;
    align-items: center;
  }
  .item-right {
    margin-right: 1rem;
    display: flex;
  }
  .sep {
    padding-right: 2rem;
  }
}
</style>
