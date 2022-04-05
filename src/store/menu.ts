import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      collapsed: false,
      selected: [],
      opened: [],
      current: { name: '', route: '' },
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
    setCurrent(name: string, route: string) {
      this.current = { name, route }
    },
  }
})
