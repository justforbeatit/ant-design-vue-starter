import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      collapsed: false,
      selected: [] as string[],
      opened: [] as (number | string)[],
      parent: {} as MenuItem | undefined,
      current: {},
      data: [] as MenuItem[],
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
      this.data = data as MenuItem[]
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
      this.selected = [child!.route]
      this.opened = parent ? [parent!.id] : []
      this.parent = parent
      this.current = child!
    }
  }
})
