import type { ApiConfigOptions } from "@/utils/types/http"

export default <ApiConfigOptions>{
  auth: {
    login: { url: '/api/auth/login', method: 'post' },
  },
  users: {
    query: { url: '/api/users', method: 'get' },
    queryRow: { url: '/api/users/{id}', method: 'get' }
  },
  menus: {
    query: { url: '/api/menus', method: 'get' },
  },
}
