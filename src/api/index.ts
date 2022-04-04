import type { ApiConfigOptions } from "@/utils/types/http"

export default <ApiConfigOptions>{
  auth: {
    login: { url: '/api/auth/login', method: 'post' },
  },
  menu: {
    query: { url: '/api/menus', method: 'get' },
  },
}
