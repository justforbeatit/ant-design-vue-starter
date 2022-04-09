import type { ApiResponseReturn } from "@/utils/types/http"

export interface ApiRequestMethods {
  auth: {
    login: (data: JsonData) => Promise<ApiResponseReturn>,
    logout: () => Promise<ApiResponseReturn>,
  },
  menu: {
    query: () => Promise<ApiResponseReturn>
  },
}
