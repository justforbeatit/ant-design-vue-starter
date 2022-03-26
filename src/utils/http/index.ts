import type {ApiResponseReturn} from "@/utils/http/types";
import type {AfterFetchContext, OnFetchErrorContext} from "@vueuse/core";

export function useBaseUrl(): string {
  return import.meta.env.VITE_APP_URL
}

export function useHeaders() {
  const token = 'Yet nothing provided '
  return { Authorization: `Bearer ${token}` }
}

export function asResponseOk(response: ApiResponseReturn): boolean {
  return response?.code === 0
}

export function asUnauthorized(response: AfterFetchContext): boolean {
  return response.data?.code === 401
}

export function asServerError(response: OnFetchErrorContext): boolean {
  return response.data === null
}

export function onUnauthorized(): void {
  console.info('afterUnauthorized')
  //window.location.assign('https://www.google.com')
}

export function onServerError(): void {
  console.error('服务器繁忙，请稍后再试');
}
