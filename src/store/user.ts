import { defineStore } from 'pinia'

export type UserContext = {
  user: { name: string, email?: string, phone?: string } | undefined,
  token: string | null,
  permissions: Array<string>,
}

export const useUserStore = defineStore('user', {
  state: (): UserContext => {
    return {
      user: undefined,
      token: null,
      permissions: []
    }
  },
  actions: {
    async getUserInfo(): Promise<UserContext['user']> {
      if (this.user) {
        return Promise.resolve(this.user)
      }
      const { data } = await useRequest<UserContext['user']>().auth.user()
      this.user = data
      return Promise.resolve(this.user)
    },
    setAccessToken(token: string) {
      this.token = token
      useStorage().$__token__(token)
    },
    getAccessToken() {
      if (!this.token) {
        this.token = <string>useStorage().$__token__()
      }
      return this.token
    },
    removeAccessToken() {
      this.token =  null
      useStorage().$__token__(null)
    },
    async getPermissions(): Promise<Array<string>> {
      if (this.permissions) {
        return Promise.resolve(this.permissions)
      }
      const { data } = await useRequest<Array<string>>().auth.permissions()
      this.permissions = data
      return Promise.resolve(this.permissions)
    }
  }
})
