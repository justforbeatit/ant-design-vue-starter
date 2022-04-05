
import type {MenuItem} from '@/utils/types/ant'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      collapsed: false,
      selected: [],
      opened: [],
      current: {},
      data: []
    }
  },
  actions: {
    async initialize() {
      const { data }= await useRequest().menu.query()
      this.data = data
    },
    toggle() {
      this.collapsed = !this.collapsed
    },
    setCurrent(menu: MenuItem) {
      this.current = menu
    },
  }
})
