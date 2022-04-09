import type { ApiConfig } from "@/utils/types/http"

export default <ApiConfig>{
  auth: {
    login: { url: '/api/auth/login', method: 'post'},
    logout: { url: '/api/auth/logout', method: 'post'},
  },
  menu: {
    query: { url: '/api/menus', method: 'get'},
  },
}
