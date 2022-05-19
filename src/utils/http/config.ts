import { defineRequestConfig, type ApiResponse } from "@/utils/http/core"
import { useUserStore } from "@/store/user"

export default defineRequestConfig({
  baseUrl: import.meta.env.VITE_APP_URL,
  authorization: () => {
    const accessToken = useUserStore().getAccessToken()
    return { Authorization: `Bearer ${accessToken}` }
  },
  contentType: 'form',
  asResponseOk: (response: ApiResponse) => response?.code === 0,
  afterResponse: ({ response }) => {
    switch (response?.status) {
      case 401:
        warning("会话已失效，请重新登录")
        useStorage().token(null)
        setTimeout(() => {
          window.location.assign(`${import.meta.env.PROD ? '/admin' : ''}/auth/login`)
        }, 1500)
        break
      case 403:
        warning("无权限访问, 请联系管理员")
        break
      case 500:
        error('服务器繁忙，请稍后再试');
    }
  }
})
