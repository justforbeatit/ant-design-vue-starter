<template>
  <ul style="display: flex; justify-content: space-around;list-style-type: none;color: blue; font-size: 20px;cursor: pointer;">
    <li @click="a">A</li>
    <li @click="b">B</li>
    <li @click="c">C</li>
  </ul>
    <!--
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
    -->

  <hr>

  <a-tabs v-model:activeKey="activeKey" type="card" @change="onTabChanged">
    <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title">
    </a-tab-pane>
  </a-tabs>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>

</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const router = useRouter()
    const activeKey = ref()

    const a = () => {
      router.push({name: 'playground-a'})
    }

    const b = () => {
      router.push({name: 'playground-b'})

    }

    const c = () => {
      router.push({name: 'playground-c'})
    }

    const panes = [
      {
        key: 'playground-a',
        title: 'Tab 1',
      },
      {
        key: 'playground-b',
        title: 'Tab 2',
      },
      {
        key: 'playground-c',
        title: 'Tab 3',
      }
    ]


    const onTabChanged = (key: string) => {
      activeKey.value = key
      router.push({ name: key })
    }

    onMounted(() => {
      router.push({ name: 'playground-a' })
    })

    return {
      onTabChanged,
      activeKey,
      panes,
      a, b, c
    };
  },
});
</script>
