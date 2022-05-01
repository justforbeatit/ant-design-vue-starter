import type { ApiConfig } from "@/utils/http/core"

export default <ApiConfig>{
  auth: {
    login: { url: '/api/auth/login', method: 'post'},
    logout: { url: '/api/auth/logout', method: 'post'},
  },
  menu: {
    query: { url: '/api/menus', method: 'get'},
  },
  coupon: {
    query: { url: '/api/coupons', method: 'get'},
  },
  common: {
    provinces: { url: 'api/provinces', method: 'get'},
    areas: { url: 'api/areas/{pid}', method: 'get'},
  }
}
