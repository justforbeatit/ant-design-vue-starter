export default {
  common: {
    provinces: { url: 'api/provinces', method: 'get' },
    areas: { url: 'api/areas/{pid}', method: 'get' },
  },
  auth: {
    captcha: { url: '/captcha/api/math', method: 'get' },
    login: { url: '/api/auth/login', method: 'post' },
    logout: { url: '/api/auth/logout', method: 'post' },
  },
  menu: {
    query: { url: '/api/menus', method: 'get' },
  },
  coupon: {
    query: { url: '/api/coupons', method: 'get' },
  },
}
