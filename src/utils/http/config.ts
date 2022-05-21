import { defineRequestConfig, type ApiResponse } from "@/utils/http/core"
import { useUserStore } from "@/store/user"

const store = useUserStore()

export default defineRequestConfig({
  baseUrl: import.meta.env.VITE_APP_URL,
  headers: () => {
    const accessToken = store.getAccessToken()
    return { Authorization: `Bearer ${accessToken}` }
  },
  serializeTo: 'formData',
  asFetchSuccess: (response: ApiResponse) => response?.code === 0,
  handleFetchError: ({ response }) => {
    switch (response?.status) {
      case 401:
        warning("会话已失效，请重新登录")
        store.removeAccessToken()
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
