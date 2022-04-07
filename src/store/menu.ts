import type {MenuItem} from '@/utils/types/ant'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      collapsed: false,
      selected: [],
      opened: [],
      parent: {},
      current: {},
      data: []
    }
  },
  getters: {
    first: state => {
      const parent = (state.data[0] as MenuItem)
      return parent?.children?.[0] || parent
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
    find(route: string) {
      let result: {parent: MenuItem | undefined, child: MenuItem | undefined} = {
        parent: undefined,
        child: undefined
      }
      this.data.forEach((item: MenuItem) => {
        if (item.route === route) {
          result.child = item
        }
        item.children?.find((child: MenuItem) => {
          if (child.route === route) {
            result.child = child
            result.parent = this.data.filter((item: MenuItem) => item.id === child.pid)[0]
            return false
          }
        })
      })
      return result!
    },
    active(route: string) {
      const { parent, child } = this.find(route)
      this.selected = <any>[child!.route]
      this.opened = parent ? <any>[parent!.id] : []
      this.parent = <any>parent
      this.current = child!
    }
  }
})
