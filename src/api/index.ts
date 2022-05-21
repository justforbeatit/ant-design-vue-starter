import { defineApiConfig } from '@/utils/http/core'

export default defineApiConfig({
  common: {
    provinces: { path: 'api/provinces', method: 'get' },
    areas: { path: 'api/areas/{pid}', method: 'get' },
  },
  auth: {
    captcha: { path: '/captcha/api/math', method: 'get' },
    login: { path: '/api/auth/login', method: 'post' },
    logout: { path: '/api/auth/logout', method: 'post' },
    user: { path: '/api/auth/user', method: 'get' },
    permissions: { path: '/api/auth/permissions', method: 'get' }
  },
  menu: {
    query: { path: '/api/menus', method: 'get' },
  },
  coupon: {
    query: { path: '/api/coupons', method: 'get' },
  },
})
