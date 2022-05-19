import { defineStore } from 'pinia'

interface UserState {
  accessToken: string,
  permissions: Array<string>,
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      accessToken: '',
      permissions: []
    }
  },
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
      useStorage().token(token)
    },
    getAccessToken() {
      if (!this.accessToken) {
        this.accessToken = <string>useStorage().token() || ''
      }
      return this.accessToken
    },
    setPermissions(permissions: Array<string>) {
      this.permissions = permissions
    },
    getPermissions() {
      if (!this.permissions) {
        // infact get permissions from api
        this.permissions = []
      }
      return this.permissions
    },
    hasPermission(permission: string) {
      return this.getPermissions().includes(permission)
    }
  }
})
