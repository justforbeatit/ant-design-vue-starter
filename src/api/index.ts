import { defineApiConfig } from '@/utils/http/core'

export default defineApiConfig({
  common: {
    provinces: { path: 'api/provinces', method: 'get' },
    areas: { path: 'api/areas/{pid}', method: 'get' },
  },
  auth: {
    captcha: { path: '/captcha/api/math', method: 'get' },
    login: { path: '/api/auth/login', method: 'post', contentType: 'json' },
    logout: { path: '/api/auth/logout', method: 'post', contentType: 'form' },
  },
  menu: {
    query: { path: '/api/menus', method: 'get' },
  },
  coupon: {
    query: { path: '/api/coupons', method: 'get' },
  },
})
