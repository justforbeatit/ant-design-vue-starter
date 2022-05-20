import { defineStore } from 'pinia'

export type UserState = {
  user: { name: string, email?: string, phone?: string } | undefined,
  token: string,
  permissions: Array<string>,
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      user: undefined,
      token: '',
      permissions: []
    }
  },
  actions: {
    async getUserInfo(): Promise<UserState['user']> {
      if (this.user) {
        return Promise.resolve(this.user)
      }
      const { data } = await useRequest<UserState['user']>().auth.user()
      this.user = data
      return Promise.resolve(this.user)
    },
    setAccessToken(token: string) {
      this.token = token
      useStorage().token(token)
    },
    getAccessToken() {
      if (!this.token) {
        this.token = <string>useStorage().token() || ''
      }
      return this.token
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
