import { defineStore } from 'pinia'
import type { MenuItem } from '@/types'
import type { ApiResponse } from '@/utils/http/core'

interface MenuState {
  collapsed: boolean,
  selected: Array<string> | undefined,
  opened: Array<number | string>
  parent: MenuItem | undefined,
  current: MenuItem,
  data: Array<MenuItem>
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => {
    return {
      collapsed: false,
      selected: [],
      opened: [],
      parent: undefined,
      current: {} as MenuItem,
      data: [],
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
      const { data }= await useRequest<ApiResponse<MenuItem[]>>().menu.query()
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
      this.selected = child?.route ? [child.route] : undefined
      this.opened = parent ? [parent!.id] : []
      this.parent = parent
      this.current = child!
    }
  }
})
